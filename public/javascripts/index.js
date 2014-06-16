;(function (window, $) {
  'use strict';

  function loadSite(website) {
    window.location.href = '/loadSite?url=' + window.encodeURIComponent(formatWebsite(website));
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

  $('.enter-website').keypress(function(event) {
    if (event.which === 13) {
      if (this.value) {
        loadSite(this.value);
        return false;
      }
    }
  });
})(window, window.jQuery);