import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, Mail, MessageSquare, Mailbox, Search, 
  AlertTriangle, CheckCircle2, Shield, ExternalLink,
  Settings, Smartphone, Bell, FileText, Ban,
  Star, Users, CreditCard, Download, ArrowUpRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DoNotCallRegistration } from '@/components/spam-prevention/DoNotCallRegistration';

const categories = [
  {
    id: 'registries',
    icon: Shield,
    title: 'National & Regional Registries',
    sections: [
      {
        title: 'Do Not Call Registry',
        component: DoNotCallRegistration
      },
      {
        title: 'Important Information',
        content: `
          The National Do Not Call Registry helps reduce telemarketing calls. However, be aware that:
          • Scammers and robocallers often ignore these registries
          • Registration is completely free
          • Your registration never expires
          • Both cell phones and landlines can be registered
        `
      }
    ]
  },
  {
    id: 'carrier',
    icon: Settings,
    title: 'Carrier Solutions',
    sections: [
      {
        title: 'Call Blocking Services',
        items: [
          { 
            name: 'T-Mobile Scam Shield', 
            link: 'https://www.t-mobile.com/resources/scam-shield',
            description: 'Free scam blocking, caller ID, and spam risk assessment'
          },
          { 
            name: 'AT&T Call Protect', 
            link: 'https://www.att.com/features/security-apps/',
            description: 'Automatic fraud blocking and spam risk detection'
          },
          { 
            name: 'Verizon Call Filter', 
            link: 'https://www.verizon.com/solutions-and-services/call-filter/',
            description: 'Spam detection and blocking with caller ID'
          }
        ]
      },
      {
        title: 'Additional Carrier Features',
        content: `
          Many carriers provide advanced features to protect you from spam calls:
          • Automatic spam call detection
          • Real-time caller identification
          • Network-level call blocking
          • Spam risk assessment
          • Community-based spam reporting
        `
      }
    ]
  },
  {
    id: 'platform',
    icon: Smartphone,
    title: 'Platform Settings',
    sections: [
      {
        title: 'iPhone Settings',
        items: [
          { 
            name: 'Silence Unknown Callers', 
            link: 'https://support.apple.com/guide/iphone/avoid-unwanted-calls-iphe4b3f7823/ios',
            description: 'Built-in iOS feature to automatically silence calls from unknown numbers'
          },
          { 
            name: 'Block Individual Numbers', 
            link: 'https://support.apple.com/guide/iphone/block-filter-and-report-messages-iph203ab0be4/ios',
            description: 'How to block specific phone numbers and contacts'
          }
        ]
      },
      {
        title: 'Android Settings',
        items: [
          { 
            name: 'Google Phone App', 
            link: 'https://support.google.com/phoneapp/answer/3459196',
            description: 'Built-in spam protection and call screening'
          },
          { 
            name: 'Block Numbers', 
            link: 'https://support.google.com/phoneapp/answer/6325463',
            description: 'Block calls and texts from specific numbers'
          }
        ]
      },
      {
        title: 'Desktop/Landline',
        items: [
          { 
            name: 'Windows Phone App', 
            link: 'https://support.microsoft.com/en-us/windows/block-calls-on-your-windows-phone-65768e06-0326-0b1d-ad05-c425d48c70b1',
            description: 'Call blocking features for Windows devices'
          },
          { 
            name: 'macOS Phone Features', 
            link: 'https://support.apple.com/guide/mac-help/block-phone-calls-mchl8e681c23/mac',
            description: 'Call blocking and filtering on macOS'
          }
        ]
      }
    ]
  },
  {
    id: 'apps',
    icon: Shield,
    title: 'Third-Party Apps',
    sections: [
      {
        title: 'Recommended Apps',
        items: [
          { 
            name: 'Truecaller',
            logo: 'https://play-lh.googleusercontent.com/I-Yd5tJnxw7Ks8FUhUiFr8I4kohd9phv5sRFHG_-nSX9AAD6Rcy570NBZVFJBKpepmc=w240-h480-rw',
            link: 'https://www.truecaller.com/',
            description: 'The world\'s leading caller ID and spam blocking app with a global database of over 300 million spam numbers.',
            features: [
              'Global spam database',
              'Caller ID',
              'SMS spam blocking',
              'Business directory'
            ],
            pricing: {
              free: true,
              premium: {
                price: '$2.99/month',
                features: ['No ads', 'Advanced spam blocking', 'Who viewed my profile']
              }
            },
            stats: {
              users: '300M+',
              rating: 4.5,
              reviews: '12M+',
              blockedCalls: '38B+'
            },
            platforms: ['iOS', 'Android'],
            lastUpdated: '2024-02'
          },
          { 
            name: 'Hiya',
            logo: 'https://play-lh.googleusercontent.com/WWGQ4w4-6t1A6EX6MlevHnuHbQlXXJ7bXtNoHhXD0Nv_XZqVsrqrmz8JlUvxSPT5iXU=w240-h480-rw',
            link: 'https://www.hiya.com/',
            description: 'Enterprise-grade spam detection with advanced business caller ID and fraud protection features.',
            features: [
              'Real-time spam detection',
              'Business caller ID',
              'Fraud analytics',
              'Enterprise integration'
            ],
            pricing: {
              free: true,
              premium: {
                price: '$3.99/month',
                features: ['Premium caller ID', 'Enhanced spam blocking', 'Business profile']
              }
            },
            stats: {
              users: '200M+',
              rating: 4.4,
              reviews: '8M+',
              blockedCalls: '25B+'
            },
            platforms: ['iOS', 'Android', 'Enterprise'],
            lastUpdated: '2024-01'
          },
          { 
            name: 'RoboKiller',
            logo: 'https://play-lh.googleusercontent.com/1RsYqWYoWV6sGdp4C8U9YBpzcgcQa4kV2RT9nHtwNZI2fr0A4pPGnQkqCIhVrFAkJg=w240-h480-rw',
            link: 'https://www.robokiller.com/',
            description: 'Advanced spam call blocking with AI-powered answer bots that waste scammers\' time.',
            features: [
              'AI answer bots',
              'Predictive call blocking',
              'SMS spam protection',
              'Custom block list'
            ],
            pricing: {
              free: false,
              premium: {
                price: '$4.99/month',
                features: ['Answer bots', 'Predictive blocking', 'SMS spam protection']
              }
            },
            stats: {
              users: '12M+',
              rating: 4.6,
              reviews: '2M+',
              blockedCalls: '15B+'
            },
            platforms: ['iOS', 'Android'],
            lastUpdated: '2024-02'
          },
          { 
            name: 'Nomorobo',
            logo: 'https://play-lh.googleusercontent.com/WWGQ4w4-6t1A6EX6MlevHnuHbQlXXJ7bXtNoHhXD0Nv_XZqVsrqrmz8JlUvxSPT5iXU=w240-h480-rw',
            link: 'https://www.nomorobo.com/',
            description: 'FTC award-winning robocall blocking service that works on both mobile phones and landlines.',
            features: [
              'Landline protection',
              'Mobile protection',
              'Real-time updates',
              'FTC award winner'
            ],
            pricing: {
              free: true,
              premium: {
                price: '$1.99/month',
                features: ['Mobile protection', 'Text spam blocking', 'Enhanced caller ID']
              }
            },
            stats: {
              users: '5M+',
              rating: 4.3,
              reviews: '500K+',
              blockedCalls: '10B+'
            },
            platforms: ['iOS', 'Android', 'Landline'],
            lastUpdated: '2024-01'
          }
        ]
      },
      {
        title: 'Key Features to Look For',
        content: `
          When choosing a spam blocking app, consider these features:
          • Community-reported spam database
          • Automatic call screening
          • SMS spam protection
          • Customizable block lists
          • Regular database updates
        `
      }
    ]
  },
  {
    id: 'reporting',
    icon: Bell,
    title: 'Reporting & Vigilance',
    sections: [
      {
        title: 'Report Spam Calls',
        items: [
          { 
            name: 'FTC Complaint Assistant', 
            link: 'https://reportfraud.ftc.gov/',
            description: 'File complaints about unwanted calls and scams'
          },
          { 
            name: 'FCC Complaint Center', 
            link: 'https://consumercomplaints.fcc.gov/',
            description: 'Report violations of telemarketing and robocall rules'
          },
          { 
            name: 'Do Not Call Registry Violation', 
            link: 'https://www.donotcall.gov/report.html',
            description: 'Report calls received after registering'
          }
        ]
      },
      {
        title: 'Stay Informed',
        content: `
          Protect yourself by staying informed:
          • Keep up with latest scam tactics
          • Never share personal information
          • Verify caller identity independently
          • Update your spam protection regularly
          • Share warnings with family and friends
        `
      }
    ]
  }
];

