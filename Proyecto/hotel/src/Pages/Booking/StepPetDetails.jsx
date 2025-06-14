import React from 'react';
import { Button, Card, Form, Input, Row, Col } from 'antd';
import PetAddForm from './PetAddForm';
import PetSelectForm from './PetSelectForm';

const StepPetDetails = ({
  user,
  userPets,
  selectedPets,
  setSelectedPets,
  petRooms,
  setPetRooms,
  t,
  styles,
  dates,
  setDates,
  RangePicker,
  pets,
  setPets,
  updatePet,
  removePet,
  addPet,
  showAddPet,
  setShowAddPet,
  newPet,
  setNewPet,
  addingPet,
  handleAddNewPet,
}) => (
  <>
    {user && userPets.length > 0 && !showAddPet ? (
      <>
        <PetSelectForm
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
        />
        <Button
          type="dashed"
          style={{ marginBottom: 16 }}
          onClick={() => setShowAddPet(true)}
        >
          {t('account.addPet', 'Add Pet')}
        </Button>
      </>
    ) : showAddPet && user ? (
      <Card style={{ marginBottom: 24 }}>
        <h3>{t('account.addPet')}</h3>
        <Form layout="vertical">
          <Form.Item label={t('booking.petType')} required>
            <select
              value={newPet.type}
              onChange={e => setNewPet({ ...newPet, type: e.target.value })}
              style={{ width: '100%', padding: '6px 8px', borderRadius: 4, border: '1px solid #d9d9d9' }}
            >
              <option value="">{t('booking.selectType')}</option>
              {['Dog', 'Cat', 'Rabbit', 'Other'].map(type => (
                <option key={type} value={type}>{t(`booking.petTypes.${type.toLowerCase()}`)}</option>
              ))}
            </select>
          </Form.Item>
          <Form.Item label={t('booking.petName')} required>
            <Input
              value={newPet.dogName}
              onChange={e => setNewPet({ ...newPet, dogName: e.target.value })}
            />
          </Form.Item>
          <Form.Item label={t('booking.breed')} required>
            <Input
              value={newPet.breed}
              onChange={e => setNewPet({ ...newPet, breed: e.target.value })}
            />
          </Form.Item>
          <Form.Item label={t('booking.allergies')}>
            <Input
              value={newPet.allergies}
              onChange={e => setNewPet({ ...newPet, allergies: e.target.value })}
              placeholder={t('booking.allergiesPlaceholder')}
            />
          </Form.Item>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item label={t('booking.height')}>
                <Input
                  value={newPet.height}
                  onChange={e => setNewPet({ ...newPet, height: e.target.value })}
                  placeholder={t('booking.optional')}
                  type="number"
                  min={0}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={t('booking.weight')}>
                <Input
                  value={newPet.weight}
                  onChange={e => setNewPet({ ...newPet, weight: e.target.value })}
                  placeholder={t('booking.optional')}
                  type="number"
                  min={0}
                />
              </Form.Item>
            </Col>
          </Row>
          <Button
            type="primary"
            loading={addingPet}
            onClick={handleAddNewPet}
            style={{ marginRight: 8 }}
          >
            {t('account.save', 'Save')}
          </Button>
          <Button onClick={() => setShowAddPet(false)}>
            {t('account.cancel', 'Cancel')}
          </Button>
        </Form>
      </Card>
    ) : (
      <PetAddForm
        pets={pets}
        setPets={setPets}
        petRooms={petRooms}
        setPetRooms={setPetRooms}
        t={t}
        styles={styles}
        updatePet={updatePet}
        removePet={removePet}
        addPet={addPet}
        dates={dates}
        setDates={setDates}
        RangePicker={RangePicker}
      />
    )}
  </>
);

export default StepPetDetails;
