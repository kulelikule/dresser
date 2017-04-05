<template>
    <mu-paper class="line-chart paper-block pos-r">
        <div class="bracket"></div>
        <div class="target pos-a">
            <paper-title :name="dataSource.name">
                <div class="tab fr">
                    <template v-for="item in categoryNames">
                        <mu-raised-button v-if="item.isActive" primary :label="item.name" class="tab-btn" @click="swicthCatagory(item.name)"/>
                        <mu-raised-button v-else :label="item.name" class="tab-btn" @click="swicthCatagory(item.name)"/>
                    </template>
                </div>
            </paper-title>
            <div :id="echartsId" class="echarts-container pos-a"></div>
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
            _props: {
                handler: function() {
                    this.LCM = new LineChartModel(this.dataSource);
                    this.swicthCatagory();
                },
                deep: true
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
                    }
                } : {
                    boundaryGap: true,
                    axisPointer : {
                        type : 'shadow'
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
                        top: 20,
                        bottom: 20,
                        right: 50,
                        left: 20,
                        containLabel: true,
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
    .target{
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
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
        left: 0;
        right: 0;
        bottom: 0;
    }
</style>