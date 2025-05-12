import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Admin/User pages
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

// Retailer pages
import RetailerLogin from './pages/retailers/retailerlogin';
import ProductCatalog from './pages/retailers/products-catalog';
import CartPage from './pages/retailers/cartPage';
import ProductDetail from './pages/retailers/productDetail';
import OrdersPage from './pages/retailers/orderspage';
import PaymentPage from './pages/retailers/PaymentPage';
import RedirectPage from './pages/retailers/RedirectPage';

// Contexts
import { AuthProvider } from './context/AuthProvider';
import { SnackbarProvider } from './context/SnackbarContext';


function App() {
  return (
    <SnackbarProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Common Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/error" element={<ErrorPage />} />

            {/* Protected Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/materials" element={<Materials />} />
              <Route path="/track-orders" element={<OrderTracking />} />
              <Route path="/profile-mgt" element={<ProfileMgt />} />
              <Route path="/profile-setup" element={<ProfileSetup />} />
            </Route>

            {/* Retailer Routes (Public) */}
            <Route path="/rlandingpage" element={<RLandingPage />} />
            <Route path="/loginretailer" element={<RetailerLogin />} />
            <Route path="/productcatalog" element={<ProductCatalog />} />
            <Route path="/cartpage" element={<CartPage />} />
            <Route path="/productdetail" element={<ProductDetail />} />
            <Route path="/productauthenticity" element={<OrdersPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/redirect" element={<RedirectPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </SnackbarProvider>
  );
}

export default App;
