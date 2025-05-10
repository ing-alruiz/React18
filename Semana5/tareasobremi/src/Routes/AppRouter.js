import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'; // Import all solid icons
import Home from '../Pages/Home/Home';
import NotFound from '../Pages/NotFound/NotFound';
import Nav from '../Components/Nav/Nav';
import TimelinePage from '../Pages/Timeline/TimelinePage';

library.add(fas);

const AppRouter = () => {
    return (
        <Router>
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/porfolio" element={<div>Portfolio</div>} />
                <Route path="/timeline" element={<TimelinePage/>} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;