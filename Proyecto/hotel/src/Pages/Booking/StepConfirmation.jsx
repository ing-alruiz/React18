import React, { useEffect } from 'react';
import { Card, Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { createData } from '../../Api/apiService';
import apiEndpoints from '../../Api/apiEndpoints';

const StepConfirmation = ({
  getPetList,
  dates,
  t,
  petRooms,
  ownerInfo,
  updateOwnerInfo,
  next,
  user,
  setOwnerInfo,
  pets,
  selectedPets,
  userPets,
  showAddPet
}) => {
  const navigate = useNavigate();

  // Auto-fill owner info if logged in
  useEffect(() => {
    if (user && user.name && user.email) {
      setOwnerInfo(prev => ({
        ...prev,
        ownerName: prev.ownerName || user.name,
        ownerContact: prev.ownerContact || user.email
      }));
    }
    // eslint-disable-next-line
  }, [user]);

  // Create reservation on confirm
  const handleConfirm = async () => {
    // Compose reservation data
    try {
      if (!dates || dates.length !== 2) {
        message.error(t('booking.validation.dates'));
        return;
      }
      if (!ownerInfo.ownerName || !ownerInfo.ownerContact) {
        message.error(t('Please fill in owner information'));
        return;
      }
      const checkIn = dates[0].format('YYYY-MM-DD');
      const checkOut = dates[1].format('YYYY-MM-DD');
      // Get pets for reservation
      let petIds = [];
      if (user && userPets && !showAddPet) {
        petIds = selectedPets;
      } else if (showAddPet && pets && pets.length === 1 && pets[0].id) {
        petIds = [pets[0].id];
      }
      // Fallback: no petIds, just proceed
      // RoomTypeId: take from selected room(s)
      const roomTypeIds = petRooms.map(r => r?.id).filter(Boolean);
      // Compose reservation object (db format)
      const reservation = {
        userId: user?.id || null,
        petIds,
        roomTypeId: roomTypeIds[0] || null,
        services: [],
        checkIn,
        checkOut,
        status: 'confirmada',
        total: 0,
        deleted: false
      };
      await createData(apiEndpoints.reservations, reservation);
      message.success(t('Reservation created!'));
      navigate('/account/reservations');
    } catch (err) {
      message.error(t('Error creating reservation'));
    }
  };

  return (
    <div>
      <h3>{t('booking.summary')}</h3>
      <p>
        <strong>{t('booking.dates')}:</strong> {dates && dates.map(d => d.format('YYYY-MM-DD')).join(` ${t('booking.to')} `)}
      </p>
      {getPetList().map((pet, idx) => (
        <Card key={pet?.id || idx} style={{ marginBottom: 12 }}>
          <p><strong>{t('booking.pet')}:</strong> {pet?.name || pet?.dogName}</p>
          <p><strong>{t('booking.type')}:</strong> {pet?.species || pet?.type}</p>
          <p><strong>{t('booking.breed')}:</strong> {pet?.breed}</p>
          <p><strong>{t('booking.allergies')}:</strong> {pet?.allergies || t('booking.none')}</p>
          <p><strong>{t('booking.height')}:</strong> {pet?.height ? `${pet.height} cm` : t('booking.na')}</p>
          <p><strong>{t('booking.weight')}:</strong> {pet?.weight ? `${pet.weight} kg` : t('booking.na')}</p>
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
      <Button type="primary" onClick={handleConfirm}>{t('booking.confirmPay')}</Button>
    </div>
  );
};

export default StepConfirmation;
