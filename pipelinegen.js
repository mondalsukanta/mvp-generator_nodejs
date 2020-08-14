const fs = require('fs');
const readline = require('readline');

async function generatePipelineFile() {
   console.log(`Generating Pipeline File`);
   //Read from local JSON param file 
   var config = require('./pipelineconfig.json');

   // Covert JavaScript object into JSON string 
   const strJSON = JSON.stringify(config); 
   
   // Covert JSON string into object 
   const jsonObject = JSON.parse(strJSON); 
   
   //Check if template file exist
   var templateFile = config.templateBase + '/' + config.templateName;
   try {
   if (fs.existsSync(templateFile)) {
      console.log(`Template file ` + templateFile);
   } 
   else {
      console.log(`Template file ` + templateFile + ` doesn't exist`);
      process.exit(1)
   }
   } catch(err) {
      console.error(err)
   }

   //Open template file
   const fileStream = fs.createReadStream(templateFile);

   const readInterface = readline.createInterface({
      input: fs.createReadStream(templateFile),
      console: false
   });

   //Open output file
   var outFile = config.outputBase + '/' + config.outputFile;
   console.log(`Output file ` + outFile);
   var out = fs.createWriteStream(outFile, {
     flags: 'w' 
   });

   //read through template file line by line
   readInterface.on('line', function(line) {
      //console.log('Actual Line' + line);
      let newLine = line;
      //replace matching placeholder attributes with attrbute value
      Object.keys(jsonObject.placeholder).forEach( function(param , index) {
         //console.log(param + ':' + jsonObject.placeholder[param]);
         newLine = newLine.replace('[[${' + param +'}]]', jsonObject.placeholder[param]);
      }); 
     
      //write newline to out file
      //console.log('Replaced Line' + newLine);
      out.write(newLine + '\r');
   });
}

generatePipelineFile();