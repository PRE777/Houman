import luan from '../../src/assets/images/404.png'
import ln from '../../src/assets/images/404_cloud.png'
export default [{
  path: '/comprehensiveState',
  names: '综合态势分析',
  img: ln,
  component: () => import('@/components/comprehensiveState/index'),
  children: [
  ]
},
]