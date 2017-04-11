<template>
    <mu-paper class="datatable paper-block" :zDepth="1">
        <paper-title name="经营概况">
            <div v-if="dataSource.category.length > 1" class="sel-wrapper pos-a">
                <mu-select-field v-model="curCategory" :fullWidth="true">
                    <mu-menu-item v-for="(category, i) in dataSource.category" :value="category.name" :title="category.name" :key="i"/>
                </mu-select-field>
            </div>
        </paper-title>
        <div class="table-wrapper clearfix">
            <div class="table firstTable fl">
                <div class="thead">
                    <div class="tr clearfix">
                        <div class="th" v-for="(item, i) in separateData.firstTable.header" :key="i">{{item}}</div>
                    </div>
                </div>
                <div class="tbody">
                    <div class="tr clearfix" v-for="(row, rowIndex) in separateData.firstTable.data" :key="rowIndex">
                        <div class="td">
                            {{typeof columnsFormatter[0] === 'function' ? columnsFormatter[0](row[0]) : row[0]}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="movable-area fl" ref="movableArea">
                <div class="table secondTable" :style="secondTableWidth">
                    <div class="thead">
                        <div class="tr clearfix">
                            <div class="th txt-r" v-for="(item, i) in separateData.secondTable.header" :style="secondTableTdWidth" :key="i">{{item}}</div>
                        </div>
                    </div>
                    <div class="tbody">
                        <div class="tr clearfix" v-for="(row, rowIndex) in separateData.secondTable.data" :key="rowIndex">
                            <div class="td txt-r" v-for="(item, i) in row" :key="i" :style="secondTableTdWidth">
                                {{typeof columnsFormatter[i + 1] === 'function' ? columnsFormatter[i + 1](item) : item}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </mu-paper>
</template>

<script>
    import IScroll from 'iscroll/build/iscroll-lite';
    import { datatableMixin } from '../js/mixin';
    import PaperTitle from './PaperTitle.vue';

    export default {
        name: 'datatable',
        mixins: [datatableMixin],
        data() {
            return {
                curCategory: ''
            }
        },
        props:{
            dataSource: {
                required: true,
                type: Object
            }
        },
        computed: {
            visibleData() {
                let categorys = this.dataSource.category;
                //判断categorys是否是空数组
                if(categorys.length > 0){
                    if(this.curCategory === ''){
                        this.curCategory = categorys[0].name;
                    }
                    for(let i = 0; i < categorys.length; i++){
                        if(categorys[i].name === this.curCategory){
                            return {
                                header: categorys[i].header,
                                data: categorys[i].data
                            }
                        }
                    }
                }else{
                    this.curCategory = null;
                    return {
                        header: [],
                        data: []
                    }
                }
            },
            separateData() {
                let firstTable = {}, secondTable = {};
                firstTable.header = this.visibleData.header.slice(0, 1);
                secondTable.header = this.visibleData.header.slice(1);
                firstTable.data = [];
                secondTable.data = [];
                this.visibleData.data.forEach((row) => {
                    firstTable.data.push(row.slice(0, 1));
                    secondTable.data.push(row.slice(1));
                });
                return {
                    firstTable,
                    secondTable
                }
            },
            secondTableWidth() {
                let count = this.separateData.secondTable.header.length;
                return 'width:' + (count / 3 * 100) + '%';
            },
            secondTableTdWidth() {
                let count = this.separateData.secondTable.header.length;
                return 'width:' + (100 / count) + '%';
            }
        },
        components: {
            PaperTitle
        },
        mounted() {
            new IScroll(this.$refs.movableArea, { scrollX: true, scrollY: false, eventPassthrough: true});
        }
    }
</script>

<style lang="less" scoped>
    .sel-wrapper{
        min-width: 100px;
        top: -2px;
        right: 8px;
    }
    .thead{
        font-size: 12px;
        color: #999;
    }
    .tbody{
        font-size: 14px;
        .tr:last-child{
            border-bottom-width: 0;
        }
    }
    .tr{
        border-bottom: 1px solid #eee;
        white-space: nowrap;
    }
    .th, .td{
        display: inline-block;
        box-sizing: border-box;
        padding: 8px;
    }
    @firstTableWidth: 25%;
    .movable-area{
        width: 100% - @firstTableWidth;
        position: relative;
        overflow: hidden;
    }
    .firstTable{
        width: @firstTableWidth;
    }
    .secondTable{
        .th, .td{
            width: 100% / 3;
        }
    }
</style>
