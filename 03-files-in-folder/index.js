const path = require('path');
const {stat} = require('fs');
const { readdir }  = require('node:fs/promises');

const pathFolder = path.join(__dirname, 'secret-folder');

const getListFolder = async () => {
const files = await readdir(pathFolder, {withFileTypes: true});
for (let file of files) {
    if (file.isFile()) {
        const pathFile = path.join(__dirname, "secret-folder", file.name); 
        const fileName = path.parse(file.name).name;
        const ext = path.extname(file.name).slice(1);        
        stat(pathFile, (err, stats) => { 
            if (err) throw err;        
            console.log(`${fileName} - ${ext} - ${stats.size /1000} kb`);          
        });                           
    }
}
};
getListFolder();