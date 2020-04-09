
const fs = require('fs');



const MD = { generateMarkdown(res, response) {

console.log(generateMarkdown);

  const getInfo = `

<img src= "https://img.shields.io/badge/License-${response.license}-green">
<img src="${res.data.avatar_url}">

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
${response.email} `

  fs.writeFile("./README.md", getInfo, function(err) {
    if (err) {
        return console.log(err);
      }
  
      console.log("Success!");
    
    });

  }

}
module.exports = MD;