import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getStatePrivacyLaws, getStateName } from '@/lib/supabase/client';
import type { PrivacyLaw, LawProvision } from '@/lib/supabase/types';
import { AlertTriangle, CheckCircle2, XCircle, FileText } from 'lucide-react';

interface StateDetailsProps {
  stateCode: string | null;
}

export function StateDetails({ stateCode }: StateDetailsProps) {
  const [laws, setLaws] = useState<(PrivacyLaw & { law_provisions: LawProvision[] })[]>([]);
  const [stateName, setStateName] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!stateCode) {
      console.log('StateDetails: No state code provided');
      setLaws([]);
      setStateName('');
      setError(null);
      return;
    }
    
    async function loadStateDetails() {
      console.log('StateDetails: Loading details for state:', stateCode);
      setLoading(true);
      setError(null);
      
      try {
        console.log('StateDetails: Fetching data from Supabase...');
        const [lawsData, name] = await Promise.all([
          getStatePrivacyLaws(stateCode),
          getStateName(stateCode)
        ]);
        
        console.log('StateDetails: Loaded data:', { name, laws: lawsData });
        setLaws(lawsData);
        setStateName(name || '');
      } catch (error) {
        console.error('StateDetails: Error loading state details:', error);
        setError('Failed to load state details. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    loadStateDetails();
  }, [stateCode]);

  if (!stateCode) {
    return (
      <div className="text-center text-gray-400 py-8">
        <AlertTriangle className="w-8 h-8 mx-auto mb-4 text-yellow-500" />
        <p>Select a state on the map to view its privacy laws and regulations.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-green-500 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-400 py-8">
        <XCircle className="w-8 h-8 mx-auto mb-4 text-red-500" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-medium">{stateName}</h3>
      
      {laws.length > 0 ? (
        <div className="space-y-6">
          {/* Summary Card */}
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium">Privacy Status</h4>
              <span className={`px-3 py-1 rounded-full text-sm ${
                laws.some(l => l.status === 'enacted') 
                  ? 'bg-green-500/20 text-green-400'
                  : laws.some(l => l.status === 'proposed')
                  ? 'bg-yellow-500/20 text-yellow-400'
                  : 'bg-red-500/20 text-red-400'
              }`}>
                {laws.some(l => l.status === 'enacted') 
                  ? 'Comprehensive Law' 
                  : laws.some(l => l.status === 'proposed')
                  ? 'Proposed Law'
                  : 'No Comprehensive Law'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <FileText className="w-4 h-4 text-green-500" />
              {laws.length} Active {laws.length === 1 ? 'Law' : 'Laws'}
            </div>
          </div>

          {/* Laws List */}
          {laws.map((law) => (
            <motion.div
              key={law.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 bg-gray-800/50 rounded-lg"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{law.name}</h4>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  law.status === 'enacted' ? 'bg-green-500/20 text-green-400' :
                  law.status === 'proposed' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {law.status.charAt(0).toUpperCase() + law.status.slice(1)}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-3 text-sm text-gray-400">
                {law.effective_date && (
                  <div>
                    <span className="block text-xs text-gray-500">Effective Date</span>
                    {new Date(law.effective_date).toLocaleDateString()}
                  </div>
                )}
                {law.bill_number && (
                  <div>
                    <span className="block text-xs text-gray-500">Bill Number</span>
                    {law.bill_number}
                  </div>
                )}
              </div>

              <p className="text-sm text-gray-300 mb-4">{law.description}</p>

              {law.law_provisions && law.law_provisions.length > 0 && (
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-gray-300 mb-2">Key Provisions:</h5>
                  {law.law_provisions.map((provision) => (
                    <p key={provision.id} className="text-sm text-gray-400 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{provision.description}</span>
                    </p>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 py-4">
          <p>No privacy laws found for this state.</p>
        </div>
      )}
    </div>
  );
}