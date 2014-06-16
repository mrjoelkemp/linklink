;(function (window, $) {
  'use strict';

  /**
   * Generates the url to be shared for deep linking
   */
  function generateLink(website, topPosition) {
    var url = window.location.origin + '/?url=' + window.encodeURIComponent(website) + '&top=' + topPosition,
        $header = $('.linklink-header'),
        $container = $header.find('.generated-link'),
        $input = $container.find('input');

    $input.val(url);
    $header.find('.instructions').hide();
    $container.css('display', 'inline-block');
    $input.focus();
  }

  if (window.LL && window.LL.url && window.LL.top) {
    window.mixpanel.track('View', { 'type': 'Shared' });

    // All clicks should go through the rendered site
    $('.linklink-content').on('click', '*', function () {
      var $this = $(this),
          url   = window.LL.url,
          href  = $this.prop('href'),
          src   = $this.prop('src'),
          containsSite = function (str) {
            return str.indexOf(url) !== -1;
          },
          newLink;

      if (href && !containsSite(href)) {
        newLink = href.replace(window.location.origin, url);
        $this.prop('href', newLink);
      }

      if (src && !containsSite(src)) {
        newLink = src.replace(window.location.origin, url);
        $this.prop('src', newLink);
      }
    });

  } else {
    window.mixpanel.track('View', { 'type': 'create' });

    $('.linklink-content').on('click', '*', function (e) {
      var $this = $(this),
          top = $this.offset().top;

      // Stop the navigation of links
      // Not sure why prevent default doesn't cut it for links
      $this.prop('href', 'javascript:void(0)');

      generateLink(window.LL.url, top);
      e.stopPropagation();
      return false;
    });

    $('.linklink-header').slideDown('fast');
  }

})(window, window.jQuery);