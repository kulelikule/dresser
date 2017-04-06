<template>
    <div class="pie-chart-group">
        <pie-chart></pie-chart>
    </div>
</template>

<script>
    import PieChart from './PieChart.vue';
    export default {
        name: 'pie-chart-group',
        components: {
            PieChart
        }
    }
</script>