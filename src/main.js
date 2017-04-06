/**
 * Created by lijiajun on 2017/3/20.
 */
    import MuseUI from 'muse-ui'
    import 'muse-ui-css';
    import './css/base.less';
    import Composite from './components/Composite.vue';
    import Databox from './components/Databox.vue';
    import DataboxGroup from './components/DataboxGroup.vue';
    import Datatable from './components/Datatable.vue';
    import DatatableGroup from './components/DatatableGroup.vue';
    import LineChart from './components/LineChart.vue';
    import LineChartGroup from './components/LineChartGroup.vue';
    import PaperTitle from './components/PaperTitle.vue';
    import PieChart from './components/PieChart.vue';
    import PieChartGroup from './components/PieChartGroup.vue';

// 导出 install 函数
// Vue.use() 会调用这个函数
const install = function(Vue, opts = {}) {
    Vue.use(MuseUI);
    // 如果安装过就忽略
    if (install.installed) return;

    // 指定组件 name
    Vue.component(Composite.name, Composite);
    Vue.component(Databox.name, Databox);
    Vue.component(DataboxGroup.name, DataboxGroup);
    Vue.component(Datatable.name, Datatable);
    Vue.component(DatatableGroup.name, DatatableGroup);
    Vue.component(LineChart.name, LineChart);
    Vue.component(LineChartGroup.name, LineChartGroup);
    Vue.component(PaperTitle.name, PaperTitle);
    Vue.component(PieChart.name, PieChart);
    Vue.component(PieChartGroup.name, PieChartGroup);
}

// 自动安装 方便打包成压缩文件, 用<script scr=''></script>的方式引用
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

// 把模块导出
module.exports = {
    Composite,
    Databox,
    DataboxGroup,
    Datatable,
    DatatableGroup,
    LineChart,
    LineChartGroup,
    PaperTitle,
    PieChart,
    PieChartGroup,
    install
};