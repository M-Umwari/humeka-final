import axios from 'axios';
import * as SecureStore from 'expo-secure-store'


const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000
});

axiosInstance.interceptors.request.use(
  async(request) => {
    const token = await SecureStore.getItemAsync("token");
    if(token){
      request.headers.Authorization = `Bearer ${token}`
    }
    return request
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if(!error.response){
      return Promise.reject('Network Error')
    }

    console.log(error.response)

    return Promise.reject(error.response.data.message)
  }
)

export default axiosInstance;