const path = require('path');
const fs = require('fs');
const {readdir, mkdir, readFile, open, writeFile, copyFile, rmdir} = require('fs/promises');
const {stdin, stdout} = require('process');


const createIndexHtml = async () =>{
const pathDist = path.join(__dirname, 'project-dist');
const pathComponents = path.join(__dirname,'components');
const pathTemplate = path.join(__dirname, 'template.html');
const pathIndex = path.join(__dirname, 'project-dist','index.html');

mkdir(pathDist, {recursive:true}, err => {
    if (err) throw err;
    console.log('Created project-dist');
});
const files = await readdir(pathComponents, {withFileTypes:true});
const templateContent = await readFile(pathTemplate, 'utf-8')
const template = templateContent.split('\n');
for (let file of files) {
   const pathComponentsFile = path.join(__dirname, 'components', file.name);
   const fileName = path.parse(file.name).name;
   const content = await readFile(pathComponentsFile, 'utf-8');
   const getIndex = () => {
    for (let i = 0; i < template.length; i++) {   
    if (template[i].trim() === `{{${fileName}}}`)    
    return i;
   }   
}
const index = getIndex();   
template.splice(index,1, content);
}
await open(pathIndex, 'w');
writeFile(pathIndex, template);
}

const createStyleCss = async() => {
    const pathSource = path.join(__dirname, 'styles');
    const pathDestination = path.join(__dirname,'project-dist', 'style.css');  
    const rw = fs.createWriteStream(pathDestination);
    const bundle  = [];
    const files = await readdir(pathSource, {withFileTypes:true});

    for ( const file of files) {
      if (path.extname(file.name) === '.css') {
        let data = '';      
        const pathFile = path.join(__dirname,'styles', file.name);      
        const rs =  fs.createReadStream(pathFile ,'utf-8');
          rs.on('data', (chunk) => {
            data+=chunk;          
          });
          rs.on('end', ()=> { 
            bundle.push(data);
            if (bundle.length === 3) {            
              for (let i = 0; i < bundle.length; i++) {
                rw.write(bundle[i], (err) => {
                  if (err) return console.log('error');
                });
              }            
            }                  
          });                
      }        
    } 
  }
   
  const pathSource = path.join(__dirname,'assets');
  const pathDestination = path.join(__dirname,'project-dist', 'assets');

  const copyDirectory = async(source, destination) => {
  const files = await readdir(source, {withFileTypes:true});  
  try {    
    await mkdir(destination, {recursive:true}).then(function() {
          stdout.write('Directory created successfully \n');
      }).catch(function() {
          stdout.write('failed to create directory');
      });     
    for await (let file of files) {
      if (file.isFile()) {
          const pathSourceFile = path.join(source + `\\` + file.name);
          const pathDestinationFile = path.join(destination + `\\` + file.name);
          await copyFile(pathSourceFile, pathDestinationFile);
      }
      else {
        const pathDestination = path.join(__dirname,'project-dist','assets', file.name);
        const pathSource = path.join(__dirname,'assets', file.name);       
        await mkdir(pathDestination, {recursive:true});
        copyDirectory(pathSource, pathDestination);               
      }
    }

    stdout.write('Files copied successfully \n');
  }
  catch(err) {
      stdout.write('Failed copy files');
  }
  }
 const createBuild = () => {
    createStyleCss();
    createIndexHtml();
    copyDirectory(pathSource, pathDestination);
 }

 createBuild();








