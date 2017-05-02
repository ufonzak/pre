const spur = require("spur-ioc");

function get_jQuery() {
  return new Promise((resolve, reject) => {
    try {
      const { JSDOM } = require('jsdom');
      const view = (new JSDOM('<html></html>')).window.document.defaultView;
      const jquery = require('jquery')(view);
      if (typeof jquery === 'function') {
        resolve(jquery);
      } else {
        jquery.ready($ => resolve($));
      }
    }
    catch(er) {
      reject(er);
    }
  });
}

module.exports = function(){
  // define a  new injector
  var ioc = spur.create("app");

  //register external dependencies or globals
  ioc.registerDependencies({
    "path"        : require("path"),
    "_"           : require("lodash"),
    "https"       : require("https"),
    "querystring" : require("querystring"),
    "fs"          : require("fs"),
    "Q"           : require("q"),
    "jQuery"      : get_jQuery,
    "console"     : console,
    "nodeProcess" : process
  });

  // register folders in your project to be auto-injected
  ioc.registerFolders(__dirname, [
    "src"
  ]);

  return ioc;
}
