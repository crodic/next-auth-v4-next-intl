import axios from 'axios';
import { getSession } from 'next-auth/react';

export const http = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    // withCredentials: true,
});

http.interceptors.request.use(
    async (config) => {
        const session = await getSession();
        if (session) config.headers.Authorization = `Bearer ${session.user.accessToken}`;
        return config;
    },
    (error) => Promise.reject(error)
);

http.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
);
