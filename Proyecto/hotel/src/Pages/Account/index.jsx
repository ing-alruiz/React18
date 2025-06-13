import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import styles from './Account.module.css';
import { useTranslation } from 'react-i18next';

const AccountLayout = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const menu = [
    { to: '/account/profile', label: t('account.profile') },
    { to: '/account/pets', label: t('account.pets') },
    { to: '/account/reservations', label: t('account.reservations') },
  ];

  return (
    <div className={styles.accountPage}>
      <aside className={styles.sidebar}>
        <h2 className={styles.title}>{t('pages.account')}</h2>
        <nav>
          {menu.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive || location.pathname.startsWith(item.to)
                  ? styles.active
                  : undefined
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default AccountLayout;
