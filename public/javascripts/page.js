;(function (window, $) {

  /**
   * Generates the url to be shared for deep linking
   * @param  {[type]} website     [description]
   * @param  {[type]} topPosition [description]
   */
  function generateLink(website, topPosition) {
    var url = '/?url=' + window.encodeURIComponent(website) + '&top=' + topPosition;
    $('.generated-link').val(url).fadeIn().focus();
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

  $('.linklink-content').on('click', 'a', function (e) {
    var $this = $(this),
        top = $this.position().top;

    // Stop the navigation
    // Prevent default and stopPropagation don't work
    $this.prop('href', 'javascript:void(0)');

    generateLink(getUrlVars()['url'], top);
  });

})(window, window.jQuery);