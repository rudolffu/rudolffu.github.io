(function () {
  "use strict";

  function ready(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
    } else {
      callback();
    }
  }

  function copyText(text) {
    function fallbackCopy() {
      var field = document.createElement("textarea");
      field.value = text;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.left = "-9999px";
      document.body.appendChild(field);
      field.select();
      try {
        return document.execCommand("copy") ? Promise.resolve() : Promise.reject();
      } catch (error) {
        return Promise.reject(error);
      } finally {
        document.body.removeChild(field);
      }
    }

    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(fallbackCopy);
    }
    return fallbackCopy();
  }

  function installCodeButtons() {
    document.querySelectorAll(".markdown pre").forEach(function (pre) {
      var code = pre.querySelector("code");
      if (!code || pre.querySelector(".copy-code-button")) return;

      var button = document.createElement("button");
      button.type = "button";
      button.className = "copy-code-button";
      button.setAttribute("aria-label", "Copy code");
      button.textContent = "Copy";
      button.addEventListener("click", function () {
        copyText(code.innerText).then(function () {
          button.textContent = "Copied";
          button.classList.add("copied");
          window.setTimeout(function () {
            button.textContent = "Copy";
            button.classList.remove("copied");
          }, 1400);
        }).catch(function () {
          button.textContent = "Failed";
          window.setTimeout(function () { button.textContent = "Copy"; }, 1400);
        });
      });
      pre.appendChild(button);
    });
  }

  function installAnchorScrolling() {
    document.addEventListener("click", function (event) {
      var link = event.target.closest('a[href*="#"]');
      if (!link || !link.hash || link.pathname !== window.location.pathname) return;
      var target = document.getElementById(decodeURIComponent(link.hash.slice(1)));
      if (!target) return;
      event.preventDefault();
      window.history.pushState(null, "", link.hash);
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function installCarouselBehavior() {
    if (!window.jQuery) return;
    var $ = window.jQuery;
    $(".carousel").each(function () {
      var carousel = this;
      $(carousel).on("focusin", function () { $(carousel).carousel("pause"); });
      $(carousel).on("focusout", function () {
        if ($(carousel).attr("data-interval") !== "false") $(carousel).carousel("cycle");
      });
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        $(carousel).carousel("pause");
      }
    });
  }

  ready(function () {
    installCodeButtons();
    installAnchorScrolling();
    installCarouselBehavior();
  });
})();
