import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity,
  Shield,
  Lock,
  CreditCard,
  Heart,
  Briefcase,
  ShoppingBag,
  Building2,
  Share2,
  Key,
  Brain,
  MapPin,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PrivacyArea {
  id: string;
  title: string;
  icon: any;
  description: string;
  examples: string[];
  risks: string[];
  bestPractices: string[];
}

const privacyAreas: PrivacyArea[] = [
  {
    id: 'advertising',
    title: 'Advertising & Marketing',
    icon: Share2,
    description: 'How your data is used for targeted advertising and marketing.',
    examples: [
      'Targeted ads across websites',
      'Email marketing profiles',
      'Social media advertising',
      'Cross-device tracking'
    ],
    risks: [
      'Detailed behavioral profiles',
      'Cross-platform tracking',
      'Data sold to third parties',
      'Privacy policy changes'
    ],
    bestPractices: [
      'Use ad blockers',
      'Opt out of personalized ads',
      'Clear tracking cookies regularly',
      'Use privacy-focused browsers'
    ]
  },
  {
    id: 'financial',
    title: 'Financial Services & Credit',
    icon: CreditCard,
    description: 'Protection of your financial data and credit information.',
    examples: [
      'Credit scoring',
      'Banking transactions',
      'Investment data',
      'Payment history'
    ],
    risks: [
      'Identity theft',
      'Financial fraud',
      'Credit score impact',
      'Unauthorized access'
    ],
    bestPractices: [
      'Monitor credit reports',
      'Use strong authentication',
      'Enable transaction alerts',
      'Regular security audits'
    ]
  },
  {
    id: 'health',
    title: 'Healthcare & Biometric',
    icon: Heart,
    description: 'Protection of medical records and biometric data.',
    examples: [
      'Medical history',
      'Genetic data',
      'Fitness tracking',
      'Health insurance'
    ],
    risks: [
      'Medical identity theft',
      'Insurance discrimination',
      'Data breaches',
      'Unauthorized sharing'
    ],
    bestPractices: [
      'Review privacy settings',
      'Limit app permissions',
      'Choose secure providers',
      'Regular audits'
    ]
  },
  {
    id: 'employment',
    title: 'Employment & HR',
    icon: Briefcase,
    description: 'Protection of your professional and workplace data.',
    examples: [
      'Employment history',
      'Performance data',
      'Workplace monitoring',
      'Professional profiles'
    ],
    risks: [
      'Workplace surveillance',
      'Career impact',
      'Data retention',
      'Background checks'
    ],
    bestPractices: [
      'Review social media',
      'Understand monitoring',
      'Know your rights',
      'Secure communications'
    ]
  },
  {
    id: 'retail',
    title: 'Retail & Consumer',
    icon: ShoppingBag,
    description: 'Protection of your shopping and consumer behavior data.',
    examples: [
      'Purchase history',
      'Loyalty programs',
      'Shopping preferences',
      'Returns data'
    ],
    risks: [
      'Price discrimination',
      'Profile building',
      'Data breaches',
      'Third-party sharing'
    ],
    bestPractices: [
      'Use guest checkout',
      'Limit loyalty programs',
      'Review permissions',
      'Secure payments'
    ]
  },
  {
    id: 'smart-cities',
    title: 'Smart Cities & Public',
    icon: Building2,
    description: 'Privacy in smart city and public service interactions.',
    examples: [
      'Traffic monitoring',
      'Public WiFi',
      'City services',
      'Surveillance'
    ],
    risks: [
      'Location tracking',
      'Mass surveillance',
      'Data aggregation',
      'Security vulnerabilities'
    ],
    bestPractices: [
      'Use VPN services',
      'Limit location sharing',
      'Secure devices',
      'Privacy settings'
    ]
  },
  {
    id: 'social',
    title: 'Social Media & Content',
    icon: Share2,
    description: 'Protection of your social media and content data.',
    examples: [
      'Social profiles',
      'Content sharing',
      'Friend networks',
      'Engagement data'
    ],
    risks: [
      'Profile exposure',
      'Data mining',
      'Identity theft',
      'Social engineering'
    ],
    bestPractices: [
      'Privacy settings',
      'Content control',
      'Network review',
      'Regular audits'
    ]
  },
  {
    id: 'security',
    title: 'Cybersecurity & Identity',
    icon: Shield,
    description: 'Protection against cyber threats and identity theft.',
    examples: [
      'Passwords',
      'Security questions',
      'Device security',
      'Network access'
    ],
    risks: [
      'Data breaches',
      'Identity theft',
      'Account takeover',
      'Malware'
    ],
    bestPractices: [
      'Strong passwords',
      'Two-factor auth',
      'Security software',
      'Regular updates'
    ]
  },
  {
    id: 'ai',
    title: 'AI & Machine Learning',
    icon: Brain,
    description: 'Privacy in AI and automated decision systems.',
    examples: [
      'AI training data',
      'Automated decisions',
      'Predictive analytics',
      'Voice assistants'
    ],
    risks: [
      'Bias',
      'Profiling',
      'Data exposure',
      'Automated decisions'
    ],
    bestPractices: [
      'Review permissions',
      'Opt-out options',
      'Data minimization',
      'Regular audits'
    ]
  },
  {
    id: 'location',
    title: 'Location & Real Estate',
    icon: MapPin,
    description: 'Protection of location and property data.',
    examples: [
      'GPS tracking',
      'Property records',
      'Location history',
      'Smart homes'
    ],
    risks: [
      'Location tracking',
      'Property exposure',
      'Pattern analysis',
      'Data aggregation'
    ],
    bestPractices: [
      'Location settings',
      'App permissions',
      'Data deletion',
      'Regular review'
    ]
  },
  {
    id: 'education',
    title: 'Education & Learning',
    icon: Brain,
    description: 'Protection of educational and learning data.',
    examples: [
      'Academic records',
      'Learning analytics',
      'Online courses',
      'Assessment data'
    ],
    risks: [
      'Data retention',
      'Profile sharing',
      'Access control',
      'Third-party use'
    ],
    bestPractices: [
      'Privacy settings',
      'Data access review',
      'Secure accounts',
      'Regular audits'
    ]
  }
];

