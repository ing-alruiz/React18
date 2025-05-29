import React from 'react';
import MainNav from '@Components/MainNav';
import Footer from '@Components/Footer';

const MainLayout = ({ children }) => (
  <>
    <MainNav />
    <main>{children}</main>
    <Footer />
  </>
);

export default MainLayout;