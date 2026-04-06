import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

/**
 * Lightweight auth system backed by localStorage.
 *
 * Stored format in localStorage:
 *   "ashaVaniUsers"  → JSON array of { name, phone, password }
 *   "ashaVaniUser"   → JSON object of the currently logged-in user { name, phone }
 */

const USERS_KEY = "ashaVaniUsers";
const SESSION_KEY = "ashaVaniUser";

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY)) || null;
    } catch {
      return null;
    }
  });

  // Persist session changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  }, [user]);

  /** Register a new user. Returns { success, error }. */
  function signup({ name, phone, password }) {
    if (!name || !phone || !password) {
      return { success: false, error: "All fields are required." };
    }

    const users = getUsers();
    const exists = users.some((u) => u.phone === phone);
    if (exists) {
      return { success: false, error: "An account with this phone already exists." };
    }

    users.push({ name, phone, password });
    saveUsers(users);

    // Auto-login after signup
    setUser({ name, phone });
    return { success: true };
  }

  /** Login with phone + password. Returns { success, error }. */
  function login({ phone, password }) {
    if (!phone || !password) {
      return { success: false, error: "Please enter your credentials." };
    }

    const users = getUsers();
    const match = users.find((u) => u.phone === phone && u.password === password);

    if (!match) {
      return { success: false, error: "Invalid credentials. Please try again." };
    }

    setUser({ name: match.name, phone: match.phone });
    return { success: true };
  }

  /** Logout the current user. */
  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/** Hook to access auth context. */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
