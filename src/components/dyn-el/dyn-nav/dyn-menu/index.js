import dynMenu from './dyn-menu';
import dynMenuContainer from './dyn-menu-container';
import dynMenuItem from './dyn-menu-item';
import dynMenuItemList from './dyn-menu-item-list';
import dynMenuItemGroupList from './dyn-menu-item-group-list';

export {
    dynMenu,
    dynMenuContainer,
    dynMenuItem,
    dynMenuItemList,
    dynMenuItemGroupList,
};

// 从路由权限对象中将路径和菜单名单独复制出来
// 注意此处的路由权限是针对某个后台模块而言的（比如后台主页模块），并非是全局最外层的权限对象，外层权限通常还包含了登录页、错误页等路由权限
/**
 *
 * @param {*} menuConfigList // 菜单组件的配置数组
 * @param {*} permissionList // vuex 已经整理好的路由权限数组（后台返回的数据在这里是不可见的）
 * @param {*} parentMenuPath // 根路径默认为 '/'
 * @returns 从路由权限中拿到路径和名称，合并进菜单组件的配置数组
 */
export function initMenuConfig(
    menuConfigList,
    permissionList,
    parentMenuPath = '/'
) {
    // 保存副本，
    //   let menuConfigList = JSON.parse(JSON.stringify(menuConfigList));

    // 对 permissionList 的每个路由对象，递归遍历 menuConfigList 中的每个菜单项，
    // 若当前菜单项是分组，复制分组参数，并继续下一层
    // 找到 name 相同的则复制 path 和 title 的值；并跳出递归遍历，进行外层遍历的下一次迭代
    let realMenuConfigList = [];
    // 否则控制台输出没找到
    permissionList.forEach((permission) => {
        let result = menuConfigList.some((menuConfig) => {
            if (menuConfig.name === permission.name) {
                if (permission.path.indexOf('/') === -1) {
                    // 当前路径不是以斜杠开头，需要将上级路径作为起始
                    if (parentMenuPath === '/') {
                        // 上级路径是根路径 / 时，直接连接即可
                        menuConfig.index = parentMenuPath + permission.path;
                    } else {
                        // 否则需要加上额外的斜杠
                        menuConfig.index = `/${parentMenuPath}/${permission.path}`;
                    }
                } else {
                    // 当前路径以斜杠开头，表示嵌套路由时路径不嵌套，属于一级路径
                    menuConfig.index = permission.path;
                }
                menuConfig.title = permission.meta.title;

                // 继续递归子路径
                if (permission.children) {
                    // 提前判定下一层是否是分组，若等进入递归后再判断已经来不及了
                    if (menuConfig.children[0].name) {
                        // 下一层是菜单项，而非分组
                        menuConfig.children = initMenuConfig(
                            menuConfig.children,
                            permission.children,
                            permission.path
                        );
                    } else {
                        // 下一层是分组，则复制分组参数，并将当前权限作为参数继续递归分组的子元素
                        realMenuConfigList.children = [];
                        menuConfig.children.forEach((group) => {
                            let realGroup = Object.assign({}, group); // 复制样式参数

                            realGroup.children = initMenuConfig(
                                group.children,
                                permission.children,
                                permission.path
                            );
                            realMenuConfigList.children.push(realGroup);
                        });
                    }
                }
                // console.log(menuConfig.index);
                realMenuConfigList.push(menuConfig);
            }
        });
        if (result) {
            console.log(
                `当前命名路由（${permission.name}）未找到 name 相同的菜单项，请检查`
            );
        }
    });
    return realMenuConfigList;
}
// export function initMenuConfig(menuConfigList, permissionList, parentMenuPath, styles) {
//     // 父路径未添加开头的斜杠时，需要将其路径添加到子路径的左侧（当然，此时子路径应该也是未添加斜杠的状态,否则可能会导致路由地址解析错误）
//     if (parentMenuPath && parentMenuPath !== '/') {
//       //   if (false) {
//       // 需要添加斜杠
//       permissionList.forEach((permission) => {
//         let menuConfig = {};
//         menuConfig.index = `/${parentMenuPath}/${permission.path}`; // 唯一不同的语句
//         menuConfig.title = permission.meta.title;
//         if (permission.children) {
//           menuConfig.children = initMenuConfig(
//             [],
//             permission.children,
//             permission.path
//           );
//         }
//         menuConfigList.push(menuConfig);
//       });
//     } else {
//       // 不需要添加斜杠
//       permissionList.forEach((permission) => {
//         let menuConfig = {};
//         menuConfig.index = '/' + permission.path;
//         menuConfig.title = permission.meta.title;
//         if (permission.children) {
//           menuConfig.children = initMenuConfig(
//             [],
//             permission.children,
//             permission.path
//           );
//         }
//         menuConfigList.push(menuConfig);
//       });
//     }
//     return menuConfigList;
//   }
