import React from 'react';
import styles from './Menu.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faUser, faCalendar, faDog, faBed, faConciergeBell, faUsers
} from '@fortawesome/free-solid-svg-icons';
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const menuItems = [
  { key: '/dashboard', icon: faHome, label: 'dashboard' },
  { key: '/dashboard/users', icon: faUsers, label: 'users' },
  { key: '/dashboard/bookings', icon: faCalendar, label: 'bookings' },
  { key: '/dashboard/pets', icon: faDog, label: 'pets' },
  { key: '/dashboard/rooms', icon: faBed, label: 'rooms' },
  { key: '/dashboard/room-types', icon: faBed, label: 'roomTypes' },
  { key: '/dashboard/services', icon: faConciergeBell, label: 'services' },
];

const Menu = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = (key) => currentPath === key || currentPath.startsWith(key + '/');
  const { t } = useTranslation();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sectionTitle}>-- ADMIN</div>
      {menuItems.map(item => (
        <Link to={item.key} key={item.key} style={{ textDecoration: 'none' }}>
          <div className={`${styles.menuItem} ${isActive(item.key) ? styles.active : ''}`}>
            <FontAwesomeIcon icon={item.icon} className={styles.menuIcon} />
            <span>
              {t(`dashboard.menu.${item.label}`, item.label.charAt(0).toUpperCase() + item.label.slice(1))}
            </span>
          </div>
        </Link>
      ))}
    </aside>
  );
};

export default Menu;