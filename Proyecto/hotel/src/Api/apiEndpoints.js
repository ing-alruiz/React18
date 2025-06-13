const apiEndpoints = {
    testimonials: {
        endpoint: '/testimonials',
        method: 'GET',
    },
    services: {
        endpoint: '/services',
        method: 'GET',
    },
    roomTypes: {
        endpoint: '/roomTypes',
        method: 'GET',
    },
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