import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
  NavBar,
  Footer
} from "../components";

import {
  Home,
  Login,
  AdminDash,
  CusDash,
  ReceptDash,
  AdminBooking,
  AdminCustomers,
  AdminHalls,
  AdminMessages,
  AdminRecepts,
  AdminRooms,
  Halls,
  Rooms,
  HallOne,
  RoomOne,
  ContactUs
} from "../pages";

const AppRoutes = () => {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/adminDash" element={<AdminDash />} />
          <Route exact path="/cusDash" element={<CusDash />} />
          <Route exact path="/receptDash" element={<ReceptDash />} />
          <Route exact path="/adminBookings" element={<AdminBooking />} />
          <Route exact path="/adminCustomers" element={<AdminCustomers />} />
          <Route exact path="/adminHalls" element={<AdminHalls />} />
          <Route exact path="/adminMessages" element={<AdminMessages />} />
          <Route exact path="/adminRecepts" element={<AdminRecepts />} />
          <Route exact path="/adminRooms" element={<AdminRooms />} />

          <Route exact path="/halls" element={<Halls />} />
          <Route exact path="/rooms" element={<Rooms />} />
          <Route exact path="/hallOne/:id" element={<HallOne />} />
          <Route exact path="/roomOne/:id" element={<RoomOne />} />

          <Route exact path="/contactUs" element={<ContactUs />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default AppRoutes;
