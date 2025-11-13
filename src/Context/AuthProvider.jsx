import React, { useState, useEffect } from "react";
import { auth } from "../Firebase/Firebase.config";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInGoogle = () => signInWithPopup(auth, googleProvider);

  const createUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const signInUser = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const signOutUser = () => signOut(auth);

  const updateUserProfile = (profile) => {
    if (auth.currentUser) {
      return updateProfile(auth.currentUser, profile);
    }
    return Promise.reject("No user logged in");
  };

  const authInfo = {
    user,
    loading,
    signInGoogle,
    createUser,
    signInUser,
    signOutUser,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
