import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, 
  PieChart, 
  BarChart, 
  Activity, 
  Shield,
  Users,
  Database,
  Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const dashboards = [
  {
    id: 'privacy-score',
    name: 'Privacy Score',
    icon: Shield,
    description: 'Overall privacy health and compliance metrics',
    metrics: [
      { label: 'Overall Score', value: '85%', trend: '+5%' },
      { label: 'Data Protection', value: '92%', trend: '+2%' },
      { label: 'Consent Management', value: '78%', trend: '-3%' },
      { label: 'Access Controls', value: '88%', trend: '+4%' }
    ]
  },
  {
    id: 'data-requests',
    name: 'Data Subject Requests',
    icon: Users,
    description: 'Track and analyze privacy request metrics',
    metrics: [
      { label: 'Total Requests', value: '1,247', trend: '+12%' },
      { label: 'Avg Response Time', value: '4.2 days', trend: '-0.8 days' },
      { label: 'Completion Rate', value: '94%', trend: '+2%' },
      { label: 'Pending Requests', value: '23', trend: '-5' }
    ]
  },
  {
    id: 'data-flows',
    name: 'Data Flow Analysis',
    icon: Database,
    description: 'Monitor data movement and processing activities',
    metrics: [
      { label: 'Active Data Flows', value: '156', trend: '+8' },
      { label: 'Cross-border Transfers', value: '34', trend: '+2' },
      { label: 'High-risk Processes', value: '12', trend: '-3' },
      { label: 'Data Categories', value: '28', trend: '0' }
    ]
  },
  {
    id: 'security',
    name: 'Security Metrics',
    icon: Lock,
    description: 'Security and breach prevention statistics',
    metrics: [
      { label: 'Security Score', value: '91%', trend: '+3%' },
      { label: 'Vulnerabilities', value: '8', trend: '-4' },
      { label: 'Incident Response', value: '99.9%', trend: '+0.1%' },
      { label: 'Encryption Coverage', value: '96%', trend: '+2%' }
    ]
  },
  {
    id: 'compliance',
    name: 'Compliance Dashboard',
    icon: Activity,
    description: 'Regulatory compliance tracking and reporting',
    metrics: [
      { label: 'GDPR Compliance', value: '94%', trend: '+1%' },
      { label: 'CCPA Compliance', value: '96%', trend: '+2%' },
      { label: 'Policy Updates', value: '12', trend: '+3' },
      { label: 'Training Coverage', value: '89%', trend: '+5%' }
    ]
  }
];

export function Metrics() {
  const [selectedDashboard, setSelectedDashboard] = useState(dashboards[0].id);

  const currentDashboard = dashboards.find(d => d.id === selectedDashboard);

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Privacy Metrics & Analytics
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Monitor and analyze key privacy and data protection metrics across your organization.
          </p>
        </motion.div>

        {/* Dashboard Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {dashboards.map((dashboard) => (
            <Button
              key={dashboard.id}
              variant={selectedDashboard === dashboard.id ? 'default' : 'outline'}
              className={`flex items-center gap-2 ${
                selectedDashboard === dashboard.id
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'border-gray-700 hover:border-green-500'
              }`}
              onClick={() => setSelectedDashboard(dashboard.id)}
            >
              <dashboard.icon className="w-4 h-4" />
              <span className="truncate">{dashboard.name}</span>
            </Button>
          ))}
        </div>

        {/* Selected Dashboard */}
        {currentDashboard && (
          <motion.div
            key={currentDashboard.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Dashboard Header */}
            <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <currentDashboard.icon className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{currentDashboard.name}</h2>
                  <p className="text-gray-400">{currentDashboard.description}</p>
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentDashboard.metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800"
                >
                  <h3 className="text-gray-400 mb-2">{metric.label}</h3>
                  <div className="flex items-end gap-3">
                    <span className="text-3xl font-bold">{metric.value}</span>
                    <span className={`text-sm ${
                      metric.trend.startsWith('+') ? 'text-green-400' : 
                      metric.trend.startsWith('-') ? 'text-red-400' : 
                      'text-gray-400'
                    }`}>
                      {metric.trend}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Placeholder for Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800 h-[300px] flex items-center justify-center">
                <LineChart className="w-12 h-12 text-gray-600" />
              </div>
              <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800 h-[300px] flex items-center justify-center">
                <BarChart className="w-12 h-12 text-gray-600" />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}