import React from 'react';
import MainNav from '../Components/MainNav';
import Footer from '../Components/Footer';
import styles from './MainLayout.module.css'; 
import TopInfo from '../Components/MainNav/TopInfo';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const breadcrumbKeys = {
  '/': 'breadcrumb.home',
  '/about': 'breadcrumb.about',
  '/contact': 'breadcrumb.contact',
  '/bookings': 'breadcrumb.book',
  '/book': 'breadcrumb.book',
  '/services': 'breadcrumb.services',
  '/gallery': 'breadcrumb.gallery',
  '/privacy': 'breadcrumb.privacy',
  '/faq': 'breadcrumb.faq',
  '/terms': 'breadcrumb.terms',
  '/cookies': 'breadcrumb.cookies',
  '/account': 'breadcrumb.account',
  // Add more routes as needed
};

const pageTitleKeys = {
  '/': 'pages.home',
  '/about': 'pages.about',
  '/contact': 'pages.contact',
  '/bookings': 'pages.book',
  '/book': 'pages.book',
  '/services': 'pages.services',
  '/gallery': 'pages.gallery',
  '/privacy': 'pages.privacy',
  '/faq': 'pages.faq',
  '/terms': 'pages.terms',
  '/cookies': 'pages.cookies',
  '/account': 'pages.account',
  // Add more routes as needed
};

const MainLayout = ({ children }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter(i => i);

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{t(breadcrumbKeys[url] || url.replace('/', ''))}</Link>
      </Breadcrumb.Item>
    );
  });

  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">{t('breadcrumb.home')}</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);

  const currentPage = t(pageTitleKeys[location.pathname] || 'pages.default');

  return (
    <>
      <div className={styles.backgroundImage}>
        <div className={styles.topInfo}>
          <TopInfo />
        </div>
        <MainNav className={styles.navWrapper} />
        <div className={styles.breadcrumbContainer}>
          <h1 style={{ margin: '16px 0', fontSize: 28, color: '#1a284d' }}>{currentPage}</h1>
          <Breadcrumb>{breadcrumbItems}</Breadcrumb>
        </div>
      </div>
      <main className={styles.content}>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;