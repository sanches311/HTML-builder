const fs = require('fs');
const { mkdir, copyFile, readdir } = require("fs/promises");
const {stdin, stdout} = require('process');
const path = require('path');

const pathSource = path.join(__dirname,'files');
const pathDestination = path.join(__dirname,'files-copy');  

const copyFiles = async() => {
const files = await readdir(pathSource, {withFileTypes:true});
try {
  await mkdir(pathDestination, {recursive:true}).then(function() {
        stdout.write('Directory created successfully \n');
    }).catch(function() {
        stdout.write('failed to create directory');
    });
const filesOld = await readdir(pathDestination, {withFileTypes:true});
for (let file of filesOld) {
    if (file.isFile()) {
        const pathDestination = path.join(__dirname,'files-copy', file.name);
       fs.unlink(pathDestination, err => {
        if (err) throw err;
       });
    }
  }
  for (let file of files) {
    if (file.isFile()) {
        const pathSourceFile = path.join(__dirname,'files', file.name);
        const pathDestinationFile = path.join(__dirname,'files-copy', file.name);
        copyFile(pathSourceFile, pathDestinationFile);
    }
  }
  stdout.write('Files copied successfully \n');
}
catch(err) {
    stdout.write('Failed copy files');
}
}
copyFiles();


