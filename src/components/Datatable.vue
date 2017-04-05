<template>
    <mu-paper class="line-chart paper-block">
        <paper-title name="经营概况"></paper-title>
        <mu-table v-for="(tableData, tbIndex) in separateData"
                  :showCheckbox="false"
                  :selectable="false"
                  :key="tbIndex"
                  >
            <mu-thead>
                <mu-tr>
                    <mu-th v-for="(item, i) in tableData.header" :class="{'txt-r': i !== 0}" :key="i">{{item}}</mu-th>
                </mu-tr>
            </mu-thead>
            <mu-tbody>
                <mu-tr v-for="(row, rowIndex) in tableData.data" :key="rowIndex">
                    <mu-td v-for="(item, i) in row" :class="{'txt-r': i !== 0}" :key="i">
                        {{typeof columnsFormatter[i-tbIndex] === 'function' ? columnsFormatter[i-tbIndex](item) : item}}
                    </mu-td>
                </mu-tr>
            </mu-tbody>
        </mu-table>
    </mu-paper>
</template>

<script>
    import { datatableMixin } from '../js/mixin';
    import PaperTitle from './PaperTitle.vue';

    export default {
        name: 'datatable',
        mixins: [datatableMixin],
        props:{
            dataSource: {
                required: true,
                type: Object
            }
        },
        computed: {
            separateData() {
                let firstTable = {}, secondTable = {};
                firstTable.header = [this.dataSource.header.shift()];
                secondTable.header = this.dataSource.header;
                firstTable.data = [];
                secondTable.data = [];
                this.dataSource.data.forEach((row) => {
                    firstTable.data.push([row.shift()]);
                    secondTable.data.push(row);
                });
                return [firstTable, secondTable]
            }
        },
        components: {
            PaperTitle
        }
    }
</script>

<style lang="less">
    .mu-th{
        padding: 8px;
        height: auto;
    }
    .mu-tr{
        height: auto;
    }
    .mu-td{
        padding: 8px;
        height: auto;
    }
    .mu-th-wrapper{
        padding: 0;
    }
</style>
