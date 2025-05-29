import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Home from '@Pages/Home';
import About from '@Pages/About';
import NotFound from '@Pages/NotFound';
import Dashboard from '@Pages/Dashboard/Home';
import AdminRoute from './AdminRoute';
import Login from '@Pages/Login';
import Signup from '@Pages/Signup';
import PrivacyStatement from '../Pages/PrivacyStatement';
import Booking from '../Pages/Booking';
import MainLayout from './MainLayout';

const LayoutWrapper = () => (
  <MainLayout>
    <Outlet />
  </MainLayout>
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
      </Route>

      {/* Auth pages without layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Admin route */}
      <Route
        path="/dashboard"
        element={
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default AppRouter;