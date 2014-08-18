/**
 * Iterator for all href or src properties in the given body of html text
 * @param  {String}   body
 * @param  {Function} cb   - Executed with the value of the href/src property
 */
module.exports.forEachHref = function(body, cb) {
  var pattern = /(href|src)=['"]{1}([^"']*)['"]{1}/g,
      match = pattern.exec(body);

  while (match != null) {
    path = match[2];
    cb(path);
    match = pattern.exec(body);
  }
};

/**
 * Returns the href value of the <base> html tag
 * @param  {String} body
 * @return {String | null}
 */
module.exports.getBaseTagValue = function(body) {
  var basePattern = /base\shref=['"]{1}([^"']*)['"]{1}/,
      match = basePattern.exec(body);

  if (match) {
    match = match[1];
  }

  return match;
};

/**
 * Whether or not the given url should not be processed
 * @param  {String}  url
 * @return {Boolean}
 */
module.exports.isSkippedPath = function(url) {
  var skippedPaths = ['', '/', '#'];
  return skippedPaths.indexOf(url) !== -1;
};