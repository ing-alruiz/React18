import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@Pages/Home';
import About from '@Pages/About';
import NotFound from '@Pages/NotFound';
import Dashboard from '@Pages/Dashboard/Home';
import AdminRoute from './AdminRoute';
import Login from '@Pages/Login';
import Signup from '@Pages/Signup';


const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<>
                        <Home />
                    </>} />
                <Route path="/about" element={<>
                        <About />
                    </>} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                  path="/dashboard"
                  element={
                    <AdminRoute>
                      <Dashboard />
                    </AdminRoute>
                  }
                />



                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;