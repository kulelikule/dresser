<template>
    <div class="composite">
        <template v-for="group in items">
            <databox-group v-if="group.name=='databox'" :data-source="group.data"></databox-group>
            <datatable-group v-else-if="group.name=='datatable'" :data-source="group.data"></datatable-group>
            <line-chart-group v-else-if="group.name=='lineChart'" :data-source="group.data"></line-chart-group>
            <line-chart-group v-else-if="group.name=='barChart'" :data-source="group.data" type="bar"></line-chart-group>
        </template>
    </div>
</template>

<script>
    import DatatableGroup from './DatatableGroup.vue';
    import DataboxGroup from './DataboxGroup.vue';
    import LineChartGroup from './LineChartGroup.vue';
    import { sourceMixin } from '../js/mixin';

    export default {
        name: 'composite',
        mixins: [sourceMixin],
        props: {
            dataSource: {
                required: true,
                type: [String, Array]
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