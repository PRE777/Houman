import luan from '../../src/assets/images/404.png'
import ln from '../../src/assets/images/404_cloud.png'
export default [
  {
    path: '/zhIfor',
    names: '综合信息检索',
    img: ln,
    component: () => import('@/components/zhIfor/index'),
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
    path: '/idVertification',
    names: '人员身份图形界面验证',
    img: luan,
    component: () => import('@/components/idVertification/index'),
    children: [
    ]
  },
]