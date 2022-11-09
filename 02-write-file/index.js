const path = require('path');
const fs = require('fs');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });

const pathFile = path.join(__dirname,'text.txt');
const writabaleStream = fs.createWriteStream(pathFile);
fs.writeFile((pathFile),'', err => {
    if (err) throw err;
});
output.write('Enter text: \n');
function writeToFile() {
rl.question('', (answer) =>{
  if (answer === 'exit') {
    process.exit();
  };
  writabaleStream.write(`${answer} \n`);
  return writeToFile();
})
};
writeToFile();
process.on ('SIGINT', () => {  
process.exit();
});
process.on ('exit', () => output.write(`Write completed to ${path.basename(pathFile)}`));