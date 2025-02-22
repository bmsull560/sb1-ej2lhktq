import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Lock, 
  Database, 
  Globe, 
  Users,
  ArrowRight,
  CheckCircle2,
  Fingerprint,
  Sparkles,
  Bot
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    title: 'Privacy-First Design',
    description: 'Built from the ground up with privacy as the core principle, not an afterthought.',
    icon: Shield,
    gradient: 'from-green-400 to-emerald-600'
  },
  {
    title: 'AI-Powered Protection',
    description: 'Advanced AI algorithms detect and prevent privacy threats in real-time.',
    icon: Bot,
    gradient: 'from-blue-400 to-indigo-600'
  },
  {
    title: 'Data Control Center',
    description: 'Centralized dashboard to monitor and control your digital footprint.',
    icon: Database,
    gradient: 'from-purple-400 to-pink-600'
  },
  {
    title: 'Global Privacy Laws',
    description: 'Stay compliant with GDPR, CCPA, and other privacy regulations worldwide.',
    icon: Globe,
    gradient: 'from-orange-400 to-red-600'
  }
];

const benefits = [
  {
    title: 'Take Control of Your Data',
    description: "Understand who has your data and how it's being used.",
    icon: Lock
  },
  {
    title: 'Protect Your Identity',
    description: 'Prevent identity theft and unauthorized data collection.',
    icon: Fingerprint
  },
  {
    title: 'Stay Informed',
    description: 'Real-time alerts about privacy threats and data breaches.',
    icon: Shield
  }
];

export function Home() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 z-0" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f10_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f10_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>

        <div className="container mx-auto px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="mx-auto mb-8 w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center"
            >
              <Fingerprint className="w-10 h-10 text-green-500" />
            </motion.div>

            <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Cryptameleon
            </h1>
            
            <h2 className="text-4xl font-bold mb-6">
              Your Digital Privacy Guardian
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Take control of your digital privacy with our comprehensive suite of tools. 
              Monitor, protect, and manage your online presence across the digital landscape.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/dashboard">
                <Button size="lg" className="bg-green-500 hover:bg-green-600">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/digital-health">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-green-500 text-green-500 hover:bg-green-500/10"
                >
                  Try Privacy Checkup
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-black py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Sparkles className="w-10 h-10 text-green-500 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">
              Comprehensive Privacy Protection
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to protect your digital privacy in one place.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900/50 p-8 rounded-xl backdrop-blur-sm border border-gray-800 hover:border-green-500/50 transition-all"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} p-2.5 mb-6`}>
                  <feature.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-black py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center">
                  <benefit.icon className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-black py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-green-500/20 to-blue-500/20 p-12 rounded-2xl border border-gray-800 text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Take Control?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Start protecting your digital privacy today with our comprehensive suite of tools.
            </p>
            <Link to="/dashboard">
              <Button size="lg" className="bg-green-500 hover:bg-green-600">
                Get Started Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}