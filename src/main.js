/**
 * Created by lijiajun on 2017/3/20.
 */
    import './css/base.less';
    import HeaderTop from './components/HeaderTop.vue';
    import Logo from './components/Logo.vue';

// 导出 install 函数
// Vue.use() 会调用这个函数
const install = function(Vue, opts = {}) {
    // 如果安装过就忽略
    if (install.installed) return;

    // 指定组件 name
    Vue.component(HeaderTop.name, HeaderTop);
    Vue.component(Logo.name, Logo);
}

// 自动安装 方便打包成压缩文件, 用<script scr=''></script>的方式引用
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

// 把模块导出
module.exports = {
    HeaderTop,
    Logo,
    install
};