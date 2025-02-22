import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, Globe, Lock, Mail, Key, Cloud, Smartphone, 
  ShieldAlert, Bitcoin, Share2, Sparkles, Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type Tool = {
  name: string;
  description: string;
  category: string;
  icon: any;
  url: string;
  features: string[];
};

const categories = [
  { id: 'all', label: 'All Tools', icon: Shield },
  { id: 'browsing', label: 'Browsing & Search', icon: Globe },
  { id: 'vpn', label: 'VPN', icon: Lock },
  { id: 'messaging', label: 'Messaging', icon: Mail },
  { id: 'email', label: 'Email Privacy', icon: Mail },
  { id: 'password', label: 'Password Managers', icon: Key },
  { id: 'storage', label: 'Cloud Storage', icon: Cloud },
  { id: 'os', label: 'Operating Systems', icon: Smartphone },
  { id: 'tracking', label: 'Anti-Tracking', icon: ShieldAlert },
  { id: 'crypto', label: 'Cryptocurrency', icon: Bitcoin },
  { id: 'decentralized', label: 'Decentralized', icon: Share2 },
  { id: 'experimental', label: 'Experimental', icon: Sparkles },
];

const tools: Tool[] = [
  {
    name: 'Brave Browser',
    description: 'Privacy-focused browser with built-in ad and tracker blocking',
    category: 'browsing',
    icon: Globe,
    url: 'https://brave.com',
    features: ['Ad blocking', 'Tracker blocking', 'Built-in Tor', 'Crypto wallet'],
  },
  {
    name: 'DuckDuckGo',
    description: 'Private search engine that doesn\'t track users',
    category: 'browsing',
    icon: Search,
    url: 'https://duckduckgo.com',
    features: ['No tracking', 'No search history', 'No personal data collection'],
  },
  // Add all other tools here following the same pattern
];

export function PrivacyTools() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = tools.filter(tool => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Privacy Tools Directory
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover the best tools and services to protect your digital privacy and security.
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search privacy tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(category => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              className={`flex items-center gap-2 ${
                selectedCategory === category.id
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'border-gray-700 hover:border-green-500'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <category.icon className="w-4 h-4" />
              {category.label}
            </Button>
          ))}
        </div>

        {/* Tools Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredTools.map((tool) => (
              <motion.div
                key={tool.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-900/50 rounded-xl p-6 backdrop-blur-sm border border-gray-800 hover:border-green-500/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <tool.icon className="w-6 h-6 text-green-500" />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-green-500/50 hover:bg-green-500/10"
                    onClick={() => window.open(tool.url, '_blank')}
                  >
                    Learn More
                  </Button>
                </div>
                <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
                <p className="text-gray-400 mb-4">{tool.description}</p>
                <div className="flex flex-wrap gap-2">
                  {tool.features.map((feature, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 bg-gray-800 rounded-full text-gray-300"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}