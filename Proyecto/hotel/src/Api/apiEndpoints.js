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
};

export default apiEndpoints;