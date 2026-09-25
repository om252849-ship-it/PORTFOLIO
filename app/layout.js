import './globals.css';

export const metadata = {
  title: 'Om Kumar — Computer Science · Cybersecurity · Creative Design',
  description: 'Portfolio of Om Kumar — Computer Science graduate with expertise in cybersecurity and creative problem-solving. Building secure digital experiences with creative precision.',
  keywords: ['Om Kumar', 'Portfolio', 'Cybersecurity', 'Web Developer', 'Creative Design', 'Computer Science', 'Jamshedpur'],
  authors: [{ name: 'Om Kumar' }],
  creator: 'Om Kumar',
  openGraph: {
    title: 'Om Kumar — Portfolio',
    description: 'Computer Science graduate with expertise in cybersecurity and creative design.',
    url: 'https://omkumar.vercel.app',
    siteName: 'Om Kumar Portfolio',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Om Kumar — Portfolio',
    description: 'Computer Science graduate with expertise in cybersecurity and creative design.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window === 'undefined') return;

                function isIgnored(item) {
                  if (!item) return false;
                  var str = '';
                  try {
                    if (typeof item === 'string') str = item;
                    else if (item instanceof Error) str = (item.message || '') + ' ' + (item.stack || '');
                    else str = JSON.stringify(item);
                  } catch (e) {
                    str = String((item && (item.stack || item.message)) || item || '');
                  }
                  return str.indexOf('bis_skin_checked') !== -1 ||
                         str.indexOf('bis_register') !== -1 ||
                         str.indexOf('bis_') !== -1 ||
                         str.indexOf('chrome-extension:') !== -1 ||
                         str.indexOf('moz-extension:') !== -1 ||
                         str.indexOf('safari-extension:') !== -1 ||
                         str.indexOf('eppiocemhmnlbhjplcgkofciiegomcon') !== -1 ||
                         str.indexOf('__processed_') !== -1;
                }

                // Intercept console.error before Next.js or React dev overlays attach
                var origConsoleError = console.error;
                console.error = function() {
                  var args = Array.prototype.slice.call(arguments);
                  for (var i = 0; i < args.length; i++) {
                    if (isIgnored(args[i])) return;
                  }
                  try {
                    var serialized = JSON.stringify(args);
                    if (serialized && isIgnored(serialized)) return;
                  } catch (e) {}
                  var combined = args.map(function(a) {
                    return String((a && (a.stack || a.message)) || a || '');
                  }).join(' ');
                  if (isIgnored(combined)) return;
                  return origConsoleError.apply(console, arguments);
                };

                // Intercept window error and rejection listeners
                var origAdd = window.addEventListener;
                window.addEventListener = function(type, listener, options) {
                  if (type === 'unhandledrejection' || type === 'error') {
                    var wrapped = function(event) {
                      var reason = event.reason || event.error || event;
                      if (isIgnored(reason) || isIgnored(event)) {
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

                origAdd.call(window, 'error', function(e) {
                  if (isIgnored(e.error) || isIgnored(e)) {
                    if (e.preventDefault) e.preventDefault();
                    if (e.stopImmediatePropagation) e.stopImmediatePropagation();
                  }
                }, true);

                origAdd.call(window, 'unhandledrejection', function(e) {
                  if (isIgnored(e.reason) || isIgnored(e)) {
                    if (e.preventDefault) e.preventDefault();
                    if (e.stopImmediatePropagation) e.stopImmediatePropagation();
                  }
                }, true);

                // Strip extension attributes dynamically to prevent hydration mismatch
                try {
                  var observer = new MutationObserver(function(mutations) {
                    for (var i = 0; i < mutations.length; i++) {
                      var m = mutations[i];
                      if (m.type === 'attributes') {
                        var name = m.attributeName;
                        if (name && (name.indexOf('bis_') === 0 || name.indexOf('__processed_') === 0)) {
                          m.target.removeAttribute(name);
                        }
                      }
                    }
                  });
                  if (document.documentElement) {
                    observer.observe(document.documentElement, { attributes: true, subtree: true });
                  }
                } catch (e) {}

                // Synchronous pre-render theme detection
                try {
                  var stored = localStorage.getItem('om_theme');
                  var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var theme = (stored === 'dark' || stored === 'light') ? stored : (systemDark ? 'dark' : 'light');
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
