export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/login',
          },
        ],
      },
    ],
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: '首页',
    icon: 'smile',
    layout: false,
    hideInMenu: true,
    component: './home/index',
  },
  {
    path: '/admin',
    name: '首页',
    icon: 'smile',
    access: 'menuFilter',
    menuCode: '100',
    component: './dashboard',
  },

  {
    name: '查询列表',
    icon: 'table',
    path: '/list',
    component: './ListTableList',
  },
  {
    path: '/member',
    name: '会员管理',
    icon: 'crown',
    access: 'menuFilter',
    routes: [
      {
        path: '/member/info',
        name: '人员信息',
        icon: 'smile',
        access: 'menuFilter',
        component: './member/info',
      },
      {
        path: '/member/account',
        name: '账号信息',
        icon: 'smile',
        access: 'menuFilter',
        component: './member/account',
      },
    ],
  },
  {
    path: '/article',
    name: '文章管理',
    icon: 'crown',
    access: 'menuFilter',
    routes: [
      {
        path: '/article/type',
        name: '文章类别',
        icon: 'smile',
        access: 'menuFilter',
        component: './article/type',
      },
      {
        path: '/article/info',
        name: '文章列表',
        icon: 'smile',
        access: 'menuFilter',
        component: './article/info',
      },
    ],
  },
  {
    path: '/role',
    name: '权限管理',
    icon: 'crown',
    access: 'menuFilter',
    routes: [
      {
        path: '/role/info',
        name: '角色列表',
        icon: 'smile',
        access: 'menuFilter',
        component: './role/info',
      },
      {
        path: '/role/permission',
        name: '权限列表',
        icon: 'smile',
        access: 'menuFilter',
        component: './role/permission',
      },
    ],
  },
  {
    component: './404',
  },
];
