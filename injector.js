const spur = require('spur-ioc');
const { JSDOM } = require('jsdom');
const jQuery = require('jquery');

function getjQuery() {
  return new Promise((resolve, reject) => {
    try {
      const view = (new JSDOM('<html></html>')).window.document.defaultView;
      const jquery = jQuery(view);
      if (typeof jquery === 'function') {
        resolve(jquery);
      } else {
        jquery.ready($ => resolve($));
      }
    } catch (er) {
      reject(er);
    }
  });
}

module.exports = () => {
  // define a  new injector
  const ioc = spur.create('app');

  // register external dependencies or globals
  /* eslint-disable global-require */
  ioc.registerDependencies({
    path: require('path'),
    _: require('lodash'),
    https: require('https'),
    querystring: require('querystring'),
    fs: require('fs'),
    Q: require('q'),
    jQuery: getjQuery,
    console,
    nodeProcess: process,
  });
  /* eslint-enable global-require */

  // register folders in your project to be auto-injected
  ioc.registerFolders(__dirname, ['src']);

  return ioc;
};
