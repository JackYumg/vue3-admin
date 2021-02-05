import { routes, AdminRouteRecordRaw } from '@/router';
import Icon from '@ant-design/icons-vue/lib/icons';

export interface MenuType {
  title: string;
  path: string;
  children: Array<MenuType>;
  outLink?: string;
  iconName?: keyof typeof Icon;
  iconHref?: string;
}

export interface MenuStateType {
  menuList: Array<MenuType>;
}

const transformMenu = (): Array<MenuType> => {
  const menuList: Array<MenuType> = [];

  const innerLoop = (_routes: Array<AdminRouteRecordRaw>, parent: MenuType): void => {
    _routes.forEach((item: AdminRouteRecordRaw) => {
      // 设置了menu为true才显示
      if (item.menu) {
        const menu: MenuType = {
          title: item.meta?.title || '',
          path: `${parent.path.replace(/\/$/, '')}/${item.path.replace(/^\//, '')}`,
          iconName: item.meta?.iconName,
          iconHref: item.meta?.iconHref,
          children: [],
          outLink: item.outLink
        };

        if (item.children && item.children.length > 0) {
          innerLoop(item.children, menu);
        }

        parent.children.push(menu);
      }
    });
  };

  innerLoop(routes, { children: menuList, path: '', title: '' });

  return menuList;
};

const state: MenuStateType = {
  menuList: []
};
const mutations = {
  routeChanged(state: MenuStateType): void {
    state.menuList = transformMenu();
  }
};
const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
