import axios from 'axios';
import * as cheerio from 'cheerio';
import dotenv from 'dotenv';
import { supabase } from '../lib/supabase.js';

// Load environment variables
dotenv.config();

const BASE_URL = 'https://awesome-privacy.xyz';

// Configure axios defaults
axios.defaults.headers.common['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
axios.defaults.headers.common['Accept'] = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8';
axios.defaults.headers.common['Accept-Language'] = 'en-US,en;q=0.5';
axios.defaults.timeout = 30000;

// Add delay between requests
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function scrapeCategory(url, categoryName) {
  try {
    // Random delay between 2-5 seconds
    await delay(2000 + Math.random() * 3000);

    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    
    // Extract category description
    const description = $('meta[name="description"]').attr('content') || '';
    
    // Create category slug
    const slug = url.split('/').pop();
    
    console.log(`Processing category: ${categoryName}`);

    // Insert category into Supabase
    const { data: category, error: categoryError } = await supabase
      .from('tool_categories')
      .insert({
        name: categoryName,
        description: description.trim(),
        slug: slug
      })
      .select()
      .single();

    if (categoryError) {
      console.error(`Error inserting category ${categoryName}:`, categoryError);
      return;
    }

    // Find and process tools
    const tools = [];
    $('.tool-entry').each((i, elem) => {
      const name = $(elem).find('h3').text().trim();
      const description = $(elem).find('p').text().trim();
      const link = $(elem).find('a').attr('href');
      
      // Extract GitHub URL if present
      const githubUrl = link.match(/https:\/\/github.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-_.]+/)?.[0];
      
      // Extract license info
      const licenseMatch = description.match(/\b(?:MIT|GPL|Apache|BSD|AGPL|MPL|LGPL)(?:-\d+(?:\.\d+)?)?(?:\sLicense)?\b/i);
      const license = licenseMatch ? licenseMatch[0] : null;
      
      // Detect platforms
      const platforms = [];
      const platformKeywords = {
        'Windows': ['windows', 'win'],
        'macOS': ['macos', 'mac', 'osx'],
        'Linux': ['linux', 'ubuntu', 'debian'],
        'iOS': ['ios', 'iphone', 'ipad'],
        'Android': ['android'],
        'Web': ['web', 'browser', 'online'],
        'CLI': ['cli', 'command-line', 'terminal']
      };
      
      const descLower = description.toLowerCase();
      for (const [platform, keywords] of Object.entries(platformKeywords)) {
        if (keywords.some(keyword => descLower.includes(keyword))) {
          platforms.push(platform);
        }
      }
      
      // Extract tags
      const tags = new Set();
      const tagPatterns = [
        /#\w+/,
        /\b(?:open-source|free|paid|premium|encrypted|decentralized|p2p|self-hosted)\b/i,
        /\b(?:privacy|security|anonymity|encryption)\b/i
      ];
      
      for (const pattern of tagPatterns) {
        const matches = description.match(pattern) || [];
        matches.forEach(match => {
          tags.add(match.toLowerCase().replace('#', ''));
        });
      }

      tools.push({
        category_id: category.id,
        name,
        description: description.trim(),
        url: link,
        github_url: githubUrl,
        license,
        is_open_source: Boolean(githubUrl),
        is_free: tags.has('free'),
        has_paid_plan: tags.has('paid') || tags.has('premium'),
        platforms,
        tags: Array.from(tags)
      });
    });

    // Insert tools into Supabase with delay between each
    for (const tool of tools) {
      await delay(500); // 500ms delay between tool insertions
      
      const { error: toolError } = await supabase
        .from('privacy_tools')
        .insert(tool);

      if (toolError) {
        console.error(`Error inserting tool ${tool.name}:`, toolError);
      } else {
        console.log(`Inserted tool: ${tool.name}`);
      }
    }

    console.log(`Processed ${tools.length} tools in category ${categoryName}`);

  } catch (error) {
    if (error.response) {
      console.error(`Error scraping ${url}: ${error.response.status} - ${error.response.statusText}`);
    } else {
      console.error(`Error scraping ${url}:`, error.message);
    }
  }
}

async function scrapeAll() {
  try {
    console.log('Starting scraper...');
    
    const response = await axios.get(BASE_URL);
    const $ = cheerio.load(response.data);
    
    const categoryLinks = $('.category-link');
    console.log(`Found ${categoryLinks.length} categories`);
    
    for (let i = 0; i < categoryLinks.length; i++) {
      const link = categoryLinks[i];
      const categoryName = $(link).text().trim();
      let categoryUrl = $(link).attr('href');
      
      if (!categoryUrl.startsWith('http')) {
        categoryUrl = BASE_URL + categoryUrl;
      }
      
      console.log(`Scraping category ${i + 1}/${categoryLinks.length}: ${categoryName}`);
      await scrapeCategory(categoryUrl, categoryName);
      
      // Add longer delay between categories
      await delay(5000);
    }
    
    console.log('Scraping completed successfully!');
    
  } catch (error) {
    if (error.response) {
      console.error('Error scraping main page:', error.response.status, error.response.statusText);
    } else {
      console.error('Error scraping main page:', error.message);
    }
  }
}

// Run the scraper
scrapeAll().catch(console.error);