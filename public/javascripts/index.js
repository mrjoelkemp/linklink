;(function (window, $) {

  function loadLink() {

  }

  function checkForLink() {
    // Look at the url params and pull out the website and top fields
    // if they exist, load that site and scroll the window to that top
  }

  /**
   * Generates the url to be shared for deep linking
   * @param  {[type]} website     [description]
   * @param  {[type]} topPosition [description]
   */
  function generateLink(website, topPosition) {
    var url = 'www.linker.com/?website=' + window.encodeURIComponent(website) + '&top=' + topPosition;
    $('.generated-link').val(url);
  }

  // function loadSite(website) {
  //   if (website.indexOf('http://') === -1) {
  //     website = 'http://' + website;
  //   }

  //   $.ajax({
  //     type: 'post',
  //     url: '/loadSite',
  //     dataType: 'html',
  //     data: {
  //       url: website
  //     },
  //     success: function (data) {
  //       console.log('Success')
  //       $('.content').html(data);
  //     }
  //   });

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
    // $('input').hide();
    // $('iframe').prop('src', website).show();
    // $('iframe').find('html').on('click', 'div', function () {
    //   generateLink(website, $(this).css('top'));
    // });
  // }

  $('.enter-website').keypress(function(event) {
    if (event.which === 13) {
      if (this.value) {
        loadSite(this.value);
        return false;
      }
    }
  });
})(window, window.jQuery);