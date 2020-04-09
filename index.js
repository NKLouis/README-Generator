require('dotenv').config()
const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
//const MD = require('./generateMarkdown');



function questions() {
inquirer.prompt([
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
            message: "Installation requirements?",
            name: "installation"
        },
        {
            type: "input",
            message: "Please enter Usage?",
            name: "usage"
        },
        {
            type: "input",
            message: "Please enter License?",
            name: "license"
        },
        {
            type: "input",
            message: "Contributors?",
            name: "contributor"
        },
        {
                    
            type: "input",
            message: "Testes?",
            name: "tests"
        },
        {
        
            type: "input",
            message: "what is your LinkedIn username?",
            name: "linkedin"
        },
        {
            type: "input",
            message: "What is your portfolio URL?",
            name: "portfolio"
        }
        
  ])

    .then(function(response) {

    let userName = response.username;

    githubAPICall(userName, response);
 
    });

    
};
 questions();
 
 
 function githubAPICall(userName, response) {
    console.log(userName);
  
    const queryURL = `https://api.github.com/users/` + userName;
  
    
      axios
        .get(queryURL, {
          headers: { "Authorization": `token ${process.env.GH_TOKEN}` }
        })
        .then(function (res) {
          console.log(res.data);
  
          generateMarkdown(response, res)
        })
  
        .catch(error => console.log(error));
    
  }

  function generateMarkdown(response, res) {

    const usersInfo = `
    
    <a href="https://img.shields.io/badge/License-${response.license}-green">Badge</a>

    
    ${res.data.avatar_url}
    
    ${response.title}
    ${response.description}
    ${response.contents}
    ${response.installation}
    ${response.usage}
    ${response.license}
    ${response.contributor}
    ${response.tests}
    ${response.linkedin}
    ${response.portfolio}
    ${response.email} 
  `
  
    fs.writeFile("gen-README.md", usersInfo, function (err) {
  
      if (err) {
        return console.log(err);
      }
  
      console.log("Success!");
  
    });
  
  
  };
