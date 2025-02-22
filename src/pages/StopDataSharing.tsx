import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Share2, 
  CheckCircle2, 
  ArrowRight,
  Globe,
  Mail,
  Lock,
  Smartphone,
  Settings,
  AlertTriangle,
  ExternalLink,
  Search,
  Building2,
  Database
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const platforms = [
  {
    name: 'Google',
    icon: Globe,
    steps: [
      {
        title: 'Turn Off Ad Personalization',
        link: 'https://adssettings.google.com/',
        instructions: [
          'Go to Google Ad Settings',
          'Toggle off "Ad Personalization"'
        ]
      },
      {
        title: 'Delete Search & Location History',
        link: 'https://myactivity.google.com/',
        instructions: [
          'My Activity → Delete Web & App Activity',
          'Google Maps → Clear Location History'
        ]
      },
      {
        title: 'Disable Google Data Collection',
        link: 'https://takeout.google.com/',
        instructions: [
          'Google Takeout → Export or delete stored data'
        ]
      },
      {
        title: 'Use Privacy-Focused Alternatives',
        instructions: [
          'Search → DuckDuckGo or Startpage',
          'Docs/Drive → CryptPad, ProtonDrive, or Skiff',
          'Gmail → ProtonMail, Tuta, or Skiff Mail'
        ]
      }
    ]
  },
  {
    name: 'Facebook & Instagram',
    icon: Share2,
    steps: [
      {
        title: 'Limit Data Collection',
        link: 'https://www.facebook.com/settings?tab=privacy',
        instructions: [
          'Settings → Privacy → Limit who sees your posts, profile, and location',
          'Settings → Off-Facebook Activity → Clear what they collect from other websites'
        ]
      },
      {
        title: 'Turn Off Face Recognition',
        link: 'https://www.facebook.com/settings?tab=facerec',
        instructions: [
          'Settings → Face Recognition → Turn off'
        ]
      },
      {
        title: 'Delete Old Posts & Data',
        instructions: [
          'Use Jumbo Privacy app or Facebook\'s bulk delete tool',
          'Review and delete old posts, photos, and likes'
        ]
      },
      {
        title: 'Use a Burner Account',
        instructions: [
          'Avoid linking real phone numbers and emails',
          'Use privacy-focused email aliases'
        ]
      }
    ]
  },
  {
    name: 'Apple',
    icon: Smartphone,
    steps: [
      {
        title: 'Limit Data Sharing',
        link: 'https://support.apple.com/en-us/HT202074',
        instructions: [
          'Settings → Privacy → Turn off app tracking',
          'Use "Sign in with Apple" (generates random email aliases)'
        ]
      },
      {
        title: 'Use iCloud Private Relay',
        instructions: [
          'Settings → iCloud → Private Relay',
          'Encrypts browsing data, hides your IP'
        ]
      },
      {
        title: 'Review App Privacy Reports',
        instructions: [
          'Settings → Privacy → App Privacy Report',
          'Monitor which apps access your data'
        ]
      }
    ]
  },
  {
    name: 'Microsoft',
    icon: Settings,
    steps: [
      {
        title: 'Turn Off Data Collection',
        link: 'https://account.microsoft.com/privacy',
        instructions: [
          'Settings → Privacy & Security → Diagnostics & Feedback → Choose Basic',
          'Disable "Send activity history to Microsoft"'
        ]
      },
      {
        title: 'Use Local Accounts',
        instructions: [
          'Control Panel → User Accounts',
          'Sign in with a local account instead'
        ]
      },
      {
        title: 'Disable Telemetry',
        instructions: [
          'Use Windows Privacy Dashboard',
          'Disable unnecessary data collection'
        ]
      }
    ]
  }
];

const databrokers = [
  {
    name: 'Acxiom',
    link: 'https://isapps.acxiom.com/optout/optout.aspx',
    description: 'One of the largest data brokers, collecting and selling personal information.',
    type: 'Marketing Data'
  },
  {
    name: 'Epsilon',
    link: 'https://www.epsilon.com/us/consumer-information',
    description: 'Marketing services company that collects consumer data for targeted advertising.',
    type: 'Marketing & Analytics'
  },
  {
    name: 'Oracle Data Cloud',
    link: 'https://www.oracle.com/legal/privacy/marketing-cloud-data-cloud-privacy-policy.html',
    description: 'Massive database of consumer information used for marketing and analysis.',
    type: 'Data Aggregator'
  },
  {
    name: 'Experian Marketing',
    link: 'https://www.experian.com/privacy/opting_out',
    description: 'Credit bureau that also sells marketing data and analytics.',
    type: 'Credit & Marketing'
  },
  {
    name: 'CoreLogic',
    link: 'https://www.corelogic.com/privacy/',
    description: 'Property and consumer data aggregator.',
    type: 'Property Data'
  }
];

