var express = require('express');
var fs = require("fs");
// var bodyParser = require('body-parser')

var router = express.Router();
var dockerGen = require('./../dockergen');
var pipelineGen = require('./../pipelinegen');
var deploymentGen = require('./../deploymentgen');
var hAutoScalingGen = require('./../hautoscaling');

var fileGen = require('./../filegenerator.js');
var dockerConfig = require('./../dockerconfig.json');
var pipelineConfig = require('./../pipelineconfig.json');
var deploymentConfig = require('./../deploymentconfig.json');
var hautoscalingConfig = require('./../hautoscaling.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/templateFileGen', function(req, res) {
  console.log('calling template file generator module');
  // console.log(" req.query.techInput : " + req.query[0]);
  // console.log(" req.body.techInput : " +  req.body.techInput);
  
  var genDockerChkBoxVal = req.body.genDockerChkBoxValue;
  var genPipelineChkBoxVal = req.body.genPipelineChkBoxValue;
  var genDeploymentChkBoxVal = req.body.genDeploymentChkBoxValue;
  var genHAutoscalingChkBoxVal = req.body.genHAutoscalingChkBoxValue;

  console.log(" genDockerChkBoxVal : " + genDockerChkBoxVal + " genPipelineChkBoxVal : " + genPipelineChkBoxVal +
   " genDeploymentChkBoxVal : " + genDeploymentChkBoxVal + " genHAutoscalingChkBoxVal : " + genHAutoscalingChkBoxVal);


  var techInput = req.body.techInput;
  var projectNameInput = req.body.projectNameInput;
  var appPort = req.body.appPort;
  var javaVersion = req.body.javaVersion;
  var finalName = req.body.finalName;

  console.log(" techInput : " + techInput + " projectNameInput : " + projectNameInput + " appPort : " + appPort
  + " javaVersion : " + javaVersion + " finalName : " + finalName);

  if ('true' == genDockerChkBoxVal) {
      //Read from local JSON param file 
      // Covert JavaScript object into JSON string 
      var strDockerJSON = JSON.stringify(dockerConfig); 
      // Covert JSON string into object 
      var dockerJsonObject = JSON.parse(strDockerJSON); 
      console.log("template Base before:"+ dockerJsonObject.placeholder.tech);
      dockerJsonObject.placeholder.tech = techInput;
      dockerJsonObject.placeholder.projectNameInput = projectNameInput;
      dockerJsonObject.placeholder.appPort = appPort;
      dockerJsonObject.placeholder.javaVersion = javaVersion;
      dockerJsonObject.placeholder.finalName = finalName;

      // console.log("template Base after:"+ dockerJsonObject.placeholder.tech);

      fs.writeFileSync('dockerconfig.json', JSON.stringify(dockerJsonObject));

      dockerGen.generateDockerFile();

  }
  

  var pipelineProjectNameInput = req.body.pipelineProjectNameInput;
  var piplelineAppPortInput = req.body.piplelineAppPortInput;

  console.log(" pipelineProjectNameInput : " + pipelineProjectNameInput + " piplelineAppPortInput : " + piplelineAppPortInput);

  if ('true' == genPipelineChkBoxVal) {
    //Read from local JSON param file 
      // Covert JavaScript object into JSON string 
      var strPipelineJSON = JSON.stringify(pipelineConfig); 
      // Covert JSON string into object 
      var pipelineJsonObject = JSON.parse(strPipelineJSON); 

      pipelineJsonObject.placeholder.projectName = pipelineProjectNameInput;
      pipelineJsonObject.placeholder.appPort = piplelineAppPortInput;

      fs.writeFileSync('pipelineconfig.json', JSON.stringify(pipelineJsonObject));

      pipelineGen.generatePipelineFile();
  }
 

  var deploymentProjectNameInput = req.body.deploymentProjectNameInput;
  var deploymentAppPortInput = req.body.deploymentAppPortInput;

  console.log(" deploymentProjectNameInput : " + deploymentProjectNameInput + " deploymentAppPortInput : " + deploymentAppPortInput);

  if ('true' == genDeploymentChkBoxVal) {
    //Read from local JSON param file 
      // Covert JavaScript object into JSON string 
      var strDeploymentJSON = JSON.stringify(deploymentConfig); 
      // Covert JSON string into object 
      var deploymentJsonObject = JSON.parse(strDeploymentJSON); 

      deploymentJsonObject.placeholder.projectName = deploymentProjectNameInput;
      deploymentJsonObject.placeholder.appPort = deploymentAppPortInput;

      fs.writeFileSync('deploymentconfig.json', JSON.stringify(deploymentJsonObject));

      deploymentGen.generateDeploymentFile();
  }
  

  var hAutoScalingProjectNameInputVal = req.body.hAutoScalingProjectNameInput;
  var minReplicasVal = req.body.minReplicas;
  var maxReplicasVal = req.body.maxReplicas;
  var cpuAvgUtlztnVal = req.body.cpuAvgUtlztn;
  var memAvgUtlztnVal = req.body.memAvgUtlztn;
  var podsAvgValueVal = req.body.podsAvgValue;
  var objAvgValueVal = req.body.objAvgValue;

   console.log(" hAutoScalingProjectNameInputVal : " + hAutoScalingProjectNameInputVal +
   " minReplicasVal : " + minReplicasVal + 
   " maxReplicasVal : " + maxReplicasVal + 
   " cpuAvgUtlztnVal : " + cpuAvgUtlztnVal + 
   " memAvgUtlztnVal : " + memAvgUtlztnVal + 
   " podsAvgValueVal : " + podsAvgValueVal + 
   " objAvgValueVal : " + objAvgValueVal );

   if ('true' == genHAutoscalingChkBoxVal) {
      //Read from local JSON param file 
      // Covert JavaScript object into JSON string 
      var strHAutoScalingJSON = JSON.stringify(hautoscalingConfig); 
      // Covert JSON string into object 
      var hAutoScalingJsonObject = JSON.parse(strHAutoScalingJSON); 

      hAutoScalingJsonObject.placeholder.projectName = hAutoScalingProjectNameInputVal;
      hAutoScalingJsonObject.placeholder.minReplicas = minReplicasVal;
      hAutoScalingJsonObject.placeholder.maxReplicas = maxReplicasVal;
      hAutoScalingJsonObject.placeholder.cpuAvgUtlztn = cpuAvgUtlztnVal;
      hAutoScalingJsonObject.placeholder.memAvgUtlztn = memAvgUtlztnVal;
      hAutoScalingJsonObject.placeholder.podsAvgValue = podsAvgValueVal;
      hAutoScalingJsonObject.placeholder.ObjAvgValue = objAvgValueVal;

      fs.writeFileSync('hautoscaling.json', JSON.stringify(hAutoScalingJsonObject));

      hAutoScalingGen.generateHorizontalAutoScalerFile();
   }
 
  // Get content from file
//  var contents = fs.readFileSync("./../dockerConfig.json");
 // Define to JSON type
  // var jsonContent = JSON.parse(contents);


  // var post_data = req.body;
  // console.log(post_data);
  // console.log(req.query);
  // console.log('calling dockerGen');
  // dockerGen.generateDockerFile(techInput, projectNameInput, appPort, javaVersion, finalName);
  // console.log('calling generateTemplateFiles');
  // fileGen.generateTemplateFiles();
  // mvp.generateDockerFile();
  // eval(fs.readFileSync('dockergen.js')+'');

  // var response = {
  //   param1 : req.query.param1,
  //   param2 : req.query.param2
  //   };

  res.end(JSON.stringify("Template files generated"));
});

