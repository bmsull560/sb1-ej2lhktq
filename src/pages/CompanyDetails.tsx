import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { 
  Shield, 
  Globe, 
  Server, 
  Users, 
  Lock, 
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileText,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data - replace with real data from your backend
const companyData = {
  google: {
    name: 'Google',
    logo: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png',
    description: 'Technology company specializing in internet-related services and products.',
    website: 'https://google.com',
    privacyPolicy: 'https://policies.google.com/privacy',
    lastUpdated: '2024-01-15',
    dataCategories: [
      {
        name: 'Personal Information',
        items: ['Name', 'Email', 'Phone Number', 'Address'],
        risk: 'medium'
      },
      {
        name: 'Device Information',
        items: ['IP Address', 'Browser Type', 'Operating System', 'Device IDs'],
        risk: 'low'
      },
      {
        name: 'Usage Data',
        items: ['Search History', 'Location Data', 'Voice Commands', 'Ad Interactions'],
        risk: 'high'
      }
    ],
    dataPractices: [
      {
        title: 'Data Collection',
        description: 'Collects data through services, apps, and third-party integrations',
        status: 'warning'
      },
      {
        title: 'Data Sharing',
        description: 'Shares data with advertisers and third-party service providers',
        status: 'danger'
      },
      {
        title: 'Data Security',
        description: 'Uses encryption and security measures to protect user data',
        status: 'success'
      },
      {
        title: 'User Controls',
        description: 'Provides dashboard for privacy settings and data management',
        status: 'success'
      }
    ],
    userRights: [
      'Access your personal data',
      'Delete your information',
      'Export your data',
      'Opt-out of personalized advertising',
      'Control third-party data sharing'
    ],
    relatedCompanies: [
      {
        name: 'YouTube',
        relationship: 'Subsidiary'
      },
      {
        name: 'Android',
        relationship: 'Operating System'
      },
      {
        name: 'DoubleClick',
        relationship: 'Advertising Platform'
      }
    ]
  },
  meta: {
    name: 'Meta',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/512px-Meta_Platforms_Inc._logo.svg.png',
    description: 'Social technology company focusing on social networking and virtual reality.',
    website: 'https://meta.com',
    privacyPolicy: 'https://www.facebook.com/privacy/policy/',
    lastUpdated: '2024-02-01',
    dataCategories: [
      {
        name: 'Profile Information',
        items: ['Name', 'Email', 'Phone', 'Photos', 'Birthday'],
        risk: 'high'
      },
      {
        name: 'Social Data',
        items: ['Friends', 'Likes', 'Groups', 'Events', 'Comments'],
        risk: 'medium'
      },
      {
        name: 'Behavioral Data',
        items: ['Activity Log', 'Ad Preferences', 'Location History', 'Device Usage'],
        risk: 'high'
      }
    ],
    dataPractices: [
      {
        title: 'Data Collection',
        description: 'Extensive collection across platforms and third-party websites',
        status: 'danger'
      },
      {
        title: 'Data Sharing',
        description: 'Shares data with advertisers and business partners',
        status: 'danger'
      },
      {
        title: 'Data Security',
        description: 'End-to-end encryption for messages and secure storage',
        status: 'success'
      },
      {
        title: 'User Controls',
        description: 'Privacy checkup and granular privacy settings',
        status: 'warning'
      }
    ],
    userRights: [
      'Download your information',
      'Manage ad preferences',
      'Control audience settings',
      'Manage third-party access',
      'Delete account permanently'
    ],
    relatedCompanies: [
      {
        name: 'Instagram',
        relationship: 'Subsidiary'
      },
      {
        name: 'WhatsApp',
        relationship: 'Messaging Platform'
      },
      {
        name: 'Oculus',
        relationship: 'VR Technology'
      }
    ]
  },
  amazon: {
    name: 'Amazon',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/320px-Amazon_logo.svg.png',
    description: 'E-commerce and technology company providing online retail, cloud computing, and streaming services.',
    website: 'https://amazon.com',
    privacyPolicy: 'https://www.amazon.com/privacy',
    lastUpdated: '2024-01-20',
    dataCategories: [
      {
        name: 'Account Information',
        items: ['Name', 'Email', 'Address', 'Payment Info'],
        risk: 'medium'
      },
      {
        name: 'Shopping Data',
        items: ['Order History', 'Browsing History', 'Wishlists', 'Reviews'],
        risk: 'medium'
      },
      {
        name: 'Device & Usage',
        items: ['Alexa Voice Data', 'Prime Video Watch History', 'Device List'],
        risk: 'high'
      }
    ],
    dataPractices: [
      {
        title: 'Data Collection',
        description: 'Collects shopping, browsing, and device interaction data',
        status: 'warning'
      },
      {
        title: 'Data Sharing',
        description: 'Shares data with sellers and service providers',
        status: 'warning'
      },
      {
        title: 'Data Security',
        description: 'Advanced encryption and fraud detection',
        status: 'success'
      },
      {
        title: 'User Controls',
        description: 'Privacy settings and voice recording controls',
        status: 'success'
      }
    ],
    userRights: [
      'View and manage order history',
      'Control voice recordings',
      'Manage login devices',
      'Delete browsing history',
      'Request data deletion'
    ],
    relatedCompanies: [
      {
        name: 'AWS',
        relationship: 'Cloud Services'
      },
      {
        name: 'Ring',
        relationship: 'Smart Home Security'
      },
      {
        name: 'Twitch',
        relationship: 'Streaming Platform'
      }
    ]
  },
  microsoft: {
    name: 'Microsoft',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png',
    description: 'Technology company providing software, cloud services, and hardware products.',
    website: 'https://microsoft.com',
    privacyPolicy: 'https://privacy.microsoft.com',
    lastUpdated: '2024-01-30',
    dataCategories: [
      {
        name: 'Account Data',
        items: ['Email', 'Name', 'Password', 'Security Info'],
        risk: 'medium'
      },
      {
        name: 'Service Data',
        items: ['Office Documents', 'Email Content', 'Calendar Events'],
        risk: 'medium'
      },
      {
        name: 'Telemetry Data',
        items: ['Windows Usage', 'Error Reports', 'Feature Usage'],
        risk: 'low'
      }
    ],
    dataPractices: [
      {
        title: 'Data Collection',
        description: 'Collects usage data across services and devices',
        status: 'warning'
      },
      {
        title: 'Data Sharing',
        description: 'Limited sharing with third-party providers',
        status: 'success'
      },
      {
        title: 'Data Security',
        description: 'Enterprise-grade security and encryption',
        status: 'success'
      },
      {
        title: 'User Controls',
        description: 'Comprehensive privacy dashboard',
        status: 'success'
      }
    ],
    userRights: [
      'Access personal data',
      'Control telemetry settings',
      'Manage marketing preferences',
      'Export or delete data',
      'Review security settings'
    ],
    relatedCompanies: [
      {
        name: 'LinkedIn',
        relationship: 'Professional Network'
      },
      {
        name: 'GitHub',
        relationship: 'Development Platform'
      },
      {
        name: 'Xbox',
        relationship: 'Gaming Division'
      }
    ]
  },
  apple: {
    name: 'Apple',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/512px-Apple_logo_black.svg.png',
    description: 'Technology company designing consumer electronics, software, and services.',
    website: 'https://apple.com',
    privacyPolicy: 'https://www.apple.com/privacy',
    lastUpdated: '2024-02-05',
    dataCategories: [
      {
        name: 'Apple ID Data',
        items: ['Name', 'Email', 'Payment Info', 'Device List'],
        risk: 'low'
      },
      {
        name: 'Device Data',
        items: ['Device Settings', 'iCloud Data', 'App Usage'],
        risk: 'low'
      },
      {
        name: 'Service Data',
        items: ['App Store History', 'Apple Music', 'iMessage'],
        risk: 'medium'
      }
    ],
    dataPractices: [
      {
        title: 'Data Collection',
        description: 'Minimal data collection with on-device processing',
        status: 'success'
      },
      {
        title: 'Data Sharing',
        description: 'Strong limits on third-party data sharing',
        status: 'success'
      },
      {
        title: 'Data Security',
        description: 'End-to-end encryption and advanced security',
        status: 'success'
      },
      {
        title: 'User Controls',
        description: 'Detailed privacy settings per service',
        status: 'success'
      }
    ],
    userRights: [
      'Manage Apple ID data',
      'Control app tracking',
      'Manage iCloud data',
      'Review app privacy reports',
      'Delete account data'
    ],
    relatedCompanies: [
      {
        name: 'Beats',
        relationship: 'Audio Subsidiary'
      },
      {
        name: 'Shazam',
        relationship: 'Music Recognition'
      },
      {
        name: 'TestFlight',
        relationship: 'App Testing'
      }
    ]
  }
};

export function CompanyDetails() {
  const { companyId } = useParams();
  const company = companyData[companyId as keyof typeof companyData];

  if (!company) {
    return (
      <div className="min-h-screen bg-black text-white pt-20">
        <div className="container mx-auto px-4 py-12 text-center">
          <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Company Not Found</h1>
          <p className="text-gray-400">The requested company information is not available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900/50 p-8 rounded-xl backdrop-blur-sm border border-gray-800 mb-8"
        >
          <div className="flex items-center gap-6 mb-6">
            <div className="w-16 h-16 bg-white rounded-lg p-3 flex-shrink-0">
              <img
                src={company.logo}
                alt={`${company.name} logo`}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{company.name}</h1>
              <p className="text-gray-400">{company.description}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button
              variant="outline"
              className="border-green-500/50 text-green-500 hover:bg-green-500/10"
              onClick={() => window.open(company.website, '_blank')}
            >
              <Globe className="w-4 h-4 mr-2" />
              Visit Website
            </Button>
            <Button
              variant="outline"
              className="border-blue-500/50 text-blue-500 hover:bg-blue-500/10"
              onClick={() => window.open(company.privacyPolicy, '_blank')}
            >
              <FileText className="w-4 h-4 mr-2" />
              Privacy Policy
            </Button>
            <div className="flex items-center text-sm text-gray-400">
              <Clock className="w-4 h-4 mr-2" />
              Last Updated: {company.lastUpdated}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Data Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Server className="w-5 h-5 text-green-500" />
                Data Categories
              </h2>
              <div className="space-y-4">
                {company.dataCategories.map((category, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-800/50 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">{category.name}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        category.risk === 'high' ? 'bg-red-500/20 text-red-400' :
                        category.risk === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {category.risk.charAt(0).toUpperCase() + category.risk.slice(1)} Risk
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.items.map((item, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-sm bg-gray-700/50 rounded-full"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Practices */}
            <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-500" />
                Data Practices
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {company.dataPractices.map((practice, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-800/50 rounded-lg"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {practice.status === 'success' ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : practice.status === 'warning' ? (
                        <AlertTriangle className="w-5 h-5 text-yellow-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                      <h3 className="font-medium">{practice.title}</h3>
                    </div>
                    <p className="text-sm text-gray-400">{practice.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* User Rights */}
            <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-green-500" />
                Your Rights
              </h2>
              <div className="space-y-3">
                {company.userRights.map((right, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm text-gray-400"
                  >
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>{right}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Companies */}
            <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-green-500" />
                Related Companies
              </h2>
              <div className="space-y-3">
                {company.relatedCompanies.map((related, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg"
                  >
                    <div>
                      <div className="font-medium">{related.name}</div>
                      <div className="text-sm text-gray-400">{related.relationship}</div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}