import React from 'react';
import { Form, Input, Button, Card, Row, Col } from 'antd';
import { PlusOutlined, MinusOutlined, DeleteOutlined } from '@ant-design/icons';

const petTypes = ['Dog', 'Cat', 'Rabbit', 'Other'];

const PetAddForm = ({
  pets,
  setPets,
  petRooms,
  setPetRooms,
  t,
  styles,
  updatePet,
  removePet,
  addPet,
  dates,
  setDates,
  RangePicker
}) => (
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
);

export default PetAddForm;
