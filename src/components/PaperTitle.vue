<template>
    <div class="paper-title pos-r">
        <span class="title">{{name}}</span>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'paper-title',
        props: {
            name: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style lang="less" scoped>
    .paper-title{
        padding: 8px;
    }
    .title{
        font-size: 18px;
    }
</style>
