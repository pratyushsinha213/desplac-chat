import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import { useAuthStore } from './store/useAuthStore';
import { Loader2 } from 'lucide-react';
// import { toast } from 'sonner';

const App = () => {

  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();

  console.log({onlineUsers});
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <Loader2 className='size-15 animate-spin' />
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path='/register' element={!authUser ? <RegisterPage /> : <Navigate to="/" />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        {/* <Route path='/settings' element={<SettingsPage />} /> */}
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App;