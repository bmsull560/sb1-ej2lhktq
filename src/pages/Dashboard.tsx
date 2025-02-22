import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Search, Globe, Lock, MapPin, Smartphone, AlertTriangle, 
  CheckCircle2, XCircle, Fingerprint, Link2, ExternalLink, Mail, 
  AlertCircle, Scan, Network, Eye, Database
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { validatePhoneNumber, formatPhoneNumber } from '@/lib/validators';
import { scanPhoneNumber, scanEmail } from '@/lib/api';
import { getBrowserFingerprint } from '@/lib/fingerprint';
import type { PrivacyScore, DataBroker, SocialMediaPlatform, BrowserFingerprint } from '@/types';
import { SSLTest } from '@/pages/SSLTest';
import { PortScanner } from '@/pages/PortScanner';

const navigationItems = [
  {
    id: 'overview',
    name: 'Overview',
    icon: Eye,
    description: 'View your privacy dashboard summary'
  },
  {
    id: 'data-breaches',
    name: 'Data Breaches',
    icon: AlertTriangle,
    description: 'Check for exposed personal information'
  },
  {
    id: 'data-brokers',
    name: 'Data Brokers',
    icon: Database,
    description: 'Monitor data broker listings'
  },
  {
    id: 'fingerprint',
    name: 'Browser Fingerprint',
    icon: Fingerprint,
    description: 'Analyze your browser\'s uniqueness'
  },
  {
    id: 'tracking-scanner',
    name: 'Tracking Scanner',
    icon: Search,
    description: 'Detect website tracking methods'
  },
  {
    id: 'social-media',
    name: 'Social Media',
    icon: Globe,
    description: 'Review social media privacy'
  },
  {
    id: 'location',
    name: 'Location Privacy',
    icon: MapPin,
    description: 'Check location data exposure'
  },
  {
    id: 'ssl',
    name: 'SSL/TLS Security Test',
    icon: Lock,
    description: 'Analyze SSL/TLS security configuration',
    component: SSLTest
  },
  {
    id: 'port',
    name: 'Network Port Scanner',
    icon: Network,
    description: 'Scan network ports and services',
    component: PortScanner
  }
];

const dataBrokers: DataBroker[] = [
  {
    name: 'Acxiom',
    dataFound: true,
    dataTypes: ['Phone', 'Address', 'Employment'],
    optOutUrl: 'https://isapps.acxiom.com/optout/optout.aspx'
  },
  {
    name: 'Epsilon',
    dataFound: true,
    dataTypes: ['Phone', 'Shopping Habits'],
    optOutUrl: 'https://www.epsilon.com/privacy/consumer-information'
  },
  {
    name: 'Oracle Data Cloud',
    dataFound: false,
    dataTypes: [],
    optOutUrl: 'https://www.oracle.com/legal/privacy/marketing-cloud-data-cloud-privacy-policy.html'
  }
];

