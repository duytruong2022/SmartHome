import { Component } from 'vue';

export interface IMenuGroup {
    title?: string;
    class?: string;
    submenu: ISubMenu[];
}

export interface ISubMenu {
    icon?: string;
    /* eslint-disable */
    iconComponent?: Component;
    name?: string;
    class?: string;
    to?: string;
    badge?: number | string;
    active?: boolean;
    subdrop?: boolean;
    hasNotify?: boolean;
    childs?: ISubMenu[];
    pageName?: string;
}