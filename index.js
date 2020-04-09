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

    const getInfo = `
    
    <img src= "https://img.shields.io/badge/License-${response.license}-green">

    <h1> ${response.title}</h1>
 
    <img src="${res.data.avatar_url}">
    


    <h2> Table of Contents </h2>
    <li><a href="#title">Title</a></li>
    <li><a href="#description">Description</a></li>  
    <li><a href="#contents">Contents</a></li> 
    <li><a href="#installation">Installation</a></li> 
    <li><a href="#usage">Usage</a></li> 
    <li><a href="#license">License</a></li> 
    <li><a href="#contributor">Contributor</a></li>   
    <li><a href="#tests">Tests</a></li> 
  


    <h2 id="description"> Description </h2>
    <p>${response.description}</p>

    <h2 id="description"> contents </h2>
    <p>${response.contents}</p>

    <h2 id="description"> installation </h2>
    <p>${response.installation}</p>

    <h2 id="description"> usage </h2>
    <p>${response.usage}</p>

    <h2 id="description"> license </h2>
    <p>${response.license}</p>

    <h2 id="description"> contributor </h2>
    <p>${response.contributor}</p>

    <h2 id="description"> tests </h2>
    <p>${response.tests}</p>

    <h2 id="email"> Email </h2>
    <a href= "Email:${res.data.email}">${res.data.email}</a> 

    <h2 id="portfolio"> Portfolio </h2>
    <a href= "${res.data.blog}">Portfolio</a> `


    fs.writeFile("gen-README.md", getInfo, function (err) {
  
      if (err) {
        return console.log(err);
      }
  
      console.log("Success!");
  
    });
  
  
  };