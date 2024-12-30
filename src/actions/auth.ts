import { http } from '@/lib/http';
import { UserLogin } from '@/types/auth';

export const getProfile = async () => {
    return http.get<UserLogin>('/auth/me');
};
