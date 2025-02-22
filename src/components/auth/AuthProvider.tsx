import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, verifySupabaseConnection } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isSupabaseConfigured: boolean;
  isSupabaseConnected: boolean;
}

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  loading: true,
  error: null,
  isSupabaseConfigured: false,
  isSupabaseConnected: false
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);
  
  const isSupabaseConfigured = Boolean(
    import.meta.env.VITE_SUPABASE_URL && 
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    const checkConnection = async () => {
      if (!isSupabaseConfigured) {
        setLoading(false);
        return;
      }

      const { ok, error: connError } = await verifySupabaseConnection();
      setIsSupabaseConnected(ok);
      if (connError) {
        setError(`Database connection error: ${connError}`);
        setLoading(false);
        return;
      }

      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        
        setUser(session?.user ?? null);

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
          setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to initialize authentication');
      } finally {
        setLoading(false);
      }
    };

    checkConnection();
  }, [isSupabaseConfigured]);

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      error, 
      isSupabaseConfigured,
      isSupabaseConnected 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);