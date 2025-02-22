import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  Fingerprint,
  LayoutDashboard,
  Shield,
  LineChart,
  Globe,
  Database,
  Users,
  Building2,
  ShieldAlert,
  FileText,
  Wrench,
  Newspaper
} from 'lucide-react';

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/digital-health', label: 'Privacy Checkup', icon: Shield },
  { path: '/metrics', label: 'Data Footprint', icon: LineChart },
  { path: '/browser-privacy', label: 'Web Privacy', icon: Globe },
  { path: '/privacy-policy-directory', label: 'Privacy Directory', icon: Database },
  { path: '/privacy-law', label: 'Privacy Laws', icon: FileText },
  { path: '/news', label: 'News & Alerts', icon: Newspaper },
  { path: '/tools', label: 'Privacy Tools', icon: Wrench },
  { path: '/scam-detector', label: 'Scam Detector', icon: ShieldAlert },
  { path: '/combat-police-tech', label: 'Surveillance', icon: Users },
  { path: '/stop-data-sharing', label: 'Data Control', icon: Database },
  { path: '/opt-out', label: 'Opt-Out Tools', icon: Building2 }
];

export function SideNav() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <motion.nav
      initial={false}
      animate={{ 
        width: isOpen ? 240 : 72,
        transition: { duration: 0.2, ease: 'easeInOut' }
      }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className="fixed left-0 top-0 h-screen bg-gray-900/95 backdrop-blur-sm border-r border-gray-800 z-50"
    >
      {/* Logo */}
      <Link 
        to="/dashboard"
        className="h-16 flex items-center px-4 border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
      >
        <Fingerprint className="w-6 h-6 text-green-500 flex-shrink-0" />
        <AnimatePresence>
          {isOpen && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="ml-3 font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent whitespace-nowrap overflow-hidden"
            >
              Cryptameleon
            </motion.span>
          )}
        </AnimatePresence>
      </Link>

      {/* Navigation Items */}
      <div className="py-4 flex flex-col gap-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-2.5 transition-colors relative group
              ${location.pathname === item.path
                ? 'text-green-500'
                : 'text-gray-400 hover:text-white'
              }`}
          >
            {/* Active Indicator */}
            {location.pathname === item.path && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute left-0 w-1 h-6 bg-green-500 rounded-r-full"
              />
            )}
            
            <item.icon className="w-5 h-5 flex-shrink-0" />
            
            <AnimatePresence>
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="ml-3 whitespace-nowrap overflow-hidden"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Tooltip */}
            {!isOpen && (
              <div className="absolute left-16 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {item.label}
              </div>
            )}
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}