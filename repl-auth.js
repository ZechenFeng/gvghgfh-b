// This script automatically inserts a button whereever it is placed in the page.
// Use https://replit.com/public/js/repl-auth-v2.js to be able to customize the button and access user info.

(function () {
  // Util version
  var selem = document.currentScript;

  var button = document.createElement('button');
  button.className = 'replit-auth-button';
  button.textContent = 'Login With Replit';

  if (location.protocol !== 'https:') {
    var err = document.createElement('div');
    err.className = 'replit-auth-error';
    err.textContent = 'Replit auth requires https!';
    selem.parentNode.insertBefore(err, selem);
  }

  button.onclick = function () {
    window.addEventListener('message', authComplete);

    var h = 600;
    var w = 400;
    var left = screen.width / 2 - w / 2;
    var top = screen.height / 2 - h / 2;

    var authWindow = window.open(
      'https://replit.com/auth_with_repl_site?domain=' + location.host,
      '_blank',
      'modal =yes, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' +
        w +
        ', height=' +
        h +
        ', top=' +
        top +
        ', left=' +
        left,
    );

    function authComplete(e) {
      if (e.data !== 'auth_complete') {
        return;
      }

      window.removeEventListener('message', authComplete);

      authWindow.close();
      if (selem.attributes.authed.value) {
        eval(selem.attributes.authed.value);
      } else {
        location.reload();
      }
    }
  };

  selem.parentNode.insertBefore(button, selem);
})();
