<template>
    <div id="app">
        <!--<pie-chart-group :data-source="pieData" :tooltipFormatter="pieOptions.tooltipFormatter"></pie-chart-group>-->
        <!--http://localhost:9090/mock/box-->
        <!--<databox-group :data-source="boxData" :formatter="boxOptions.formatter"></databox-group>-->
        <!--:options="tableOptions"-->
        <!--<datatable-group :data-source="tableData" :columnsFormatter="tableOptions.columnsFormatter"></datatable-group>-->
        <!--http://localhost:9090/mock/line-chart-->
        <!--<line-chart-group :data-source="lineChartData"-->
                          <!--:type="lineChartOptions.type"-->
                          <!--:gap="lineChartOptions.gap"-->
                          <!--:axisLabelFormatter="lineChartOptions.axisLabelFormatter"-->
                          <!--:tooltipFormatter="lineChartOptions.tooltipFormatter">-->
        <!--</line-chart-group>-->
        <!--:data-source="compositeData"-->
        <composite data-source="http://10.121.58.89:9090/mock/composite"
                   :opts-databox="boxOptions"
                   :opts-datatable="tableOptions"
                   :opts-line-chart="lineChartOptions"
                   :opts-bar-chart="lineChartOptions"
                   :opts-pie-chart="pieOptions">
        </composite>
    </div>
</template>

<script>
    import { unit } from '../modules/convert';
    export default {
        mounted() {

        },
        data() {
            return {
                compositeData:[
                    {
                        name: 'databox',
                        data: [{
                            "project": "当日销售", "actual": "5678.00"
                        },{
                            "project": "销售额", "actual": "1702223"
                        }]
                    },{
                        name: 'datatable',
                        data: [{
                            "name": "经营概况",
                            "category": [{
                                "name": "产量",
                                "header": ["项目", "当年", "去年", "增长率", "预期值"],
                                "data": [["产量", "111111", "222111111", "99%", "1232111"],["销量", "3333333", "444", "79%", "23232133"]]
                            },{
                                    "name": "销售量",
                                    "header": ["项目2", "当年2", "去年2", "增长率2", "预期值2"],
                                    "data": [["产量", "3455", "2222211", "99%", "1123"],["销量", "44444", "454", "79%", "11232133"]]
                            }]
                        }]
                    },{
                        name: 'barChart',
                        data: [{
                            "name": "产量",
                            "category": [{
                                "name": "日",
                                "xAxis": ["2017年01月01日","2017年01月15日","2017年01月30日"],
                                "series": [{
                                    "name": "当期值",
                                    "data": [111111,211122,111333]
                                },{
                                    "name": "同期值",
                                    "data": [441114,551115,661116]
                                }]
                            },{
                                "name": "月",
                                "xAxis": ["2017年01月05日","2017年02月15日","2017年03月30日"],
                                "series": [{
                                    "name": "当期值",
                                    "data": [22222,211122,111333]
                                },{
                                    "name": "同期值",
                                    "data": [641114,151115,661116]
                                }]
                            }]
                        }]
                    },{
                        name: 'lineChart',
                        data: [{
                            "name": "产量",
                            "category": [{
                                "name": "日",
                                "xAxis": ["2017年01月01日","2017年01月15日","2017年01月30日"],
                                "series": [{
                                    "name": "当期值",
                                    "data": [111111,211122,111333]
                                },{
                                    "name": "同期值",
                                    "data": [441114,551115,661116]
                                }]
                            }]
                        }]
                    },{
                        name: 'pieChart',
                        data: [{
                            "name": "经营概况",
                            "data": [{"name": "产量", "value": 1111},{"name": "销售量", "value": 2222},{"name": "总量", "value": 3333}]
                        }]
                    }
                ],

                pieOptions: {
                    tooltipFormatter: "{b} : {c} ({d}%)"
                },
                pieData: [{
                    "name": "经营概况",
                    "data": [{"name": "产量", "value": 1111},{"name": "销售量", "value": 2222},{"name": "总量", "value": 3333}]
                }],

                url: 'http://localhost:9090/mock/table',
                boxOptions: {
                    formatter: v => unit(v)
                },
                boxData: [{
                    "project": "当日销售", "actual": "5678.00"
                },{
                    "project": "销售额", "actual": "1703.40万"
                },{
                    "project": "当日销售", "actual": "5678.00"
                },{
                    "project": "销售额", "actual": "1703.40万"
                }],

                tableOptions: {
                    columnsFormatter:{
                        '1': v => unit(v),
                        '2': v => unit(v)
                    }
                },
                tableData: [{
                    "header": ["项目", "当年", "去年", "增长率","增长率","前年"],
                    "data": [
                        ["产量", "111", "222", "99%", "99%", "111"],
                        ["销量", "333", "444", "79%", "79%", "111"],
                        ["销量(业务)", "3323", "444", "79%", "79%", "111"],
                        ["销量", "3313", "4441", "59%", "59%", "111"],
                        ["销量", "1333", "444", "79%", "79%", "111"]
                    ]
                },{
                    "header": ["项目2", "当年2", "去年2", "增长率2"],
                    "data": [
                        ["产量", "111", "222", "99%"],
                        ["销量", "333", "444", "79%"],
                        ["销量(业务)", "3323", "444", "79%"],
                        ["销量", "3313", "4441", "59%"],
                        ["销量", "1333", "444", "79%"]
                    ]
                }],

                lineChartOptions: {
                    type: 'line',
                    gap:{
                        right: 50
                    },
                    axisLabelFormatter: function(v){
                        return unit(v, 0);
                    },
                    tooltipFormatter: function(v){
                        return v[0].name + "<br/>"
                            + v[0].seriesName + ":" + unit(v[0].value) + "<br/>"
                            + v[1].seriesName + ":" + unit(v[1].value) + "<br />";
                    }
                },

                lineChartData: [{
                    "name": "产量",
                    "category": [{
                        "name": "日",
                        "xAxis": ["2017年01月01日","2017年01月15日","2017年01月30日"],
                        "series": [{
                            "name": "当期值",
                            "data": [111000,55005,12003]
                        },{
                            "name": "同期值",
                            "data": [44004,20022,60066]
                        }]
                    },{
                        "name": "月",
                        "xAxis": ["2017年01月03日","2017年01月16日","2017年01月31日"],
                        "series": [{
                            "name": "当期值",
                            "data": [10011,13400,34005]
                        },{
                            "name": "同期值",
                            "data": [44004,20013,30033]
                        },{
                            "name": "预算",
                            "data": [30033,20022,10011]
                        }]
                    }]
                },{
                    "name": "产量2",
                    "category": [{
                        "name": "日",
                        "xAxis": ["2017年01月01日","2017年01月15日","2017年01月30日"],
                        "series": [{
                            "name": "当期值",
                            "data": [151000,15005,42003]
                        },{
                            "name": "同期值",
                            "data": [14004,40022,20066]
                        }]
                    },{
                        "name": "月",
                        "xAxis": ["2017年01月03日","2017年01月16日","2017年01月31日"],
                        "series": [{
                            "name": "当期值",
                            "data": [20011,13400,14005]
                        },{
                            "name": "同期值",
                            "data": [34004,50013,30033]
                        },{
                            "name": "预算",
                            "data": [30033,60022,10011]
                        }]
                    }]
                }]
            }
        }
    }
</script>