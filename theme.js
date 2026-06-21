(function() {
  var toggle = document.getElementById('theme-toggle');
  var html = document.documentElement;

  var stored = localStorage.getItem('theme');
  if (stored === 'dark') {
    html.setAttribute('data-theme', 'dark');
    toggle.textContent = '\u2600\uFE0F';
  }

  toggle.addEventListener('click', function() {
    var current = html.getAttribute('data-theme');
    if (current === 'dark') {
      html.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      toggle.textContent = '\uD83C\uDF19';
    } else {
      html.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      toggle.textContent = '\u2600\uFE0F';
    }
  });
})();
