const exec = require('child_process').exec;
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const templateFilePath = 'src/main.template.li';
const mainFilePath = 'src/main.js';
console.log('正在初始化入口文件...');
let filesP = fs.readdirAsync('src/components');
let fileContentP = fs.readFileAsync(templateFilePath, 'utf-8');
Promise.all([filesP, fileContentP]).then(data => {
    let filenames = data[0],
        fileContent = data[1];
    let newFileContent = fileContent.replace(/{{(.+?)}}/g, (full, part) => {
        let vueNames = filenames.filter(filename => /.vue$/.test(filename));
        //最后减去.vue后缀,也就是4个字符
        let replaceArr = vueNames.map(vueName => part.replace(/\$\$/g, vueName.substr(0, vueName.length - 4)));
        return replaceArr.join('\n' + ' '.repeat(4));
    });
    return newFileContent;
}).then(newFileContent => {
    return fs.writeFileAsync(mainFilePath, newFileContent);
}).then(() => {
    console.log('入口文件初始化完毕，正在编译组件...');
    return new Promise(function(resolve, reject){
        //执行cmd命令编译组件
        exec('webpack --config webpack.prod.conf', (error, stdout, stderr) => {
            error !== null ? reject(error) : resolve();
        });
    });
}).then(() => {
    console.log('组件编译完成!');
}).catch((err) => {
    throw err;
});
