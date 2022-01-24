import service from '@/plugins/axios';
import { BaseService } from '@/utils/api';
import { ILoginData, ILoginResponse } from '../types';
class AuthService extends BaseService {
    login(credential: ILoginData): Promise<ILoginResponse> {
        return this.client.post('/login', credential);
    }
}
export const authService = new AuthService({ baseUrl: '/' }, service);
