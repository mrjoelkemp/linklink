;(function (window, $) {
  'use strict';
  /**
   * Generates the url to be shared for deep linking
   */
  function generateLink(website, topPosition) {
    var url = window.location.host + '/?url=' + window.encodeURIComponent(website) + '&top=' + topPosition,
        $container = $('.generated-link'),
        $input = $container.find('input');

    $input.val(url);
    $container.fadeIn();
    $input.focus();
  }

  // Read a page's GET URL variables and return them as an associative array.
  function getUrlVars() {
    var vars = [], hash,
        hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

    for(var i = 0; i < hashes.length; i++) {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  }

  $('.linklink-content').on('click', '*', function (e) {
    var $this = $(this),
        top = $this.offset().top;

    // Stop the navigation of links
    $this.prop('href', 'javascript:void(0)');

    generateLink(getUrlVars()['url'], top);
    e.stopPropagation();
    return false;
  });

})(window, window.jQuery);