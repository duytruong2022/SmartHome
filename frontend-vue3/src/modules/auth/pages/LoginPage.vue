<template>
    <el-card :body-style="{ padding: 0 }" class="login-card">
        <div class="login-card-content">
            <div class="p-3">
                <form class="form-horizontal auth-form" action="/">
                    <div class="form-group mb-2">
                        <label class="form-label" for="username">Username</label>
                        <el-input
                            v-model="form.email"
                            placeholder="Enter username"
                            id="username"
                        />
                    </div>
                    <div class="form-group mb-2">
                        <label class="form-label" for="userpassword">Password</label>
                        <el-input
                            v-model="form.password"
                            placeholder="Enter password"
                            show-password
                            id="userpassword"
                        />
                    </div>
                    <div class="form-group row my-3">
                        <div class="col-sm-6">
                            <div class="custom-control custom-switch switch-success">
                                <input
                                    type="checkbox"
                                    class="custom-control-input"
                                    id="customSwitchSuccess"
                                />
                                <label
                                    class="form-label text-muted"
                                    for="customSwitchSuccess"
                                    >Remember me</label
                                >
                            </div>
                        </div>
                        <!--end col-->
                        <div class="col-sm-6 text-end">
                            <a href="#" class="text-muted font-13"
                                ><i class="dripicons-lock"></i> Forgot password?</a
                            >
                        </div>
                        <!--end col-->
                    </div>
                    <!--end form-group-->

                    <div class="form-group mb-0 row">
                        <div class="col-12">
                            <button
                                class="btn btn-primary w-100 waves-effect waves-light"
                                type="button"
                                @click="handleSubmit"
                            >
                                Log In <i class="fas fa-sign-in-alt ms-1"></i>
                            </button>
                        </div>
                        <!--end col-->
                    </div>
                    <!--end form-group-->
                </form>
                <!--end form-->
            </div>
        </div>
    </el-card>
</template>

<script lang="ts">
import { showErrorMessage } from '@/utils/util';
import { ElMessage } from 'element-plus';
import { Options, setup, Vue } from 'vue-class-component';
import { initLoginForm } from '../form';
import { login } from '../store';

@Options({})
export default class LoginPage extends Vue {
    msg!: string;
    form = setup(() => initLoginForm());
    async handleSubmit(): Promise<void> {
        if (this.form.email === '') {
            ElMessage.error('Hãy nhập email');
        } else if (this.form.password === '') {
            ElMessage.error('Hãy nhập password');
        } else {
            await this.form.onSubmit();
            const code = +login.getLoginCode;
            const message = login.getLoinMessage + '';
            if (code === 200) {
                this.$router.replace('/');
            } else {
                showErrorMessage(message);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.login-card {
    ::v-deep .el-card__header {
        background-color: #0c213a;
    }
}
.form-group {
    text-align: left;
}
</style>
