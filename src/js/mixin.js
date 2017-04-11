import axios from 'axios';
/**
 * 设置数据源，可能直接为数据，也可能是数据请求地址
 */
let groupSourceMixin = {
    data() {
        return {
            items: []
        }
    },
    watch: {
        dataSource() {
            this.getData();
        }
    },
    methods: {
        getData() {
            if(typeof this.dataSource === 'string'){
                axios.get(this.dataSource).then( res => {
                    if(res.data.success === true){
                        this.items = res.data.obj;
                    }
                });
            }else{
                this.items = this.dataSource;
            }
        }
    },
    created() {
        this.getData();
    }
};

/**
 * 设置lineChart和lineChartGroup的属性
 */
let lineChartMixin = {
    props: {
        type: {
            type: String,
            default: 'line'
        },
        gap: {
            type: Object,
            default: () => ({})
        },
        tooltipFormatter: {
            type: [Function, String]
        },
        axisLabelFormatter: {
            type: Function,
            default: v => v
        }
    }
};

/**
 * 设置databox和databoxGroup的属性
 */
let databoxMixin = {
    props: {
        formatter: {
            type: Function,
            default: v => v
        }
    }
};

/**
 * 设置datatable和datatableGroup的属性
 */
let datatableMixin = {
    props: {
        columnsFormatter: {
            type: Object,
            default: () => ({})
        }
    }
};

/**
 * 设置pieChart和pieChartGroup的属性
 */
let pieChartMixin = {
    props: {
        tooltipFormatter: {
            type: [Function, String]
        }
    }
};

export {
    groupSourceMixin,
    lineChartMixin,
    databoxMixin,
    datatableMixin,
    pieChartMixin
};