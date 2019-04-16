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
  }, {
    path: '/coreUser',
    names: '核心用户管理',
    img: ln,
    redirect: '/coreUser/register',
    component: () => import('@/components/coreUser/index'),
    children: [
      { path: '/coreUser/register', component: () => import('@/components/register/index') },
      { path: '/coreUser/off', component: () => import('@/components/off/index') },
    ]
  }, {
    path: '/cesiumShow',
    names: '综合态势展示',
    img: ln,
    component: () => import('@/components/cesiumShow/index'),
    children: [
    ]
  }, {
    path: '/teamState',
    names: '队伍状态评估',
    img: luan,
    component: () => import('@/components/teamState/index'),
    children: [
    ]
  },
  {
    path: '/qualityAnalysis',
    names: '人力资源数分析统计',
    img: luan,
    component: () => import('@/components/qualityAnalysis/index'),
    children: [
    ]
  }
]