export function Dashboard() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [isEmailScanning, setIsEmailScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [emailScanComplete, setEmailScanComplete] = useState(false);
  const [emailScanResults, setEmailScanResults] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [fingerprint, setFingerprint] = useState<BrowserFingerprint | null>(null);
  const [isLoadingFingerprint, setIsLoadingFingerprint] = useState(false);

  const handleScan = async () => {
    if (!phoneNumber) return;
    
    setIsScanning(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsScanning(false);
    setScanComplete(true);
    setActiveTab('data-brokers');
  };

  const handleEmailScan = async () => {
    if (!email) return;
    
    setIsEmailScanning(true);
    try {
      const results = await scanEmail(email);
      setEmailScanResults(results);
      setEmailScanComplete(true);
    } catch (error) {
      console.error('Email scan failed:', error);
    }
    setIsEmailScanning(false);
  };

  const handleFingerprintScan = async () => {
    setIsLoadingFingerprint(true);
    try {
      const fp = await getBrowserFingerprint();
      setFingerprint(fp);
    } catch (error) {
      console.error('Failed to get fingerprint:', error);
    }
    setIsLoadingFingerprint(false);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Privacy Dashboard
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Monitor and protect your digital footprint across the internet.
          </p>
        </motion.div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {navigationItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`p-4 rounded-xl border transition-all ${
                activeTab === item.id
                  ? 'bg-green-500/20 border-green-500 text-green-500'
                  : 'bg-gray-900/50 border-gray-800 hover:border-green-500/50 hover:bg-gray-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  activeTab === item.id
                    ? 'bg-green-500/20'
                    : 'bg-gray-800'
                }`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-400">{item.description}</div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Content Area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-6"
        >
          {/* Render active component if it exists */}
          {navigationItems.find(item => item.id === activeTab)?.component && (
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              {React.createElement(navigationItems.find(item => item.id === activeTab)!.component!)}
            </div>
          )}

          {/* Data Breach Scanner */}
          {activeTab === 'data-breaches' && (
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-xl mx-auto"
              >
                <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800">
                  <div className="flex items-center gap-3 mb-6">
                    <Mail className="w-6 h-6 text-green-500" />
                    <h3 className="text-lg font-semibold">Data Breach Scanner</h3>
                  </div>
                  
                  <p className="text-gray-400 mb-6">
                    Check if your email address has been compromised in known data breaches. We'll scan multiple databases and provide detailed information about any exposures.
                  </p>

                  <div className="flex gap-4 mb-6">
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-4 py-2 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
                    />
                    <Button
                      onClick={handleEmailScan}
                      disabled={isEmailScanning || !email.includes('@')}
                      className="bg-green-500 hover:bg-green-600 disabled:opacity-50"
                    >
                      {isEmailScanning ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                          Scanning
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Search className="w-4 h-4" />
                          Check Breaches
                        </div>
                      )}
                    </Button>
                  </div>

                  {emailScanComplete && emailScanResults && (
                    <div className="space-y-6">
                      {/* Risk Level Indicator */}
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium">Risk Level</h4>
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            emailScanResults.riskLevel === 'high' ? 'bg-red-500/20 text-red-400' :
                            emailScanResults.riskLevel === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-green-500/20 text-green-400'
                          }`}>
                            {emailScanResults.riskLevel.charAt(0).toUpperCase() + emailScanResults.riskLevel.slice(1)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <AlertCircle className="w-4 h-4 text-yellow-500" />
                          Found in {emailScanResults.totalBreaches} data {emailScanResults.totalBreaches === 1 ? 'breach' : 'breaches'}
                        </div>
                      </div>

                      {/* Exposed Data Types */}
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h4 className="font-medium mb-3">Exposed Data Types</h4>
                        <div className="flex flex-wrap gap-2">
                          {emailScanResults.exposedData.map((type: string) => (
                            <span
                              key={type}
                              className="px-2 py-1 text-xs bg-red-500/10 text-red-400 rounded-full"
                            >
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Detailed Breach List */}
                      <div className="space-y-4">
                        <h4 className="font-medium">Detailed Breach Information</h4>
                        {emailScanResults.breaches.map((breach: any, index: number) => (
                          <div key={index} className="bg-gray-800/50 p-4 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <h5 className="font-medium">{breach.name}</h5>
                              <span className="text-sm text-gray-400">{breach.date}</span>
                            </div>
                            <p className="text-sm text-gray-400 mb-3">{breach.description}</p>
                            <div className="flex flex-wrap gap-2 mb-2">
                              {breach.dataTypes.map((type: string) => (
                                <span
                                  key={type}
                                  className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded-full"
                                >
                                  {type}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-400">
                                Affected Users: {breach.affectedUsers.toLocaleString()}
                              </span>
                              <span className="text-gray-400">
                                Source: {breach.source}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Recommendations */}
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h4 className="font-medium mb-3">Recommended Actions</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2 text-sm text-gray-400">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                            Change passwords for all affected accounts
                          </li>
                          <li className="flex items-start gap-2 text-sm text-gray-400">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                            Enable two-factor authentication where available
                          </li>
                          <li className="flex items-start gap-2 text-sm text-gray-400">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                            Monitor your accounts for suspicious activity
                          </li>
                          <li className="flex items-start gap-2 text-sm text-gray-400">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                            Consider using a password manager for stronger security
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}

          {/* Data Broker Scanner */}
          {(activeTab === 'overview' || activeTab === 'data-brokers') && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-xl mx-auto mb-12"
            >
              <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800">
                <h2 className="text-xl font-semibold mb-4">Data Broker Scanner</h2>
                <div className="flex gap-4">
                  <input
                    type="tel"
                    placeholder="(555) 555-5555"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
                    className="flex-1 px-4 py-2 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
                    maxLength={14}
                  />
                  <Button
                    onClick={handleScan}
                    disabled={isScanning || phoneNumber.length < 14}
                    className="bg-green-500 hover:bg-green-600 disabled:opacity-50"
                  >
                    {isScanning ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                        Scanning
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Search className="w-4 h-4" />
                        Scan Now
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Data Brokers List */}
          {activeTab === 'data-brokers' && scanComplete && (
            <div className="space-y-6">
              {dataBrokers.map((broker, index) => (
                <motion.div
                  key={broker.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {broker.dataFound ? (
                        <XCircle className="w-6 h-6 text-red-500" />
                      ) : (
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                      )}
                      <h3 className="text-lg font-semibold">{broker.name}</h3>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-green-500/50 hover:bg-green-500/10"
                      onClick={() => window.open(broker.optOutUrl, '_blank')}
                    >
                      Opt Out
                    </Button>
                  </div>
                  {broker.dataFound && (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-400">Found data types:</p>
                      <div className="flex flex-wrap gap-2">
                        {broker.dataTypes.map((type) => (
                          <span
                            key={type}
                            className="px-2 py-1 text-xs bg-red-500/10 text-red-400 rounded-full"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {/* Browser Fingerprint Analysis */}
          {activeTab === 'fingerprint' && (
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Fingerprint className="w-6 h-6 text-green-500" />
                  <h3 className="text-lg font-semibold">Browser Fingerprint Analysis</h3>
                </div>
                
                <div className="mb-6">
                  <Button
                    onClick={handleFingerprintScan}
                    disabled={isLoadingFingerprint}
                    className="bg-green-500 hover:bg-green-600 disabled:opacity-50"
                  >
                    {isLoadingFingerprint ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                        Analyzing...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Fingerprint className="w-4 h-4" />
                        Analyze My Browser
                      </div>
                    )}
                  </Button>
                </div>

                {fingerprint && (
                  <div className="space-y-8">
                    {/* Uniqueness Score Card */}
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                      <h4 className="text-xl font-bold mb-6 text-center">Browser Fingerprint Analysis</h4>
                      <div className="space-y-6">
                        <div className="text-center">
                          <div className="inline-block p-4 bg-gray-900/50 rounded-full mb-4">
                            <Fingerprint className="w-12 h-12 text-green-500" />
                          </div>
                          <h5 className="text-lg font-semibold mb-2">Uniqueness Score</h5>
                          <div className="flex items-center justify-center gap-4 mb-4">
                            <div className="w-64 h-4 bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-green-500 to-blue-500"
                                style={{ width: `${fingerprint.uniqueness}%` }}
                              />
                            </div>
                            <span className="text-2xl font-bold">{fingerprint.uniqueness.toFixed(1)}%</span>
                          </div>
                          <p className="text-lg mb-4">
                            {fingerprint.uniqueness > 80
                              ? 'Your browser is highly trackable'
                              : fingerprint.uniqueness > 50
                              ? 'Your browser has moderate privacy protection'
                              : 'Your browser has good privacy protection'}
                          </p>
                          <div className="bg-gray-900/50 p-4 rounded-lg text-left">
                            <h6 className="font-medium mb-3 text-green-400">Recommendations</h6>
                            <ul className="space-y-2 text-sm text-gray-400">
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                                Use a privacy-focused browser like Brave or Firefox with strict privacy settings
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                                Enable fingerprinting protection in your browser settings
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                                Consider using a VPN to mask your location and network identity
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Browser Information */}
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                      <h4 className="text-lg font-medium mb-4">Browser Information</h4>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <span className="text-gray-400">Browser & Version</span>
                            <span className="text-green-400 font-mono text-sm">
                              {fingerprint.userAgent.browser} {fingerprint.userAgent.version}
                            </span>
                          </div>
                          <p className="text-sm text-yellow-400/80 bg-yellow-400/10 p-3 rounded-lg">
                            <AlertTriangle className="w-4 h-4 inline-block mr-2 mb-1" />
                            Your browser type and version create a distinct signature that websites can use to track you.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Hardware Information */}
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                      <h4 className="text-lg font-medium mb-4">Hardware Information</h4>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <span className="text-gray-400">Graphics Card</span>
                            <span className="text-green-400 font-mono text-sm">
                              {fingerprint.webgl.vendor} - {fingerprint.webgl.renderer}
                            </span>
                          </div>
                          <p className="text-sm text-yellow-400/80 bg-yellow-400/10 p-3 rounded-lg">
                            <AlertTriangle className="w-4 h-4 inline-block mr-2 mb-1" />
                            Your graphics hardware creates a highly specific signature that persists across browsers.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          )}

          {/* Website Privacy Scanner */}
          {activeTab === 'tracking-scanner' && (
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Link2 className="w-6 h-6 text-green-500" />
                  <h3 className="text-lg font-semibold">Website Privacy Scanner</h3>
                </div>

                <div className="mb-6">
                  <p className="text-gray-400 mb-4">
                    Enter any website URL and we'll analyze the tracking technologies it uses to collect your data.
                  </p>
                  <div className="flex gap-4">
                    <input
                      type="url"
                      placeholder="https://example.com"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      className="flex-1 px-4 py-2 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
                    />
                    <Button
                      className="bg-green-500 hover:bg-green-600"
                      onClick={() => window.open(`https://themarkup.org/blacklight?url=${encodeURIComponent(websiteUrl)}`, '_blank')}
                    >
                      <div className="flex items-center gap-2">
                        <Search className="w-4 h-4" />
                        Scan Website
                      </div>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}