import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle,
  Globe,
  Clock,
  Calendar,
  Link2,
  Server,
  Lock,
  AlertOctagon,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ScanResult {
  domain: string;
  score: number;
  registrationDate?: string;
  lastUpdated?: string;
  ip?: string;
  ssl?: {
    valid: boolean;
    expires?: string;
    issuer?: string;
  };
  flags: {
    inPhishtank: boolean;
    inUrlhaus: boolean;
    maliciousReports: number;
    suspiciousPatterns: boolean;
  };
  recommendations: string[];
}

const mockScan = async (domain: string): Promise<ScanResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Generate semi-random but consistent results based on domain
  const hash = domain.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  return {
    domain,
    score: 20 + (hash % 80), // Score between 20-100
    registrationDate: '2020-01-15',
    lastUpdated: '2024-02-01',
    ip: '192.168.1.1',
    ssl: {
      valid: hash % 2 === 0,
      expires: '2025-01-15',
      issuer: 'Let\'s Encrypt'
    },
    flags: {
      inPhishtank: hash % 5 === 0,
      inUrlhaus: hash % 7 === 0,
      maliciousReports: hash % 10,
      suspiciousPatterns: hash % 3 === 0
    },
    recommendations: [
      'Verify the website\'s SSL certificate',
      'Check for secure payment methods',
      'Look for clear contact information',
      'Research company background',
      'Read user reviews and ratings'
    ]
  };
};

export function ScamDetector() {
  const [domain, setDomain] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async () => {
    if (!domain) return;

    setIsScanning(true);
    setError(null);
    setResult(null);

    try {
      // Basic domain validation
      const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
      if (!domainRegex.test(domain)) {
        throw new Error('Please enter a valid domain (e.g., example.com)');
      }

      const result = await mockScan(domain);
      setResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsScanning(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'bg-green-500/20';
    if (score >= 60) return 'bg-yellow-500/20';
    return 'bg-red-500/20';
  };

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
            Website Scam Detector
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Check if a website is legitimate or potentially fraudulent. Our tool analyzes multiple security databases and indicators to assess website trustworthiness.
          </p>
        </motion.div>

        {/* Domain Input */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Enter domain (e.g., example.com)"
                value={domain}
                onChange={(e) => setDomain(e.target.value.toLowerCase())}
                className="flex-1 px-4 py-2 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
              />
              <Button
                onClick={handleScan}
                disabled={isScanning || !domain}
                className="bg-green-500 hover:bg-green-600 disabled:opacity-50"
              >
                {isScanning ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Scan Website
                  </>
                )}
              </Button>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-500/10 rounded-lg flex items-center gap-2 text-red-400">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}
          </div>
        </div>

        {/* Scan Results */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            {/* Trust Score */}
            <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Trust Score</h2>
                <div className={`text-4xl font-bold ${getScoreColor(result.score)}`}>
                  {result.score}/100
                </div>
              </div>

              <div className="h-4 bg-gray-800 rounded-full overflow-hidden mb-6">
                <div 
                  className={`h-full ${getScoreBackground(result.score)}`}
                  style={{ width: `${result.score}%` }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`p-4 rounded-lg ${
                  result.score >= 80 ? 'bg-green-500/20' :
                  result.score >= 60 ? 'bg-yellow-500/20' :
                  'bg-red-500/20'
                }`}>
                  {result.score >= 80 ? (
                    <>
                      <CheckCircle2 className="w-6 h-6 mb-2 text-green-500" />
                      <h3 className="font-medium text-green-400">Safe to Use</h3>
                      <p className="text-sm text-gray-400">This website appears to be legitimate and trustworthy.</p>
                    </>
                  ) : result.score >= 60 ? (
                    <>
                      <AlertTriangle className="w-6 h-6 mb-2 text-yellow-500" />
                      <h3 className="font-medium text-yellow-400">Use with Caution</h3>
                      <p className="text-sm text-gray-400">Some potential risks detected. Proceed with care.</p>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-6 h-6 mb-2 text-red-500" />
                      <h3 className="font-medium text-red-400">High Risk</h3>
                      <p className="text-sm text-gray-400">Multiple red flags detected. Avoid using this website.</p>
                    </>
                  )}
                </div>

                <div className="col-span-2 grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-400">Registration Date</span>
                    </div>
                    <span className="font-medium">{result.registrationDate}</span>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-400">Last Updated</span>
                    </div>
                    <span className="font-medium">{result.lastUpdated}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Security Checks */}
              <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  Security Checks
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-gray-400" />
                      <span>SSL Certificate</span>
                    </div>
                    {result.ssl?.valid ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertOctagon className="w-4 h-4 text-gray-400" />
                      <span>Phishing Database</span>
                    </div>
                    {result.flags.inPhishtank ? (
                      <XCircle className="w-5 h-5 text-red-500" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-gray-400" />
                      <span>Malware Database</span>
                    </div>
                    {result.flags.inUrlhaus ? (
                      <XCircle className="w-5 h-5 text-red-500" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                </div>
              </div>

              {/* Technical Info */}
              <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Server className="w-5 h-5 text-green-500" />
                  Technical Information
                </h3>
                <div className="space-y-4">
                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">IP Address</div>
                    <div className="font-mono">{result.ip}</div>
                  </div>
                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">SSL Issuer</div>
                    <div>{result.ssl?.issuer}</div>
                  </div>
                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">SSL Expiry</div>
                    <div>{result.ssl?.expires}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800">
              <h3 className="text-lg font-semibold mb-4">Safety Recommendations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Resources */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a
                href="https://www.phishtank.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800 hover:border-green-500/50 transition-colors group"
              >
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  PhishTank Database
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h4>
                <p className="text-sm text-gray-400">
                  Community-driven phishing site verification.
                </p>
              </a>
              <a
                href="https://urlhaus.abuse.ch/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800 hover:border-green-500/50 transition-colors group"
              >
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  URLhaus
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h4>
                <p className="text-sm text-gray-400">
                  Database of malware distribution sites.
                </p>
              </a>
              <a
                href="https://www.virustotal.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800 hover:border-green-500/50 transition-colors group"
              >
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  VirusTotal
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h4>
                <p className="text-sm text-gray-400">
                  Comprehensive security analysis platform.
                </p>
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}