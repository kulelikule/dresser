<template>
    <div class="composite">
        <template v-for="group in items">
            <databox-group v-if="group.name=='databox'" :data-source="group.data" :formatter="optsDatabox.formatter"></databox-group>
            <datatable-group v-else-if="group.name=='datatable'" :data-source="group.data" :columnsFormatter="optsDatatable.columnsFormatter"></datatable-group>
            <line-chart-group v-else-if="group.name=='lineChart'"
                              :data-source="group.data"
                              :gap="optsLineChart.gap"
                              :axisLabelFormatter="optsLineChart.axisLabelFormatter"
                              :tooltipFormatter="optsLineChart.tooltipFormatter">
            </line-chart-group>
            <line-chart-group v-else-if="group.name=='barChart'"
                              type="bar"
                              :data-source="group.data"
                              :gap="optsBarChart.gap"
                              :axisLabelFormatter="optsBarChart.axisLabelFormatter"
                              :tooltipFormatter="optsBarChart.tooltipFormatter">
            </line-chart-group>
            <pie-chart-group v-else-if="group.name=='pieChart'"
                             :data-source="group.data"
                             :tooltipFormatter="optsPieChart.tooltipFormatter">
            </pie-chart-group>
        </template>
    </div>
</template>

<script>
    import DatatableGroup from './DatatableGroup.vue';
    import DataboxGroup from './DataboxGroup.vue';
    import LineChartGroup from './LineChartGroup.vue';
    import { groupSourceMixin } from '../js/mixin';

    export default {
        name: 'composite',
        mixins: [groupSourceMixin],
        props: {
            dataSource: {
                required: true,
                type: [String, Array]
            },
            optsDatabox: {
                type: Object,
                default: () => ({})
            },
            optsDatatable: {
                type: Object,
                default: () => ({})
            },
            optsLineChart: {
                type: Object,
                default: () => ({})
            },
            optsBarChart: {
                type: Object,
                default: () => ({})
            },
            optsPieChart: {
                type: Object,
                default: () => ({})
            }
        },
        components: {
            DatatableGroup,
            DataboxGroup,
            LineChartGroup
        }
    }
</script>

<style>

</style>