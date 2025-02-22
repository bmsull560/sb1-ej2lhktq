import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { AuthModal } from './AuthModal';

export function PrivacyCheckupGuard({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [lastLocation, setLastLocation] = useState<string | null>(null);

  useEffect(() => {
    const isPrivacyCheckup = location.pathname === '/digital-health';
    const isLeavingPrivacyCheckup = lastLocation === '/digital-health' && !isPrivacyCheckup;

    if (isPrivacyCheckup) {
      setLastLocation('/digital-health');
    } else if (isLeavingPrivacyCheckup && !user && !showAuthModal) {
      setShowAuthModal(true);
    }
  }, [location.pathname, user, lastLocation, showAuthModal]);

  const handleCloseModal = () => {
    setShowAuthModal(false);
    setLastLocation(null); // Reset last location when modal is closed
  };

  return (
    <>
      {children}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={handleCloseModal}
        message="Save your privacy checkup progress and get personalized recommendations by creating a free account."
      />
    </>
  );
}