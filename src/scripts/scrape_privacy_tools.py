import requests
from bs4 import BeautifulSoup
import json
import os
from typing import Dict, List, Optional
import re

class PrivacyToolsScraper:
    def __init__(self):
        self.base_url = 'https://awesome-privacy.xyz'
        self.categories: Dict[str, dict] = {}
        self.tools: List[dict] = []

    def clean_text(self, text: str) -> str:
        """Clean and normalize text content."""
        return ' '.join(text.strip().split())

    def extract_github_url(self, url: str) -> Optional[str]:
        """Extract GitHub URL if present."""
        github_pattern = r'https://github.com/[a-zA-Z0-9-]+/[a-zA-Z0-9-_.]+'
        match = re.search(github_pattern, url)
        return match.group(0) if match else None

    def extract_license(self, text: str) -> Optional[str]:
        """Extract license information if present."""
        license_pattern = r'\b(?:MIT|GPL|Apache|BSD|AGPL|MPL|LGPL)(?:-\d+(?:\.\d+)?)?(?:\sLicense)?\b'
        match = re.search(license_pattern, text, re.IGNORECASE)
        return match.group(0) if match else None

    def detect_platforms(self, text: str) -> List[str]:
        """Detect mentioned platforms."""
        platforms = []
        platform_keywords = {
            'Windows': ['windows', 'win'],
            'macOS': ['macos', 'mac', 'osx'],
            'Linux': ['linux', 'ubuntu', 'debian'],
            'iOS': ['ios', 'iphone', 'ipad'],
            'Android': ['android'],
            'Web': ['web', 'browser', 'online'],
            'CLI': ['cli', 'command-line', 'terminal']
        }
        
        text_lower = text.lower()
        for platform, keywords in platform_keywords.items():
            if any(keyword in text_lower for keyword in keywords):
                platforms.append(platform)
        
        return platforms

    def extract_tags(self, text: str) -> List[str]:
        """Extract relevant tags from text."""
        tags = []
        tag_patterns = [
            r'#\w+',  # Hashtags
            r'\b(?:open-source|free|paid|premium|encrypted|decentralized|p2p|self-hosted)\b',
            r'\b(?:privacy|security|anonymity|encryption)\b'
        ]
        
        for pattern in tag_patterns:
            matches = re.finditer(pattern, text, re.IGNORECASE)
            tags.extend(match.group(0).lower().replace('#', '') for match in matches)
        
        return list(set(tags))

    def scrape_category(self, url: str, category_name: str) -> None:
        """Scrape tools from a category page."""
        try:
            response = requests.get(url)
            response.raise_for_status()
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Extract category description
            description = soup.find('meta', {'name': 'description'})
            category_desc = description['content'] if description else ''
            
            # Store category
            category_slug = url.split('/')[-1]
            self.categories[category_slug] = {
                'name': category_name,
                'description': self.clean_text(category_desc),
                'slug': category_slug
            }
            
            # Find tool entries
            tool_entries = soup.find_all('div', class_='tool-entry')  # Adjust selector as needed
            
            for entry in tool_entries:
                name = entry.find('h3').text.strip()
                description = entry.find('p').text.strip()
                link = entry.find('a')['href']
                
                # Extract additional information
                github_url = self.extract_github_url(link)
                license_info = self.extract_license(description)
                platforms = self.detect_platforms(description)
                tags = self.extract_tags(description)
                
                tool = {
                    'name': name,
                    'description': self.clean_text(description),
                    'url': link,
                    'github_url': github_url,
                    'license': license_info,
                    'is_open_source': bool(github_url),
                    'is_free': 'free' in tags,
                    'has_paid_plan': any(tag in tags for tag in ['paid', 'premium']),
                    'platforms': platforms,
                    'tags': tags,
                    'category_slug': category_slug
                }
                
                self.tools.append(tool)
                
        except Exception as e:
            print(f"Error scraping {url}: {str(e)}")

    def scrape_all(self) -> None:
        """Scrape all categories and tools."""
        try:
            # Get main page
            response = requests.get(self.base_url)
            response.raise_for_status()
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Find category links
            category_links = soup.find_all('a', class_='category-link')  # Adjust selector as needed
            
            for link in category_links:
                category_name = link.text.strip()
                category_url = link['href']
                if not category_url.startswith('http'):
                    category_url = self.base_url + category_url
                
                print(f"Scraping category: {category_name}")
                self.scrape_category(category_url, category_name)
            
        except Exception as e:
            print(f"Error scraping main page: {str(e)}")

    def save_to_json(self) -> None:
        """Save scraped data to JSON files."""
        data = {
            'categories': self.categories,
            'tools': self.tools
        }
        
        with open('privacy_tools_data.json', 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        print(f"Saved {len(self.categories)} categories and {len(self.tools)} tools to privacy_tools_data.json")

def main():
    scraper = PrivacyToolsScraper()
    scraper.scrape_all()
    scraper.save_to_json()

if __name__ == "__main__":
    main()