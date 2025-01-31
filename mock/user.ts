import { MockMethod } from 'vite-plugin-mock';
import Icon from '@ant-design/icons-vue/lib/icons';

import { ADMIN_TOKEN } from './login';

interface Menu {
  path: string;
  name: string;
  component?: string;
  redirect?: string;
  menu?: boolean;
  outLink?: string;
  meta?: {
    title?: string;
    // ant-design-vue使用的标准Icon组件名称
    iconName?: keyof typeof Icon;
    // 阿里矢量图标js标准，使用svg创建，以#开头
    iconHref?: string;
    [propName: string]: any;
  };
  children?: Array<Menu>;
}

const DashboardModule: Menu[] = [
  {
    path: '/',
    component: 'layout',
    redirect: '/workspace',
    meta: { title: '首页', iconName: 'SlidersFilled' },
    name: 'Index',
    menu: true,
    children: [
      {
        path: 'workspace',
        name: 'IndexPage',
        component: 'workspace',
        menu: true,
        meta: { title: '工作台', iconName: 'BgColorsOutlined' }
      },
      {
        path: 'monitor',
        name: 'MonitorPage',
        component: 'monitor',
        menu: true,
        meta: { title: '监控台', iconName: 'CodeOutlined' }
      }
    ]
  }
];

const DataModule: Menu[] = [
  {
    path: '/data',
    component: 'layout',
    redirect: '/data/chart',
    name: 'Data',
    meta: { title: '数据分析', iconName: 'SlidersFilled' },
    menu: true,
    children: [
      {
        path: 'chart',
        name: 'Chart',
        meta: { title: '图形数据', iconName: 'BarChartOutlined' },
        menu: true,
        component: 'chart_data'
      },
      {
        path: 'card',
        name: 'Card',
        meta: { title: '模块数据', iconName: 'RobotOutlined' },
        menu: true,
        component: 'card_data'
      }
    ]
  },
  {
    path: '/form',
    component: 'layout',
    redirect: '/form/base',
    name: 'Form',
    meta: { title: '表单页', iconName: 'FormOutlined' },
    menu: true,
    children: [
      {
        path: 'base',
        name: 'FormBase',
        meta: { title: '基本表单', iconName: 'EditOutlined' },
        menu: true,
        component: 'base_form'
      },
      {
        path: 'def',
        name: 'FormDef',
        meta: { title: '自定义表单', iconName: 'DiffOutlined' },
        menu: true,
        component: 'def_form'
      }
    ]
  }
];

const DemoModule: Menu[] = [
  {
    path: '/m',
    component: 'layout',
    redirect: '/m/m1',
    name: 'Menu0',
    meta: {
      title: '多级菜单',
      iconName: 'QuestionOutlined'
    },
    menu: true,
    children: [
      {
        path: 'm1',
        name: 'Menu1-1',
        meta: { title: '菜单1-1', iconName: 'QuestionCircleOutlined' },
        menu: true,
        component: 'demo_m1'
      },
      {
        path: 'm2',
        name: 'Menu1-2',
        meta: { title: '菜单1-2', iconName: 'QuestionCircleOutlined' },
        menu: true,
        component: 'demo_m2',
        redirect: '/m/m2/m1',
        children: [
          {
            path: 'm1',
            name: 'Menu1-2-1',
            meta: { title: '菜单1-2-1', iconName: 'QuestionCircleOutlined' },
            menu: true,
            component: 'demo_m2_1'
          },
          {
            path: 'm2',
            menu: true,
            name: 'Menu1-2-2',
            meta: { title: '菜单1-2-2', iconName: 'QuestionCircleOutlined' },
            component: 'demo_m2_2'
          }
        ]
      }
    ]
  }
];
const UserModule: Menu[] = [
  {
    path: '/user',
    component: 'layout',
    name: 'User',
    meta: { title: '用户中心' },
    children: [
      {
        path: '',
        name: 'UserIndex',
        meta: { title: '个人中心' },
        component: 'user_center'
      },
      {
        path: 'setting',
        name: 'Setting',
        meta: { title: '个人设置' },
        component: 'user_setting'
      }
    ]
  }
];
const TableModule: Menu[] = [
  {
    path: '/table',
    component: 'layout',
    redirect: '/table/base',
    name: 'Table',
    meta: { title: '表格页', iconName: 'TableOutlined' },
    menu: true,
    children: [
      {
        path: 'base',
        name: 'TableBase',
        meta: { title: '基本表格', iconName: 'TableOutlined' },
        menu: true,
        component: 'table_base'
      },
      {
        path: 'server',
        name: 'TableServer',
        meta: { title: '动态数据表格', iconName: 'TabletOutlined' },
        menu: true,
        component: 'table_dynamic'
      }
    ]
  }
];

const ErrorModule: Menu[] = [
  {
    path: '/error',
    component: 'layout',
    redirect: '/error/404',
    name: 'Error',
    meta: {
      title: '异常页',
      iconName: 'QuestionOutlined'
    },
    menu: true,
    children: [
      {
        path: '403',
        name: '403',
        meta: { title: '403', iconName: 'QuestionCircleOutlined' },
        menu: true,
        component: 'error_403'
      },
      {
        path: '404',
        name: '404',
        meta: { title: '404', iconName: 'QuestionCircleOutlined' },
        menu: true,
        component: 'error_404'
      },
      {
        path: '500',
        name: '500',
        meta: { title: '500', iconName: 'QuestionCircleOutlined' },
        menu: true,
        component: 'error_500'
      }
    ]
  }
];

const OutLinkModule: Menu[] = [
  {
    path: '/outlink',
    name: 'Github',
    meta: { title: '外部链接', iconName: 'GithubFilled' },
    menu: true,
    outLink: 'https://github.com/zhoubangfu/vue3-admin',
    redirect: '/'
  }
];

const user: Array<MockMethod> = [
  {
    url: '/api/user',
    method: 'get',
    response: ({ headers }): any => {
      let menus = [
        ...DashboardModule,
        ...DataModule,
        ...UserModule,
        ...TableModule,
        ...ErrorModule,
        ...OutLinkModule
      ];

      // 管理员角色菜单
      if (headers.token === ADMIN_TOKEN) {
        menus = menus.concat(DemoModule);
      }

      return {
        code: 0,
        data: {
          info: {
            username: headers.token === ADMIN_TOKEN ? '管理员' : '普通用户',
            avatar: '/static/img/head02.gif'
          },
          menus
        }
      };
    }
  }
];

export default user;
