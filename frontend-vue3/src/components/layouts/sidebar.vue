<template>
    <!-- <sidebar> -->
    <div id="sidebar" class="sidebar">
        <div class="sidebar-inner">
            <el-menu
                :default-openeds="activeHighlightMenu"
                :collapse="isCollapse"
                :unique-opened="true"
                :collapse-transition="false"
            >
                <template
                    :key="['d', submenuIndex].join('-')"
                    v-for="(submenu, submenuIndex) in menus.submenu"
                >
                    <router-link
                        :to="submenu.to"
                        v-if="!submenu.childs && showMenu(submenu)"
                    >
                        <el-menu-item
                            :index="['d', submenuIndex, Date.now()].join('-')"
                            :class="{ 'active-menu': isActiveMenu(submenu) }"
                        >
                            <component :is="submenu.iconComponent" class="module-icon" />
                            <template #title>
                                <span>{{ $t(submenu.name) }}</span>
                            </template>
                        </el-menu-item>
                    </router-link>
                    <el-sub-menu
                        v-if="submenu.childs"
                        :index="['d', submenuIndex].join('-')"
                        :class="{ 'active-menu': isActiveParentMenu(submenu) }"
                    >
                        <template #title>
                            <component :is="submenu.iconComponent" class="module-icon" />
                            <span>{{ $t(submenu.name) }}</span>
                        </template>
                        <el-menu-item-group>
                            <router-link
                                :key="itemIndex"
                                v-for="(item, itemIndex) in submenu.childs"
                                :to="item.to"
                            >
                                <el-menu-item
                                    :index="['d', submenuIndex, itemIndex].join('-')"
                                    :class="isActiveSubMenu(item)"
                                >
                                    <component
                                        :is="item.iconComponent"
                                        class="module-icon"
                                    />
                                    <span>{{ $t(item.name) }}</span>
                                </el-menu-item>
                            </router-link>
                        </el-menu-item-group>
                    </el-sub-menu>
                </template>
            </el-menu>
    </div>
    <!-- </sidebar> -->
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { menus as initMenu } from './menu';
import { appModule } from '@/store/app';
import { IMenuGroup, ISubMenu } from './type';
import {
    ArrowLeft as ArrowLeftIcon,
    ArrowRight as ArrowRightIcon,
    User as UserIcon,
    House as HouseIcon,
    Clock as ClockIcon,
    Calendar as CalenderIcon,
    Monitor as MonitorIcon,
    Service as ServiceIcon,
    Printer as PrinterIcon,
    Key as KeyIcon,
    Setting as SettingIcon,
    QuestionFilled as QuestionIcon,
} from '@element-plus/icons-vue';
@Options({
    components: {
        UserIcon,
        HouseIcon,
        ClockIcon,
        CalenderIcon,
        MonitorIcon,
        ServiceIcon,
        PrinterIcon,
        KeyIcon,
        SettingIcon,
        QuestionIcon,
        ArrowLeftIcon,
        ArrowRightIcon,
    },
})
export default class SideBar extends Vue {
    isCollapse = false;

    get menus(): IMenuGroup {
        return { ...initMenu };
    }

    get activeHighlightMenu(): string[] {
        const menuObj: Record<string, string[]> = {};
        this.menus.submenu.forEach((item: ISubMenu, index: number) => {
            menuObj[index] = item.childs
                ? item.childs.map((child: ISubMenu) => child.pageName || '')
                : [];
        });
        const path = this.$router.currentRoute?.value?.name as string;
        const mainMenu: string[] = [];

        Object.values(menuObj).forEach((itemSubMenu: string[], index: number) => {
            if (itemSubMenu?.includes(path)) mainMenu.push(`d-${index}`);
        });
        return mainMenu;
    }

    get isMiniSidebar(): boolean {
        return appModule.isMiniSidebar;
    }

    get isDrawer(): boolean {
        return appModule.isDrawer;
    }

    toggleSidebar(): void {
        this.isCollapse = !this.isCollapse;
        document.body.classList.toggle('mini-sidebar');
    }

    closeDrawer(): void {
        appModule.toggleDrawer();
    }

    isActiveMenu(value: ISubMenu): boolean {
        return value.to === `/${this.$route.path.split('/')[1]}`;
    }

    isActiveSubMenu(value: ISubMenu): string {
        const router = this.$router.currentRoute?.value?.name as string;
        if (value.pageName?.includes(router)) return 'active-menu';
        else return '';
    }

