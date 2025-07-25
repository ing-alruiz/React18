import { Steps, Button, Form, message, DatePicker, Card, List, Input, Row, Col } from 'antd';
import { useState, useEffect } from 'react';
import { fetchData, createData } from '../../Api/apiService';
import apiEndpoints from '../../Api/apiEndpoints';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Booking.module.css';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../Contexts/Auth/AuthContext.jsx';
import PetAddForm from './PetAddForm';
import PetSelectForm from './PetSelectForm';
import StepPetDetails from './StepPetDetails';
import StepRoomSelection from './StepRoomSelection';
import StepConfirmation from './StepConfirmation';

const { Step } = Steps;
const { RangePicker } = DatePicker;

const steps = [
  { title: 'Pet Details' },
  { title: 'Select Room(s)' },
  { title: 'Confirmation & Payment' }
];

const emptyPet = () => ({
  dogName: '',
  breed: '',
  type: '',
  allergies: '',
  height: '',
  weight: ''
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
  const { t } = useTranslation();
  const { user } = useAuth();
  const [userPets, setUserPets] = useState([]);
  const [selectedPets, setSelectedPets] = useState([]);
  const [showAddPet, setShowAddPet] = useState(false);
  const [newPet, setNewPet] = useState(emptyPet());
  const [addingPet, setAddingPet] = useState(false);
  const [showFieldError, setShowFieldError] = useState(false);

  // Parse query params for dates and guests
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    // Support both old and new params for backward compatibility
    const from = params.get('from');
    const to = params.get('to');
    const mascots = params.get('mascots');
    const datesParam = decodeURIComponent(params.get('dates') || '');
    const guestsParam = params.get('guests');

    if (from && to) {
      setDates([
        dayjs(decodeURIComponent(from)),
        dayjs(decodeURIComponent(to))
      ]);
    } else if (datesParam) {
      const [start, end] = datesParam.split(',');
      if (start && end) {
        setDates([
          dayjs(decodeURIComponent(start.trim())),
          dayjs(decodeURIComponent(end.trim()))
        ]);
      }
    }

    if (mascots) {
      const mascotsNum = parseInt(mascots, 10);
      if (mascotsNum > 0) {
        setPets(Array.from({ length: mascotsNum }, emptyPet));
        setPetRooms(Array.from({ length: mascotsNum }, () => null));
      }
    } else if (guestsParam) {
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

  // Fetch user pets if logged in
  useEffect(() => {
    if (user && user.id) {
      // Use correct endpoint for user pets (by userId)
      fetchData({ endpoint: `/pets?userId=${user.id}`, method: 'GET' })
        .then(data => setUserPets(Array.isArray(data) ? data : []))
        .catch(() => setUserPets([]));
    } else {
      setUserPets([]);
    }
  }, [user, addingPet]);

  // Pet handlers for add form
  const addPet = () => {
    setPets(prev => [...prev, emptyPet()]);
    setPetRooms(prev => [...prev, null]);
  };
  const removePet = idx => {
    if (pets.length === 1) return;
    setPets(prev => prev.filter((_, i) => i !== idx));
    setPetRooms(prev => prev.filter((_, i) => i !== idx));
  };
  const updatePet = (idx, values) => {
    setPets(prev => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], ...values };
      return updated;
    });
  };
  const updateOwnerInfo = values => setOwnerInfo(prev => ({ ...prev, ...values }));

  // New pet handler
  const handleAddNewPet = async () => {
    // Validate newPet fields
    if (!newPet.dogName || !newPet.breed || !newPet.type) {
      message.error(t('Please fill all required details for the new pet'));
      return;
    }
    setAddingPet(true);
    try {
      // Map to backend fields if needed
      const payload = {
        name: newPet.dogName,
        breed: newPet.breed,
        species: newPet.type,
        allergies: newPet.allergies,
        height: newPet.height,
        weight: newPet.weight,
        userId: user.id
      };
      await createData(apiEndpoints.pets, payload);
      message.success(t('Pet added!'));
      setShowAddPet(false);
      setNewPet(emptyPet());
      // Refetch pets (handled by useEffect on addingPet)
    } catch {
      message.error(t('Error adding pet'));
    } finally {
      setAddingPet(false);
    }
  };

  // Step navigation
  const next = async () => {
    let hasError = false;
    setShowFieldError(false);

    if (current === 0) {
      if (user && userPets.length > 0 && !showAddPet) {
        if (!selectedPets.length) {
          message.error('Please select at least one pet');
          setShowFieldError(true);
          hasError = true;
        }
      } else if (showAddPet) {
        if (!newPet.dogName || !newPet.breed || !newPet.type) {
          message.error('Please fill all required details for the new pet');
          setShowFieldError(true);
          hasError = true;
        }
      } else {
        for (let i = 0; i < pets.length; i++) {
          const pet = pets[i];
          if (!pet.dogName || !pet.breed || !pet.type) {
            message.error(`Please fill all required details for pet #${i + 1}`);
            setShowFieldError(true);
            hasError = true;
            break;
          }
        }
      }
      if (!dates) {
        message.error('Please select reservation dates');
        setShowFieldError(true);
        hasError = true;
      }
    }
    if (current === 1) {
      for (let i = 0; i < petRooms.length; i++) {
        if (!petRooms[i]) {
          message.error(`Please select a room for pet #${i + 1}`);
          setShowFieldError(true);
          hasError = true;
          break;
        }
      }
    }
    if (current === 2) {
      if (!ownerInfo.ownerName || !ownerInfo.ownerContact) {
        message.error('Please fill in owner information');
        setShowFieldError(true);
        hasError = true;
      }
    }
    if (hasError) return;
    setCurrent(current + 1);
  };

  const prev = () => setCurrent(current - 1);

  // Helper for room selection step
  const getPetList = () => {
    if (user && userPets.length > 0 && !showAddPet) {
      return selectedPets.map(id => userPets.find(p => p.id === id));
    }
    if (showAddPet) {
      return [newPet];
    }
    return pets;
  };

  // Add a try/catch around the main render to catch runtime errors
  try {
    return (
      <div className={styles.container}>
        {/* Announcement for required fields */}
        {showFieldError && (
          <div style={{ color: '#d4380d', background: '#fffbe6', border: '1px solid #ffe58f', padding: 12, borderRadius: 6, marginBottom: 16 }}>
            {t('booking.requiredFieldsAnnouncement', 'Please fill all required fields highlighted in red.')}
          </div>
        )}
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
          {/* Step 1: Pet Selection or Add Pet */}
          {current === 0 && (
            <StepPetDetails
              user={user}
              userPets={userPets}
              selectedPets={selectedPets}
              setSelectedPets={setSelectedPets}
              petRooms={petRooms}
              setPetRooms={setPetRooms}
              t={t}
              styles={styles}
              dates={dates}
              setDates={setDates}
              RangePicker={RangePicker}
              pets={pets}
              setPets={setPets}
              updatePet={updatePet}
              removePet={removePet}
              addPet={addPet}
              showAddPet={showAddPet}
              setShowAddPet={setShowAddPet}
              newPet={newPet}
              setNewPet={setNewPet}
              addingPet={addingPet}
              handleAddNewPet={handleAddNewPet}
              showFieldError={showFieldError}
            />
          )}
          {/* Step 2: Room Selection */}
          {current === 1 && (
            <StepRoomSelection
              getPetList={getPetList}
              rooms={rooms}
              petRooms={petRooms}
              setPetRooms={setPetRooms}
              t={t}
              styles={styles}
              showFieldError={showFieldError}
            />
          )}
          {/* Step 3: Confirmation */}
          {current === 2 && (
            <StepConfirmation
              getPetList={getPetList}
              dates={dates}
              t={t}
              petRooms={petRooms}
              ownerInfo={ownerInfo}
              updateOwnerInfo={updateOwnerInfo}
              user={user}
              setOwnerInfo={setOwnerInfo}
              pets={pets}
              selectedPets={selectedPets}
              userPets={userPets}
              showAddPet={showAddPet}
              showFieldError={showFieldError}
            />
          )}
          <div style={{ marginTop: 24 }}>
            {current > 0 && <Button onClick={prev} style={{ marginRight: 8 }}>{t('booking.back')}</Button>}
            {current < steps.length - 1 && <Button type="primary" onClick={next}>{t('booking.next')}</Button>}
          </div>
        </Form>
      </div>
    );
  } catch (err) {
    // Fallback UI for runtime errors
    return (
      <div style={{ padding: 40, color: 'red', textAlign: 'center' }}>
        <h2>Something went wrong in the booking process.</h2>
        <pre>{err.message}</pre>
      </div>
    );
  }
};

export default DogRoomBooking;