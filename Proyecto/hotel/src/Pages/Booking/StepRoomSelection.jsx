import React from 'react';
import { Card, List } from 'antd';

const StepRoomSelection = ({ getPetList, rooms, petRooms, setPetRooms, t, styles }) => (
  <>
    {getPetList().map((pet, idx) => (
      <Card
        key={pet?.id || idx}
        title={`${t('booking.selectRoomFor')} ${pet?.name || pet?.dogName || t('booking.pet') + ' #' + (idx + 1)}`}
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
              onClick={() => {
                const updated = [...petRooms];
                updated[idx] = room;
                setPetRooms(updated);
              }}
            >
              <Card bordered={false} style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={room.photoUrl || 'https://via.placeholder.com/100'}
                  alt={room.name}
                  width={100}
                  height={80}
                  style={{ objectFit: 'cover', borderRadius: 8, marginRight: 16 }}
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
);

export default StepRoomSelection;
