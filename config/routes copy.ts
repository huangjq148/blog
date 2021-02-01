const RouteWatcher = '@/components/PageTab/RouteWatcher';
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
    redirect: '/dashboard',
  },
  {
    path: '/',
    // redirect: '/dashboard',
    component: '@/components/PageTab/TabLayout',
    flatMenu: true, // lift sub-routes up to top
    routes: [
      {
        path: '/dashboard',
        name: '首页',
        icon: 'smile',
        access: 'menuFilter',
        menuCode: '100',
        component: './dashboard',
        wrappers: [RouteWatcher],
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
            wrappers: [RouteWatcher],
          },
          {
            path: '/member/account',
            name: '账号信息',
            icon: 'smile',
            access: 'menuFilter',
            component: './member/account',
            wrappers: [RouteWatcher],
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
            wrappers: [RouteWatcher],
          },
          {
            path: '/article/info',
            name: '文章列表',
            icon: 'smile',
            access: 'menuFilter',
            component: './article/info',
            wrappers: [RouteWatcher],
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
            wrappers: [RouteWatcher],
          },
          {
            path: '/role/permission',
            name: '权限列表',
            icon: 'smile',
            access: 'menuFilter',
            component: './role/permission',
            wrappers: [RouteWatcher],
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
