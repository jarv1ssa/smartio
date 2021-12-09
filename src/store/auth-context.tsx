import {
  EmailAuthProvider,
  User,
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  updatePassword,
  updateProfile,
} from "@firebase/auth";
import { auth } from "../firebase";
import { createContext, useEffect, useState } from "react";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signup: (
    displayName: string,
    email: string,
    password: string
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  setProfile: (displayName?: string, photoURL?: string) => Promise<void>;
  setPassword: (oldPassword: string, password: string) => Promise<void>;
  deleteAccount: (password: string) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  const setProfile = async (displayName?: string, photoURL?: string) => {
    try {
      await updateProfile(auth.currentUser!, {
        displayName,
        photoURL,
      });

      setUser({
        ...user!,
        displayName: displayName || auth.currentUser?.displayName!,
        photoURL: photoURL || auth.currentUser?.photoURL!,
      });
    } catch (err) {
      throw err;
    }
  };

  const setPassword = async (oldPassword: string, password: string) => {
    try {
      const credential = EmailAuthProvider.credential(
        auth.currentUser?.email!,
        oldPassword
      );

      await reauthenticateWithCredential(auth.currentUser!, credential);
      await updatePassword(auth.currentUser!, password);
    } catch (err) {
      throw err;
    }
  };

  const deleteAccount = async (password: string) => {
    try {
      const credential = EmailAuthProvider.credential(
        auth.currentUser?.email!,
        password
      );

      await reauthenticateWithCredential(auth.currentUser!, credential);
      await deleteUser(auth.currentUser!);

      setUser(null);
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
        setProfile,
        setPassword,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
