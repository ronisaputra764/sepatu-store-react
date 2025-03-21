import Index from "./pages/index";
import { shoes, categories } from "./data";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CheckBooking from "./pages/CheckBooking";
import ShoeDetails from "./pages/ShoeDetails";
import Category from "./pages/Category";
import Booking from "./pages/Booking";
import CustomerData from "./pages/CustomerData";
import Payment from "./pages/Payment";
import OrderFinished from "./pages/OrderFinished";
import BookingDetails from "./pages/BookingDetails";
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index shoes={shoes} categories={categories} />} />
          <Route path="/check-booking" element={<CheckBooking />} />
          <Route path="/details/:slug" element={<ShoeDetails shoes={shoes} />} />
          <Route path="/category/:slug" element={<Category shoes={shoes} categories={categories} />} />
          <Route path="/booking/:id" element={<Booking shoes={shoes} />} />
          <Route path="/customer-data/:id" element={<CustomerData shoes={shoes} />} />
          <Route path="/payment/:id" element={<Payment shoes={shoes} />} />
          <Route path="/order-finished/:id" element={<OrderFinished shoes={shoes} />} />
          <Route path="/booking-details/:id" element={<BookingDetails shoes={shoes} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
