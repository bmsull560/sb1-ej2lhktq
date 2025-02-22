import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Monitor, 
  Globe2, 
  Cpu, 
  Languages, 
  Timer,
  Fingerprint,
  Settings,
  Layers,
  AlertTriangle
} from 'lucide-react';
import { getBrowserFingerprint } from '@/lib/fingerprint';
import type { BrowserFingerprint } from '@/types';

interface FingerprintCardProps {
  icon: React.ReactNode;
  title: string;
  items: Array<{ label: string; value: string }>;
}

function FingerprintCard({ icon, title, items }: FingerprintCardProps) {
  return (
    <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800">
      <div className="flex items-center mb-4">
        <div className="text-green-500 mr-2">{icon}</div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index}>
            <div className="text-sm font-medium text-gray-400">{item.label}</div>
            <div className="text-sm text-gray-300 break-words">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BrowserPrivacy() {
  const [fingerprint, setFingerprint] = useState<BrowserFingerprint | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateFingerprint = async () => {
      try {
        const fp = await getBrowserFingerprint();
        setFingerprint(fp);
      } catch (error) {
        console.error('Failed to generate fingerprint:', error);
      } finally {
        setLoading(false);
      }
    };

    generateFingerprint();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Key Message Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900/50 text-white p-6 rounded-xl backdrop-blur-sm border border-gray-800 mb-8 text-center"
        >
          <div className="flex items-center justify-center gap-2 text-lg font-semibold mb-2">
            <AlertTriangle className="h-6 w-6 text-yellow-500" />
            <span>Your browser has a unique fingerprint that can track you across the web</span>
          </div>
          <p className="text-gray-400">
            Even without cookies, websites can identify you using these characteristics
          </p>
        </motion.div>

        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <Fingerprint className="h-12 w-12 text-green-500" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Browser Fingerprint
          </h1>
          
          {/* Enhanced explanation section */}
          <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800 mb-8 max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-gray-100 mb-3">Why This Matters</h2>
            <div className="text-left space-y-3">
              <p className="text-gray-400">
                Browser fingerprinting is a powerful tracking technique that identifies you based on your browser's unique characteristics. Unlike cookies, you can't clear or disable it.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-100 mb-2">Privacy Impact</h3>
                  <p className="text-sm text-gray-400">Websites can track your activity across the internet without your consent, even in private/incognito mode.</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-100 mb-2">Persistence</h3>
                  <p className="text-sm text-gray-400">Your fingerprint stays consistent across sessions and can't be easily changed or masked.</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-100 mb-2">Usage</h3>
                  <p className="text-sm text-gray-400">Used for everything from fraud prevention to invasive advertising and surveillance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {fingerprint && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FingerprintCard
              icon={<Globe2 className="h-6 w-6" />}
              title="Browser Information"
              items={[
                { label: 'Browser', value: `${fingerprint.userAgent.browser} ${fingerprint.userAgent.version}` },
                { label: 'Operating System', value: fingerprint.userAgent.os },
                { label: 'Device Type', value: fingerprint.userAgent.device }
              ]}
            />

            <FingerprintCard
              icon={<Languages className="h-6 w-6" />}
              title="Language Settings"
              items={[
                { label: 'Primary Language', value: fingerprint.languages[0] || 'Not detected' },
                { label: 'All Languages', value: fingerprint.languages.join(', ') }
              ]}
            />

            <FingerprintCard
              icon={<Monitor className="h-6 w-6" />}
              title="Screen Information"
              items={[
                { label: 'Resolution', value: `${fingerprint.screen.width}x${fingerprint.screen.height}` },
                { label: 'Color Depth', value: `${fingerprint.screen.colorDepth} bits` },
                { label: 'Pixel Ratio', value: fingerprint.screen.pixelRatio.toString() }
              ]}
            />

            <FingerprintCard
              icon={<Timer className="h-6 w-6" />}
              title="Time Settings"
              items={[
                { label: 'Timezone', value: fingerprint.timezone.zone },
                { label: 'UTC Offset', value: `${fingerprint.timezone.offset} minutes` }
              ]}
            />

            <FingerprintCard
              icon={<Settings className="h-6 w-6" />}
              title="Browser Features"
              items={[
                { label: 'Do Not Track', value: fingerprint.doNotTrack ? 'Enabled' : 'Disabled' },
                { label: 'Cookies Enabled', value: fingerprint.cookiesEnabled ? 'Yes' : 'No' },
                { label: 'Touch Support', value: `${fingerprint.touchSupport.maxTouchPoints} touch points` }
              ]}
            />

            <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800">
              <div className="flex items-center mb-4">
                <Layers className="h-6 w-6 text-green-500 mr-2" />
                <h3 className="text-lg font-semibold">Canvas Fingerprint</h3>
              </div>
              <div className="border border-gray-700 rounded p-4">
                <img 
                  src={fingerprint.canvas.hash} 
                  alt="Canvas fingerprint" 
                  className="mx-auto"
                />
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 text-center text-sm text-gray-400">
          <p>This demonstration shows how browsers can be identified using various characteristics.</p>
          <p>The combination of these values creates a unique fingerprint that can be used to track you.</p>
        </div>
      </div>
    </div>
  );
}