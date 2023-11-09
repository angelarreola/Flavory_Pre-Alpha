// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from './firebase';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Define las funciones de autenticación
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  // Registra el observador de estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Desuscribir al desmontar el componente
    return unsubscribe;
  }, []);

  // Define el objeto de valor que se pasará al contexto
  const value = {
    currentUser,
    login,
    signup,
    logout,
  };

  // Registro de la función login para verificar que está definida
  console.log("login function:", value.login);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
