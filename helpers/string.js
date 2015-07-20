var path = require('path');
var isRelativePath = require('is-relative-path');

/**
 * Escapes special regex characters
 * @param {String} text
 * @return {String}
 */
module.exports.regexEscape = function(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

/**
 * @param  {String}  str
 * @return {Boolean}
 */
module.exports.hasTrailingSlash = function(str) {
  return str[str.length - 1] === '/';
};

/**
 * @param  {String}  str
 * @return {Boolean}
 */
module.exports.hasLeadingSlash = function(str) {
  return str[0] === '/';
};

/**
 * Concatenates the two string with at most a single slash between them
 *
 * @example
 *   hostname = www.foo.com/
 *   path = /javascripts/scripts.js
 *   returned = www.foo.com/javascripts/scripts.js
 *
 * @param  {String} hostname
 * @param  {String} subpath
 * @return {String}
 */
module.exports.slashJoin = function(hostname, subpath) {
  var first = this.hasTrailingSlash(hostname) ?
              hostname.slice(0, hostname.length - 1) :
              hostname;

  var last = this.hasLeadingSlash(subpath) ? subpath.slice(1) : subpath;

  return first + '/' + last;
};