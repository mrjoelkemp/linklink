var request = require('request'),
    u       = require('url'),
    str = require('../helpers/string'),
    urlh = require('../helpers/url');

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

  // Whether we're processing a shared link
  // or taking the user to generate the link
  if (url) {
    url = decodeURIComponent(url);

    if (path) path = decodeURIComponent(path);

    options = {
      url: url,
      timeout: 2000
    };

    request(options, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        body = resolveHrefs(body, url);

        res.render('page', {
          content: body,
          currentHost: req.headers.host,
          url: url,
          top: top,
          path: path
        });

      } else {
        res.send(error);
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
    if (!host && path.indexOf('//') !== 0) {
      // Make sure to not replace already replaced instances
      if (typeof processed[path] === 'undefined') {
        if (str.hasLeadingSlash(path[0])) {
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
      }
    }
  });

  return newBody;
}

