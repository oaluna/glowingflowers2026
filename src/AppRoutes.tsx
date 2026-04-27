import { Routes, Route } from "react-router-dom";
import HomePage from "@/components/HomePage";
import Cart from "@/components/Cart"
import Catalog from "@/components/Catalog"
import Checkout from "@/components/Checkout"
import CustomOrder from "@/components/CustomOrder"
import EventBooking from "@/components/EventBooking"
import Login from "@/components/Login"


export default function AppRoutes() {
    return (
        <Routes>
            {/* Define your routes here */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/custom-order" element={<CustomOrder />} />
            <Route path="/event-booking" element={<EventBooking />} />
        </Routes>
    );
}