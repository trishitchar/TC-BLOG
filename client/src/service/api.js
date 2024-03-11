import axios from 'axios';
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config';

const API_URL = 'http://localhost:8000/';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "content-type": "application/json"
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        // if(config.responseType.params){
        //     config.params = config.responseType.params
        // }else if(config.TYPE && config.TYPE.query){
        //     config.url = config.url+ '/' + config.TYPE.query
        // }
        return config;
}, (error) => {
    console.log("Request interceptor error:", error)
    return Promise.reject(error);
});

/*
    Expects: {status: string, data: object, message: string, code: int}
    returns {isSuccess: bool, status: string, data: object, message: string, code: int}
*/

// axiosInstance.interceptors.response.use((response) => {
//     // stop global loader here
//     return processResponse(response);
// }, (error) => {
//     return Promise.reject(processError(error)); 
// });

/*
    if success -> return { isSuccess: true, data: object }
    if failed -> return { isFailure: true, status: string, msg: string, code: int }
*/

const processResponse = (response) => {
    response["isSuccess"] = response.status >=200 && response.status<300;
    return response;
};

// 3 types of error - response error and request error and network error
/*
    if success -> return { isSuccess: true, data: object }
    if failed -> return { isError: true, msg: string, code: int }
*/
const processError = async (error) => { // Fix: Accept 'error' instead of 'response'
    if (error.response) {
        // request made and server responded with another code
        // that falls out of the range 200-299
        console.log('error in response', error);
        return {
            // isError: true,
            // msg: error.response.data.msg || API_NOTIFICATION_MESSAGES.responseFailure,
            error: API_NOTIFICATION_MESSAGES.responseFailure,
            code: error.response.status
        };
    } else if (error.request) {
        // request made but no response was received
        // network issue connectivity issue
        console.log('error in request', error);
        return {
            // isError: true,
            // msg: API_NOTIFICATION_MESSAGES.requestFailure.message,
            error: API_NOTIFICATION_MESSAGES.networkError,
            code: ""
        };
    } else {
        // something happens in setting up the request that triggers an error
        console.log('error in network', error);
        return {
            // isError: true,
            // msg: API_NOTIFICATION_MESSAGES.networkError.
            // message,
            error: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ""
        };
    }
};
axiosInstance.interceptors.response.use(processResponse, processError);

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) => {
        return axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' ? '':body,
            responseType: value.responseType,
            onUploadProgress: function (progressEvent) {
                if (showUploadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentCompleted);
                }
            },
            onDownloadProgress: function (progressEvent) {
                if (showDownloadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentCompleted);
                }
            }
        });
    };
}

export { API };