export function SpamPrevention() {
  const [selectedCategory, setSelectedCategory] = useState('registries');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Comprehensive Spam Call Protection
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A multi-layered approach to protect yourself from unwanted calls, texts, and communication.
          </p>
        </motion.div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              className={`${
                selectedCategory === category.id 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'border-gray-700 hover:border-green-500'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <category.icon className="w-4 h-4 mr-2" />
              {category.title}
            </Button>
          ))}
        </div>

        {/* Content Area */}
        <div className="space-y-8">
          {categories
            .find(c => c.id === selectedCategory)
            ?.sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800"
              >
                <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
                
                {section.component ? (
                  <section.component />
                ) : section.content ? (
                  <div className="prose prose-invert max-w-none">
                    <div className="text-gray-400 whitespace-pre-line">
                      {section.content}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    {section.items?.map((item, i) => (
                      'features' in item ? (
                        // Enhanced App Card
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="bg-gray-800/50 rounded-xl overflow-hidden"
                        >
                          {/* App Header */}
                          <div className="p-6 border-b border-gray-700">
                            <div className="flex items-start gap-4">
                              <img 
                                src={item.logo} 
                                alt={`${item.name} logo`}
                                className="w-16 h-16 rounded-xl"
                              />
                              <div className="flex-1">
                                <div className="flex items-start justify-between">
                                  <h3 className="text-xl font-semibold">{item.name}</h3>
                                  <div className="flex items-center gap-1 text-yellow-400">
                                    <Star className="w-4 h-4 fill-current" />
                                    <span>{item.stats.rating}</span>
                                  </div>
                                </div>
                                <p className="text-sm text-gray-400 mt-1">{item.description}</p>
                              </div>
                            </div>
                          </div>

                          {/* Stats Grid */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border-b border-gray-700">
                            <div className="text-center">
                              <Users className="w-5 h-5 text-green-500 mx-auto mb-2" />
                              <div className="text-lg font-semibold">{item.stats.users}</div>
                              <div className="text-xs text-gray-400">Active Users</div>
                            </div>
                            <div className="text-center">
                              <FileText className="w-5 h-5 text-green-500 mx-auto mb-2" />
                              <div className="text-lg font-semibold">{item.stats.reviews}</div>
                              <div className="text-xs text-gray-400">Reviews</div>
                            </div>
                            <div className="text-center">
                              <Ban className="w-5 h-5 text-green-500 mx-auto mb-2" />
                              <div className="text-lg font-semibold">{item.stats.blockedCalls}</div>
                              <div className="text-xs text-gray-400">Calls Blocked</div>
                            </div>
                            <div className="text-center">
                              <Download className="w-5 h-5 text-green-500 mx-auto mb-2" />
                              <div className="text-lg font-semibold">{item.lastUpdated}</div>
                              <div className="text-xs text-gray-400">Last Updated</div>
                            </div>
                          </div>

                          {/* Features & Pricing */}
                          <div className="p-6">
                            <div className="mb-6">
                              <h4 className="font-medium mb-3">Key Features</h4>
                              <div className="grid grid-cols-2 gap-2">
                                {item.features.map((feature, index) => (
                                  <div 
                                    key={index}
                                    className="flex items-center gap-2 text-sm text-gray-400"
                                  >
                                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                                    <span>{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="mb-6">
                              <h4 className="font-medium mb-3">Pricing</h4>
                              <div className="flex items-center gap-4">
                                {item.pricing.free && (
                                  <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                                    Free Version
                                  </div>
                                )}
                                {item.pricing.premium && (
                                  <div className="flex items-center gap-2">
                                    <CreditCard className="w-4 h-4 text-blue-400" />
                                    <span className="text-blue-400">{item.pricing.premium.price}</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex gap-2">
                                {item.platforms.map((platform, index) => (
                                  <span 
                                    key={index}
                                    className="px-2 py-1 bg-gray-700 rounded text-xs"
                                  >
                                    {platform}
                                  </span>
                                ))}
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-green-500/50 text-green-500 hover:bg-green-500/10"
                                onClick={() => window.open(item.link, '_blank')}
                              >
                                <span className="mr-2">Visit Website</span>
                                <ArrowUpRight className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        // Regular Link Card
                        <a
                          key={i}
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="flex items-center gap-2">
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                              {item.name}
                            </span>
                            <ExternalLink className="w-4 h-4 text-gray-400" />
                          </div>
                          {item.description && (
                            <p className="text-sm text-gray-400 ml-7">
                              {item.description}
                            </p>
                          )}
                        </a>
                      )
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 bg-gray-900/50 p-8 rounded-xl backdrop-blur-sm border border-gray-800 text-center"
        >
          <div className="flex justify-center mb-4">
            <Shield className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Need More Protection?</h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Our privacy cleanup service can help remove your personal information from data broker databases, reducing unwanted communication at its source.
          </p>
          <Button className="bg-green-500 hover:bg-green-600">
            Try Privacy Cleanup
          </Button>
        </motion.div>
      </div>
    </div>
  );
}