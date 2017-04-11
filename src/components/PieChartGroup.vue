<template>
    <div class="pie-chart-group">
        <pie-chart v-for="(chart, i) in items"
                   :key="i"
                   :data-source="chart"
                   :tooltipFormatter="tooltipFormatter">
        </pie-chart>
    </div>
</template>

<script>
    import PieChart from './PieChart.vue';
    import { groupSourceMixin, pieChartMixin } from '../js/mixin';

    export default {
        name: 'pie-chart-group',
        mixins: [groupSourceMixin, pieChartMixin],
        props: {
            dataSource: {
                required: true,
                type: [String, Array]
            }
        },
        components: {
            PieChart
        }
    }
</script>