import { useState } from 'react';
import { motion } from 'framer-motion';
import { Scan, Server, Globe, AlertTriangle, CheckCircle2, XCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PortInfo {
  port: number;
  service: string;
  description: string;
  common: boolean;
}

interface ScanResult {
  port: number;
  status: 'open' | 'closed';
  service: string;
  description: string;
  common: boolean;
}

const commonPorts: PortInfo[] = [
  { port: 20, service: 'FTP-DATA', description: 'File Transfer Protocol (Data)', common: true },
  { port: 21, service: 'FTP', description: 'File Transfer Protocol (Control)', common: true },
  { port: 22, service: 'SSH', description: 'Secure Shell', common: true },
  { port: 23, service: 'Telnet', description: 'Telnet protocol - unencrypted text communications', common: true },
  { port: 25, service: 'SMTP', description: 'Simple Mail Transfer Protocol', common: true },
  { port: 53, service: 'DNS', description: 'Domain Name System', common: true },
  { port: 80, service: 'HTTP', description: 'Hypertext Transfer Protocol', common: true },
  { port: 110, service: 'POP3', description: 'Post Office Protocol v3', common: true },
  { port: 143, service: 'IMAP', description: 'Internet Message Access Protocol', common: true },
  { port: 443, service: 'HTTPS', description: 'HTTP over TLS/SSL', common: true },
  { port: 445, service: 'SMB', description: 'Server Message Block', common: true },
  { port: 3306, service: 'MySQL', description: 'MySQL Database', common: true },
  { port: 3389, service: 'RDP', description: 'Remote Desktop Protocol', common: true },
  { port: 5432, service: 'PostgreSQL', description: 'PostgreSQL Database', common: true },
  { port: 27017, service: 'MongoDB', description: 'MongoDB Database', common: false },
  { port: 6379, service: 'Redis', description: 'Redis Database', common: false },
  { port: 9200, service: 'Elasticsearch', description: 'Elasticsearch', common: false },
  { port: 5672, service: 'RabbitMQ', description: 'RabbitMQ Message Broker', common: false },
  { port: 1433, service: 'MSSQL', description: 'Microsoft SQL Server', common: false },
  { port: 8080, service: 'HTTP-ALT', description: 'Alternative HTTP Port', common: true }
];

export function PortScanner() {
  const [target, setTarget] = useState('');
  const [scanType, setScanType] = useState<'local' | 'remote'>('local');
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<ScanResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const validateTarget = (input: string): boolean => {
    if (scanType === 'local') {
      return input === 'localhost' || /^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(input);
    } else {
      // Basic domain or IP validation
      return /^([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/.test(input) ||
             /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(input);
    }
  };

  const simulateScan = async () => {
    setIsScanning(true);
    setError(null);
    setResults([]);

    if (!validateTarget(target)) {
      setError('Invalid target. Please enter a valid hostname or IP address.');
      setIsScanning(false);
      return;
    }

    try {
      // Simulate scanning delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate random port status
      const simulatedResults = commonPorts.map(portInfo => ({
        ...portInfo,
        status: Math.random() > 0.7 ? 'open' as const : 'closed' as const
      }));

      setResults(simulatedResults);
    } catch (err) {
      setError('Scan failed. Please try again.');
    } finally {
      setIsScanning(false);
    }
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
            <Scan className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Port Scanner
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Scan for open ports and identify running services on local or remote hosts.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* Scan Configuration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800 mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-400 mb-2">Target Host</label>
                <input
                  type="text"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  placeholder={scanType === 'local' ? 'localhost or 127.0.0.1' : 'example.com or 192.168.1.1'}
                  className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Scan Type</label>
                <div className="flex gap-2">
                  <Button
                    variant={scanType === 'local' ? 'default' : 'outline'}
                    className={scanType === 'local' ? 'bg-green-500 hover:bg-green-600' : ''}
                    onClick={() => setScanType('local')}
                  >
                    <Server className="w-4 h-4 mr-2" />
                    Local
                  </Button>
                  <Button
                    variant={scanType === 'remote' ? 'default' : 'outline'}
                    className={scanType === 'remote' ? 'bg-green-500 hover:bg-green-600' : ''}
                    onClick={() => setScanType('remote')}
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Remote
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-400">
                <Info className="w-4 h-4 inline-block mr-2" />
                {scanType === 'local' ? 
                  'Scan your local machine or network' :
                  'Scan remote hosts (use with permission)'
                }
              </div>
              <Button
                onClick={simulateScan}
                disabled={isScanning || !target}
                className="bg-green-500 hover:bg-green-600 disabled:opacity-50"
              >
                {isScanning ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    Scanning...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Scan className="w-4 h-4" />
                    Start Scan
                  </div>
                )}
              </Button>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                <AlertTriangle className="w-4 h-4 inline-block mr-2" />
                {error}
              </div>
            )}
          </motion.div>

          {/* Scan Results */}
          {results.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Summary Card */}
              <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800">
                <h3 className="text-xl font-semibold mb-4">Scan Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="text-2xl font-bold mb-2">
                      {results.filter(r => r.status === 'open').length}
                    </div>
                    <div className="text-sm text-gray-400">Open Ports</div>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="text-2xl font-bold mb-2">
                      {results.filter(r => r.status === 'closed').length}
                    </div>
                    <div className="text-sm text-gray-400">Closed Ports</div>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="text-2xl font-bold mb-2">
                      {results.length}
                    </div>
                    <div className="text-sm text-gray-400">Total Ports Scanned</div>
                  </div>
                </div>
              </div>

              {/* Results Table */}
              <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800">
                <h3 className="text-xl font-semibold mb-4">Detailed Results</h3>
                <div className="space-y-4">
                  {results.map((result) => (
                    <div
                      key={result.port}
                      className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        {result.status === 'open' ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono">Port {result.port}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              result.common ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'
                            }`}>
                              {result.common ? 'Common' : 'Uncommon'}
                            </span>
                          </div>
                          <div className="text-sm text-gray-400">
                            {result.service} - {result.description}
                          </div>
                        </div>
                      </div>
                      <span className={`text-sm ${
                        result.status === 'open' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {result.status.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}