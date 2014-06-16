var request = require('request');

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