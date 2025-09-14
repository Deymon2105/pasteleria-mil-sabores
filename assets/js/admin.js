document.addEventListener('DOMContentLoaded', ()=>{
  const orders = (JSON.parse(localStorage.getItem('orders')||'[]')).concat(AppData.orders);
  const users = (JSON.parse(localStorage.getItem('users')||'[]')).concat([]);
  const kSales = document.getElementById('kpi-sales');
  if(kSales){
    const total = orders.reduce((a,o)=>{
      const n = Number(String(o.total).replace(/[^0-9]/g,''))||0;
      return a+n;
    },0);
    kSales.textContent = total.toLocaleString('es-CL',{style:'currency',currency:'CLP'});
  }
  const kOrders = document.getElementById('kpi-orders');
  if(kOrders) kOrders.textContent = orders.filter(o=>o.status!=='Entregado').length;
  const kUsers = document.getElementById('kpi-users');
  if(kUsers) kUsers.textContent = users.length;


  //uso de la tabla
  const tbl = document.getElementById('users-table');
  if(tbl && window.DataTable){
    const data = users.map(u=>[u.name,u.email,u.role,u.birthdate,(u.benefits||[]).join(', ')]);
    new DataTable(tbl, { data, pageLength: 5, searchable: true });
  }


  // gris de los productos para el admin
  const grid = document.getElementById('admin-products');
  if(grid){
    grid.innerHTML = AppData.products.map(p=>`
      <article class="product-card card">
        <div class="product-card__img">${p.emoji}</div>
        <h3 class="product-card__name">${p.name}</h3>
        <div class="product-card__price">${(p.price).toLocaleString('es-CL',{style:'currency',currency:'CLP'})}</div>
        <button class="btn">Editar</button>
      </article>
    `).join('');
  }


  // lista de las ordenes
  const list = document.getElementById('admin-orders');
  if(list){
    list.innerHTML = orders.map(o=>`
      <div class="card">
        <strong>${o.code}</strong> — ${o.status} — Total: ${o.total||''}
        <div class="form__field">
          <label>Actualizar estado</label>
          <select data-code="${o.code}" class="form__input js-status">
            ${['Preparación','En reparto','Entregado'].map(s=>`<option ${s===o.status?'selected':''}>${s}</option>`).join('')}
          </select>
        </div>
      </div>
    `).join('');
    list.addEventListener('change', (e)=>{
      if(e.target.classList.contains('js-status')){
        const code = e.target.getAttribute('data-code');
        const ordersLS = JSON.parse(localStorage.getItem('orders')||'[]');
        const idx = ordersLS.findIndex(x=>x.code===code);
        if(idx>-1){ ordersLS[idx].status = e.target.value; localStorage.setItem('orders', JSON.stringify(ordersLS)); }
        alert('Estado actualizado');
      }
    });
  }
});
