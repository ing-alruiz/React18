import React from 'react';
import styles from './Menu.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser, faEnvelope, faCalendar, faLock, faHome, faBed, faBuilding, faUsers, faTasks, faAddressBook, faAt, faEllipsisH
} from '@fortawesome/free-solid-svg-icons';
import ProfileCard from '../ProfileCard/ProfileCard';
import { useLocation, Link } from 'react-router-dom';

const menuItems = [
  { key: '/dashboard', icon: faHome, label: 'Home' },
  { key: '/dashboard/bookings', icon: faUser, label: 'Booking', plus: true },
  { key: '/dashboard/rooms', icon: faBed, label: 'Rooms', plus: true },
  { key: '/dashboard/departments', icon: faBuilding, label: 'Departments', plus: true },
  { key: '/dashboard/staff', icon: faUsers, label: 'Staff', plus: true },
];

const appItems = [
  { key: '/dashboard/calendar', icon: faCalendar, label: 'Calendar', new: true },
  { key: '/dashboard/task', icon: faTasks, label: 'Task' },
  { key: '/dashboard/contacts', icon: faAddressBook, label: 'Contacts' },
  { key: '/dashboard/email', icon: faAt, label: 'Email', badge: 3, plus: true },
  { key: '/dashboard/more', icon: faEllipsisH, label: 'More Apps' },
];

const Menu = () => {
  const location = useLocation();
  // Find the base path for highlighting (e.g., '/dashboard/booking/123' -> '/dashboard/booking')
  const currentPath = location.pathname;
  // Helper to determine if a menu item is active
  const isActive = (key) => {
    if (key === '/') return currentPath === '/' || currentPath === '/dashboard';
    return currentPath.startsWith(key);
  };

  return (
    <aside className={styles.sidebar}>
      <ProfileCard/>
      <div className={styles.sectionTitle}>-- MAIN</div>
      {menuItems.map(item => (
        <Link to={item.key} key={item.key} style={{ textDecoration: 'none' }}>
          <div className={`${styles.menuItem} ${isActive(item.key) ? styles.active : ''}`}>
            <FontAwesomeIcon icon={item.icon} className={styles.menuIcon} />
            <span>{item.label}</span>
            {item.plus && <span className={styles.plus}>+</span>}
          </div>
        </Link>
      ))}
      <div className={styles.sectionTitle}>-- APPS</div>
      {appItems.map(item => (
        <Link to={item.key} key={item.key} style={{ textDecoration: 'none' }}>
          <div className={`${styles.menuItem} ${isActive(item.key) ? styles.active : ''}`}>
            <FontAwesomeIcon icon={item.icon} className={styles.menuIcon} />
            <span>{item.label}</span>
            {item.new && <span className={styles.new}>New</span>}
            {item.badge && <span className={styles.badge}>{item.badge}</span>}
            {item.plus && <span className={styles.plus}>+</span>}
          </div>
        </Link>
      ))}
    </aside>
  );
};

export default Menu;