interface Assessment {
  id: string;
  importance: number;
  confidence: number;
}

export function DigitalHealth() {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [currentArea, setCurrentArea] = useState<PrivacyArea | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleAssessment = (area: PrivacyArea) => {
    setCurrentArea(area);
  };

  const submitAssessment = (importance: number, confidence: number) => {
    setAssessments(prev => [
      ...prev.filter(a => a.id !== currentArea?.id),
      { id: currentArea?.id || '', importance, confidence }
    ]);
    setCurrentArea(null);
  };

  const getCompletionPercentage = () => {
    return (assessments.length / privacyAreas.length) * 100;
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
            <Activity className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Digital Privacy Health Check
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Assess your privacy practices across different areas of digital life. Understand your risks and get personalized recommendations.
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Assessment Progress</span>
            <span className="text-sm font-medium">{Math.round(getCompletionPercentage())}%</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-500"
              style={{ width: `${getCompletionPercentage()}%` }}
            />
          </div>
        </div>

        {currentArea ? (
          // Assessment Modal
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-gray-900/50 p-8 rounded-xl backdrop-blur-sm border border-gray-800">
              {/* Back Button */}
              <Button
                variant="ghost"
                className="mb-6 text-gray-400 hover:text-white hover:bg-gray-800"
                onClick={() => setCurrentArea(null)}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Overview
              </Button>

              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <currentArea.icon className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{currentArea.title}</h2>
                  <p className="text-gray-400">{currentArea.description}</p>
                </div>
              </div>

              <div className="space-y-6 mb-8">
                {/* Examples */}
                <div>
                  <h3 className="text-lg font-medium mb-3">Common Examples</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {currentArea.examples.map((example, index) => (
                      <div key={index} className="flex items-center gap-2 text-gray-300">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                        <span>{example}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Risks */}
                <div>
                  <h3 className="text-lg font-medium mb-3">Key Risks</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {currentArea.risks.map((risk, index) => (
                      <div key={index} className="flex items-center gap-2 text-gray-300">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                        <span>{risk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Best Practices */}
                <div>
                  <h3 className="text-lg font-medium mb-3">Best Practices</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {currentArea.bestPractices.map((practice, index) => (
                      <div key={index} className="flex items-center gap-2 text-gray-300">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                        <span>{practice}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Assessment Questions */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">How important is privacy in this area to you?</h3>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <Button
                        key={value}
                        variant="outline"
                        className="flex-1 hover:bg-green-500/10 hover:border-green-500"
                        onClick={() => submitAssessment(value, 0)}
                      >
                        {value}
                      </Button>
                    ))}
                  </div>
                  <div className="flex justify-between mt-1 text-sm text-gray-400">
                    <span>Not Important</span>
                    <span>Very Important</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">How confident are you in your current privacy practices?</h3>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <Button
                        key={value}
                        variant="outline"
                        className="flex-1 hover:bg-green-500/10 hover:border-green-500"
                        onClick={() => submitAssessment(0, value)}
                      >
                        {value}
                      </Button>
                    ))}
                  </div>
                  <div className="flex justify-between mt-1 text-sm text-gray-400">
                    <span>Not Confident</span>
                    <span>Very Confident</span>
                  </div>
                </div>
              </div>

              <Button
                className="w-full mt-8 bg-green-500 hover:bg-green-600"
                onClick={() => setCurrentArea(null)}
              >
                Skip Assessment
              </Button>
            </div>
          </motion.div>
        ) : (
          // Privacy Areas Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {privacyAreas.map((area) => {
              const assessment = assessments.find(a => a.id === area.id);
              return (
                <motion.div
                  key={area.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`
                    bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border transition-colors
                    ${assessment ? 'border-green-500/50' : 'border-gray-800 hover:border-green-500/30'}
                  `}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-green-500/10 rounded-lg">
                      <area.icon className="w-6 h-6 text-green-500" />
                    </div>
                    <h3 className="text-lg font-semibold">{area.title}</h3>
                  </div>

                  <p className="text-gray-400 mb-6">{area.description}</p>

                  {assessment ? (
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Importance</span>
                          <span className="font-medium">{assessment.importance}/5</span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500"
                            style={{ width: `${(assessment.importance / 5) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Confidence</span>
                          <span className="font-medium">{assessment.confidence}/5</span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500"
                            style={{ width: `${(assessment.confidence / 5) * 100}%` }}
                          />
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full mt-2"
                        onClick={() => handleAssessment(area)}
                      >
                        Reassess
                      </Button>
                    </div>
                  ) : (
                    <Button
                      className="w-full bg-green-500 hover:bg-green-600"
                      onClick={() => handleAssessment(area)}
                    >
                      Assess Now
                    </Button>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Results Button */}
        {assessments.length > 0 && !currentArea && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 text-center"
          >
            <Button
              className="bg-green-500 hover:bg-green-600"
              onClick={() => setShowResults(true)}
              disabled={assessments.length < privacyAreas.length}
            >
              {assessments.length < privacyAreas.length ? (
                `Complete All Assessments (${assessments.length}/${privacyAreas.length})`
              ) : (
                'View Detailed Results'
              )}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}