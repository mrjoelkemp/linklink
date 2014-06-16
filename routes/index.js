var request = require('request');

/*
 * GET home page.
 */
exports.index = function(req, res) {
  var url = req.query.url,
      top = req.query.top;

  // Whether we're processing a shared link
  // or taking the user to generate the link
  if (url) {
    var website = decodeURIComponent(url);

    request(website, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        res.render('page', {
          content: body,
          url: url,
          top: top
        });
      }
    });

  } else {
    res.render('index.html');
  }
};