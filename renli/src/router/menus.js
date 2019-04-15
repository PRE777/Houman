import luan from '../../src/assets/images/404.png'
import ln from '../../src/assets/images/404_cloud.png'
export default [
  {
    path: '/sysInfor',
    names:'系统门户',
    img:luan,
    component: () => import('@/components/sysInfor/index'),
    children: [
    ]
  },
  {
    path: '/coreUser',
    names:'核心用户管理',
    img:ln,
    redirect:'/coreUser/register',
    component: () => import('@/components/coreUser/index'),
    children: [
      {path:'/coreUser/register',component: () => import('@/components/register/index')},
      {path:'/coreUser/off',component: () => import('@/components/off/index')},
    ]
  },
  {
    path: '/bzLish',
    names:'编制岗位',
    img:ln,
    component: () => import('@/components/bzLish/index'),
    children: [
    ]
  },
  {
    path: '/zhIfor',
    names:'综合信息检索',
    img:ln,
    component: () => import('@/components/zhIfor/index'),
    children: [
    ]
  },
  {
    path: '/peopleGl',
    names:'人员身份管理',
    img:ln,
    component: () => import('@/components/peopleGl/index'),
    children: [

    ]
  },
  {
    path: '/dwIfor',
    names:'单位信息综合管理',
    img:ln,
    component: () => import('@/components/dwIfor/index'),
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
  },
  {
    path: '/teamState',
    names:'队伍状态评估',
    img:luan,
    component: () => import('@/components/teamState/index'),
    children: [
    ]
  },
  {
    path: '/qualityAnalysis',
    names:'人力资源数分析统计',
    img:luan,
    component: () => import('@/components/qualityAnalysis/index'),
    children: [
    ]
  },
  {
    path: '/teamControl',
    names:'队伍监控',
    img:luan,
    component: () => import('@/components/teamControl/index'),
    children: [
    ]
  },
  {
    path: '/sourceAnalysis',
    names:'军事人力资源综合评估',
    img:luan,
    component: () => import('@/components/sourceAnalysis/index'),
    children: [
    ]
  },
  {
    path: '/idVertification',
    names:'人员身份图形界面验证',
    img:luan,
    component: () => import('@/components/idVertification/index'),
    children: [
    ]
  },
  {
    path: '/personDataSource',
    names: '人员信息综合管理',
    img: ln,
    component: () => import('@/components/personDataSource/index'),
    children: [
    ]
  },
  {
    path: '/dictionaryManage',
    names: '人员资源数据字典管理',
    img: ln,
    component: () => import('@/components/dictionaryManage/index'),
    children: [
    ]
  },
  {
    path: '/statementOutput',
    names: '人员资源报表',
    img: ln,
    component: () => import('@/components/statementOutput/index'),
    children: [
    ]
  },
  {
    path: '/informationCollection',
    names: '人员资源数据信息采集',
    img: ln,
    component: () => import('@/components/informationCollection/Index'),
    children: []
  },
  {
    path: '/talentPool',
    names: '人才池管理',
    img: ln,
    component: () => import('@/components/talentPool/index'),
    children: [
    ]
  },
  {
    path: '/OperationalStatistics',
    names: '作战支持综合评估',
    img: ln,
    component: () => import('@/components/OperationalStatistics/index'),
    children: [
    ]
  }
]
