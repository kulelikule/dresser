/**
 * unit,公用方法 数值单位换算
 * @param {string} v - 需要转换的数值.
 * @param {string} l - 转换后保留的小数位.
 */
function unit(v,l){
    if (typeof l == "undefined")
    {
        l = 1;
    }
    if(v==0){
        v = v;
    }
    else if(v >= 100000000)
    {
        v = (v / 100000000).toFixed(l) + "亿" ;
    }else if(v >= 10000)
    {
        v = (v / 10000).toFixed(l) + "万"
    }else if(v > 0)
    {
        v = (v / 1).toFixed(l)
    }else if(v <= 0-100000000){
        v = (v / 100000000).toFixed(l) + "亿" ;
    }else if(v <= 0-10000)
    {
        v = (v / 10000).toFixed(l) + "万"
    }else if(v <= 0)
    {
        v = (v / 1).toFixed(l)
    }
    return v;
};

export {unit}