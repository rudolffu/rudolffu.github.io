if (window.jQuery) {
  jQuery(function($) {
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

    function copyText(text) {
      function fallbackCopy() {
        var textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.setAttribute('readonly', '');
        textArea.style.position = 'absolute';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();

        return new Promise(function(resolve, reject) {
          try {
            document.execCommand('copy') ? resolve() : reject();
          } catch (error) {
            reject(error);
          } finally {
            document.body.removeChild(textArea);
          }
        });
      }

      if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text).catch(fallbackCopy);
      }

      return fallbackCopy();
    }

    $('.markdown pre').each(function() {
      var pre = this;
      var code = pre.querySelector('code');
      if (!code || pre.querySelector('.copy-code-button')) {
        return;
      }

      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'copy-code-button';
      button.setAttribute('aria-label', 'Copy code');
      button.textContent = 'Copy';

      button.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();

        copyText(code.innerText).then(function() {
          button.textContent = 'Copied';
          button.classList.add('copied');
          window.setTimeout(function() {
            button.textContent = 'Copy';
            button.classList.remove('copied');
          }, 1400);
        }).catch(function() {
          button.textContent = 'Failed';
          window.setTimeout(function() {
            button.textContent = 'Copy';
          }, 1400);
        });
      });

      pre.appendChild(button);
    });
  });
}

(function() {
  function onReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  }

  function copyCodeText(text) {
    function fallbackCopy() {
      var textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.setAttribute('readonly', '');
      textArea.style.position = 'absolute';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.select();

      return new Promise(function(resolve, reject) {
        try {
          document.execCommand('copy') ? resolve() : reject();
        } catch (error) {
          reject(error);
        } finally {
          document.body.removeChild(textArea);
        }
      });
    }

    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(fallbackCopy);
    }

    return fallbackCopy();
  }

  onReady(function() {
    document.querySelectorAll('.markdown pre').forEach(function(pre) {
      var code = pre.querySelector('code');
      if (!code || pre.querySelector('.copy-code-button')) {
        return;
      }

      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'copy-code-button';
      button.setAttribute('aria-label', 'Copy code');
      button.textContent = 'Copy';

      button.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();

        copyCodeText(code.innerText).then(function() {
          button.textContent = 'Copied';
          button.classList.add('copied');
          window.setTimeout(function() {
            button.textContent = 'Copy';
            button.classList.remove('copied');
          }, 1400);
        }).catch(function() {
          button.textContent = 'Failed';
          window.setTimeout(function() {
            button.textContent = 'Copy';
          }, 1400);
        });
      });

      pre.appendChild(button);
    });
  });
})();
