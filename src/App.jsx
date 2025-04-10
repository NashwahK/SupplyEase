import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ErrorPage from './pages/ErrorPage';
import RLandingPage from './pages/retailers/RLandingPage';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthProvider';
import { SnackbarProvider } from './context/SnackbarContext';
import ProfileSetup from './pages/ProfileSetup';

function App() {
  return (    
    <SnackbarProvider>
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile-setup" element={<ProfileSetup />}/>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/rlandingpage" element={<RLandingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    </SnackbarProvider>
  );
}

export default App;
