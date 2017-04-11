<template>
    <div class="datatable-group">
        <datatable v-for="(table, i) in items" :key="i" :data-source="table" :columnsFormatter="columnsFormatter"></datatable>
    </div>
</template>

<script>
    import Datatable from './Datatable.vue';
    import { groupSourceMixin, datatableMixin } from '../js/mixin';
    export default {
        name: 'datatable-group',
        mixins: [groupSourceMixin, datatableMixin],
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