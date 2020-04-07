require('dotenv').config()
const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
var api = require("./utils/api.js")


inquirer
    .prompt([
         {
            type: "input",
         message: "What is your GitHub username?",
         name: "username"
         },
        {
            type: "input",
            message: "What is your project's title?",
            name: "title"
        },
        {
            type: "input",
            message: "Please write a short description of your project?",
            name: "description"
        },
        {
            type: "input",
            message: "What is your table of contents?",
            name: "contents"
        },
        {

            type: "input",
            message: "What is your Installation?",
            name: "installation"
        },
        {
            type: "input",
            message: "What is your Usage?",
            name: "usage"
        },
        {
            type: "input",
            message: "What is your License?",
            name: "license"
        },
        {
            type: "input",
            message: "What does the user need to know about Contributing to the repo?",
            name: "contributing"
        },
        {
        
            type: "input",
            message: "What is your Tests?",
            name: "tests"
        },
        {
                    
            type: "input",
            message: "Questions?",
            name: "questions"
        }
        
  ])


.then(function(answer) {
    console.log(answer.questions);
    const newResponse = {
        username: answer.username,
        title: answer.title,
        description: answer.description,
        contents: answer.contents,
        installation: answer.installation,
        usage: answer.usage,
        license: answer.license,
        contributing: answer.contributing,
        tests: answer.tests,
        questions: answer.questions,
        gitHub: api.getUser
    }
    const fileData =
    `
    ##${"Username: " +  newResponse.username}
    ##${"Title: " + newResponse.title}
    ##${"Description: "+ newResponse.description}
    ##${"Table of Contents: "+ newResponse.contents}
    ##${"Installation: " + newResponse.installation}
    ##${"Usage: "+ newResponse.usage}
    ##${"License: "+ newResponse.license}
    ##${"Contributing: "+ newResponse.contributing}
    ##${"Tests: "+ newResponse.tests}
    ##${"Questions: "+ newResponse.questions}
      
      `;
      

      fs.writeFile("../README.md", fileData, function(err) {
        if (err) {
            return console.log(err);
          }
      
          console.log("Success!");
        
        })

});
 
console.log(api.getUser);

