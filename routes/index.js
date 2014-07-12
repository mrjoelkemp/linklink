var request = require('request'),
    u       = require('url');

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
  var basePattern = /base\shref=['"]{1}([^"']*)['"]{1}/,
      usesBaseTag = basePattern.test(body),
      baseHref = usesBaseTag ? basePattern.exec(body)[1] : null,
      pattern = /(href|src)=['"]{1}([^"']*)['"]{1}/g,
      match = pattern.exec(body),
      newBody = body,
      skippedPaths = ['', '/', '#'],
      // LUT to guarantee that we don't reprocess values
      processed = {},
      parsedUrl = u.parse(url),
      pathHasLeadingSlash, hostname,
      path, host, resolvedPath,
      findPattern, replacePattern;

  while (match != null) {
    path = match[2];

    if (path && skippedPaths.indexOf(path) === -1) {
      host = u.parse(path).host;

      pathHasLeadingSlash = path[0] === '/';

      // Skip paths that inherit the protocol like //pagead2.googlesyndication.com
      if (!host && path.indexOf('//') !== 0) {
        // Make sure to not replace already replaced instances
        if (typeof processed[path] === 'undefined') {

          if (pathHasLeadingSlash) {
            hostname = parsedUrl.protocol + '//' + parsedUrl.hostname;
          } else if (usesBaseTag) {
            hostname = baseHref;
          } else {
            hostname = parsedUrl.href;
          }

          resolvedPath =  hostname + (pathHasLeadingSlash ? path : '/' + path);

          findPattern = '(href|src)=(\'|"){1}(' + regexEscape(path) + ')[\'"]{1}';

          replacePattern = '$1=$2' + resolvedPath + '$2';

          newBody = newBody.replace(new RegExp(findPattern), replacePattern);
          processed[path] = true;
        }
      }
    }

    match = pattern.exec(body);
  }

  return newBody;
}

/** @return {String} */
function regexEscape(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}