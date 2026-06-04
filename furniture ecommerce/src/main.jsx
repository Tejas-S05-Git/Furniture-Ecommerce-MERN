
import { createRoot } from 'react-dom/client'
import './index.css'
import "remixicon/fonts/remixicon.css";
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AOS from "aos";
import "aos/dist/aos.css";
import CartProvider from './context/CartContext.jsx';
import { Toaster } from "react-hot-toast";
import { WishlistProvider } from "./context/WishlistContext";
import OrderProvider from './context/OrderContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthProvider>
  <OrderProvider>
    <CartProvider>
      <WishlistProvider>
      <App />
      </WishlistProvider>
      <Toaster position="top-right" toastOptions={{duration: 2500, style: { background: "#204A25",color: "#fff", borderRadius: "14px", padding: "14px 18px", fontWeight: "500",},}}/>
    </CartProvider>
    </OrderProvider>
    </AuthProvider>
  </BrowserRouter>
)
