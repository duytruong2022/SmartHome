import { useField, useForm } from 'vee-validate';
import { authService } from './service/api.service';
import { TokenService } from '@/utils/token';
import { login } from './store';
import * as yup from 'yup';
import { ILoginResponse } from './types';
export const initLoginForm = () => {
    const formValues = {
        email: 'user2@tokyotechlab.com',
        password: 'tt@1234',
    };
    const { handleSubmit, isSubmitting } = useForm({
        initialValues: formValues,
    });
    const onSubmit = handleSubmit(async (values) => {
        const result: ILoginResponse = await authService.login(values);
        if (result.code === 200) {
            const tokenService = new TokenService();
            tokenService.setAccessToken(result.data.accessToken.token);
            tokenService.setRefreshToken(result.data.refreshToken.token);
            tokenService.setAccessTokenExpiredAt(+result.data.accessToken.expiresIn);
            tokenService.setRefreshTokenExpiredAt(+result.data.refreshToken.expiresIn);
        }
        login.updateLoginCode(result.code);
        login.updateLoginMessage(result.message);
    });
    const { value: email, errorMessage: emailError } = useField(
        'email',
        yup.string().email().required(),
    );
    const { value: password, errorMessage: passwordError } = useField(
        'password',
        yup.string().required().min(6),
    );
    return {
        onSubmit,
        isSubmitting,
        email,
        emailError,
        password,
        passwordError,
    };
};