export default function StopDataSharing() {
  const [selectedPlatform, setSelectedPlatform] = useState(platforms[0].name);
  const [searchQuery, setSearchQuery] = useState('');

  const sections = [
    {
      id: 'big-tech',
      title: 'Big Tech Settings',
      icon: Building2,
      description: 'Control what major platforms collect'
    },
    {
      id: 'data-brokers',
      title: 'Data Broker Opt-Out',
      icon: Database,
      description: 'Remove data from broker databases'
    },
    {
      id: 'complete-database',
      title: 'Complete Database',
      icon: Globe,
      description: '100+ company opt-out guide'
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const filteredDataBrokers = databrokers.filter(broker =>
    broker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    broker.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    broker.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="mx-auto mb-6 w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
            <Shield className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Stop Data Sharing
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto mb-12">
            Take control of your personal information by limiting data collection and opting out of data sharing.
          </p>

          {/* Section Shortcuts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="group bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800 hover:border-green-500/50 transition-all hover:bg-gray-900/75 text-left"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition-colors">
                    <section.icon className="w-6 h-6 text-green-500" />
                  </div>
                  <h3 className="text-lg font-semibold">{section.title}</h3>
                </div>
                <p className="text-sm text-gray-400">{section.description}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Section 1: Big Tech */}
        <div id="big-tech" className="mb-20 scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center p-3 bg-green-500/10 rounded-lg mb-4">
              <Building2 className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Big Tech Privacy Settings</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Step-by-step guides to reduce what major tech platforms collect about you.
            </p>
          </motion.div>

          {/* Platform Selection */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {platforms.map((platform) => (
              <Button
                key={platform.name}
                variant={selectedPlatform === platform.name ? 'default' : 'outline'}
                className={`${
                  selectedPlatform === platform.name
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'border-gray-700 hover:border-green-500'
                }`}
                onClick={() => setSelectedPlatform(platform.name)}
              >
                <platform.icon className="w-4 h-4 mr-2" />
                {platform.name}
              </Button>
            ))}
          </div>

          {/* Platform Steps */}
          <div className="max-w-4xl mx-auto">
            {platforms
              .find(p => p.name === selectedPlatform)
              ?.steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800 mb-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    {step.link && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-green-500/50 text-green-500 hover:bg-green-500/10"
                        onClick={() => window.open(step.link, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Open Settings
                      </Button>
                    )}
                  </div>
                  <div className="space-y-2">
                    {step.instructions.map((instruction, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{instruction}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
          </div>
        </div>

        {/* Section 2: Data Brokers */}
        <div id="data-brokers" className="mb-20 scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center p-3 bg-green-500/10 rounded-lg mb-4">
              <Database className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Data Broker Opt-Out</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Remove your personal information from major data broker databases.
            </p>
          </motion.div>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search data brokers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Data Broker List */}
          <div className="max-w-4xl mx-auto grid gap-6">
            {filteredDataBrokers.map((broker) => (
              <motion.div
                key={broker.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{broker.name}</h3>
                    <span className="inline-block px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded-full">
                      {broker.type}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-green-500/50 text-green-500 hover:bg-green-500/10"
                    onClick={() => window.open(broker.link, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Opt Out
                  </Button>
                </div>
                <p className="text-gray-400">{broker.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 3: Complete Database */}
        <div id="complete-database" className="scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center p-3 bg-green-500/10 rounded-lg mb-4">
              <Globe className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Complete Opt-Out Database</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Access our comprehensive database of 100+ companies and their opt-out procedures.
            </p>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto bg-gray-900/50 p-8 rounded-xl backdrop-blur-sm border border-gray-800 text-center"
          >
            <h3 className="text-2xl font-bold mb-4">Need More Control?</h3>
            <p className="text-gray-400 mb-6">
              Get access to our complete database of opt-out procedures, automated removal tools, and expert guidance.
            </p>
            <Button className="bg-green-500 hover:bg-green-600">
              <Lock className="w-4 h-4 mr-2" />
              Unlock Full Database
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}