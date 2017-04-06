<template>
    <mu-paper class="pie-chart paper-block pos-r" :zDepth="1">
        <div class="bracket"></div>
        <div class="target pos-a trbl0">
            <paper-title name="经营概况"></paper-title>
            <div :id="echartsId" class="echarts-container pos-a trbl0"></div>
        </div>
    </mu-paper>
</template>

<script>
    import uuid from 'uuid';
    import echarts from 'echarts';
    import 'macarons';

    import PaperTitle from './PaperTitle.vue';

    export default {
        name: 'pie-chart',
        data() {
            return {
                echartsId: uuid.v4()
            }
        },
        components: {
            PaperTitle
        },
        mounted() {
            let option = {
//                title : {
//                    text: '某站点用户访问来源',
//                    subtext: '纯属虚构',
//                    x:'center'
//                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
//                legend: {
//                    orient: 'vertical',
//                    left: 'left',
//                    data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
//                },
                series : [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius : '80%',
                        center: ['50%', '50%'],
                        data:[
                            {value:335, name:'直接访问'},
                            {value:310, name:'邮件营销'},
                            {value:234, name:'联盟广告'},
                            {value:135, name:'视频广告'},
                            {value:1548, name:'搜索引擎'}
                        ],
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

            let pieChart = echarts.init(document.getElementById(this.echartsId), 'macarons');
            pieChart.setOption(option, true);
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