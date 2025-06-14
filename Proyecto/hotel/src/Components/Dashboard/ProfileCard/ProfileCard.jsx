import React, { useState } from 'react';
import styles from './ProfileCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser, faEnvelope, faCalendar, faLock, faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../../Contexts/Auth/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const ProfileCard = ({ className = '' }) => {
  const { user, logout } = useAuth();
  const profileImg = user?.photo || '/images/profile.jpg';
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => setOpen(o => !o);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate('/');
  };

  return (
    <div
      className={`${styles.profileCard} ${className}`}
      style={{ cursor: 'pointer', position: 'relative' }}
    >
      <div onClick={handleToggle} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <img src={profileImg} alt="Profile" className={styles.avatar} />
        <div className={styles.name}>{user?.name || 'Emily Smith'}</div>
      </div>
      {open && (
        <div className={styles.dropdown}>
          <div className={styles.role}>{user?.role || 'Manager'}</div>
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
          <div
            style={{
              marginTop: 12,
              width: '100%',
              borderTop: '1px solid #eee',
              paddingTop: 10,
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              color: '#d32f2f',
              fontWeight: 500
            }}
            onClick={handleLogout}
          >
            <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: 8 }} />
            Log Out
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;