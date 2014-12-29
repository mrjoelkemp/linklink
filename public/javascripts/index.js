;(function (window) {
  'use strict';

  var isDev = window.location.origin.indexOf('localhost') !== -1;

  if (isDev) {
    window.mixpanel.track = function(){};
  }

  /** @type {String} website */
  function loadSite(website) {
    website = formatWebsite(website);
    window.mixpanel.track('Generate', { 'url': website });
    window.location.href = '/?url=' + window.encodeURIComponent(website);
  }

  /**
   * @param  {String}  str
   * @return {Boolean} Whether or not the given url is valid
   */
  function isUrl(str) {
    // From https://mathiasbynens.be/demo/url-regex
    var urlRegex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i;
    return urlRegex.test(str);
  }

  /**
   * Preprocess the website to make sure it's in a valid format
   * @return {String} - Formatted website
   */
  function formatWebsite(website) {
    website = website.replace('https://', 'http://');

    if (website.indexOf('http://') === -1) {
      website = 'http://' + website;
    }

    return website;
  }

  window.mixpanel.track('Landing Page');

  var enterWebsiteInput = document.querySelector('.enter-website');

  enterWebsiteInput.addEventListener('keypress', function (event) {
    var val;
    if (event.which === 13) {
      val = this.value.trim();

      if (val) {
        val = formatWebsite(val);

        if (! isUrl(val)) {
          document.querySelector('.error').style.display = 'block';
          window.mixpanel.track('Error', { 'type': 'url'});

        } else {
          window.mixpanel.track('Click-to-Create');
          document.querySelector('.error').style.display = 'none';
          loadSite(this.value.trim());
        }

        event.preventDefault();
      }
    }
  });

  enterWebsiteInput.setSelectionRange(0, enterWebsiteInput.value.length);

})(window);