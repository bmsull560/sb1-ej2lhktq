import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Globe, 
  Shield,
  AlertTriangle,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const trends = [
  {
    category: 'Emerging Technologies',
    items: [
      {
        title: 'Zero-Knowledge Proofs',
        description: 'Rising adoption of privacy-preserving cryptographic techniques',
        impact: 'high',
        timeframe: '1-2 years',
        readiness: 85
      },
      {
        title: 'Homomorphic Encryption',
        description: 'Processing encrypted data without decryption',
        impact: 'high',
        timeframe: '2-3 years',
        readiness: 65
      },
      {
        title: 'Quantum-Safe Cryptography',
        description: 'Preparing for post-quantum computing threats',
        impact: 'high',
        timeframe: '3-5 years',
        readiness: 45
      }
    ]
  },
  {
    category: 'Regulatory Landscape',
    items: [
      {
        title: 'Global Privacy Regulations',
        description: 'Increasing adoption of GDPR-like regulations worldwide',
        impact: 'high',
        timeframe: 'Ongoing',
        readiness: 92
      },
      {
        title: 'AI Governance',
        description: 'New frameworks for AI privacy and ethics',
        impact: 'medium',
        timeframe: '1-2 years',
        readiness: 78
      },
      {
        title: 'Cross-Border Data Flows',
        description: 'Evolution of international data transfer mechanisms',
        impact: 'high',
        timeframe: '1-3 years',
        readiness: 82
      }
    ]
  },
  {
    category: 'Consumer Privacy',
    items: [
      {
        title: 'Privacy-First Services',
        description: 'Growing demand for privacy-respecting alternatives',
        impact: 'high',
        timeframe: 'Now',
        readiness: 95
      },
      {
        title: 'Data Minimization',
        description: 'Shift towards collecting only essential data',
        impact: 'medium',
        timeframe: '1-2 years',
        readiness: 88
      },
      {
        title: 'Privacy UX',
        description: 'User-friendly privacy controls and transparency',
        impact: 'medium',
        timeframe: 'Now',
        readiness: 90
      }
    ]
  },
  {
    category: 'Future Challenges',
    items: [
      {
        title: 'IoT Privacy',
        description: 'Privacy implications of ubiquitous connected devices',
        impact: 'high',
        timeframe: '2-4 years',
        readiness: 60
      },
      {
        title: 'Biometric Privacy',
        description: 'Protection of sensitive biometric data',
        impact: 'high',
        timeframe: '1-3 years',
        readiness: 75
      },
      {
        title: 'Digital Identity',
        description: 'Evolution of privacy-preserving identity systems',
        impact: 'high',
        timeframe: '2-3 years',
        readiness: 70
      }
    ]
  }
];

export function Trends() {
  const [selectedCategory, setSelectedCategory] = useState(trends[0].category);

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Privacy Trends & Future Insights
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore emerging trends, future challenges, and strategic opportunities in privacy and data protection.
          </p>
        </motion.div>

        {/* Category Selection */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {trends.map((trend) => (
            <Button
              key={trend.category}
              variant={selectedCategory === trend.category ? 'default' : 'outline'}
              className={`${
                selectedCategory === trend.category
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'border-gray-700 hover:border-green-500'
              }`}
              onClick={() => setSelectedCategory(trend.category)}
            >
              {trend.category}
            </Button>
          ))}
        </div>

        {/* Trend Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trends
            .find(t => t.category === selectedCategory)
            ?.items.map((trend, index) => (
              <motion.div
                key={trend.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/10 rounded-lg">
                      <Sparkles className="w-5 h-5 text-green-500" />
                    </div>
                    <h3 className="text-lg font-semibold">{trend.title}</h3>
                  </div>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    trend.impact === 'high' 
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {trend.impact} impact
                  </span>
                </div>

                <p className="text-gray-400 mb-4">{trend.description}</p>

                <div className="space-y-4">
                  {/* Timeline */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Timeline</span>
                    <span className="font-medium">{trend.timeframe}</span>
                  </div>

                  {/* Readiness Score */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Market Readiness</span>
                      <span className="font-medium">{trend.readiness}%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-blue-500"
                        style={{ width: `${trend.readiness}%` }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>

        {/* Strategic Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 bg-gray-900/50 p-8 rounded-xl backdrop-blur-sm border border-gray-800"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-green-500" />
            Strategic Recommendations
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-800/50 rounded-lg">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                Prepare for Change
              </h3>
              <p className="text-sm text-gray-400">
                Stay ahead of emerging privacy challenges by investing in adaptable privacy frameworks and technologies.
              </p>
            </div>
            
            <div className="p-4 bg-gray-800/50 rounded-lg">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Globe className="w-4 h-4 text-green-500" />
                Global Perspective
              </h3>
              <p className="text-sm text-gray-400">
                Consider international privacy regulations and cultural differences when developing privacy strategies.
              </p>
            </div>
            
            <div className="p-4 bg-gray-800/50 rounded-lg">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-green-500" />
                Risk Management
              </h3>
              <p className="text-sm text-gray-400">
                Develop proactive risk assessment processes for emerging privacy threats and technologies.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}