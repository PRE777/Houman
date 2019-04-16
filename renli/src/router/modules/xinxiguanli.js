import luan from '../../src/assets/images/404.png'
import ln from '../../src/assets/images/404_cloud.png'
export default [
  {
    path: '/dictionaryManage',
    names: '人员资源数据字典管理',
    img: ln,
    component: () => import('@/components/dictionaryManage/index'),
    children: [
    ]
  },{
    path: '/talentPool',
    names: '人才池管理',
    img: ln,
    component: () => import('@/components/talentPool/index'),
    children: [
    ]
  }, {
    path: '/dwIfor',
    names: '单位信息综合管理',
    img: ln,
    component: () => import('@/components/dwIfor/index'),
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
  },
  {
    path: '/bzLish',
    names: '编制岗位',
    img: ln,
    component: () => import('@/components/bzLish/index'),
    children: [
    ]
  }, {
    path: '/peopleGl',
    names: '人员身份管理',
    img: ln,
    component: () => import('@/components/peopleGl/index'),
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
    path: '/OperationalStatistics',
    names: '作战支持综合评估',
    img: ln,
    component: () => import('@/components/OperationalStatistics/index'),
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
  }
]