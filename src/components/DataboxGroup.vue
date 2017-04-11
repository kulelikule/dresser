<template>
    <div class="databox-group paper-block clearfix">
        <databox v-for="(item, i) in items"
                 :key="i" class="fl databox-item"
                 :class="{'databox-gap': i>1}"
                 :data-source="item"
                 :formatter="formatter">
        </databox>
    </div>
</template>

<script>
    import Databox from './Databox.vue';
    import { groupSourceMixin, databoxMixin } from '../js/mixin';
    export default {
        name: 'databox-group',
        mixins: [groupSourceMixin, databoxMixin],
        props: {
            dataSource: {
                required: true,
                type: [String, Array]
            }
        },
        components: {
            Databox
        }
    }
</script>

<style lang="less" scoped>
    .databox-item{
        @boxWidth: 48.4%;
        width: @boxWidth;
        &:nth-child(even){
            margin-left: 100% - @boxWidth * 2;
        }
        &.databox-gap{
            margin-top: 9px;
        }
    }
</style>