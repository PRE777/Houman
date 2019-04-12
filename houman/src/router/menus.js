import luan from '../../src/assets/images/404.png'
import ln from '../../src/assets/images/404_cloud.png'
export default [
  {
    path: '/sysInfor',
    names: '系统门户',
    img: luan,
    component: () => import('@/components/sysInfor/index'),
    children: [
    ]
  },
  {
    path: '/cesiumShow',
    names: '综合态势展示',
    img: ln,
    component: () => import('@/components/cesiumShow/index'),
    children: [
    ]
  },
  {
    path: '/comprehensiveState',
    names: '综合态势分析',
    img: ln,
    component: () => import('@/components/comprehensiveState/index'),
    children: [
    ]
  },
  {
    path: '/importFile',
    names: '军事人力资源信息管理辅助工具',
    img: ln,
    component: () => import('@/components/importFile/index'),
    children: [
    ]
  }, {
    path: '/exportFile',
    names: '军事人力资源个人信息助理',
    img: ln,
    component: () => import('@/components/exportFile/index'),
    children: [
    ]
  }, {
    path: '/officerBusinessDealt',
    names: '业务办理组件',
    img: ln,
    component: () => import('@/components/officerBusinessDealt/index'),
    children: [
    ]
  }
]
