// Suppress errors and hydration mismatches caused by rogue browser extensions (e.g. extension ID eppiocemhmnlbhjplcgkofciiegomcon)
(function() {
  if (typeof window === 'undefined') return;

  function isExtensionError(item) {
    if (!item) return false;
    var str = String(
      (item && (item.stack || item.message || item.filename || item.reason || item)) || ''
    );
    return str.indexOf('chrome-extension:') !== -1 ||
           str.indexOf('moz-extension:') !== -1 ||
           str.indexOf('safari-extension:') !== -1 ||
           str.indexOf('eppiocemhmnlbhjplcgkofciiegomcon') !== -1 ||
           str.indexOf('M_ID') !== -1 ||
           str.indexOf('bis_skin_checked') !== -1 ||
           str.indexOf('bis_register') !== -1 ||
           str.indexOf('__processed_') !== -1;
  }

  // Intercept addEventListener so Next.js dev overlay listeners don't receive extension errors
  var origAdd = window.addEventListener;
  window.addEventListener = function(type, listener, options) {
    if (type === 'unhandledrejection' || type === 'error') {
      var wrapped = function(event) {
        var reason = event.reason || event.error || event;
        if (isExtensionError(reason) || isExtensionError(event)) {
          if (event.preventDefault) event.preventDefault();
          if (event.stopImmediatePropagation) event.stopImmediatePropagation();
          return;
        }
        if (typeof listener === 'function') {
          return listener.apply(this, arguments);
        } else if (listener && listener.handleEvent) {
          return listener.handleEvent(event);
        }
      };
      return origAdd.call(this, type, wrapped, options);
    }
    return origAdd.apply(this, arguments);
  };

  // Immediate capture listeners
  origAdd.call(window, 'error', function(e) {
    if (isExtensionError(e.error) || isExtensionError(e)) {
      if (e.preventDefault) e.preventDefault();
      if (e.stopImmediatePropagation) e.stopImmediatePropagation();
    }
  }, true);

  origAdd.call(window, 'unhandledrejection', function(e) {
    if (isExtensionError(e.reason) || isExtensionError(e)) {
      if (e.preventDefault) e.preventDefault();
      if (e.stopImmediatePropagation) e.stopImmediatePropagation();
    }
  }, true);

  // Filter console.error from being forwarded to Next.js dev overlay WebSocket
  var origConsoleError = console.error;
  console.error = function() {
    var args = Array.prototype.slice.call(arguments);
    var combined = args.map(function(a) {
      return String((a && (a.stack || a.message)) || a || '');
    }).join(' ');
    if (isExtensionError(combined)) {
      return;
    }
    return origConsoleError.apply(console, arguments);
  };

  // Automatically strip extension attributes (bis_skin_checked, __processed_) before React hydrates
  try {
    var stripExtensionAttrs = function(target) {
      if (!target || !target.attributes) return;
      var toRemove = [];
      for (var i = 0; i < target.attributes.length; i++) {
        var attr = target.attributes[i];
        if (attr && (attr.name.indexOf('bis_') === 0 || attr.name.indexOf('__processed_') === 0)) {
          toRemove.push(attr.name);
        }
      }
      for (var j = 0; j < toRemove.length; j++) {
        target.removeAttribute(toRemove[j]);
      }
    };

    var observer = new MutationObserver(function(mutations) {
      for (var i = 0; i < mutations.length; i++) {
        var m = mutations[i];
        if (m.type === 'attributes') {
          var name = m.attributeName;
          if (name && (name.indexOf('bis_') === 0 || name.indexOf('__processed_') === 0)) {
            m.target.removeAttribute(name);
          }
        } else if (m.type === 'childList') {
          for (var k = 0; k < m.addedNodes.length; k++) {
            stripExtensionAttrs(m.addedNodes[k]);
          }
        }
      }
    });

    if (document.documentElement) {
      observer.observe(document.documentElement, { attributes: true, subtree: true, childList: true });
    }
  } catch (e) {}
})();
