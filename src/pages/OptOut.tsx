import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Info, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  HelpCircle,
  Cookie,
  Globe,
  Monitor,
  Smartphone,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Step content
const steps = [
  {
    id: 'intro',
    title: 'Welcome to Ad Opt-Out',
    description: 'Follow these steps to opt out of interest-based advertising. This process helps reduce targeted ads but won\'t eliminate all advertising.',
    content: [
      {
        title: 'What to Expect',
        items: [
          'You\'ll need to complete opt-outs on two industry websites',
          'Process takes about 5-10 minutes total',
          'Must be repeated for each browser you use',
          'Opt-outs are cookie-based and may need renewal if cookies are cleared'
        ]
      },
      {
        title: 'Before You Start',
        items: [
          'Enable cookies in your browser',
          'Disable any ad blockers temporarily',
          'Have another browser? Repeat these steps there too'
        ]
      }
    ]
  },
  {
    id: 'daa',
    title: 'Digital Advertising Alliance (DAA)',
    description: 'The DAA represents major advertising networks. Their opt-out tool helps reduce targeted ads from participating companies.',
    content: [
      {
        title: 'Instructions',
        items: [
          'Click the button below to open the DAA opt-out tool',
          'Select "Choose All Companies" to opt out of all participating networks',
          'Wait for the opt-out process to complete',
          'Return here after completion'
        ]
      },
      {
        title: 'Important Notes',
        items: [
          'Opt-out must be done for each browser',
          'If you clear cookies, you\'ll need to opt out again',
          'Some companies may take up to a week to process'
        ]
      }
    ],
    link: 'https://optout.aboutads.info/',
    linkText: 'Open DAA Opt-Out Tool'
  },
  {
    id: 'nai',
    title: 'Network Advertising Initiative (NAI)',
    description: 'The NAI is another major advertising industry group. Complete this opt-out for broader coverage.',
    content: [
      {
        title: 'Instructions',
        items: [
          'Click to open the NAI opt-out page',
          'Choose "Select all companies" at the top',
          'Click "Submit Opt-outs" and wait for confirmation',
          'Return here to continue'
        ]
      },
      {
        title: 'Tips',
        items: [
          'Process may take a few minutes to complete',
          'Keep the window open until finished',
          'Verify the success message before closing'
        ]
      }
    ],
    link: 'https://optout.networkadvertising.org/',
    linkText: 'Open NAI Opt-Out Tool'
  },
  {
    id: 'verify',
    title: 'Verify & Next Steps',
    description: 'Ensure your opt-outs are working and learn how to maintain them.',
    content: [
      {
        title: 'Checklist',
        items: [
          'Completed DAA opt-out process',
          'Completed NAI opt-out process',
          'Saved or bookmarked opt-out verification pages',
          'Noted to repeat on other browsers/devices'
        ]
      },
      {
        title: 'Maintaining Your Opt-Outs',
        items: [
          'Consider using browser settings to preserve opt-out cookies',
          'If you clear cookies, return to both sites to opt out again',
          'Check opt-out status periodically (every few months)'
        ]
      }
    ]
  }
];

export function OptOut() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const handleStepComplete = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const isStepCompleted = (stepId: string) => completedSteps.includes(stepId);

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
            Opt Out of Interest-Based Ads
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Follow this step-by-step guide to opt out of targeted advertising through industry-standard tools.
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="flex items-center"
              >
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center
                  ${currentStep === index 
                    ? 'bg-green-500 text-white'
                    : isStepCompleted(step.id)
                    ? 'bg-green-500/20 text-green-500'
                    : 'bg-gray-800 text-gray-400'
                  }
                `}>
                  {isStepCompleted(step.id) ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-full h-1 mx-2 ${
                    isStepCompleted(step.id) ? 'bg-green-500/20' : 'bg-gray-800'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            {steps.map((step) => (
              <div key={step.id} className="w-24 text-center">
                {step.title.split(' ')[0]}
              </div>
            ))}
          </div>
        </div>

        {/* Current Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gray-900/50 p-8 rounded-xl backdrop-blur-sm border border-gray-800">
            <h2 className="text-2xl font-bold mb-2">{steps[currentStep].title}</h2>
            <p className="text-gray-400 mb-8">{steps[currentStep].description}</p>

            <div className="space-y-8">
              {steps[currentStep].content.map((section, index) => (
                <div key={index} className="space-y-4">
                  <h3 className="text-lg font-semibold">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {'link' in steps[currentStep] && (
                <div className="flex flex-col items-center gap-4 mt-8 p-6 bg-gray-800/50 rounded-xl">
                  <Button
                    className="bg-green-500 hover:bg-green-600"
                    onClick={() => window.open(steps[currentStep].link, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {steps[currentStep].linkText}
                  </Button>
                  <p className="text-sm text-gray-400">
                    Opens in a new window. Return here after completion.
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-between mt-8 pt-8 border-t border-gray-800">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
              >
                Back
              </Button>
              <Button
                className="bg-green-500 hover:bg-green-600"
                onClick={() => handleStepComplete(steps[currentStep].id)}
              >
                {currentStep === steps.length - 1 ? (
                  'Finish'
                ) : (
                  <>
                    Continue
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800">
              <Cookie className="w-6 h-6 text-green-500 mb-4" />
              <h3 className="font-medium mb-2">Cookie Settings</h3>
              <p className="text-sm text-gray-400">
                Learn how to manage cookies and preserve your opt-out preferences.
              </p>
            </div>
            <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800">
              <Globe className="w-6 h-6 text-green-500 mb-4" />
              <h3 className="font-medium mb-2">Global Privacy</h3>
              <p className="text-sm text-gray-400">
                Additional opt-out tools for users in different regions.
              </p>
            </div>
            <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800">
              <HelpCircle className="w-6 h-6 text-green-500 mb-4" />
              <h3 className="font-medium mb-2">Help & Support</h3>
              <p className="text-sm text-gray-400">
                Get assistance with the opt-out process or troubleshooting.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}