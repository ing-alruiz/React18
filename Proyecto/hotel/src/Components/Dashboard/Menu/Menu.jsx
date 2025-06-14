import React from 'react';
import styles from './Menu.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faUser, faCalendar, faDog, faBed, faConciergeBell, faUsers
} from '@fortawesome/free-solid-svg-icons';
import { useLocation, Link } from 'react-router-dom';

const menuItems = [
  { key: '/dashboard', icon: faHome, label: 'Home' },
  { key: '/dashboard/users', icon: faUsers, label: 'Users' },
  { key: '/dashboard/bookings', icon: faCalendar, label: 'Bookings' },
  { key: '/dashboard/pets', icon: faDog, label: 'Pets' },
  { key: '/dashboard/rooms', icon: faBed, label: 'Rooms' },
  { key: '/dashboard/room-types', icon: faBed, label: 'Room Types' }, // new item
  { key: '/dashboard/services', icon: faConciergeBell, label: 'Services' },
];

const Menu = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = (key) => currentPath === key || currentPath.startsWith(key + '/');

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sectionTitle}>-- ADMIN</div>
      {menuItems.map(item => (
        <Link to={item.key} key={item.key} style={{ textDecoration: 'none' }}>
          <div className={`${styles.menuItem} ${isActive(item.key) ? styles.active : ''}`}>
            <FontAwesomeIcon icon={item.icon} className={styles.menuIcon} />
            <span>{item.label}</span>
          </div>
        </Link>
      ))}
    </aside>
  );
};

export default Menu;