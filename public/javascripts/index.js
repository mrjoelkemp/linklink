;(function (window) {
  'use strict';

  function loadSite(website) {
    window.location.href = '/?url=' + window.encodeURIComponent(formatWebsite(website));
  }

  function isUrl(str) {
    var urlRegex = /(((http(s?)(:\/\/))?([w]{3}\.)?)([a-z|0-9])+\.(com(\.au)?|org|me|net|ly|be|gl|info|(co(\.))?uk|ca|nz|tv)(\/[^\s]+)*)+/g;
    return urlRegex.test(str);
  }

  /**
   * Preprocess the website to make sure it's in a valid format
   * @return {String} - Formatted website
   */
  function formatWebsite(website) {
    if (website.indexOf('http://') === -1) {
      website = 'http://' + website;
    }

    return website;
  }

  document.querySelector('.enter-website').addEventListener('keypress', function (event) {
    var val;
    if (event.which === 13) {
      val = this.value.trim();

      if (val) {
        if (! isUrl(val)) {
          document.querySelector('.error').style.display = 'block';

        } else {
          document.querySelector('.error').style.display = 'none';

          loadSite(this.value.trim());
        }

        event.preventDefault();
      }
    }
  });
})(window);