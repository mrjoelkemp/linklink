var request = require('request');
var u = require('url');
var str = require('../helpers/string');
var urlh = require('../helpers/url');
var isRelativePath = require('is-relative-path');

/**
 * Routes :
 *   New users to the index page
 *   Users that have submitted a url to the create a link page
 *   Users coming in from a shared url
 */
exports.index = function(req, res) {
  var url = req.query.url,
      top = req.query.top,
      path = req.query.path || '',
      options;

  // Whether we're processing a shared link or taking the user to generate the link
  if (url) {
    console.log('Received url: ', url);

    url = urlh.decode(url);

    console.log('Decoded url: ', url);

    if (path) path = decodeURIComponent(path);

    options = {
      url: url,
      timeout: 5000
    };

    request(options, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log('Successfully fetched: ', url)
        body = resolveHrefs(body, url);

        res.render('page', {
          content: body,
          currentHost: req.headers.host,
          url: url,
          top: top,
          path: path
        });

      } else if(error) {
        var args = [
          'url: ' + url,
          'path: ' + path,
          'error: ' + JSON.stringify(error)
        ];

        console.log('Error\n', args.join('\n'));

        res.render('error', {
          currentHost: req.headers.host,
          url: url,
          time: new Date(),
          error: JSON.stringify(error)
        });
      }
    });

  } else {
    res.render('index.html');
  }
};

/**
 * Add a hostname to all src and href values without one
 * @param  {String} body     html content of the webpage
 * @param  {String} url      the url to view
 * @return {String}          html content with hostname-less src/hrefs modified
 */
function resolveHrefs(body, url) {
  var baseHref = urlh.getBaseTagValue(body),
      newBody = body,
      // LUT to guarantee that we don't reprocess values
      processed = {},
      parsedUrl = u.parse(url);

  urlh.forEachHref(body, function(path) {
    if (!path || urlh.isSkippedPath(path)) { return; }

    var host = u.parse(path).host;
    var hostname;

    // Skip paths that inherit the protocol like //pagead2.googlesyndication.com
    if (host || path.indexOf('//') === 0) { return; }

    // Make sure to not replace already replaced instances
    if (typeof processed[path] !== 'undefined') { return; }

    if (str.hasLeadingSlash(path[0]) || isRelativePath(path)) {
      hostname = parsedUrl.protocol + '//' + parsedUrl.hostname;
    } else if (baseHref) {
      hostname = baseHref;
    } else {
      hostname = parsedUrl.href;
    }

    var resolvedPath = str.slashJoin(hostname, path);
    var findPattern = '(href|src)=(\'|"){1}(' + str.regexEscape(path) + ')[\'"]{1}';
    var replacePattern = '$1=$2' + resolvedPath + '$2';

    newBody = newBody.replace(new RegExp(findPattern), replacePattern);
    processed[path] = true;
  });

  return newBody;
}

