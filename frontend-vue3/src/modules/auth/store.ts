import { getModule, VuexModule, Mutation, Module } from 'vuex-module-decorators';
import store from '@/store';

@Module({ dynamic: true, namespaced: true, store, name: 'Login' })
class Login extends VuexModule {
    loginCode = 200;
    loginMessage = '';

    get getLoginCode() {
        return this.loginCode;
    }

    get getLoinMessage() {
        return this.loginMessage;
    }

    @Mutation
    updateLoginCode(code: number) {
        this.loginCode = code;
    }

    @Mutation
    updateLoginMessage(message: string) {
        this.loginMessage = message;
    }
}

export const login = getModule(Login);
