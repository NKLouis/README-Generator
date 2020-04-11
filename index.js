require('dotenv').config()
const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");


function questions() {
  inquirer.prompt([
    {
      type: "input",
      message: "Please enter your GitHub username?",
      name: "username"
    },
    {
      type: "input",
      message: "Please enter your project's name?",
      name: "title"
    },
    {
      type: "input",
      message: "Please write a short description of your project?",
      name: "description"
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
      type: "checkbox",
      message: "What license do you want to use?",
      choices: ["Apache", "BSD", "GPL", "ISC", "MIT"],
      name: "license"
    },

    {
      type: "input",
      message: "Contributors?",
      name: "contributor"
    },
    {

      type: "input",
      message: "Tests?",
      name: "test"
    },
    {
      type: "checkbox",
      message: "What technologies did you use?",
      choices: [" Node.Js", " JavaScript", " jQuery", " HTML", " CSS", "Bootstrap", "Media Queries", " MySQL", " APIs", " GitHub", " GIT", " Heroku", " Express", " React.js", " React"],
      name: "technology"
    },
    {
      type: "input",
      message: "Please enter your portfolio URL?",
      name: "portfolio"
    }

  ])

    .then(function (response) {

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
<li><a href="#title">Project</a></li>
<li><a href="#description">Description</a></li>  
<li><a href="#installation">Installation</a></li> 
<li><a href="#usage">Usage</a></li> 
<li><a href="#license">License</a></li> 
<li><a href="#contributor">Contributor</a></li>   
<li><a href="#test">Tests</a></li> 
<li><a href="#technology">Technology</a></li>   
   
<h2 id="description"> Description </h2>
<p>${response.description}</p>

<h2 id="description"> installation </h2>
<p>${response.installation}</p>

<h2 id="description"> usage </h2>
<p>${response.usage}</p>

<h2 id="description"> license </h2>
<p>${response.license}</p>

<h2 id="description"> contributor </h2>
<p>${response.contributor}</p>

<h2 id="description"> tests </h2>
<p>${response.test}</p>

<h2 id="description"> Technology </h2>
<p>${response.technology}</p>

<h2> Contact </h2>
<a href= "${res.data.email}">Email</a> 
<a href= "${res.data.blog}">Portfolio</a> `


  fs.writeFile("gen-README.md", getInfo, function (err) {

    if (err) {
      return console.log(err);
    }

    console.log("Success!");

  });


};
