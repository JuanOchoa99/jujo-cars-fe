import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import * as auth from '../services/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  userEmail: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  confirmSignUp: (email: string, code: string) => Promise<void>;
  logout: () => Promise<void>;
  getIdToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const checkAuth = useCallback(async () => {
    try {
      const session = await auth.getSession();
      const email = await auth.getCurrentUserEmail();
      setIsAuthenticated(!!session);
      setUserEmail(email);
    } catch {
      setIsAuthenticated(false);
      setUserEmail(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = useCallback(
    async (email: string, password: string) => {
      await auth.signIn(email, password);
      await checkAuth();
    },
    [checkAuth]
  );

  const register = useCallback(
    async (email: string, password: string, name?: string) => {
      await auth.signUp(email, password, name);
    },
    []
  );

  const confirmSignUp = useCallback(
    async (email: string, code: string) => {
      await auth.confirmSignUp(email, code);
    },
    []
  );

  const logout = useCallback(async () => {
    await auth.signOut();
    setIsAuthenticated(false);
    setUserEmail(null);
  }, []);

  const getIdToken = useCallback(async () => {
    const session = await auth.getSession();
    return session?.idToken ?? null;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        userEmail,
        login,
        register,
        confirmSignUp,
        logout,
        getIdToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
