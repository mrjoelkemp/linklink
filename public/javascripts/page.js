;(function (window, $) {
  'use strict';

  // Determine the proper flow for the user
  if (window.LL && window.LL.url && (window.LL.top || window.LL.path)) {
    viewLinkLink();

  } else {
    createLinkLink();
  }

  function viewLinkLink() {
    window.mixpanel.track('View-a-Link', { url: window.LL.url });

    highlightElement(window.LL.element);

    $('.linklink-credits')
      .fadeIn('slow')
      .find('a')
        .click(function () {
          window.mixpanel.track('Clickthrough', { 'type': 'Shared' });
        });

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
  }

  function createLinkLink() {
    window.mixpanel.track('View-to-Create', { url: window.LL.url });
    $('.linklink-content').css('cursor', 'pointer');

    $('.linklink-content').on('click', '*', function (e) {
      var $this = $(this),
          path = getXPath(this),
          url;

      // Stop the navigation of links. Not sure why prevent default doesn't cut it for links
      $this.prop('href', 'javascript:void(0)');

      url = generateLink(window.LL.url, path);

      $('.generated-link')
      .find('a')
        .prop('href', url)
        .click(function () {
          $('.linklink-header').find('input').focus();
        });

      e.stopPropagation();
      return false;
    });

    $('.linklink-header').slideDown('fast');
  }

  /**
   * Generates the url to be shared for deep linking
   * and sets up the input for sharing
   * @returns {String} The generated url
   */
  function generateLink(website, path) {
    var url = window.location.origin +
              '/?url=' + window.encodeURIComponent(website) +
              '&path=' + window.encodeURIComponent(path),
        $header = $('.linklink-header'),
        $container = $header.find('.generated-link'),
        $input = $container.find('input');

    $input.val(url);
    $header.find('.instructions').hide();
    $container.css('display', 'inline-block');
    $input.focus();
    $input[0].setSelectionRange(0, $input.val().length)

    return url;
  }

  /**
   * Returns the XPath representation of the path from the document to the given element.
   * @param  {DOM Node} element
   * @return {String}
   */
  function getXPath(element) {
    var val = element.value,
        xpath = '';

    while (element && element.nodeType === 1) {
      var id = $(element.parentNode).children(element.tagName).index(element) + 1;

      id = id > 1 ? '[' + id + ']' : '';

      xpath = '/' + element.tagName.toLowerCase() + id + xpath;

      element = element.parentNode;
    }

    return xpath;
  }

  /**
   * Adds a flash to the element to indicate what was clicked
   * @param  {DOM Node} element
   */
  function highlightElement(element) {
    if (!element) return;
    var $element = $(element);

    $element.addClass('highlight-clicked-item');

    window.setTimeout(function() {
      $element.removeClass('highlight-clicked-item')
    }, 1500);
  }
})(window, window.jQuery);