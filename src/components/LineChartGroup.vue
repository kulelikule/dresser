<template>
    <div class="line-chart-group">
        <line-chart v-for="(chart, i) in items"
                    :key="i"
                    :data-source="chart"
                    :type="type"
                    :gap="gap"
                    :axisLabelFormatter="axisLabelFormatter"
                    :tooltipFormatter="tooltipFormatter">
        </line-chart>
    </div>
</template>

<script>
    import LineChart from './LineChart.vue';
    import { groupSourceMixin, lineChartMixin } from '../js/mixin';
    export default {
        name: 'line-chart-group',
        mixins: [groupSourceMixin, lineChartMixin],
        props: {
            dataSource: {
                required: true,
                type: [String, Array]
            }
        },
        components: {
            LineChart
        }
    }
</script>