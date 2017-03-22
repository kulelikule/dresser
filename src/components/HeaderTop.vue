<template>
    <div class="header">
        <span>{{name}}</span>
    </div>
</template>

<script>
    export default {
        name: 'header-top',
        props: {
            name: {
                default: '标题'
            }
        }
    }
</script>

<style lang="less" scoped>
    .header{
        height: 44px;
        line-height: 44px;
        text-align: center;
        color: #fff;
        background-color: #000;
    }
</style>