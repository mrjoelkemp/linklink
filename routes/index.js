var request = require('request'),
    u = require('url');

/*
 * GET home page.
 */
exports.index = function(req, res) {
  var url = req.query.url,
      top = req.query.top,
      options, hostname;

  // Whether we're processing a shared link
  // or taking the user to generate the link
  if (url) {
    url = decodeURIComponent(url);

    options = {
      url: url,
      timeout: 2000
    };

    hostname = u.parse(url).href;

    request(options, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        body = resolveHrefs(body, hostname);

        res.render('page', {
          content: body,
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
 * @param  {String} hostname the hostname of the rendered content
 * @return {String}          html content with hostname-less src/hrefs modified
 */
function resolveHrefs(body, hostname) {
  var pattern = /(href|src)=['"]{1}([^"']*)['"]{1}/g,
      match = pattern.exec(body),
      newBody = body,
      skippedPaths = ['', '/', '#'],
      // LUT to guarantee that we don't reprocess values
      processed = {},
      path, host;

  while (match != null) {
    path = match[2];

    if (path && skippedPaths.indexOf(path) === -1) {
      host = u.parse(path).host;

      if (!host) {
        // @todo: for perf, split the body into lines then modify the lines
        // Need to join the array at the end to get back the html string

        // Make sure to not replace already replaced instances
        if (typeof processed[path] === 'undefined') {
          newBody = newBody.replace(path, hostname + path);
          processed[path] = true;
        }
      }
    }

    match = pattern.exec(body);
  }

  return newBody;
}