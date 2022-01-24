import { PageName } from '@/modules/common/constants';
import { ISubMenu } from './type';
import {
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
// start dashboardGroup
const dashboard: ISubMenu = {
    iconComponent: HouseIcon,
    name: 'common.app.menu.dashboar',
    class: '',
    active: true,
    subdrop: false,
    to: '/dashboard',
    pageName: PageName.DASHBOARD_PAGE,
};
// end dashboardGroup

// start user group
const userMenu: ISubMenu = {
    iconComponent: UserIcon,
    name: 'common.app.menu.user.title',
    class: '',
    active: false,
    subdrop: false,
    hasNotify: false,
    childs: [
        {
            name: 'common.app.menu.user.userManagement',
            to: '/user',
            class: '',
            active: false,
            pageName: PageName.USER_PAGE,
        },
        {
            name: 'common.app.menu.user.contractManagement',
            to: '/contract',
            class: '',
            active: false,
            pageName: PageName.CONTRACT_LIST_PAGE,
        },
        {
            name: 'common.app.menu.user.teamManagement',
            to: '/team',
            class: '',
            active: false,
            pageName: PageName.TEAM_PAGE,
        },
    ],
};

export const menus = {
    class: '',
    submenu: [
        dashboard,
        userMenu,
    ],
};
