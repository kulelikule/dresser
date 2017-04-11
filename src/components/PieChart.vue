<template>
    <mu-paper class="pie-chart paper-block pos-r" :zDepth="1">
        <div class="bracket"></div>
        <div class="target pos-a trbl0">
            <paper-title :name="dataSource.name"></paper-title>
            <div :id="echartsId" class="echarts-container pos-a trbl0"></div>
        </div>
    </mu-paper>
</template>

<script>
    import uuid from 'uuid';
    import echarts from 'echarts';
    import 'macarons';

    import PaperTitle from './PaperTitle.vue';
    import { pieChartMixin } from '../js/mixin';

    export default {
        name: 'pie-chart',
        mixins: [pieChartMixin],
        data() {
            return {
                echartsId: uuid.v4()
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
        watch: {
            //监听属性改变，立刻重新渲染
            _props() {
                this.renderPie();
            }
        },
        methods: {
            renderPie() {
                //配置鼠标移动/点击折线图时出现的提示
                let tooltipSettings = {
                    trigger: 'item'
                }

                if(this.tooltipFormatter){
                    tooltipSettings.formatter = this.tooltipFormatter;
                }

                let option = {
                    tooltip : tooltipSettings,
                    series : [
                        {
                            type: 'pie',
                            radius : '80%',
                            center: ['50%', '50%'],
                            data: this.dataSource.data,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                this.pieChart.setOption(option, true);
            }
        },
        mounted() {
            this.pieChart = echarts.init(document.getElementById(this.echartsId), 'macarons');
            this.renderPie();
        }
    }
</script>

<style lang="less" scoped>
    .pie-chart{
        max-height: 350px;
        overflow: hidden;
    }
    .bracket{
        padding-top: 75%;
    }
    .echarts-container{
        top: 45px;
    }
</style>