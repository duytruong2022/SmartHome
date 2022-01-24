<template>
    <el-container>
        <el-header>Header</el-header>
        <el-container class="layout">
            <el-aside width="200" class="side-bar">
                <sidebar />
            </el-aside>
            <el-main class="main">
                <el-row gutter="50">
                    <el-col :md="12" :lg="12" :xl="12">
                        <el-card shadow="hover" class="card card1">
                            <div class="card-title">Infomation about your smart home</div>
                            <div>- Smart home</div>
                            <div>- Interactive security</div>
                            <div>- Environmental monitoring</div>
                            <div>- Control device</div>
                            <div>- Intelligent tracking</div>
                            <div>- Product showcase</div>
                        </el-card>
                    </el-col>
                    <el-col :md="11" :lg="11" :xl="11">
                        <el-card class="card-img">
                            <img
                                class="smarthome-img1"
                                src="@/assets/images/smart-home.jpg"
                                alt=""
                                width="300"
                            />
                            <div>Smart Home</div>
                        </el-card>
                    </el-col>
                    <el-col :md="12" :lg="12" :xl="12">
                        <el-card shadow="hover" class="card">
                            <div class="card-title">Benefits of smart home for you</div>
                            <div>- Great Potential in Saving Energy and Money</div>
                            <div>- Extreme Convenience</div>
                            <div>- Boost Your Home Security</div>
                            <div>- Save on Your Appliances and Lighting System</div>
                            <div>- Save Precious Time</div>
                            <div>- Contributes to the Economy</div>
                            <div>- Full Control When Your Out of Town</div>
                            <div>- Keep An Eve on Your Kids</div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import sidebar from '../../components/layouts/sidebar.vue';
@Options({
    components: {
        sidebar,
    },
})
export default class CatalogeListViewFilter extends Vue {}
</script>

<style lang="scss" scoped>
.side-bar {
    margin-top: 10px;
}
.layout {
    background-color: rgb(240, 243, 243);
    .main {
        padding: 15px 25px;
        margin: 10px;
        background-color: white;
        .card1 {
            height: 349px;
        }
        .card {
            margin-bottom: 15px;
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            font-weight: 400;
            line-height: 27px;
            color: #000000;
            text-align: left;
            .card-title {
                font-size: 20px;
                font-weight: 600;
            }
        }
        .card1 {
            width: 100%;
            min-width: 200px;
            .smarthome-img1 {
                border-radius: 4px;
                width: 100%;
                min-width: 200px;
            }
        }
    }
}
</style>
