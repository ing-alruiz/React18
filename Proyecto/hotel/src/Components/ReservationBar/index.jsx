import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ReservationBar.module.css';
import { InputNumber, Button, DatePicker, Select } from 'antd';
import { fetchData } from '@Api/apiService';
import apiEndpoints from '@Api/apiEndpoints';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { RangePicker } = DatePicker;

const ReservationBar = ({ className }) => {
  const [dates, setDates] = useState([]);
  const [guests, setGuests] = useState(1);
  const [roomTypes, setRoomTypes] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    fetchData(apiEndpoints.roomTypes)
      .then(data => setRoomTypes(data))
      .catch(() => setRoomTypes([]));
  }, []);

  const lang = i18n.language.startsWith('es') ? 'es' : 'en';

  const onChangeDate = (value) => {
    setDates(value);
  };

  const onChangeAmount = (value) => {
    setGuests(value);
  };

  const handleRoomTypeChange = (value) => {
    setSelectedRoomType(value);
  };

  const handleSearch = () => {
    navigate(
      `/book?roomType=${encodeURIComponent(selectedRoomType || '')}&dates=${encodeURIComponent(
        dates
      )}&guests=${guests}`
    );
  };

  return (
    <div className={`${styles.reservationBarGrid} ${className || ''}`}>
      {/* Row 1: Icons and Labels */}
      <div className={styles.gridItem}>
        <span className={styles.icon}><FontAwesomeIcon icon={['fas', 'bed']} /></span>
        <span className={styles.label}>{t('reservationBar.roomType')}</span>
      </div>
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
      <div className={styles.gridItem}>
        <Select
          placeholder={t('reservationBar.selectRoomType')}
          style={{ width: '100%' }}
          value={selectedRoomType}
          onChange={handleRoomTypeChange}
        >
          {roomTypes.map(rt => (
            <Select.Option key={rt.id} value={rt.id}>
              {rt[`name_${lang}`] || rt.name} ({rt.species})
            </Select.Option>
          ))}
        </Select>
      </div>
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