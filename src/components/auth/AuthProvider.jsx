import { createContext, useContext, useState } from "react";
import { auth } from "../../firebaseConfig/firebase_config";
import {
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [loginError, setError] = useState(null);
  const [signupError, setSignupError] = useState(null);
  const [logined, setlogined] = useState(null);
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setlogined(true);
    } else setlogined(false);
  });
  const signUp = async (registerEmail, registerPassword, userName) => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      setSignupError(null);

      updateProfile(auth.currentUser, {
        displayName: userName,
      })
        .then(() => {
          setSignupError(null);
        })
        .catch((error) => {
          setSignupError(error.message);
        });
    } catch (error) {
      setSignupError(error.message);
    }
  };

  const login = async (loginEmail, loginPassword) => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        signUp,
        loginError,
        signupError,
        logined,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const authFnc = () => {
  return useContext(AuthContext);
};
