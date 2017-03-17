<template>
    <div>
        <input type="text" v-model="defaultValue">
    </div>
</template>

<script>
    export default {
        name: 'li-page',
        data() {
            return {
                defaultValue: '默认数据'
            }
        }
    }
</script>