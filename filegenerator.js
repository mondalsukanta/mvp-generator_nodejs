var fs = require('fs');

this.generateTemplateFiles=function ()
// async function generateTemplateFiles()
 {
    // calling generateDockerFile
    eval(fs.readFileSync('dockergen.js')+'');

    // calling generatePipelin  eFile
    eval(fs.readFileSync('pipelinegen.js')+'');

    // calling generateDeploymentFile
    eval(fs.readFileSync('deploymentgen.js')+'');

    // calling generateHorizontalAutoScalerFile
    eval(fs.readFileSync('hautoscaling.js')+'');
}