$(function() {
    // Initialize smooth scroll defaults
    $.smoothScroll({
      // Offset from the top when scrolling
      offset: 0,
      // Scroll direction: 'top' or 'left'
      direction: 'top',
      // Target element to scroll (null for default)
      scrollTarget: null,
      // Callback before scrolling starts
      beforeScroll: function() {},
      // Callback after scrolling finishes
      afterScroll: function() {},
      // Easing effect
      easing: 'swing',
      // Scrolling speed (ms)
      speed: 700,
      // "Auto" acceleration coefficient
      autoCoefficent: 2
    });
  
    // Bind hashchange event to trigger smooth scroll
    $(window).on('hashchange', function() {
      // Determine offset from body data attribute (if set)
      var offsetValue = $("body").attr("data-offset") ? -parseInt($("body").attr("data-offset"), 10) : 0;
      $.smoothScroll({
        // Replace any '#/' with '#' to get the correct target
        offset: offsetValue,
        scrollTarget: decodeURI(location.hash.replace(/^\#\/?/, '#'))
      });
    });
  
    // Bind click event for anchor links that contain a hash
    $('a[href*="#"]').on('click', function(event) {
      var hash = this.hash.replace(/^#/, '');
      if (this.pathname === location.pathname && hash) {
        event.preventDefault();
        // Update location hash using '#/' prefix to trigger smooth scroll
        location.hash = '#/' + hash;
      }
    });
  
    // Trigger hashchange event on page load if a hash is present in the URL
    if (location.hash) {
      $(window).trigger('hashchange');
    }
  });
  