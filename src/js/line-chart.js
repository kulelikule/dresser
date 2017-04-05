export default class LineChart {
    constructor(data) {
        this.categorys = data.category;
        this.legend = [];
        this.curCategory = {};
        this.xAxis = {};
        this.series = [];
        this.categoryNames = [];
    }
    getLegend() {
        return this.legend;
    }
    getSeries(opts) {
        return this.series.map(item => {
           return {
               ...opts,
               ...item
           }
        });
    }
    getCategoryNames() {
        return this.categoryNames;
    }
    getXAxis() {
        return this.xAxis
    }
    initData(catagoryName) {
        if(this.categorys.length > 0){
            if(typeof catagoryName === 'undefined'){
                catagoryName = this.categorys[0].name;
            }
            this.categoryNames = this.categorys.map(category => {
                let isActive = false;
                if(catagoryName === category.name){
                    this.curCategory = category;
                    isActive = true;
                }
                return {
                    name: category.name,
                    isActive
                };
            });
            this.xAxis = this.curCategory.xAxis;
            this.series = this.curCategory.series;
            this.legend = this.series.map(item => {
                return item.name;
            })
        }
    }
}