const fs = require('fs');
const readline = require('readline');
this.generateDockerFile=function  () {

// async function generateDockerFile() {
   console.log(`Generating Docker File`);
   //Read from local JSON param file 
   var config = require('./dockerconfig.json');

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

   /*
   var pomParser = require("pom-parser");
   var opts = {
     filePath: config.configFile, // The path to a pom file
   };
   // Parse the pom based on a path
   pomParser.parse(opts, function(err, pomResponse) {
     if (err) {
       console.log("ERROR: " + err);
       process.exit(1);
     }
   
     // The original pom xml that was loaded is provided.
     console.log("XML: " + pomResponse.pomXml);
     // The parsed pom pbject.
     console.log("OBJECT: " + JSON.stringify(pomResponse.pomObject));
   });
   */

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

   var write = "true";
   var thenum = "";
   var javaFlag = "false";
   var matchFlag = "false";
   //conditional placeholder start
   readInterface.on('line', function(line) {
      //console.log('Actual Line:' + line);
      let newLine = line;
      //Searching for keyword, for example - [# th:if="${javaVersion == '1.8'}"]
      if (newLine.includes('[# th:if="${javaVersion')){
         thenum = line.match(/[\d\.]+/)[0];
         write = "false";
         javaFlag = "true";
      }
      else if (newLine.includes('FROM ')){
      //Searching for keyword, for example - FROM maven:3.6.3-jdk-11 AS build-env
         Object.keys(jsonObject.placeholder).forEach( function(param , index) {
            //console.log(param + ':' + jsonObject.placeholder[param]);
            if ((javaFlag == "true") && (thenum == jsonObject.placeholder[param]) && (param == "javaVersion")){
               out.write(newLine + '\r');
               write = "false";
               javaFlag = "false";
               matchFlag = "true";
            }
         }); 
         thenum = "";
         if (matchFlag == "false"){
            out.write("" + '\r');
            write = "false";
         } else {
            matchFlag = "false";
         }
      }
      else if (newLine.includes('[/]')){
         out.write("" + '\r');
         write = "false";
      } 
      else {
         write = "true";
      }
      //conditional placeholder end

      if (write == "true"){
         //replace matching placeholder attributes with attrbute value
         Object.keys(jsonObject.placeholder).forEach( function(param , index) {
            //console.log(param + ':' + jsonObject.placeholder[param]);
            newLine = newLine.replace('[[${' + param +'}]]', jsonObject.placeholder[param]);
         }); 
      
         //write newline to out file
         //console.log('Replaced Line' + newLine);
         
         out.write(newLine + '\r');
      }
   });
}

// generateDockerFile();