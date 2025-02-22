import { motion } from 'framer-motion';
import { Camera, Shield, AlertTriangle, Info, ExternalLink, Map, Database, Users, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SurveillanceMap } from '@/components/surveillance/SurveillanceMap';

const surveillanceTech = [
  {
    name: 'Facial Recognition',
    icon: Users,
    description: 'Systems that identify individuals by analyzing facial features',
    risks: [
      'Mass surveillance capabilities',
      'High false positive rates',
      'Disproportionate impact on minorities',
      'Chilling effect on public assembly'
    ],
    protections: [
      'Wear face coverings at protests',
      'Support facial recognition bans',
      'Use privacy-preserving masks',
      'Know your right to cover your face'
    ]
  },
  {
    name: 'License Plate Readers',
    icon: Camera,
    description: 'Automated cameras that capture and store license plate data',
    risks: [
      'Movement tracking across cities',
      'Long-term data retention',
      'Sharing with federal agencies',
      'No warrant requirements'
    ],
    protections: [
      'Use public transportation',
      'Support ALPR regulations',
      'Request data deletion',
      'Challenge improper use'
    ]
  },
  {
    name: 'Cell-Site Simulators',
    icon: Database,
    description: 'Devices that mimic cell towers to intercept communications',
    risks: [
      'Bulk data collection',
      'Interference with emergency calls',
      'Location tracking',
      'Message interception'
    ],
    protections: [
      'Use encrypted messaging',
      'Enable airplane mode at protests',
      'Use burner phones when needed',
      'Support warrant requirements'
    ]
  },
  {
    name: 'Police Drones',
    icon: Camera,
    description: 'Unmanned aerial vehicles used for surveillance',
    risks: [
      'Aerial surveillance without warrants',
      'Thermal and infrared imaging',
      'Facial recognition integration',
      'Protest monitoring'
    ],
    protections: [
      'Know drone-free zones',
      'Support drone regulations',
      'Document drone activity',
      'Report privacy violations'
    ]
  }
];

const resources = [
  {
    title: 'Know Your Rights',
    description: 'Learn about your rights when encountering surveillance technology',
    link: 'https://www.eff.org/issues/street-level-surveillance'
  },
  {
    title: 'Report Surveillance',
    description: 'Document and report new surveillance technology in your area',
    link: 'https://atlasofsurveillance.org/submit-data'
  },
  {
    title: 'Take Action',
    description: 'Join local efforts to regulate surveillance technology',
    link: 'https://www.banfacialrecognition.com/take-action/'
  }
];

export default function CombatPoliceTech() {
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
            Combat Police Surveillance
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Track and resist the spread of surveillance technologies used by law enforcement agencies.
          </p>
        </motion.div>

        {/* Surveillance Map */}
        <div className="mb-12">
          <SurveillanceMap />
        </div>

        {/* Surveillance Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-8 text-center">Common Surveillance Technologies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {surveillanceTech.map((tech) => (
              <div
                key={tech.name}
                className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-red-500/10 rounded-lg">
                    <tech.icon className="w-6 h-6 text-red-500" />
                  </div>
                  <h3 className="text-lg font-semibold">{tech.name}</h3>
                </div>
                <p className="text-gray-400 mb-4">{tech.description}</p>

                <div className="space-y-4">
                  {/* Risks */}
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      Risks
                    </h4>
                    <ul className="space-y-1">
                      {tech.risks.map((risk, index) => (
                        <li key={index} className="text-sm text-gray-400 flex items-start gap-2">
                          <span className="w-1 h-1 bg-yellow-500 rounded-full flex-shrink-0 mt-2" />
                          {risk}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Protections */}
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-green-500" />
                      Protections
                    </h4>
                    <ul className="space-y-1">
                      {tech.protections.map((protection, index) => (
                        <li key={index} className="text-sm text-gray-400 flex items-start gap-2">
                          <span className="w-1 h-1 bg-green-500 rounded-full flex-shrink-0 mt-2" />
                          {protection}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {resources.map((resource) => (
            <a
              key={resource.title}
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800 hover:border-green-500/50 transition-colors group"
            >
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                {resource.title}
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-gray-400">{resource.description}</p>
            </a>
          ))}
        </motion.div>
      </div>
    </div>
  );
}