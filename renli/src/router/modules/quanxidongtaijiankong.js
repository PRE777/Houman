import luan from '../../src/assets/images/404.png'
import ln from '../../src/assets/images/404_cloud.png'
export default [
  {
    path: '/teamControl',
    names:'队伍监控',
    img:luan,
    component: () => import('@/components/teamControl/index'),
    children: [
    ]
  },{
    path: '/sourceAnalysis',
    names:'军事人力资源综合评估',
    img:luan,
    component: () => import('@/components/sourceAnalysis/index'),
    children: [
    ]
  },
]