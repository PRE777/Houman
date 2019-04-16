import luan from '../../src/assets/images/404.png'
import ln from '../../src/assets/images/404_cloud.png'
export default [
  {
    path: '/officerBusinessDealt',
    names: '业务办理组件',
    img: ln,
    component: () => import('@/components/officerBusinessDealt/index'),
    children: [
    ]
  },{
    path: '/statementOutput',
    names: '人员资源报表',
    img: ln,
    component: () => import('@/components/statementOutput/index'),
    children: [
    ]
  }
]