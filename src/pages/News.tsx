import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

type NewsItem = {
  id: string;
  title: string;
  description: string;
  link: string;
  source: string;
  category: string;
  date: string;
};

const ITEMS_PER_PAGE = 10;

// Static news data
const newsItems: NewsItem[] = [
  {
    id: '1',
    title: 'Major Data Breach Affects Fortune 500 Company',
    description: 'A significant data breach has exposed sensitive customer information...',
    link: 'https://example.com/news/1',
    source: 'Privacy News Daily',
    category: 'Data Breaches',
    date: '2024-02-01'
  },
  {
    id: '2',
    title: 'New Privacy Regulations Proposed in EU',
    description: 'European Union lawmakers are considering new privacy regulations...',
    link: 'https://example.com/news/2',
    source: 'Tech Privacy Report',
    category: 'Regulations',
    date: '2024-02-01'
  },
  // Add more static news items as needed
];

export function News() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: 'data_breaches', label: 'Data Breaches' },
    { id: 'hipaa', label: 'HIPAA Violations' },
    { id: 'lawsuits', label: 'Lawsuits & Settlements' },
    { id: 'investigations', label: 'Investigations' },
  ];

  // Filter news items based on search and category
  const filteredNews = newsItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || item.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
  const paginatedNews = filteredNews.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Privacy News & Alerts
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Stay informed about data breaches, privacy violations, and legal developments.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                className={`flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'border-gray-700 hover:border-green-500'
                }`}
                onClick={() => setSelectedCategory(
                  selectedCategory === category.id ? null : category.id
                )}
              >
                <Filter className="w-4 h-4" />
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* News Items */}
        {paginatedNews.length > 0 ? (
          <>
            <div className="space-y-6">
              {paginatedNews.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800"
                >
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span>{new Date(item.date).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{item.source}</span>
                        <span className="px-2 py-1 text-xs rounded-full bg-green-500/10 text-green-400">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-green-500/50 hover:bg-green-500/10 shrink-0"
                      onClick={() => window.open(item.link, '_blank')}
                    >
                      Read More
                    </Button>
                  </div>
                  <p className="text-gray-400">{item.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-center items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              <span className="text-gray-400">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <p className="text-gray-400">No news articles found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}