document.addEventListener('DOMContentLoaded', ()=>{
  const user = JSON.parse(localStorage.getItem('sessionUser')||'null');
  const box = document.getElementById('profile-data');
  if(!box){ return; }
  if(!user){ box.innerHTML = '<p>No has iniciado sesión.</p>'; return; }

  box.innerHTML = `
    <label class="form__field">Nombre
      <input id="pf-name" class="form__input" value="${user.name||''}">
    </label>
    <label class="form__field">Email
      <input id="pf-email" class="form__input" value="${user.email||''}">
    </label>
    <label class="form__field">Fecha nacimiento
      <input id="pf-birth" class="form__input" type="date" value="${user.birthdate||''}">
    </label>
  `;

  const orderBox = document.getElementById('order-list');
  const orders = JSON.parse(localStorage.getItem('orders')||'[]');
  orderBox.innerHTML = orders.map(o=>`
    <div class="card">
      <strong>${o.code}</strong> — ${o.status} — Total: ${o.total}
      <div><a href="tracking.html">Seguir</a></div>
    </div>
  `).join('');

  $('#save-profile').addEventListener('click', ()=>{
    const users = JSON.parse(localStorage.getItem('users')||'[]');
    const idx = users.findIndex(u=>u.email===user.email);
    const updated = { ...user, name:$('#pf-name').value, email:$('#pf-email').value, birthdate:$('#pf-birth').value };
    if(idx>-1) users[idx] = updated;
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('sessionUser', JSON.stringify(updated));
    alert('Perfil actualizado');
  });
});
