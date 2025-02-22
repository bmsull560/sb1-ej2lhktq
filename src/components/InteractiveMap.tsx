import { useState } from 'react';
import { motion } from 'framer-motion';
import { USAMap } from '@/components/map/USAMap';
import { StateDetails } from '@/components/map/StateDetails';

export default function InteractiveMap() {
  const [selectedState, setSelectedState] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            U.S. Privacy Laws & Regulations
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore privacy laws and regulations across the United States. Click on a state to learn more about its privacy legislation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-500" />
              Federal Privacy Laws
            </h2>
            <div className="space-y-4">
              {/* Add federal law summaries */}
            </div>
          </div>

          <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-green-500" />
              Map Legend
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span>Comprehensive Privacy Law Enacted</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span>Privacy Law Proposed/Pending</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-gray-700 rounded"></div>
                <span>No Comprehensive Privacy Law</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* US Map SVG */}
          <div className="lg:col-span-2 bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800">
            <USAMap selectedState={selectedState} onStateSelect={setSelectedState} />
          </div>

          {/* State Details Panel */}
          <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800">
            <StateDetails stateCode={selectedState} />
          </div>
        </div>
      </div>
    </div>
  );
}