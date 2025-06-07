import React from 'react';
import styles from './ProfileCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser, faEnvelope, faCalendar, faLock
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@Contexts/Auth/AuthContext.jsx';

const ProfileCard = () => {
  const { user } = useAuth();
  const profileImg = user?.photo || '/images/profile.jpg';

  return (
    <div className={styles.profileCard}>
      <div className={styles.profile}>
        <img src={profileImg} alt="Profile" className={styles.avatar} />
        <div className={styles.name}>{user?.name || 'Emily Smith'}</div>
        <div className={styles.role}>{user?.role || 'Manager'}</div>
      </div>
      <div className={styles.iconRow}>
        <FontAwesomeIcon icon={faUser} />
        <FontAwesomeIcon icon={faEnvelope} />
        <FontAwesomeIcon icon={faCalendar} />
        <FontAwesomeIcon icon={faLock} />
      </div>
      {user?.email && (
        <div className={styles.emailRow}>
          <FontAwesomeIcon icon={faEnvelope} className={styles.menuIcon} />
          <span>{user.email}</span>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;