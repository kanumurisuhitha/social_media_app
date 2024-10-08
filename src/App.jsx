import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import AuthPage from './pages/AuthPage/AuthPage';
import PageLayout from './layouts/PageLayout/PageLayout';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import VerificationPage from './components/AuthForm/VerificationPage ';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, fireStore } from './firebase/firebase';
import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import useAuthStore from './store/authstore';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

function App() {
  const [authUser, loading] = useAuthState(auth);
  const toast = useToast();
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    console.log('%cStop!', 'color: red; font-size: 40px; font-weight: bold;');
    console.log('%cThis is a browser feature intended for developers. If someone told you to copy and paste something here to enable a feature or "hack" an account, it is a scam and will give them access to your account.', 'color: black; font-size: 20px;');
    
    const handleOnline = () => {
      console.log('Online');
      toast.closeAll();
      toast({
        title: "Connection Restored",
        description: "You are back online.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    };

    const handleOffline = () => {
      console.log('Offline');
      toast({
        title: "Connection Lost",
        description: "You are currently offline. Some features may not be available.",
        status: "error",
        duration: null,
        isClosable: true,
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check initial connection status
    if (!navigator.onLine) {
      handleOffline();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [toast]);

  useEffect(() => {
    const fetchUser = async () => {
      if (authUser) {
        const userDocRef = doc(fireStore, "users", authUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          if (authUser.emailVerified !== userData.emailVerified) {
            await updateDoc(userDocRef, { emailVerified: authUser.emailVerified });
          }
          setUser({ ...userData, emailVerified: authUser.emailVerified });
        }
      }
    };

    fetchUser();
  }, [authUser, setUser]);

  if (loading) return <div>Loading...</div>;

  return (
    <PageLayout>
      <Routes>
        <Route path='/' element={authUser ? (authUser.emailVerified ? <HomePage /> : <Navigate to="/verify-email" />) : <Navigate to="/auth" />} />
        <Route path='/auth' element={!authUser ? <AuthPage /> : <Navigate to="/" />} />
        <Route path='/:username' element={<ProfilePage />} />
        <Route path='/verify-email' element={<VerificationPage />} />
      </Routes>
    </PageLayout>
  );
}

export default App;
