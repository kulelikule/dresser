<template>
    <div class="datatable-group">
        <datatable v-for="(table, i) in items" :key="i" :data-source="table" :columnsFormatter="columnsFormatter"></datatable>
    </div>
</template>

<script>
    import Datatable from './Datatable.vue';
    import { sourceMixin, datatableMixin } from '../js/mixin';
    export default {
        name: 'datatable-group',
        mixins: [sourceMixin, datatableMixin],
        props: {
            dataSource: {
                required: true,
                type: [String, Array]
            }
        },
        components: {
            Datatable
        }
    }
</script>