var request = require('request');

/*
 * GET home page.
 */

exports.index = function(req, res) {
  var url, top;

  // If we're should process a shared link
  if(req.query.url && req.query.top) {
    url = req.query.url,
    top = req.query.top;
    res.redirect('/loadSite?url=' + url + '&top=' + top);
    return;
  }

  res.render('index.html');
};

exports.loadSite = function (req, res) {
  var website = decodeURIComponent(req.query.url);

  if (! website) console.log('website not found');

  request(website, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      res.render('page', {
        content: body,
        url: req.query.url,
        top: req.query.top
      });
    }
  });
};