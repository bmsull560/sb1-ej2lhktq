import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Shield, Users, Lock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Category {
  id: string;
  name: string;
  subcategories: string[];
}

interface CategoryGroup {
  id: string;
  name: string;
  icon: any;
  color: string;
  categories: Category[];
}

const categoryGroups: CategoryGroup[] = [
  {
    id: 'personal',
    name: 'Personal Data Processors',
    icon: Users,
    color: 'green',
    categories: [
      {
        id: 'advertising',
        name: 'Advertising & Marketing',
        subcategories: ['Digital Advertising', 'AdTech Networks', 'Marketing Automation', 'Affiliate & Lead Generation', 'Influencer Marketing', 'Email Marketing', 'Customer Feedback & Surveys']
      },
      {
        id: 'retail',
        name: 'Retail & E-Commerce',
        subcategories: ['Online Marketplaces', 'Loyalty Programs', 'Direct-to-Consumer', 'Point-of-Sale Systems', 'Returns & Refunds Management']
      },
      {
        id: 'tech',
        name: 'Technology & SaaS',
        subcategories: ['CRM Platforms', 'Customer Data Platforms', 'Cloud Storage & Data Warehousing', 'AI Personalization', 'Consent Management', 'Analytics', 'Collaboration Tools', 'E-learning']
      },
      // Add other categories...
    ]
  },
  {
    id: 'sensitive',
    name: 'Sensitive Data Processors',
    icon: Lock,
    color: 'yellow',
    categories: [
      {
        id: 'financial',
        name: 'Financial & Credit Data',
        subcategories: ['Credit Scoring & Lending', 'Payday & Installment Loans', 'Identity Verification', 'Debt Collection', 'Fraud Detection', 'Financial Data Aggregators']
      },
      {
        id: 'geolocation',
        name: 'Geolocation & Mobility Tracking',
        subcategories: ['GPS Navigation', 'Mobile Location Tracking', 'Smart City Surveillance', 'Fleet Management', 'Location-Based Advertising']
      },
      // Add other categories...
    ]
  },
  {
    id: 'special',
    name: 'Special Category Data Processors',
    icon: AlertTriangle,
    color: 'red',
    categories: [
      {
        id: 'healthcare',
        name: 'Healthcare & Medical Data',
        subcategories: ['Electronic Health Records', 'DNA Testing', 'Prescription Fulfillment', 'Health Insurance', 'Clinical Trials', 'Medical Devices', 'Health Data Aggregators']
      },
      {
        id: 'political',
        name: 'Political & Religious Data',
        subcategories: ['Political Campaigns', 'Religious Organizations', 'Advocacy Groups', 'Voter Registration', 'Religious Event Management']
      },
      // Add other categories...
    ]
  }
];

interface Company {
  id: string;
  name: string;
  logo: string;
  category: string;
  description: string;
  group: string;
}

const companies: Company[] = [
  {
    id: 'google',
    name: 'Google',
    logo: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png',
    category: 'tech',
    group: 'personal',
    description: 'Cloud Service Provider'
  },
  // Add more companies...
];

export function PrivacyPolicyDirectory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         company.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGroup = !selectedGroup || company.group === selectedGroup;
    const matchesCategory = !selectedCategory || company.category === selectedCategory;
    return matchesSearch && matchesGroup && matchesCategory;
  });

  const handleGroupClick = (groupId: string) => {
    if (expandedGroup === groupId) {
      setExpandedGroup(null);
      setSelectedGroup(null);
    } else {
      setExpandedGroup(groupId);
      setSelectedGroup(groupId);
    }
    setSelectedCategory(null);
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Privacy Directory
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Find and explore privacy policies and data processing agreements from major technology companies.
            </p>
          </div>

          {/* Category Groups */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categoryGroups.map((group) => (
              <motion.div
                key={group.id}
                className={`bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800 cursor-pointer transition-all
                  ${selectedGroup === group.id ? `border-${group.color}-500` : 'hover:border-gray-700'}
                  ${expandedGroup === group.id ? 'md:col-span-3 md:row-span-2' : ''}`}
                onClick={() => handleGroupClick(group.id)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 bg-${group.color}-500/10 rounded-lg`}>
                    <group.icon className={`w-6 h-6 text-${group.color}-500`} />
                  </div>
                  <h3 className="text-lg font-semibold">{group.name}</h3>
                </div>

                {expandedGroup === group.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4"
                  >
                    {group.categories.map((category) => (
                      <div
                        key={category.id}
                        className={`p-4 rounded-lg cursor-pointer transition-all
                          ${selectedCategory === category.id 
                            ? `bg-${group.color}-500/20 border-${group.color}-500` 
                            : 'bg-gray-800/50 hover:bg-gray-800'}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCategoryClick(category.id);
                        }}
                      >
                        <h4 className="font-medium mb-2">{category.name}</h4>
                        <div className="flex flex-wrap gap-2">
                          {category.subcategories.map((sub, index) => (
                            <span
                              key={index}
                              className="text-xs px-2 py-1 bg-gray-700/50 rounded-full"
                            >
                              {sub}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-900/50 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent backdrop-blur-sm text-white placeholder-gray-500"
            />
          </div>

          {/* Companies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCompanies.map((company) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800 hover:border-green-500/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white rounded-lg p-2 flex-shrink-0">
                      <img
                        src={company.logo}
                        alt={`${company.name} logo`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{company.name}</h3>
                      <p className="text-gray-400">{company.description}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-green-500/50 text-green-500 hover:bg-green-500/10"
                    onClick={() => window.location.href = `/privacy-policy-directory/${company.id}`}
                  >
                    <span className="mr-2">View details</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}