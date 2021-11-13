import React from "react";
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "@firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "@firebase/firestore";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signup: (
    displayName: string,
    email: string,
    password: string
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
};

export const AuthContext = React.createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      unsubscribe();
    });
  }, []);

  const signup = async (
    displayName: string,
    email: string,
    password: string
  ) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res.user, { displayName });
      await setDoc(doc(db, "users", res.user.uid), { displayName, email });

      setUser(res.user);
    } catch (err) {
      throw err;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      
      setUser(res.user);
    } catch (err) {
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signup,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