router.post('/dockerFileGen', function(req, res) {
  console.log('calling docker file generator module');
  // console.log(" req.query.techInput : " + req.query[0]);
  // console.log(" req.body.techInput : " +  req.body.techInput);
  
  var techInput = req.body.techInput;
  var projectNameInput = req.body.projectNameInput;
  var appPort = req.body.appPort;
  var javaVersion = req.body.javaVersion;
  var finalName = req.body.finalName;

  console.log(" techInput : " + techInput + " projectNameInput : " + projectNameInput + " appPort : " + appPort
  + " javaVersion : " + javaVersion + " finalName : " + finalName);

  var pipelineProjectNameInput = req.body.pipelineProjectNameInput;
  var piplelineAppPortInput = req.body.piplelineAppPortInput;

  console.log(" pipelineProjectNameInput : " + pipelineProjectNameInput + " piplelineAppPortInput : " + piplelineAppPortInput);

  var deploymentProjectNameInput = req.body.deploymentProjectNameInput;
  var deploymentAppPortInput = req.body.deploymentAppPortInput;

  console.log(" deploymentProjectNameInput : " + deploymentProjectNameInput + " deploymentAppPortInput : " + deploymentAppPortInput);

  //Read from local JSON param file 
  var config = require(path.resolve('./../../mvp-generator_nodejs/dockerconfig.json'));
  // Covert JavaScript object into JSON string 
  const strJSON = JSON.stringify(config); 
  // Covert JSON string into object 
  const jsonObject = JSON.parse(strJSON); 

  // var post_data = req.body;
  // console.log(post_data);
  // console.log(req.query);

  dockerGen.generateDockerFile(techInput, projectNameInput, appPort, javaVersion, finalName);
  
  // mvp.generateDockerFile();
  // eval(fs.readFileSync('dockergen.js')+'');

  var response = {
    param1 : req.query.param1,
    param2 : req.query.param2
    };

  res.end(JSON.stringify("Docker file generated"));
});

router.post('/pipelineFileGen', function(req, res) {
  console.log('calling Pipeline file generator module');

  var pipelineProjectNameInput = req.body.pipelineProjectNameInput;
  var piplelineAppPortInput = req.body.piplelineAppPortInput;

  console.log(" pipelineProjectNameInput : " + pipelineProjectNameInput + " piplelineAppPortInput : " + piplelineAppPortInput);

  pipelineGen.generatePipelineFile(pipelineProjectNameInput, piplelineAppPortInput);
  // mvp.generateDockerFile();
  // eval(fs.readFileSync('dockergen.js')+'');

  response = {
    param1 : req.query.param1,
    param2 : req.query.param2
    };

  res.end(JSON.stringify("Pipeline file generated"));
});

router.post('/deploymentFileGen', function(req, res) {
  console.log('calling Deployment file generator module');
  
  var deploymentProjectNameInput = req.body.deploymentProjectNameInput;
  var deploymentAppPortInput = req.body.deploymentAppPortInput;

  console.log(" deploymentProjectNameInput : " + deploymentProjectNameInput + " deploymentAppPortInput : " + deploymentAppPortInput);

  deploymentGen.generateDeploymentFile(deploymentProjectNameInput, deploymentAppPortInput);
  // mvp.generateDockerFile();
  // eval(fs.readFileSync('dockergen.js')+'');

  response = {
    param1 : req.query.param1,
    param2 : req.query.param2
    };

  res.end(JSON.stringify("Deployment file generated"));
});

module.exports = router;
