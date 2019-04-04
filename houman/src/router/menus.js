export default [
  {
    path: '/index',
    component: () => import('@/views/Dashboard/index'),
    children: [
      // { path: "/index/menus1", component: () => import('@/components/menu1') }
    ]
  },
  {
    path: '/menus1',
    component: () => import('@/components/menu1'),
    children: [
    ]
  },
  {
    path: '/menus2',
    component: () => import('@/components/menu2'),
    children: [
    ]
  },
  {
    path: '/exportFileIndex',
    component: () => import('@/components/exportFile/index'),
    children: [
    ]
  },
  {
    path: '/importFileIndex',
    component: () => import('@/components/importFile/index'),
    children: [
    ]
  },
]
