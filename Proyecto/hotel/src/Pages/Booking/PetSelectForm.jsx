import React, { useCallback } from 'react';
import { Form, List, Card } from 'antd';

const PetSelectForm = ({
  userPets,
  selectedPets,
  setSelectedPets,
  petRooms,
  setPetRooms,
  t,
  styles,
  dates,
  setDates,
  RangePicker
}) => {
  const handleSelect = useCallback(
    (petId) => {
      setSelectedPets(prev => {
        let newSelected;
        if (prev.includes(petId)) {
          newSelected = prev.filter(id => id !== petId);
        } else {
          newSelected = [...prev, petId];
        }
        setPetRooms(prevRooms => {
          const newLen = newSelected.length;
          return Array.from({ length: newLen }, (_, i) => prevRooms[i] || null);
        });
        return newSelected;
      });
    },
    [setSelectedPets, setPetRooms]
  );

  return (
    <>
      <Card style={{ marginBottom: 24 }}>
        <h3>{t('account.myPets')}</h3>
        <Form.Item
          label={t('booking.petLabel')}
          required
          style={{ marginBottom: 0 }}
        >
          <List
            dataSource={userPets}
            renderItem={pet => (
              <List.Item
                style={{
                  background: selectedPets.includes(pet.id) ? '#e6f7ff' : '#fff',
                  cursor: 'pointer',
                  borderRadius: 6,
                  marginBottom: 4,
                  border: selectedPets.includes(pet.id) ? '2px solid #1890ff' : '1px solid #eee'
                }}
                onClick={() => handleSelect(pet.id)}
              >
                <span>
                  <strong>{pet.name}</strong> ({pet.species}) - {pet.breed}
                </span>
                {selectedPets.includes(pet.id) && (
                  <span style={{ color: '#1890ff', marginLeft: 8 }}>✓</span>
                )}
              </List.Item>
            )}
          />
        </Form.Item>
      </Card>
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
    </>
  );
};

export default PetSelectForm;
