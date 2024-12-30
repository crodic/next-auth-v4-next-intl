import { http } from '@/lib/http';
import { UserLogin } from '@/types/auth';

export const getProfile = async () => {
    return http.get<UserLogin>('/auth/me');
};

export const login = async ({ username, password }: { username: string; password: string }) => {
    return http.post<UserLogin>('/auth/login', { username, password, expiresInMins: 1 });
};
