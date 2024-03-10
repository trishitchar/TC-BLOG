// config.js

// API NOTIFICATION msg
export const API_NOTIFICATION_msg = {
    loading: {
        title: 'Data is loading',
        message: 'Data is being loaded',
    },
    success: {
        title: 'Success',
        message: 'Data successfully loaded',
    },
    responseFailure: {
        title: 'Error',
        message: 'An error occurred while fetching response from the server',
    },
    requestFailure: {
        title: 'Error',
        message: 'An error occurred while parsing request data',
    },
    networkError: {
        title: 'Error',
        message: 'Unable to connect with the server, check internet',
    },
};

// API SERVICE CALL
// Service call: (url: '', method: get, put, post, delete, params: true, query: true)
export const SERVICE_URLS = {
    userSignup: {
        url: '/signup',
        method: 'POST',
    },
};
