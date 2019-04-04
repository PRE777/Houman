import store from '@/store'
import { checkResource } from '@/api/login'

/**
 * 权限检查
 * @param {String} value
 * @return {Promise}
 */
export function checkPermission (value) {
  return new Promise((resolve, reject) => {
    const permissions = store.getters && store.getters.permissions
    console.log(permissions)
    if (value && permissions.indexOf(value) !== -1) {
      resolve()
    } else {
      checkResource(value).then(() => {
        // 保存权限信息
        store.commit('ADD_PERMISSION', value)
        resolve()
      }).catch(reject)
    }
  })
}