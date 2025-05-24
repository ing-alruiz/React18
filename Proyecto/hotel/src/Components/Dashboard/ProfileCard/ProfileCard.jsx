import React from 'react';
import styles from './ProfileCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser, faEnvelope, faCalendar, faLock, faHome, faBed, faBuilding, faUsers, faTasks, faAddressBook, faAt, faEllipsisH
} from '@fortawesome/free-solid-svg-icons';

const ProfileCard = () => (
  <aside className={styles.sidebar}>
    <div className={styles.profileCard}>
      <div className={styles.profile}>
        <img src="/profile.jpg" alt="Profile" className={styles.avatar} />
        <div className={styles.name}>Emily Smith</div>
        <div className={styles.role}>Manager</div>
      </div>
      <div className={styles.iconRow}>
        <FontAwesomeIcon icon={faUser} />
        <FontAwesomeIcon icon={faEnvelope} />
        <FontAwesomeIcon icon={faCalendar} />
        <FontAwesomeIcon icon={faLock} />
      </div>
    </div>
    <div className={styles.sectionTitle}>-- MAIN</div>
    <div className={styles.menuItem + ' ' + styles.active}>
      <FontAwesomeIcon icon={faHome} className={styles.menuIcon} />
      <span>Home</span>
    </div>
    {/* ...rest of the menu... */}
  </aside>
);

export default ProfileCard;