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
    import { sourceMixin, lineChartMixin } from '../js/mixin';
    export default {
        name: 'line-chart-group',
        mixins: [sourceMixin, lineChartMixin],
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