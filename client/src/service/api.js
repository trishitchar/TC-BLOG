import axios from 'axios';
import { API_NOTIFICATION_msg, SERVICE_URLS } from '../constants/config';

const API_URL = 'http://localhost:8000/';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
});

axiosInstance.interceptors.request.use((config) => {
    return config;
}, (error) => {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use((response) => {
    // stop global loader here
    return processResponse(response);
}, (error) => {
    return Promise.reject(processError(error)); // Fix: Pass 'error' instead of 'response'
});

/*
    if success -> return { isSuccess: true, data: object }
    if failed -> return { isFailure: true, status: string, msg: string, code: int }
*/

const processResponse = (response) => {
    if (response?.status === 200) {
        return {
            isSuccess: true,
            data: response.data
        };
    } else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        };
    }
};

// 3 types of error - response error and request error and network error
/*
    if success -> return { isSuccess: true, data: object }
    if failed -> return { isError: true, msg: string, code: int }
*/
const processError = (error) => { // Fix: Accept 'error' instead of 'response'
    if (error.response) {
        // request made and server responded with another code
        // that falls out of the range 200-299
        console.log('error in response', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_msg.responseFailure,
            code: error.response.status
        };
    } else if (error.request) {
        // request made but no response was received
        // network issue connectivity issue
        console.log('error in request', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_msg.requestFailure,
            code: ""
        };
    } else {
        // something happens in setting up the request that triggers an error
        console.log('error in network', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_msg.networkError,
            code: ""
        };
    }
};

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) => {
        axiosInstance({
            method: value.method,
            url: value.url,
            data: body,
            responseType: value.responseType,
            onUploadProgress: function (progressEvent) {
                if (showUploadProgress) {
                    let percentageComplete = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentageComplete);
                }
            },
            onDownloadProgress: function (progressEvent) {
                if (showDownloadProgress) {
                    let percentageComplete = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentageComplete);
                }
            },
        });
    };
}

export { API };
