import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Home from '../Pages/Home';
import About from '../Pages/About';
import NotFound from '../Pages/NotFound';
import Dashboard from '../Pages/Dashboard/Home';
import AdminRoute from './AdminRoute';
import Login from '../Pages/Login';
import Signup from '../Pages/SignUp'; // <-- Fixed import path
import PrivacyStatement from '../Pages/PrivacyStatement';
import Booking from '../Pages/Booking';
import MainLayout from '../Layouts/MainLayout';
import AdminLayout from '../Layouts/AdminLayout';
import BookingsPage from '../Pages/Dashboard/Bookins';
import BookinsNew from '../Pages/Dashboard/Bookins/BookinsNew';
import BookinsModify from '../Pages/Dashboard/Bookins/BookinsModify';
import RoomsPage from '../Pages/Dashboard/Rooms';
import RoomNew from '../Pages/Dashboard/Rooms/RoomNew';
import RoomModify from '../Pages/Dashboard/Rooms/RoomModify';
import ServicesPage from '../Pages/Services';
import ServiceDetail from '../Pages/Services/ServiceDetail';
import Gallery from '../Pages/Gallery';
import AccountLayout from '../Pages/Account';
import Profile from '../Pages/Account/Profile';
import Pets from '../Pages/Account/Pets';
import Reservations from '../Pages/Account/Reservations';
import FAQ from '../Pages/FAQ';
import Terms from '../Pages/Terms';
import Cookies from '../Pages/Cookies';

const LayoutWrapper = () => (
  <MainLayout>
    <Outlet />
  </MainLayout>
);

const LayoutAdminWrapper = () => (
  <AdminLayout>
    <Outlet />
  </AdminLayout>
);

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Public pages with layout */}
      <Route element={<LayoutWrapper />}>
        <Route path="/about" element={<About />} />
        <Route path="/book" element={<Booking />} />
        <Route path="/privacy" element={<PrivacyStatement />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/account" element={<AccountLayout />}>
          <Route path="profile" element={<Profile />} />
          <Route path="pets" element={<Pets />} />
          <Route path="reservations" element={<Reservations />} />
        </Route>
        <Route path="/faq" element={<FAQ />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/cookies" element={<Cookies />} />
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Auth pages without layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<LayoutAdminWrapper />}>
        {/* Admin route */}
        <Route
          path="/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/dashboard/bookings"
          element={
            <AdminRoute>
              <BookingsPage />
            </AdminRoute>
          }
        />
        <Route
          path="/dashboard/bookings/new"
          element={
            <AdminRoute>
              <BookinsNew />
            </AdminRoute>
          }
        />
        <Route
          path="/dashboard/bookings/:id"
          element={
            <AdminRoute>
              <BookinsModify />
            </AdminRoute>
          }
        />
        <Route
          path="/dashboard/rooms"
          element={
            <AdminRoute>
              <RoomsPage />
            </AdminRoute>
          }
        />
        <Route
          path="/dashboard/rooms/new"
          element={
            <AdminRoute>
              <RoomNew />
            </AdminRoute>
          }
        />
        <Route
          path="/dashboard/rooms/:id"
          element={
            <AdminRoute>
              <RoomModify />
            </AdminRoute>
          }
        />
      </Route>

    </Routes>
  </Router>
);

export default AppRouter;