"use strict";
var jsdom = require("jsdom");
var package_json = require("./package.json");
var ssri = require("ssri");
var fs = require("fs");
var version = package_json.dependencies.jquery;
var doc = jsdom.JSDOM.fromFile('../html5-boilerplate/dist/index.html', this.options).then(function (dom) {
            var DOC = dom.window.document;
            var script = DOC.createElement('script');
            script.src = "https://code.jquery.com/jquery-" + version + ".min.js";
            var hash = ssri.fromData(fs.readFileSync('./node_modules/jquery/dist/jquery.min.js'), { algorithms: ['sha256'] });
           
            script.setAttribute("integrity",hash.toString());
          
            var scriptBackup = DOC.createElement('script');
            scriptBackup.innerHTML = `window.jQuery || document.write('<script src=\"js/vendor/jquery-${version}.min.js\"></script>')`;
            var firstScript = DOC.querySelectorAll('body script')[0];
            DOC.body.insertBefore(script, firstScript);
            DOC.body.insertBefore(scriptBackup, firstScript);
            fs.writeFile('./index.html', DOC.documentElement.outerHTML,
                     function (error){
            if (error) throw error;
        });
        });

       
