import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, X, ArrowRight, Loader2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { useAuth } from './AuthProvider';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

export function AuthModal({ isOpen, onClose, message }: AuthModalProps) {
  const { isSupabaseConfigured, isSupabaseConnected } = useAuth();
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isSupabaseConfigured) {
      setError('Please connect to Supabase first using the button in the top right corner.');
      return;
    }

    if (!isSupabaseConnected) {
      setError('Unable to connect to the database. Please try again later.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      if (method === 'email') {
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });

        if (error) throw error;
        setMessage('Check your email for the login link!');
      } else {
        const { error } = await supabase.auth.signInWithOtp({
          phone,
        });

        if (error) throw error;
        setMessage('Check your phone for the verification code!');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-gray-900 rounded-xl p-6 w-full max-w-md relative border border-gray-800"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Join Cryptameleon
        </h2>

        {message && (
          <p className="text-gray-400 mb-6">{message}</p>
        )}

        {!isSupabaseConfigured ? (
          <div className="text-center p-6">
            <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <p className="text-gray-400 mb-4">
              Please click the "Connect to Supabase" button in the top right corner to enable authentication.
            </p>
          </div>
        ) : !isSupabaseConnected ? (
          <div className="text-center p-6">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-gray-400 mb-4">
              Unable to connect to the database. Please try again later.
            </p>
          </div>
        ) : (
          <>
            <div className="flex gap-2 mb-6">
              <Button
                variant={method === 'email' ? 'default' : 'outline'}
                className={method === 'email' ? 'bg-green-500 hover:bg-green-600' : ''}
                onClick={() => setMethod('email')}
              >
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
              <Button
                variant={method === 'phone' ? 'default' : 'outline'}
                className={method === 'phone' ? 'bg-green-500 hover:bg-green-600' : ''}
                onClick={() => setMethod('phone')}
              >
                <Phone className="w-4 h-4 mr-2" />
                Phone
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {method === 'email' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
                    required
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 555-5555"
                    className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
                    required
                  />
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4 mr-2" />
                )}
                Continue with {method === 'email' ? 'Email' : 'Phone'}
              </Button>

              {error && (
                <p className="text-sm text-red-400">{error}</p>
              )}
            </form>

            <p className="mt-4 text-sm text-gray-400 text-center">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
}