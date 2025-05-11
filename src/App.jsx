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

import { AuthProvider } from './context/AuthProvider';
import { SnackbarProvider } from './context/SnackbarContext';
import RetailerLogin from './pages/retailers/retailerlogin';
import ProductCatalog from './pages/retailers/products-catalog';
import CartPage from './pages/retailers/cartPage';
import ProductDetail from './pages/retailers/productDetail';
import OrdersPage from './pages/retailers/orderspage';
import PaymentPage from './pages/retailers/PaymentPage';
import RedirectPage from './pages/retailers/RedirectPage';

function App() {
  return (    
    <SnackbarProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/rlandingpage" element={<RLandingPage />} />
        <Route path="/loginretailer" element={<RetailerLogin/>} />
        <Route path="/productcatalog" element={<ProductCatalog/>}/>
        <Route path='/cartpage' element={<CartPage/>}/>
        <Route path='/productdetail' element={<ProductDetail/>}/>
        <Route path='/productauthenticity' element={<OrdersPage/>}/>
        <Route path='/payment' element={<PaymentPage/>}/>
        <Route path='/redirect' element={<RedirectPage/>}/>
      </Routes>
    </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
