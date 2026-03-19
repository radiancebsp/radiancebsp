document.addEventListener('DOMContentLoaded', function () {
  // 1) sanity check that SDK loaded
  if (typeof emailjs === 'undefined') {
    console.error('EmailJS SDK not loaded (emailjs is undefined). Check network / CSP.');
    return;
  }

  // 2) initialize EmailJS - replace with your public key
  emailjs.init('LZr8veyjNjIE38a2W');

  // 3) get form element (ensure id matches)
  const form = document.getElementById('enquiry-form');
  if (!form) {
    console.error('Form element not found: #enquiry-form');
    return;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.textContent : 'Send';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }

    // basic phone validation
    const phone = (form.querySelector('[name="phone"]')?.value || '').trim();
    if (!/^[0-9]{7,15}$/.test(phone)) {
      alert('Enter a valid phone number (7–15 digits).');
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalText; }
      return;
    }

    // sendForm uses name attributes to map to template variables
    // NOTE: replace service/template IDs with yours
    emailjs.sendForm('service_726rbbk', 'template_dvz9slc', form)
      .then(function (response) {
        console.log('EmailJS success', response);
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalText; }
        alert('Enquiry sent — we will contact you soon!');
        form.reset();
      }, function (error) {
        console.error('EmailJS error (full):', error);
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalText; }
        alert('Could not send enquiry. See console (F12) for details.');
      });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  // 1) init (replace with your public key)
  if (typeof emailjs === 'undefined') {
    console.error('EmailJS SDK not loaded.');
    return;
  }
  emailjs.init('LZr8veyjNjIE38a2W');

  // 2) form hookup
  const form = document.getElementById('footer-signup-form');
  if (!form) { console.error('Form #footer-signup-form not found'); return; }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.textContent : 'Sign up';
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending...'; }

    const email = (form.email.value || '').trim();
    // simple validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Enter a valid email address.');
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalText; }
      return;
    }

    // sendForm uses the `name` attributes to map to template variables
    emailjs.sendForm('service_726rbbk', 'template_qrv6t8v', form)
      .then(function (resp) {
        console.log('EmailJS success', resp);
        alert('Thanks — you are signed up!');
        form.reset();
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalText; }
      }, function (err) {
        console.error('EmailJS error', err);
        alert('Signup failed. Check console for details.');
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalText; }
      });
  });
});