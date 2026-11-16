// Formulario de contacto de Fernanda Tárraga (misma lógica que el de Mauricio).
// - Con formspreeEndpoint configurado: envío normal a Formspree (con reCAPTCHA si hay clave).
// - Sin endpoint: no envía; copia el mensaje al portapapeles para pegarlo en LinkedIn.
(function () {
  var cfg = window.PT_CONFIG || {};
  var MESSAGES = {
    es: { name: 'Escribí tu nombre.', email: 'Escribí un correo electrónico válido.', subject: 'Escribí el asunto.', message: 'Escribí tu mensaje.', captcha: tr().captcha, sending: 'Enviando…', copied: tr().copied, manual: tr().manual },
    en: { name: 'Please enter your name.', email: 'Please enter a valid email address.', subject: 'Please enter a subject.', message: 'Please enter your message.', captcha: 'Please tick “I’m not a robot”.', sending: 'Sending…', copied: 'Message copied to the clipboard. Paste it on LinkedIn so it reaches me.', manual: 'Could not copy automatically. Select and copy the message.' }
  };
  function tr() { return MESSAGES[document.documentElement.lang === 'en' ? 'en' : 'es']; }

  if (cfg.recaptchaSiteKey && cfg.formspreeEndpoint) {
    var s = document.createElement('script');
    s.src = 'https://www.google.com/recaptcha/api.js';
    s.async = true;
    s.defer = true;
    document.head.appendChild(s);
    document.querySelectorAll('.pt-captcha-field').forEach(function (box) {
      box.hidden = false;
      var d = box.querySelector('.pt-captcha');
      d.className = 'pt-captcha g-recaptcha';
      d.setAttribute('data-sitekey', cfg.recaptchaSiteKey);
    });
  }

  function validate(form) {
    var first = null;
    form.querySelectorAll('input[required], textarea[required]').forEach(function (el) {
      var err = document.getElementById(el.id + '-err');
      var ok = el.value.trim() !== '' && el.checkValidity();
      el.setAttribute('aria-invalid', ok ? 'false' : 'true');
      if (err) err.textContent = ok ? '' : (tr()[el.name] || '—');
      if (!ok && !first) first = el;
    });
    var cerr = form.querySelector('[data-captcha-err]');
    var field = form.querySelector('.pt-captcha-field');
    if (cerr && field && !field.hidden) {
      var token = form.querySelector('[name="g-recaptcha-response"]');
      var solved = !!(token && token.value);
      cerr.textContent = solved ? '' : tr().captcha;
      if (!solved && !first) first = cerr;
    }
    if (first && first.focus) first.focus();
    return !first;
  }

  document.querySelectorAll('form[data-pt-form]').forEach(function (form) {
    var status = form.querySelector('.pt-form-status');
    var output = form.querySelector('.pt-form-output');
    var preview = output.querySelector('textarea');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      status.textContent = '';
      output.hidden = true;
      if (!validate(form)) return;

      if (cfg.formspreeEndpoint) {
        form.action = cfg.formspreeEndpoint;
        form.method = 'post';
        status.textContent = tr().sending;
        form.submit();
        return;
      }

      var f = new FormData(form);
      var text = [f.get('subject').trim(), f.get('message').trim(), f.get('name').trim(), f.get('email').trim()].join('\n\n');
      var fallback = function () {
        output.hidden = false;
        preview.value = text;
        preview.focus();
        preview.select();
        status.textContent = tr().manual;
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          status.textContent = tr().copied;
        }, fallback);
      } else {
        fallback();
      }
    });
  });
})();
