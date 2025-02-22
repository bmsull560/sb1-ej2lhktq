import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { SideNav } from '@/components/layout/SideNav';
import { PageTransition } from '@/components/layout/PageTransition';
import { AuthProvider } from '@/components/auth/AuthProvider';
import { PrivacyCheckupGuard } from '@/components/auth/PrivacyCheckupGuard';
import { ChatButton } from '@/components/chat/ChatButton';

// Import your page components here
import { Home } from '@/pages/Home';
import { Dashboard } from '@/pages/Dashboard';
import { PrivacyTools } from '@/pages/PrivacyTools';
import { PrivacyLaw } from '@/pages/PrivacyLaw';
import { News } from '@/pages/News';
import { PrivacyPolicyDirectory } from '@/pages/PrivacyPolicyDirectory';
import { SpamPrevention } from '@/pages/SpamPrevention';
import { CompanyDetails } from '@/pages/CompanyDetails';
import { OptOut } from '@/pages/OptOut';
import { SSI } from '@/pages/SSI';
import { Metrics } from '@/pages/Metrics';
import { Trends } from '@/pages/Trends';
import { ScamDetector } from '@/pages/ScamDetector';
import { BrowserPrivacy } from '@/pages/BrowserPrivacy';
import StopDataSharing from '@/pages/StopDataSharing';
import CombatPoliceTech from '@/pages/CombatPoliceTech';
import { DigitalHealth } from '@/pages/DigitalHealth';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <PrivacyCheckupGuard>
          <div className="min-h-screen bg-black text-white">
            <Routes>
              {/* Landing page without nav */}
              <Route path="/" element={<Home />} />
              
              {/* Protected routes with nav */}
              <Route path="/*" element={
                <>
                  <SideNav />
                  <main className="pl-[72px]">
                    <AnimatePresence mode="wait">
                      <Routes>
                        <Route path="/digital-health" element={
                          <PageTransition>
                            <DigitalHealth />
                          </PageTransition>
                        } />
                        <Route path="/dashboard" element={
                          <PageTransition>
                            <Dashboard />
                          </PageTransition>
                        } />
                        <Route path="/privacy-policy-directory" element={
                          <PageTransition>
                            <PrivacyPolicyDirectory />
                          </PageTransition>
                        } />
                        <Route path="/privacy-policy-directory/:companyId" element={
                          <PageTransition>
                            <CompanyDetails />
                          </PageTransition>
                        } />
                        <Route path="/privacy-law" element={
                          <PageTransition>
                            <PrivacyLaw />
                          </PageTransition>
                        } />
                        <Route path="/news" element={
                          <PageTransition>
                            <News />
                          </PageTransition>
                        } />
                        <Route path="/tools" element={
                          <PageTransition>
                            <PrivacyTools />
                          </PageTransition>
                        } />
                        <Route path="/opt-out" element={
                          <PageTransition>
                            <OptOut />
                          </PageTransition>
                        } />
                        <Route path="/spam-prevention" element={
                          <PageTransition>
                            <SpamPrevention />
                          </PageTransition>
                        } />
                        <Route path="/ssi" element={
                          <PageTransition>
                            <SSI />
                          </PageTransition>
                        } />
                        <Route path="/metrics" element={
                          <PageTransition>
                            <Metrics />
                          </PageTransition>
                        } />
                        <Route path="/trends" element={
                          <PageTransition>
                            <Trends />
                          </PageTransition>
                        } />
                        <Route path="/scam-detector" element={
                          <PageTransition>
                            <ScamDetector />
                          </PageTransition>
                        } />
                        <Route path="/browser-privacy" element={
                          <PageTransition>
                            <BrowserPrivacy />
                          </PageTransition>
                        } />
                        <Route path="/stop-data-sharing" element={
                          <PageTransition>
                            <StopDataSharing />
                          </PageTransition>
                        } />
                        <Route path="/combat-police-tech" element={
                          <PageTransition>
                            <CombatPoliceTech />
                          </PageTransition>
                        } />
                      </Routes>
                    </AnimatePresence>
                  </main>
                  <ChatButton />
                </>
              } />
            </Routes>
          </div>
        </PrivacyCheckupGuard>
      </Router>
    </AuthProvider>
  );
}