"use strict";
const package_json = require("./package.json");
const ssri = require("ssri");
const fs = require('fs');
const version = package_json.dependencies.jquery;
const hash = ssri.fromData(fs.readFileSync('./node_modules/jquery/dist/jquery.min.js'), { algorithms: ['sha256'] });
const template = `<script src="https://code.jquery.com/${version}.min.js" integrity="${hash}" crossorigin="anonymous"></script>
<script>window.jQuery || document.write('<script src="js/vendor/jquery-${version}.min.js"><\\/script>')</script>`;
const indexHTML = fs.readFileSync('./index.html').toString().split("\n");
const fourOhFourHTML = fs.readFileSync('./404.html').toString().split("\n");
let index = 0;
for (let i = 0; i < indexHTML.length; i++){

    if (indexHTML[i].indexOf("modernizr") > 0) {
        index = i;
    }
}
indexHTML.splice(index, 0, template);
const indexText = indexHTML.join("\n");

fs.writeFile('index.html', indexText, (error) => {
if (error) {
    return console.log(error);
}  
});

fs.copyFile('./node_modules/jquery/dist/jquery.min.js',`js/vendor/jquery-${version}.min.js`,()=>undefined);
