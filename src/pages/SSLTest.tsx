import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, AlertTriangle, CheckCircle2, XCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TLSInfo {
  protocols: {
    name: string;
    supported: boolean;
    secure: boolean;
  }[];
  cipherSuites: {
    name: string;
    supported: boolean;
    secure: boolean;
    keyExchange: string;
    authentication: string;
    encryption: string;
    bits: number;
  }[];
  extensions: {
    name: string;
    supported: boolean;
    description: string;
  }[];
  keyExchange: {
    name: string;
    supported: boolean;
    bits: number;
    secure: boolean;
  }[];
  ja3Fingerprint: string;
}

export function SSLTest() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [tlsInfo, setTlsInfo] = useState<TLSInfo | null>(null);

  const analyzeTLSCapabilities = async () => {
    setIsAnalyzing(true);
    
    // Simulate API call with realistic TLS data
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setTlsInfo({
      protocols: [
        { name: 'TLS 1.3', supported: true, secure: true },
        { name: 'TLS 1.2', supported: true, secure: true },
        { name: 'TLS 1.1', supported: false, secure: false },
        { name: 'TLS 1.0', supported: false, secure: false },
        { name: 'SSL 3.0', supported: false, secure: false }
      ],
      cipherSuites: [
        {
          name: 'TLS_AES_256_GCM_SHA384',
          supported: true,
          secure: true,
          keyExchange: 'ECDHE',
          authentication: 'RSA',
          encryption: 'AES-256-GCM',
          bits: 256
        },
        {
          name: 'TLS_CHACHA20_POLY1305_SHA256',
          supported: true,
          secure: true,
          keyExchange: 'ECDHE',
          authentication: 'ECDSA',
          encryption: 'CHACHA20-POLY1305',
          bits: 256
        },
        {
          name: 'TLS_AES_128_GCM_SHA256',
          supported: true,
          secure: true,
          keyExchange: 'ECDHE',
          authentication: 'RSA',
          encryption: 'AES-128-GCM',
          bits: 128
        }
      ],
      extensions: [
        {
          name: 'server_name',
          supported: true,
          description: 'Allows multiple secure sites to be served from a single IP address'
        },
        {
          name: 'application_layer_protocol_negotiation',
          supported: true,
          description: 'Negotiates application protocols like HTTP/2'
        },
        {
          name: 'signed_certificate_timestamps',
          supported: true,
          description: 'Provides Certificate Transparency verification'
        },
        {
          name: 'status_request',
          supported: true,
          description: 'Enables OCSP stapling'
        }
      ],
      keyExchange: [
        {
          name: 'X25519',
          supported: true,
          bits: 256,
          secure: true
        },
        {
          name: 'P-256',
          supported: true,
          bits: 256,
          secure: true
        },
        {
          name: 'P-384',
          supported: true,
          bits: 384,
          secure: true
        }
      ],
      ja3Fingerprint: 'e7d705a3286e19ea42f587b344ee6865'
    });
    
    setIsAnalyzing(false);
  };

  useEffect(() => {
    analyzeTLSCapabilities();
  }, []);

  const getSecurityScore = () => {
    if (!tlsInfo) return 0;

    let score = 0;
    const weights = {
      protocols: 0.3,
      cipherSuites: 0.3,
      keyExchange: 0.2,
      extensions: 0.2
    };

    // Score protocols
    const protocolScore = tlsInfo.protocols.reduce((acc, protocol) => {
      return acc + (protocol.supported && protocol.secure ? 1 : 0);
    }, 0) / tlsInfo.protocols.length;
    
    // Score cipher suites
    const cipherScore = tlsInfo.cipherSuites.reduce((acc, cipher) => {
      return acc + (cipher.secure ? 1 : 0);
    }, 0) / tlsInfo.cipherSuites.length;
    
    // Score key exchange
    const keyExchangeScore = tlsInfo.keyExchange.reduce((acc, key) => {
      return acc + (key.secure ? 1 : 0);
    }, 0) / tlsInfo.keyExchange.length;
    
    // Score extensions
    const extensionScore = tlsInfo.extensions.reduce((acc, ext) => {
      return acc + (ext.supported ? 1 : 0);
    }, 0) / tlsInfo.extensions.length;

    score = (
      protocolScore * weights.protocols +
      cipherScore * weights.cipherSuites +
      keyExchangeScore * weights.keyExchange +
      extensionScore * weights.extensions
    ) * 100;

    return Math.round(score);
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
            <Lock className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            SSL/TLS Security Test
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Analyze your browser's SSL/TLS capabilities and security configuration.
          </p>
        </motion.div>

        {isAnalyzing ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent" />
          </div>
        ) : tlsInfo && (
          <div className="space-y-8">
            {/* Overall Security Score */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800 text-center"
            >
              <h2 className="text-2xl font-bold mb-4">Security Score</h2>
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-64 h-4 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      getSecurityScore() >= 80 ? 'bg-green-500' :
                      getSecurityScore() >= 60 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${getSecurityScore()}%` }}
                  />
                </div>
                <span className="text-2xl font-bold">{getSecurityScore()}%</span>
              </div>
              <p className="text-gray-400">
                {getSecurityScore() >= 80 ? 'Your browser has strong SSL/TLS security' :
                 getSecurityScore() >= 60 ? 'Your browser has moderate SSL/TLS security' :
                 'Your browser has weak SSL/TLS security'}
              </p>
            </motion.div>

            {/* JA3 Fingerprint */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">JA3 SSL/TLS Fingerprint</h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-green-500/50 hover:bg-green-500/10"
                  onClick={() => navigator.clipboard.writeText(tlsInfo.ja3Fingerprint)}
                >
                  Copy
                </Button>
              </div>
              <p className="font-mono text-green-400 mb-2">{tlsInfo.ja3Fingerprint}</p>
              <p className="text-sm text-gray-400">
                This is your browser's unique SSL/TLS fingerprint. It can be used to identify and track your browser across different websites.
              </p>
            </motion.div>

            {/* Protocol Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800"
            >
              <h3 className="text-xl font-semibold mb-4">Protocol Support</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tlsInfo.protocols.map((protocol) => (
                  <div
                    key={protocol.name}
                    className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {protocol.supported ? (
                        <CheckCircle2 className={`w-5 h-5 ${protocol.secure ? 'text-green-500' : 'text-yellow-500'}`} />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                      <span>{protocol.name}</span>
                    </div>
                    <span className={`text-sm ${
                      protocol.supported && protocol.secure ? 'text-green-400' :
                      protocol.supported ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      {protocol.supported ? (protocol.secure ? 'Secure' : 'Supported') : 'Not Supported'}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Cipher Suites */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800"
            >
              <h3 className="text-xl font-semibold mb-4">Supported Cipher Suites</h3>
              <div className="space-y-4">
                {tlsInfo.cipherSuites.map((cipher) => (
                  <div
                    key={cipher.name}
                    className="p-4 bg-gray-800/50 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {cipher.secure ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-yellow-500" />
                        )}
                        <span className="font-mono text-sm">{cipher.name}</span>
                      </div>
                      <span className={`text-sm ${cipher.secure ? 'text-green-400' : 'text-yellow-400'}`}>
                        {cipher.bits} bits
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm text-gray-400">
                      <div>
                        <span className="block text-xs text-gray-500">Key Exchange</span>
                        {cipher.keyExchange}
                      </div>
                      <div>
                        <span className="block text-xs text-gray-500">Authentication</span>
                        {cipher.authentication}
                      </div>
                      <div>
                        <span className="block text-xs text-gray-500">Encryption</span>
                        {cipher.encryption}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Key Exchange Groups */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800"
            >
              <h3 className="text-xl font-semibold mb-4">Key Exchange Groups</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tlsInfo.keyExchange.map((key) => (
                  <div
                    key={key.name}
                    className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {key.supported && key.secure ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-yellow-500" />
                      )}
                      <div>
                        <span className="block">{key.name}</span>
                        <span className="text-sm text-gray-400">{key.bits} bits</span>
                      </div>
                    </div>
                    <span className={`text-sm ${key.secure ? 'text-green-400' : 'text-yellow-400'}`}>
                      {key.secure ? 'Secure' : 'Legacy'}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* TLS Extensions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800"
            >
              <h3 className="text-xl font-semibold mb-4">TLS Extensions</h3>
              <div className="space-y-4">
                {tlsInfo.extensions.map((extension) => (
                  <div
                    key={extension.name}
                    className="p-4 bg-gray-800/50 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {extension.supported ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                        <span className="font-mono text-sm">{extension.name}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">{extension.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}