'use client';

import { checkUser } from '@/utils/auth'; // ✅ Step 1: Import checkUser
import { firebaseAuth } from '@/utils/client';
import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext();
AuthContext.displayName = 'AuthContext';

function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [oAuthUser, setOAuthUser] = useState(null); // ✅ Step 2: Track raw Firebase user

  // ✅ Step 3: Provide updateUser function
  const updateUser = useMemo(
    () => (uid) =>
      checkUser(uid).then((gamerInfo) => {
        setUser({ fbUser: oAuthUser, ...gamerInfo });
      }),
    [oAuthUser],
  );

  // ✅ Step 4: Wire up full user data in onAuthStateChanged
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (fbUser) => {
      if (fbUser) {
        setOAuthUser(fbUser);
        checkUser(fbUser.uid).then((gamerInfo) => {
          setUser({ fbUser, uid: fbUser.uid, ...gamerInfo });
        });
      } else {
        setOAuthUser(false);
        setUser(false);
      }
    });

    return () => unsubscribe(); // cleanup on unmount
  }, []);

  // ✅ Step 5: Update context value memo
  const value = useMemo(
    () => ({
      user,
      userLoading: user === null || oAuthUser === null,
      updateUser,
    }),
    [user, oAuthUser, updateUser],
  );

  return <AuthContext.Provider value={value} {...props} />;
}

const AuthConsumer = AuthContext.Consumer;

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthConsumer, AuthProvider, useAuth };
