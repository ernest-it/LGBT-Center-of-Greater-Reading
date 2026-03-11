import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import client from '../api/client';

const AuthContext = createContext(null);

// Refresh interval: 20 minutes
const REFRESH_INTERVAL_MS = 20 * 60 * 1000;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [needsSetup, setNeedsSetup] = useState(false);
  const [loading, setLoading] = useState(true);
  const refreshTimer = useRef(null);

  const clearRefreshTimer = useCallback(() => {
    if (refreshTimer.current) {
      clearInterval(refreshTimer.current);
      refreshTimer.current = null;
    }
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      await client.post('/auth/refresh');
    } catch {
      // If refresh fails, the session has expired — log out
      clearRefreshTimer();
      localStorage.removeItem('lcgr_user');
      setUser(null);
    }
  }, [clearRefreshTimer]);

  const startRefreshTimer = useCallback(() => {
    clearRefreshTimer();
    refreshTimer.current = setInterval(refreshToken, REFRESH_INTERVAL_MS);
  }, [clearRefreshTimer, refreshToken]);

  useEffect(() => {
    async function init() {
      try {
        // Check if setup is needed
        const { data } = await client.get('/auth/setup-status');
        if (data.needsSetup) {
          setNeedsSetup(true);
          setLoading(false);
          return;
        }

        // Verify session against the server
        try {
          const { data: meData } = await client.get('/auth/me');
          if (meData?.user) {
            setUser(meData.user);
            localStorage.setItem('lcgr_user', JSON.stringify(meData.user));
            startRefreshTimer();
          }
        } catch {
          // Session invalid or expired — clear UI hint
          localStorage.removeItem('lcgr_user');
        }
      } catch {
        // If backend is down, just proceed to login
      }
      setLoading(false);
    }
    init();

    return () => clearRefreshTimer();
  }, [startRefreshTimer, clearRefreshTimer]);

  const login = async (username, password) => {
    const response = await client.post('/auth/login', { username, password });
    const { user: userData } = response.data;
    localStorage.setItem('lcgr_user', JSON.stringify(userData));
    setUser(userData);
    startRefreshTimer();
    return userData;
  };

  const setAuthData = (_token, userData) => {
    localStorage.setItem('lcgr_user', JSON.stringify(userData));
    setUser(userData);
    setNeedsSetup(false);
    startRefreshTimer();
  };

  const logout = async () => {
    clearRefreshTimer();
    try {
      await client.post('/auth/logout');
    } catch {
      // Even if the server call fails, clear local state
    }
    localStorage.removeItem('lcgr_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, needsSetup, login, logout, setAuthData, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
