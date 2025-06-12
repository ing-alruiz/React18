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