<template>
    <mu-paper class="line-chart paper-block pos-r" :zDepth="1">
        <div class="bracket"></div>
        <div class="target pos-a trbl0">
            <paper-title :name="dataSource.name">
                <div class="tab fr">
                    <template v-if="categoryNames.length > 1" v-for="item in categoryNames">
                        <mu-raised-button v-if="item.isActive" primary :label="item.name" class="tab-btn" @click="swicthCatagory(item.name)"/>
                        <mu-raised-button v-else :label="item.name" class="tab-btn" @click="swicthCatagory(item.name)"/>
                    </template>
                </div>
            </paper-title>
            <div :id="echartsId" class="echarts-container pos-a trbl0"></div>
        </div>
    </mu-paper>
</template>

<script>
    import uuid from 'uuid';
    import echarts from 'echarts';
    import 'macarons';

    import PaperTitle from './PaperTitle.vue';
    import { lineChartMixin } from '../js/mixin';
    import LineChartModel from '../js/line-chart';

    export default {
        name: 'line-chart',
        mixins: [lineChartMixin],
        data() {
            return {
                echartsId: uuid.v4(),
                categoryNames: []
            }
        },
        props: {
            dataSource:{
                required: true,
                type: Object
            }
        },
        components: {
            PaperTitle
        },
        created() {
            this.LCM = new LineChartModel(this.dataSource);
        },
        watch: {
            //监听属性改变，立刻重新渲染
            _props() {
                this.LCM = new LineChartModel(this.dataSource);
                this.swicthCatagory();
            }
        },
        methods: {
            swicthCatagory(name) {
                let self = this;
                let LCM = this.LCM;
                LCM.initData(name);
                this.categoryNames = this.LCM.getCategoryNames();

                //判断是折线图还是柱状图
                let specialOpts = this.type === 'line' ? {
                    boundaryGap: false,
                    axisPointer : {
                        type : 'line'
                    },
                    grid: {
                        top: 20,
                        bottom: 20,
                        right: 50,
                        left: 20
                    }
                } : {
                    boundaryGap: true,
                    axisPointer : {
                        type : 'shadow'
                    },
                    grid: {
                        top: 20,
                        bottom: 20,
                        right: 20,
                        left: 20
                    }
                };
                //配置鼠标移动/点击折线图时出现的提示
                let tooltipSettings = {
                    trigger: 'axis',
                    axisPointer: specialOpts.axisPointer
                }

                if(this.tooltipFormatter){
                    tooltipSettings.formatter = this.tooltipFormatter;
                }
                // 指定图表的配置项和数据
                let option = {
                    legend: {
                        data: LCM.getLegend()
                    },
                    tooltip: tooltipSettings,
                    grid: {
                        containLabel: true,
                        ...specialOpts.grid,
                        ...this.gap
                    },
                    xAxis: {
                        type: "category",
                        boundaryGap: specialOpts.boundaryGap,
                        data: LCM.getXAxis()
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: function(value, index) {
                                return self.axisLabelFormatter(value, index);
                            }
                        }
                    },
                    series: LCM.getSeries({
                        type: this.type,
                        smooth: true
                    })
                };

                // 使用刚指定的配置项和数据显示图表。
                this.lineChart.setOption(option, true);
            }
        },
        mounted() {
            // 基于准备好的dom，初始化echarts实例
            this.lineChart = echarts.init(document.getElementById(this.echartsId), 'macarons')
            this.swicthCatagory();
        }
    }
</script>

<style lang="less" scoped>
    .line-chart{
        max-height: 350px;
        overflow: hidden;
    }
    .bracket{
        padding-top: 75%;
    }
    .tab-btn{
        width: 40px;
        min-width: 40px;
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        & + &{
            margin-left:5px;
        }
    }
    .echarts-container {
        top: 45px;
    }
</style>