    isActiveParentMenu(items: ISubMenu): boolean | undefined {
        const isActive = items?.childs
            ?.map((item: ISubMenu) => item.to)
            .includes(this.$route.path);
        return isActive;
    }

}
</script>
<style lang="scss" scoped>
.sidebar {
    background-color: #ffffff;
    overflow: hidden;
    border-right: 1px solid #e0e0e0;
    bottom: 0;
    left: 0;
    margin-top: 0;
    position: fixed;
    top: 64px;
    transition: unset;
    width: 260px;
    z-index: map-get($map: $zIndex, $key: sideBar);
    height: auto;
    @media only screen and (max-width: 991.98px) {
        margin-left: -260px;
    }
}

.arrow-icon {
    height: 1em;
    width: 1em;
}

.module-icon {
    height: 2em;
    width: 2em;
    margin-right: 5px;
    padding-right: 5px;
}

.sidebar-inner {
    display: flex;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    /* width */
    &::-webkit-scrollbar {
        width: 10px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey;
        border-radius: 10px;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
        background: rgb(180, 179, 179);
        border-radius: 10px;
    }
    flex-direction: column;
    height: calc(97vh - 98px);
    transition: all 0.2s ease-in-out 0s;
    .el-menu {
        border: none;
        padding-top: 20px;
        height: 100%;
        a {
            color: #212121;
            text-decoration: none;
            display: block;
            &:not(:last-child) {
                margin-bottom: 5px;
            }
        }
        li {
            &:not(:last-child) {
                margin-bottom: 5px;
            }
            a {
                margin-bottom: 0;
            }
        }
        .el-sub-menu {
            text-align: left;
        }
        .el-menu-item,
        .el-sub-menu {
            color: #212121;
            border-radius: 8px;
            a {
                padding-left: 25px;
            }
            &.active-menu {
                background-color: #e6f6ff;
                &.is-opened {
                    background-color: transparent;
                }
            }
        }

        .el-menu-item {
            &.active-menu {
                color: #212121;
                background-color: #e6f6ff;
            }
        }
        .el-menu-item {
            &:hover {
                color: #212121;
                background-color: #ededed;
            }
        }
        .el-menu-item,
        .el-sub-menu__title {
            text-align: left;
            height: 40px;
            line-height: 40px;
            padding: 18 7px !important;
            border-radius: 8px;
            i {
                font-size: 22px;
                padding-right: 10px;
                color: #212121;
            }
        }
        :deep(.el-sub-menu__title) {
            height: 40px;
            line-height: 40px;
            border-radius: 8px;
            padding: 18 7px !important;
            &:hover {
                color: #212121;
                background-color: #ededed;
            }
        }
        &.el-menu--collapse {
            padding-top: 20px;
            display: flex;
            flex-direction: column;
            flex: 1;
            width: 100%;
            :deep(.el-menu-item) * {
                text-align: center;
            }
        }
        ul {
            .el-menu-item {
                color: #212121;
                padding-left: 15px !important;
            }
        }
    }
}

.el-popper {
    .el-menu {
        .el-menu-item {
            height: 40px;
            line-height: 40px;
            &.active-menu {
                color: #212121;
                background-color: #e6f6ff;
            }
            &:hover {
                color: #212121;
                background-color: #ededed;
            }
            &:not(:last-child) {
                margin-bottom: 5px;
            }
        }
        .el-menu-item-group {
            :deep(.el-menu-item-group__title) {
                display: none !important;
            }
        }
    }
}
:deep(.el-drawer__body) {
    margin-top: 84px;
    overflow-y: auto;
    overflow-x: hidden;
}

.sidebar-minimizer {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
    margin-bottom: 5px;
    position: sticky;
    align-items: center;
    position: -webkit-sticky;
    width: inherit;
    cursor: pointer;
    border: 0;
    overflow: hidden;
    background: white;
}

@media only screen and (min-width: 991px) {
    #toggle_btn {
        color: #212121;
        float: left;
        font-size: 26px;
        height: 46px;
        padding: 0 10px;
        display: flex;
        align-items: center;
        text-decoration: none;
        &:hover {
            background-color: #ededed;
            border-radius: 50px;
        }
    }
    .mini-sidebar {
        .sidebar {
            width: 64px;
        }
        .sidebar-minimizer {
            justify-content: center;
        }
    }
}
</style>
