const fs = require('fs');
const path = require('path');
const {readdir} = require('fs/promises');

const getBundle = async() => {
  const pathSource = path.join(__dirname, 'styles');
  const pathDestination = path.join(__dirname,'project-dist', 'bundle.css');  
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

getBundle();


