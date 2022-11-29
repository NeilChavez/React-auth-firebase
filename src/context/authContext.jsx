import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, provider } from "../firebase";

const authContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(null);

  const signUp = async (user, password) => {
    //esto devuelve una promise, come dice la documentazione
    return createUserWithEmailAndPassword(auth, user, password);
  };

  const logIn = (user, password) => {
    return signInWithEmailAndPassword(auth, user, password);
  };
  const logOut = () => {
    signOut(auth);
  };

  const signInWithGoogle = () => {
    return signInWithPopup(auth, provider);
  };
  const resetPasswordWithMail = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    // esta function te devuelve el usuario, si esa logeado,
    // o null si no esta loageado
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  return (
    <authContext.Provider
      value={{
        user,
        signUp,
        logIn,
        logOut,
        loading,
        signInWithGoogle,
        resetPasswordWithMail,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default authContext;
export { AuthContextProvider };
