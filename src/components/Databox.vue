<template>
    <mu-paper class="databox" :zDepth="1">
        <p class="title">{{dataSource.project}}</p>
        <p class="amount">{{formatter(dataSource.actual)}}</p>
    </mu-paper>
</template>

<script>
    import { databoxMixin } from '../js/mixin';
    export default {
        name: 'databox',
        mixins: [databoxMixin],
        props: {
            dataSource: {
                required: true,
                type: Object
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../css/setting.less";
    .databox{
        height: 75px;
        p{
            line-height: normal;
            margin: 0;
            padding-left: 12px;
        }
        .title{
            margin-top: 13px;
        }
        .amount{
            margin-top: 3px;
            font-size: 22px;
            font-weight: bold;
            color: @theme-clr;
        }
    }
</style>