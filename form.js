(function() {
  var form = document.getElementById('medicine-form');
  var toast = document.getElementById('toast');
  if (!form || !toast) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var data = new URLSearchParams(new FormData(form));
    fetch('/api/medicines', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: data
    })
    .then(function(r) { return r.json(); })
    .then(function(resp) {
      if (resp.error) {
        showToast(resp.error, true);
      } else {
        showToast(resp.name + ' added successfully!', false);
        form.reset();
      }
    })
    .catch(function() {
      showToast('An error occurred', true);
    });
  });

  function showToast(msg, isError) {
    toast.textContent = msg;
    toast.className = 'toast show' + (isError ? ' error' : '');
    setTimeout(function() {
      toast.classList.remove('show');
    }, 3000);
  }
})();
