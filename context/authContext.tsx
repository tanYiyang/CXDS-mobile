import { useContext, createContext, useState, type PropsWithChildren } from 'react';
import { useStorageState } from '@/hooks/useStorageState';

const AuthContext = createContext<{
  signIn: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  session: string | null; // Update type to string | null
  isLoading: boolean;
}>({
  signIn: async () => {},
  register: async () => {},
  signOut: () => {},
  session: null,
  isLoading: false,
});

// Hook to access the authentication state
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }
  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session'); // Use destructuring here
  const [loading, setLoading] = useState(false); // Manage loading state separately

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true); // Set loading state to true

      // Call the backend authentication API for sign-in
      const response = await fetch('https://your-api.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      // Extract the session token from the response
      const { token } = await response.json();

      // Store the token in session storage
      setSession(token);

    } catch (error) {
      console.error('Sign-in error:', error);
      throw new Error('Authentication failed');
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  const register = async (email: string, password: string) => {
    try {
      setLoading(true); // Set loading state to true

      // Call the backend authentication API for registration
      const response = await fetch('https://your-api.com/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Registration failed');
      }

      // Optionally handle successful registration (e.g., auto sign in or show a message)
      const { token } = await response.json();
      setSession(token); // Automatically sign in after registration

    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Registration failed');
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  const signOut = () => {
    setSession(null); // Clear the session and reset the state
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        register,
        signOut,
        session, // session is a string or null now
        isLoading: loading, // Use local loading state
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
