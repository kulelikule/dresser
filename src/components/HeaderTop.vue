<template>
    <div class="header">
        <span class="logo"></span>
    </div>
</template>

<script>
    export default {
        name: 'header-top',
        props: {
            name: {
                default: '首页'
            }
        }
    }
</script>

<style lang="less" scoped>
    .header{
        height: 48px;
        .logo {
            display: inline-block;
            width: 30px;
            height: 30px;
            background: url('../img/logo.png') no-repeat 0 0;
            background-size: cover;
        }
    }
</style>