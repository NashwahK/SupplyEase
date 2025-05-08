import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ErrorPage from './pages/ErrorPage';
import Products from './pages/Products';
import Materials from './pages/Materials';
import RLandingPage from './pages/retailers/RLandingPage';
import PrivateRoute from './components/PrivateRoute';
import ProfileSetup from './pages/ProfileSetup';
import OrderTracking from './pages/OrderTracking';
import ProfileMgt from './pages/ProfileMgt';

import { AuthProvider } from './context/AuthProvider';
import { SnackbarProvider } from './context/SnackbarContext';


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
          <Route path="/products" element={<Products />} />
          <Route path="/materials" element={<Materials />}/>
          <Route path="/track-orders" element={<OrderTracking />} />
          <Route path="/profile-mgt" element={<ProfileMgt />} />
          <Route path="/rlandingpage" element={<RLandingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    </SnackbarProvider>
  );
}

export default App;
