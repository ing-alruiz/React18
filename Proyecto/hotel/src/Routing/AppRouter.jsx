import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@Pages/Home';
import About from '@Pages/About';
import NotFound from '@Pages/NotFound';
import Dashboard from '@Pages/Dashboard/Home';
import MainNav from '../Components/MainNav';


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
                <Route path="*" element={<NotFound />} />
                <Route path="/dashboard" element={<Dashboard/>} />
            </Routes>
        </Router>
    );
};

export default AppRouter;