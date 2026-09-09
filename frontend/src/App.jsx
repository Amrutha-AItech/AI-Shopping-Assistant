import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Navbar from './components/Navbar';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import PrivateRouter from './components/PrivateRouter';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ShoppingAssistant from "./components/ShoppingAssistant";
import { getAccessToken } from "./utils/auth";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!getAccessToken());

    useEffect(() => {
        const handleAuthChange = () => {
            setIsLoggedIn(!!getAccessToken());
        };

        window.addEventListener("auth-change", handleAuthChange);

        return () => {
            window.removeEventListener("auth-change", handleAuthChange);
        };
    }, []);

    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<PrivateRouter><CartPage/></PrivateRouter>}/>
                <Route path="/checkout" element={<PrivateRouter><CheckoutPage/></PrivateRouter>} />
                <Route path="/orders" element={<PrivateRouter><OrdersPage /></PrivateRouter>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
            </Routes>
            {isLoggedIn && <ShoppingAssistant />}
        </Router>
    );
}

export default App;