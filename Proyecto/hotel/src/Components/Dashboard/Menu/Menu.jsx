import React from 'react';
import styles from './Menu.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser, faEnvelope, faCalendar, faLock, faHome, faBed, faBuilding, faUsers, faTasks, faAddressBook, faAt, faEllipsisH
} from '@fortawesome/free-solid-svg-icons';
import ProfileCard from '../ProfileCard/ProfileCard';

const Menu = () => (
  <aside className={styles.sidebar}>
    <ProfileCard/>
    <div className={styles.sectionTitle}>-- MAIN</div>
    <div className={styles.menuItem + ' ' + styles.active}>
      <FontAwesomeIcon icon={faHome} className={styles.menuIcon} />
      <span>Home</span>
    </div>
    <div className={styles.menuItem}>
      <FontAwesomeIcon icon={faUser} className={styles.menuIcon} />
      <span>Booking</span>
      <span className={styles.plus}>+</span>
    </div>
    <div className={styles.menuItem}>
      <FontAwesomeIcon icon={faBed} className={styles.menuIcon} />
      <span>Rooms</span>
      <span className={styles.plus}>+</span>
    </div>
    <div className={styles.menuItem}>
      <FontAwesomeIcon icon={faBuilding} className={styles.menuIcon} />
      <span>Departments</span>
      <span className={styles.plus}>+</span>
    </div>
    <div className={styles.menuItem}>
      <FontAwesomeIcon icon={faUsers} className={styles.menuIcon} />
      <span>Staff</span>
      <span className={styles.plus}>+</span>
    </div>
    <div className={styles.sectionTitle}>-- APPS</div>
    <div className={styles.menuItem}>
      <FontAwesomeIcon icon={faCalendar} className={styles.menuIcon} />
      <span>Calendar</span>
      <span className={styles.new}>New</span>
    </div>
    <div className={styles.menuItem}>
      <FontAwesomeIcon icon={faTasks} className={styles.menuIcon} />
      <span>Task</span>
    </div>
    <div className={styles.menuItem}>
      <FontAwesomeIcon icon={faAddressBook} className={styles.menuIcon} />
      <span>Contacts</span>
    </div>
    <div className={styles.menuItem}>
      <FontAwesomeIcon icon={faAt} className={styles.menuIcon} />
      <span>Email</span>
      <span className={styles.badge}>3</span>
      <span className={styles.plus}>+</span>
    </div>
    <div className={styles.menuItem}>
      <FontAwesomeIcon icon={faEllipsisH} className={styles.menuIcon} />
      <span>More Apps</span>
    </div>
  </aside>
);

export default Menu;