import { Routes } from '@/router/index'
import { getMenus } from '@/api/login'

// --------------------------------- hack 生成 route 对象path start  ----------------------------
function handleRoutes (routes) {
  routes.forEach(function (route) {
    addRouteRecord(route)
  })
}
function addRouteRecord (route, parent) {
  let path = route.path
  let pathToRegexpOptions = route.pathToRegexpOptions || {}
  let normalizedPath = normalizePath(path, parent, pathToRegexpOptions.strict)
  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive
  }

  let record = {
    path: normalizedPath,
    parent: parent
  }

  if (route.children) {
    route.children.forEach(function (child) {
      addRouteRecord(child, record)
    })
  }
  route.secNormalizedPath = normalizedPath
}
function normalizePath (path, parent, strict) {
  if (!strict) { path = path.replace(/\/$/, '') }
  if (path[0] === '/') { return path }
  if (parent == null) { return path }
  return cleanPath(((parent.path) + '/' + path))
}
function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}
// --------------------------------- hack 生成 route 对象path end  ----------------------------

/**
 * copy route 节点，不要children信息
 * @param route
 */
function copyRouteWithoutChildren (route) {
  let result = {}
  for (let key in route) {
    if (key !== 'children') {
      result[key] = route[key]
    }
  }
  return result
}

/**
 * 生成菜单
 * @param routes 路由列表
 * @param permissionMenus 有权限的菜单
 * @return {Array}
 */
function generateMenus (routes, permissionMenus) {
  let menus = []
  routes.forEach(route => {
    if (route.meta && route.meta.type === 'menu') {
      if (route.meta.redirect && !route.meta.sec) {
        if (process.env.NODE_ENV !== 'production') {
          typeof console !== 'undefined' && console.warn('菜单route配置redirect时必须配置对应的sec字符串', route)
        }
      } else if (route.meta.sec === false || permissionMenus.indexOf(route.meta.sec ? route.meta.sec : route.secNormalizedPath) !== -1 || permissionMenus[0] === '*') {
        let menu = copyRouteWithoutChildren(route)
        if (route.children instanceof Array) {
          let children = generateMenus(route.children, permissionMenus)
          if (children.length > 0) {
            menu.children = children
          }
        }
        menus.push(menu)
      }
    }
  })
  return menus
}

const permission = {
  state: {
    //权限
    permissions: [],
    //菜单
    menus: []
  },
  mutations: {
    UPDATE_MENUS: (state, menus) => {
      // 重置权限, 防止以前菜单影响
      state.permissions = menus
      // 自动路径处理
      handleRoutes(Routes)
      state.menus = generateMenus(Routes, menus)
      console.log('生成菜单', state.menus)
    },
    ADD_PERMISSION: (state, permission) => {
      state.permissions.forEach(cachedPermission => {
        if (cachedPermission !== permission) {
          state.permissions.push(permission)
        }
      })
      console.log('添加权限', state.menus)
    },
    RESET_PERMISSION: (state) => {
      state.menus = []
      state.permissions = []
      console.log('重置权限', state.menus)
    }
  },
  actions: {
    /**
     * 更新菜单
     */
    updateMenus ({ commit }) {
      return new Promise((resolve, reject) => {
        getMenus().then(response => {
         commit('UPDATE_MENUS', response.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default permission
