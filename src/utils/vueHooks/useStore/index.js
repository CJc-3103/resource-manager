import { computed } from "vue";
import { useStore, mapState, mapGetters, mapMutations, mapActions } from "vuex";

/**
 *
 * @param mapperFn 传入的map辅助函数，mapState, mapGetters, mapActions, mapMutations
 * @param mapper 方法或者属性的名字，actions或者mutations或者getter的函数名，state的属性名字
 * @param module  开启命名空间后的模块名
 * @returns {{}} 返回数组，数组内容为fn函数，fn函数为每个属性所对应的map辅助函数
 */
const hooks = (mapperFn, mapper, module) => {
    const store = useStore();  // 引入vuex中的useStore函数
    const resultFn = {};
    let mapData = {};
    if (module) {  // 判断是否存在命名空间，如果存在则绑定
        mapData = mapperFn(module, mapper);
    } else {
        mapData = mapperFn(mapper);
    }
    Object.keys(mapData).forEach(item => {
        const fn = mapData[item].bind({ '$store': store });  // 使用bind方法将得到map函数结果绑定到vuex上
        resultFn[item] = fn;
    });
    return resultFn
};

/**
* 满足mapState和mapGetters调用
* @param mapperFn 传入的map辅助函数，主要是mapState和mapGetters
* @param mapper  数组类型，主要是变量或者返回值的key
* @param module   打开命名空间，模块名称，非必传
* 调用hooks函数后得到其返回值，然后将返回值放在computed中做一个监听，
* computed参会可以是函数的返回值，即这样就完成了对数据的返回监听
*/
const useDataHooks = (mapperFn, mapper, module) => {
    let hooksData = hooks(mapperFn, mapper, module);
    const resultFn = {};
    const result = {};
    Object.keys(hooksData).forEach(item => {
        resultFn[item] = computed(hooksData[item]);
        // 返回 value 的话会导致与其他 computedRef 对象的使用方式有区别，所以还是直接返回 ComputedRef 对象
        // result[item] = resultFn[item].value
    });
    // return result
    return resultFn
}

/**
* 封装useState函数
* @param module   命名空间，名称
* @param mapper  数组， state中定义的变量名称
*/
const useStates = (mapper, module) => {
    return useDataHooks(mapState, mapper, module)
};

/**
* 封装useGetters函数
* @param module  命名空间，
* @param mapper 数组，即getters中的返回值名称
*/
const useGetters = (mapper, module) => {
    return useDataHooks(mapGetters, mapper, module)
};

/**
* 封装mapMutations函数
* @param mapper  数组，mutations中函数的名称
* @param module  命名空间，模块名称
*/
const useMutations = (mapper, module) => {
    return hooks(mapMutations, mapper, module);
};

/**
* 封装mapActions函数
* @param mapper  数组，actions中函数的名称
* @param module  命名空间，模块名称
*/
const useActions = (mapper, module) => {
    return hooks(mapActions, mapper, module);
};

export { useStates, useGetters, useMutations, useActions }