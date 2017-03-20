const path = require('path');
const Promise = require('bluebird');
let fs = Promise.promisifyAll(require('fs'));

let filesP = fs.readdirAsync('src/components');
let fileContentP = fs.readFileAsync('src/main.js');
Promise.all([filesP, fileContentP]).then((obj) => {
    console.log(obj[0]);
});

let p = fs.readdir('src/components', (err, data) => {
    if (err) throw err;
    data.forEach((filename) => {
        if(/.vue$/.test(filename)){

        }
    });
});
