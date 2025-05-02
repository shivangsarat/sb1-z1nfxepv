import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Types
type User = {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  photoUrl?: string;
};

type AuthState = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: User | null;
};

type AuthAction =
  | { type: 'INITIALIZE'; payload: { isAuthenticated: boolean; user: User | null } }
  | { type: 'LOGIN'; payload: { user: User } }
  | { type: 'LOGOUT' }
  | { type: 'REGISTER'; payload: { user: User } };

type AuthContextValue = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string, phone?: string) => Promise<void>;
  signOut: () => Promise<void>;
};

// Context
const AuthContext = createContext<AuthContextValue | null>(null);

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'INITIALIZE':
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
        isInitialized: true,
      };
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case 'REGISTER':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    default:
      return state;
  }
};

// Provider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: false,
    isInitialized: false,
    user: null,
  });

  useEffect(() => {
    const initialize = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        
        if (user) {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user: JSON.parse(user),
            },
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error('Failed to initialize auth:', err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const signIn = async (email: string, password: string) => {
    // This is a mock implementation - in a real app, you'd call an API
    return new Promise<void>((resolve, reject) => {
      setTimeout(async () => {
        // Mock validation - in real app, this would be server-side
        if (email === 'user@example.com' && password === 'password') {
          const user: User = {
            id: '1',
            email,
            fullName: 'Demo User',
            phone: '+1 (555) 123-4567',
          };
          
          await AsyncStorage.setItem('user', JSON.stringify(user));
          
          dispatch({
            type: 'LOGIN',
            payload: { user },
          });
          
          resolve();
        } else {
          // For demo purposes, automatically succeed with any credentials
          const user: User = {
            id: Math.random().toString(36).substring(2, 9),
            email,
            fullName: email.split('@')[0],
          };
          
          await AsyncStorage.setItem('user', JSON.stringify(user));
          
          dispatch({
            type: 'LOGIN',
            payload: { user },
          });
          
          resolve();
        }
      }, 1000);
    });
  };

  const signUp = async (email: string, password: string, fullName: string, phone?: string) => {
    // This is a mock implementation - in a real app, you'd call an API
    return new Promise<void>((resolve) => {
      setTimeout(async () => {
        const user: User = {
          id: Math.random().toString(36).substring(2, 9),
          email,
          fullName,
          phone,
        };
        
        await AsyncStorage.setItem('user', JSON.stringify(user));
        
        dispatch({
          type: 'REGISTER',
          payload: { user },
        });
        
        resolve();
      }, 1000);
    });
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;