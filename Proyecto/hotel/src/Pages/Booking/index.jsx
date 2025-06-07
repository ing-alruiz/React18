import { Steps, Button, Form, Input, DatePicker, List, Card, Image, message, Row, Col } from 'antd';
import { PlusOutlined, MinusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { fetchData } from '@Api/apiService';
import apiEndpoints from '@Api/apiEndpoints';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Booking.module.css';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

const { Step } = Steps;
const { RangePicker } = DatePicker;

const steps = [
  { title: 'Pet Details' },
  { title: 'Select Room(s)' },
  { title: 'Confirmation & Payment' }
];

const petTypes = ['Dog', 'Cat', 'Rabbit', 'Other'];

const emptyPet = () => ({
  dogName: '',
  breed: '',
  type: '',
  allergies: '',
  height: '',
  weight: ''
  // ownerName and ownerContact removed from here
});

const DogRoomBooking = () => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [rooms, setRooms] = useState([]);
  const [pets, setPets] = useState([emptyPet()]);
  const [petRooms, setPetRooms] = useState([null]);
  const [dates, setDates] = useState(null);
  const [ownerInfo, setOwnerInfo] = useState({ ownerName: '', ownerContact: '' });
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  // Parse query params for dates and guests
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const datesParam = decodeURIComponent(params.get('dates'));
    const guestsParam = params.get('guests');
    if (datesParam) {
      const [start, end] = datesParam.split(',');
      if (start && end) {
        // Try to parse with dayjs for compatibility with AntD RangePicker
        setDates([
          dayjs(decodeURIComponent(start.trim())),
          dayjs(decodeURIComponent(end.trim()))
        ]);
      }
    }
    if (guestsParam) {
      const guests = parseInt(guestsParam, 10);
      if (guests > 0) {
        setPets(Array.from({ length: guests }, emptyPet));
        setPetRooms(Array.from({ length: guests }, () => null));
      }
    }
    // eslint-disable-next-line
  }, [location.search]);

  useEffect(() => {
    fetchData(apiEndpoints.roomTypes)
      .then(data => setRooms(data))
      .catch(() => setRooms([]));
  }, []);

  // Pet counter handlers
  const addPet = () => {
    setPets([...pets, emptyPet()]);
    setPetRooms([...petRooms, null]);
  };
  const removePet = idx => {
    if (pets.length === 1) return;
    setPets(pets.filter((_, i) => i !== idx));
    setPetRooms(petRooms.filter((_, i) => i !== idx));
  };
  const updatePet = (idx, values) => {
    const updated = [...pets];
    updated[idx] = { ...updated[idx], ...values };
    setPets(updated);
  };

  // Room selection per pet
  const selectRoom = (petIdx, room) => {
    const updated = [...petRooms];
    updated[petIdx] = room;
    setPetRooms(updated);
  };

  const updateOwnerInfo = values => {
    setOwnerInfo({ ...ownerInfo, ...values });
  };

  // Step navigation
  const next = async () => {
    if (current === 0) {
      // Validate all pet forms
      for (let i = 0; i < pets.length; i++) {
        const pet = pets[i];
        if (!pet.dogName || !pet.breed || !pet.type) {
          message.error(`Please fill all required details for pet #${i + 1}`);
          return;
        }
      }
      if (!dates) {
        message.error('Please select reservation dates');
        return;
      }
      // Add guests param from pets.length
      // Update URL with dates and guests
      navigate(
        `/book?dates=${encodeURIComponent(
          dates && dates.length === 2
            ? `${dates[0].format('YYYY-MM-DD')},${dates[1].format('YYYY-MM-DD')}`
            : ''
        )}&guests=${pets.length}`
      );
    }
    if (current === 1) {
      // Validate room selection for each pet
      for (let i = 0; i < petRooms.length; i++) {
        if (!petRooms[i]) {
          message.error(`Please select a room for pet #${i + 1}`);
          return;
        }
      }
    }
    if (current === 2) {
      // Validate owner info
      if (!ownerInfo.ownerName || !ownerInfo.ownerContact) {
        message.error('Please fill in owner information');
        return;
      }
    }
    setCurrent(current + 1);
  };

  const prev = () => setCurrent(current - 1);

  return (
  <div className={styles.container}>
    <Steps current={current} className={styles.steps}>
      {steps.map((item, idx) => (
        <Step
          key={item.title}
          title={
            idx === 0
              ? t('booking.steps.petDetails')
              : idx === 1
              ? t('booking.steps.selectRooms')
              : t('booking.steps.confirmPay')
          }
        />
      ))}
    </Steps>
    <Form form={form} layout="vertical">
      {/* Step 1: Pet Details */}
      {current === 0 && (
        <>
          <Row className={styles.petCounterRow}>
            <Button
              icon={<MinusOutlined />}
              disabled={pets.length === 1}
              onClick={() => removePet(pets.length - 1)}
            />
            <span className={styles.petCount}>{pets.length}</span>
            <Button icon={<PlusOutlined />} onClick={addPet} />
            <span className={styles.petLabel}>{t('booking.petLabel')}</span>
          </Row>
          <Form.Item
            name="dates"
            label={t('booking.dates')}
            className={styles.datePickerItem}
            rules={[{ required: true, message: t('booking.validation.dates') }]}
          >
            <div className={styles.formalDatePicker}>
              <RangePicker
                style={{ width: '100%' }}
                value={dates}
                onChange={setDates}
                placeholder={[t('booking.startDate'), t('booking.endDate')]}
              />
            </div>
          </Form.Item>
          {pets.map((pet, idx) => (
            <Card
              key={idx}
              title={`${t('booking.pet')} #${idx + 1}`}
              style={{ marginBottom: 16 }}
              extra={
                pets.length > 1 && (
                  <a onClick={() => removePet(idx)} style={{ color: 'red' }}>
                    <DeleteOutlined /> {t('booking.delete')}
                  </a>
                )
              }
            >
              <Form.Item label={t('booking.petType')} required>
                <select
                  value={pet.type}
                  onChange={e => updatePet(idx, { type: e.target.value })}
                  style={{ width: '100%', padding: '6px 8px', borderRadius: 4, border: '1px solid #d9d9d9' }}
                >
                  <option value="">{t('booking.selectType')}</option>
                  {petTypes.map(type => (
                    <option key={type} value={type}>{t(`booking.petTypes.${type.toLowerCase()}`)}</option>
                  ))}
                </select>
              </Form.Item>
              <Form.Item label={t('booking.petName')} required>
                <Input
                  value={pet.dogName}
                  onChange={e => updatePet(idx, { dogName: e.target.value })}
                />
              </Form.Item>
              <Form.Item label={t('booking.breed')} required>
                <Input
                  value={pet.breed}
                  onChange={e => updatePet(idx, { breed: e.target.value })}
                />
              </Form.Item>
              <Form.Item label={t('booking.allergies')}>
                <Input
                  value={pet.allergies}
                  onChange={e => updatePet(idx, { allergies: e.target.value })}
                  placeholder={t('booking.allergiesPlaceholder')}
                />
              </Form.Item>
              <Row gutter={12}>
                <Col span={12}>
                  <Form.Item label={t('booking.height')}>
                    <Input
                      value={pet.height}
                      onChange={e => updatePet(idx, { height: e.target.value })}
                      placeholder={t('booking.optional')}
                      type="number"
                      min={0}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={t('booking.weight')}>
                    <Input
                      value={pet.weight}
                      onChange={e => updatePet(idx, { weight: e.target.value })}
                      placeholder={t('booking.optional')}
                      type="number"
                      min={0}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          ))}
          <div className={styles.addPetRow}>
            <Button icon={<PlusOutlined />} onClick={addPet} type="dashed">
              {t('booking.addAnotherPet')}
            </Button>
          </div>
        </>
      )}

      {/* Step 2: Room Selection */}
      {current === 1 && (
        <>
          {pets.map((pet, idx) => (
            <Card
              key={idx}
              title={`${t('booking.selectRoomFor')} ${pet.dogName || `${t('booking.pet')} #${idx + 1}`}`}
              style={{ marginBottom: 16 }}
            >
              <List
                grid={{ gutter: 16, column: 1 }}
                dataSource={rooms}
                renderItem={room => (
                  <List.Item
                    style={{
                      border: petRooms[idx] && petRooms[idx].id === room.id ? '2px solid #1890ff' : '1px solid #eee',
                      borderRadius: 8,
                      cursor: 'pointer',
                      marginBottom: 12
                    }}
                    onClick={() => selectRoom(idx, room)}
                  >
                    <Card bordered={false} style={{ display: 'flex', alignItems: 'center' }}>
                      <Image
                        src={room.photoUrl || 'https://via.placeholder.com/100'}
                        alt={room.name}
                        width={100}
                        height={80}
                        style={{ objectFit: 'cover', borderRadius: 8, marginRight: 16 }}
                        preview={false}
                      />
                      <div>
                        <h3 style={{ margin: 0 }}>{room.name_en || room.name}</h3>
                        <div style={{ color: '#888', fontSize: 14 }}>{room.species}</div>
                        <div style={{ fontSize: 13 }}>{room.description_en || room.description}</div>
                      </div>
                    </Card>
                  </List.Item>
                )}
              />
            </Card>
          ))}
        </>
      )}

      {/* Step 3: Confirmation */}
      {current === 2 && (
        <div>
          <h3>{t('booking.summary')}</h3>
          <p>
            <strong>{t('booking.dates')}:</strong> {dates && dates.map(d => d.format('YYYY-MM-DD')).join(` ${t('booking.to')} `)}
          </p>
          {pets.map((pet, idx) => (
            <Card key={idx} style={{ marginBottom: 12 }}>
              <p><strong>{t('booking.pet')}:</strong> {pet.dogName}</p>
              <p><strong>{t('booking.type')}:</strong> {t(`booking.petTypes.${pet.type?.toLowerCase()}`) || pet.type}</p>
              <p><strong>{t('booking.breed')}:</strong> {pet.breed}</p>
              <p><strong>{t('booking.allergies')}:</strong> {pet.allergies || t('booking.none')}</p>
              <p><strong>{t('booking.height')}:</strong> {pet.height ? `${pet.height} cm` : t('booking.na')}</p>
              <p><strong>{t('booking.weight')}:</strong> {pet.weight ? `${pet.weight} kg` : t('booking.na')}</p>
              <p>
                <strong>{t('booking.room')}:</strong> {petRooms[idx]?.name_en || petRooms[idx]?.name}
              </p>
            </Card>
          ))}
          {/* Owner info form */}
          <Card style={{ marginBottom: 12 }}>
            <h4>{t('booking.ownerInfo')}</h4>
            <Form.Item label={t('booking.ownerName')} required>
              <Input
                value={ownerInfo.ownerName}
                onChange={e => updateOwnerInfo({ ownerName: e.target.value })}
              />
            </Form.Item>
            <Form.Item label={t('booking.ownerContact')} required>
              <Input
                value={ownerInfo.ownerContact}
                onChange={e => updateOwnerInfo({ ownerContact: e.target.value })}
              />
            </Form.Item>
          </Card>
          <Button type="primary" onClick={next}>{t('booking.confirmPay')}</Button>
        </div>
      )}

      <div style={{ marginTop: 24 }}>
        {current > 0 && <Button onClick={prev} style={{ marginRight: 8 }}>{t('booking.back')}</Button>}
        {current < steps.length - 1 && <Button type="primary" onClick={next}>{t('booking.next')}</Button>}
      </div>
    </Form>
  </div>
  );
};

export default DogRoomBooking;