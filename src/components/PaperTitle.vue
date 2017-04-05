<template>
    <div class="title-container">
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
    .title-container{
        padding: 8px;
    }
    .title{
        font-size: 18px;
    }
</style>
