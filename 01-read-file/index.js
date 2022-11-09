const path = require('path');
const fs = require('fs');

const pathFile = path.join(__dirname, 'text.txt');
let data = '';
const readableStream = fs.createReadStream(pathFile, 'utf-8');
readableStream.on ('data', chunk => data += chunk);
readableStream.on ('end', () => console.log(data));