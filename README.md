# mvp-generator_nodejs
https://github.com/mondalsukanta/mvp-generator_nodejs.git
Main Script : filegenerator.js  
Description: CLI scripts generators
Author: Sukanta Mondal
Date: 08/13/2020

Setup VS and extension 
---------------------------
https://code.visualstudio.com/Download
VSCodeUserSetup-x64-1.47.3.exe

This extension contains code snippets for JavaScript in ES6 syntax for Vs Code editor (supports both JavaScript and TypeScript).
Visual Studio Code>Snippets>JavaScript (ES6) code snippets

Check nodejs version
---------------------------
node --version
v12.18.3

Sample Run Command
---------------------------
node filegenerator.js

Sample Output
---------------------------
Generating Docker File
Template file ./templates/docker/dockerfile-java-maven-template.txt
Output file ./output/Dockerfile
Generating Pipeline File
Template file ./templates/cicd/pipeline.txt
Output file ./output/pipeline.yml
Generating Deployment File
Template file ./templates/kubernates/deployment.txt
Output file ./output/deployment.yml

#https://github.com/intuit/node-pom-parser
#Set EXPO_DEBUG=true
#npm config set package-lock false
#npm install
#npm install --save pom-parser