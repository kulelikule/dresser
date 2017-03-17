import Page from './components/Page';

// 导出 install 函数
// Vue.use() 会调用这个函数
const install = function(Vue, opts = {}) {
    // 如果安装过就忽略
    if (install.installed) return;

    // 指定组件 name
    Vue.component(Page.name, Page);
}

// 自动安装 方便打包成压缩文件, 用<script scr=''></script>的方式引用
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

// 把模块导出
module.exports = {
    install,
    Page
}