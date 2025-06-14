const apiEndpoints = {
    testimonials: {
        endpoint: '/testimonials',
        method: 'GET',
    },
    services: {
        endpoint: '/services',
        method: 'GET',
    },
    rooms: {
        endpoint: '/rooms',
        method: 'GET',
    },
    room: (id) => ({
        endpoint: `/rooms/${id}`,
        method: 'PATCH',
    }),
    createRoom: {
        endpoint: '/rooms',
        method: 'POST',
    },
    updateRoom: (id) => ({
        endpoint: `/rooms/${id}`,
        method: 'PUT',
    }),
    roomTypes: {
        endpoint: '/roomTypes',
        method: 'GET',
    },
    roomType: (id) => ({
        endpoint: `/roomTypes/${id}`,
        method: 'PATCH',
    }),
    createRoomType: {
        endpoint: '/roomTypes',
        method: 'POST',
    },
    updateRoomType: (id) => ({
        endpoint: `/roomTypes/${id}`,
        method: 'PUT',
    }),
    reservations: {
        endpoint: '/reservations',
        method: 'GET',
    },
    reservation: (id) => ({
        endpoint: `/reservations/${id}`,
        method: 'GET',
    }),
    users: {
        endpoint: '/users',
        method: 'GET',
    },
    pets: {
        endpoint: '/pets',
        method: 'GET',
    },
    userPets: (userId) => ({
        endpoint: `/pets?userId=${userId}`,
        method: 'GET',
    }),
    pet: (id) => ({
        endpoint: `/pets/${id}`,
        method: 'PATCH',
    }),
    // Add pet to user: POST /users/:userId/pets
    addPetToUser: (userId) => `/users/${userId}/pets`,
    userReservations: (userId) => ({
        endpoint: `/reservations?userId=${userId}`,
        method: 'GET',
    }),
    user: (id) => ({
        endpoint: `/users/${id}`,
        method: 'PATCH',
    }),
};

export default apiEndpoints;