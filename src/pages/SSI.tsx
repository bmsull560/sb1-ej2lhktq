import { motion } from 'framer-motion';
import { Shield, Key, Lock, UserCheck, Database, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SSI() {
  const features = [
    {
      title: 'User-Controlled Identity',
      icon: UserCheck,
      description: 'Take full control of your digital identity. Share only what you want, when you want, with whom you want.',
      points: [
        'Selective disclosure of personal information',
        'Cryptographic proof of identity claims',
        'No central authority required'
      ]
    },
    {
      title: 'Decentralized Architecture',
      icon: Database,
      description: 'Your identity data is stored securely across a distributed network, not in vulnerable central databases.',
      points: [
        'No single point of failure',
        'Reduced risk of data breaches',
        'Improved system resilience'
      ]
    },
    {
      title: 'Verifiable Credentials',
      icon: Shield,
      description: 'Digital versions of your physical credentials that can be instantly verified while maintaining privacy.',
      points: [
        'Government-issued IDs',
        'Educational certificates',
        'Professional licenses'
      ]
    },
    {
      title: 'Privacy by Design',
      icon: Lock,
      description: 'Built from the ground up with privacy as a fundamental principle, not an afterthought.',
      points: [
        'Zero-knowledge proofs',
        'Minimal data disclosure',
        'User consent required'
      ]
    },
    {
      title: 'Interoperability',
      icon: Share2,
      description: 'Your digital identity works seamlessly across different platforms and services.',
      points: [
        'Cross-platform compatibility',
        'International standards',
        'Easy integration'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="mx-auto mb-6 w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
            <Key className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Self-Sovereign Identity
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Take control of your digital identity with blockchain-based self-sovereign identity solutions. Share and verify credentials while maintaining your privacy.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <feature.icon className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
              </div>
              <p className="text-gray-400 mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.points.map((point, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <div className="w-1 h-1 bg-green-500 rounded-full" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900/50 p-8 rounded-xl backdrop-blur-sm border border-gray-800 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Ready to Take Control?</h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Start your journey towards a more secure and private digital identity. Our self-sovereign identity solutions put you in control of your personal information.
          </p>
          <Button className="bg-green-500 hover:bg-green-600">
            Get Started
          </Button>
        </motion.div>
      </div>
    </div>
  );
}