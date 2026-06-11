import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Marketplace from './pages/Marketplace';
import DishDetail from './pages/DishDetail';
import Cart from './pages/Cart';
import Dashboard from './pages/Dashboard';
import Story from './pages/Story';
import OrderHistory from './pages/OrderHistory';
import SubscriptionHistory from './pages/SubscriptionHistory';
import ProtectedRoute from './components/Auth/ProtectedRoute';

function App() {
    return (
        <div className="app-container">
            <Navbar />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/marketplace" element={<Marketplace />} />
                    <Route path="/dish/:id" element={<DishDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/orders" element={<OrderHistory />} />
                    <Route path="/subscriptions" element={<SubscriptionHistory />} />
                    <Route path="/story" element={<Story />} />

                    <Route path="/dashboard/*" element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } />
                </Routes>
            </main>
        </div>
    );
}

export default App;
