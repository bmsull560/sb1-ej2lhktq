import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Info, FileText, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { USAMap } from '@/components/map/USAMap';
import { StateDetails } from '@/components/map/StateDetails';

export function Resources() {
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

        {/* Federal Laws Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-500" />
              Federal Privacy Laws
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h3 className="font-medium mb-2">HIPAA</h3>
                <p className="text-sm text-gray-400">
                  Health Insurance Portability and Accountability Act - Protects medical information privacy
                </p>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h3 className="font-medium mb-2">GLBA</h3>
                <p className="text-sm text-gray-400">
                  Gramm-Leach-Bliley Act - Requires financial institutions to protect customer data
                </p>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h3 className="font-medium mb-2">COPPA</h3>
                <p className="text-sm text-gray-400">
                  Children's Online Privacy Protection Act - Protects privacy of children under 13
                </p>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h3 className="font-medium mb-2">FERPA</h3>
                <p className="text-sm text-gray-400">
                  Family Educational Rights and Privacy Act - Protects student education records
                </p>
              </div>
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
                <div className="w-4 h-4 bg-gray-700 rounded"></div>
                <span>No Comprehensive Privacy Law</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Interactive Map */}
          <div className="lg:col-span-2 bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800">
            <USAMap selectedState={selectedState} onStateSelect={setSelectedState} />
          </div>

          {/* State Details Panel */}
          <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-green-500" />
              State Details
            </h2>
            <StateDetails stateCode={selectedState} />
          </div>
        </div>
      </div>
    </div>
  );
}