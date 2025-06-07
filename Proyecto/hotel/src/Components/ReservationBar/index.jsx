import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ReservationBar.module.css';
import { InputNumber, Button, DatePicker } from 'antd';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { RangePicker } = DatePicker;

const ReservationBar = ({ className }) => {
  const [dates, setDates] = useState([]);
  const [guests, setGuests] = useState(1);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onChangeDate = (value) => {
    setDates(value);
  };

  const onChangeAmount = (value) => {
    setGuests(value);
  };

  const handleSearch = () => {
    console.log('Searching with:', { guests, dates });
    navigate(
      `/book?guests=${guests}&dates=${encodeURIComponent(dates)}`
    );
  };

  return (
    <div className={`${styles.reservationBarGrid} ${className || ''}`}>
      {/* Row 1: Icons and Labels */}
      {/* Removed Room Type */}
      <div className={styles.gridItem}>
        <span className={styles.icon}><FontAwesomeIcon icon={['fas', 'calendar-alt']} /></span>
        <span className={styles.label}>{t('reservationBar.dates')}</span>
      </div>
      <div className={styles.gridItem}>
        <span className={styles.icon}><FontAwesomeIcon icon={['fas', 'user-friends']} /></span>
        <span className={styles.label}>{t('reservationBar.guests')}</span>
      </div>
      {/* Empty cell for button alignment */}
      <div className={styles.gridItem} />

      {/* Row 2: Inputs */}
      {/* Removed Room Type input */}
      <div className={styles.gridItem}>
        <RangePicker
          placeholder={[t('reservationBar.startDate'), t('reservationBar.endDate')]}
          onChange={onChangeDate}
        />
      </div>
      <div className={styles.gridItem}>
        <InputNumber min={1} defaultValue={1} onChange={onChangeAmount} />
      </div>
      {/* Button spans both rows */}
      <div className={styles.gridButton} rowSpan={2}>
        <Button type="primary" className={styles.searchBtn} onClick={handleSearch}>
          {t('reservationBar.book')}
        </Button>
      </div>
    </div>
  );
};

export default ReservationBar;