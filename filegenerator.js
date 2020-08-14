var fs = require('fs');

// calling generateDockerFile
eval(fs.readFileSync('dockergen.js')+'');

// calling generatePipelineFile
eval(fs.readFileSync('pipelinegen.js')+'');

// calling generateDeploymentFile
eval(fs.readFileSync('deploymentgen.js')+'');
