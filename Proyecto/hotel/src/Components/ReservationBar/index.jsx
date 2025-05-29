import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ReservationBar.module.css';
import { InputNumber, Button, DatePicker, Select } from 'antd';
import { fetchData } from '@Api/apiService';
import apiEndpoints from '@Api/apiEndpoints';

const { RangePicker } = DatePicker;

const ReservationBar = ({ className }) => {
  const [dates, setDates] = useState([]);
  const [guests, setGuests] = useState(1);
  const [roomTypes, setRoomTypes] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch room types from API using apiService and apiEndpoints
    fetchData(apiEndpoints.roomTypes)
      .then(data => setRoomTypes(data))
      .catch(() => setRoomTypes([]));
  }, []);

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
    <div className={`${styles.reservationBar} ${className || ''}`}>
      <div className={styles.section}>
        <label>Tipo de habitación</label>
        <div className={styles.inputGroup}>
          <Select
            placeholder="Selecciona tipo de habitación"
            style={{ width: '100%' }}
            value={selectedRoomType}
            onChange={handleRoomTypeChange}
          >
            {roomTypes.map(rt => (
              <Select.Option key={rt.id} value={rt.id}>
                {rt.name} ({rt.species})
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
      <div className={styles.section}>
        <label>¿Cuánto tiempo cuidamos tu mascota?</label>
        <div className={styles.inputGroup}>
          <RangePicker
            placeholder={['Fecha inicio', 'Fecha fin']}
            onChange={onChangeDate}
          />
        </div>
      </div>
      <div className={styles.section}>
        <label>¿Cuantas Mascotas?</label>
        <div className={styles.inputGroup}>
          <InputNumber min={1} defaultValue={1} onChange={onChangeAmount} />
        </div>
      </div>
      <Button type="primary" className={styles.searchBtn} onClick={handleSearch}>
        Reservar
      </Button>
    </div>
  );
};

export default ReservationBar;