var request = require('request'),
    u = require('url');

/*
 * GET home page.
 */
exports.index = function(req, res) {
  var url = req.query.url,
      top = req.query.top,
      options;

  // Whether we're processing a shared link
  // or taking the user to generate the link
  if (url) {
    url = decodeURIComponent(url);

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
          top: top
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
  var pattern = /(href|src)=['"]{1}([^"']*)['"]{1}/g,
      match = pattern.exec(body),
      newBody = body,
      skippedPaths = ['', '/', '#'],
      // LUT to guarantee that we don't reprocess values
      processed = {},
      parsedUrl = u.parse(url),
      path, host, resolvedPath,
      findPattern, replacePattern;

  while (match != null) {
    path = match[2];

    if (path && skippedPaths.indexOf(path) === -1) {
      host = u.parse(path).host;

      // Skip paths that inherit the protocol like //pagead2.googlesyndication.com/pagead/show_ads.js
      if (!host && path.indexOf('//') !== 0) {

        // @todo: for perf, split the body into lines then modify the lines
        // Need to join the array at the end to get back the html string
        // Make sure to not replace already replaced instances
        if (typeof processed[path] === 'undefined') {
          resolvedPath = parsedUrl.protocol + '//' + parsedUrl.hostname + (path[0] === '/' ? path : '/' + path);

          findPattern = '(href|src)=(\'|"){1}(' + regexEscape(path) + ')[\'"]{1}';
          // findPattern = '(href|src)=(\'|"){1}(' + path + ')[\'"]{1}';
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

function regexEscape(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}