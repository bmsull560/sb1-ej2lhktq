import { motion } from 'framer-motion';
import { AlertTriangle, Info } from 'lucide-react';

export function SurveillanceMap() {
  return (
    <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Atlas of Surveillance</h2>
        <a 
          href="https://atlasofsurveillance.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-green-500 hover:text-green-400"
        >
          <Info className="w-5 h-5" />
        </a>
      </div>

      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-gray-800">
        <iframe
          src="https://atlasofsurveillance.org/atlas"
          className="absolute inset-0 w-full h-full"
          allow="fullscreen"
          title="Atlas of Surveillance"
        />
      </div>

      <div className="mt-4 p-4 bg-yellow-500/10 rounded-lg flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-yellow-400">
          This map shows police surveillance technologies deployed across the United States, including facial recognition, drones, body-worn cameras, automated license plate readers, and more.
        </p>
      </div>
    </div>
  );
}