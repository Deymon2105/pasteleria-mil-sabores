document.addEventListener('DOMContentLoaded', ()=>{
  const btn = document.getElementById('track-btn');
  if(!btn) return;
  btn.addEventListener('click', ()=>{
    const code = $('#track-code').value.trim();
    const orders = JSON.parse(localStorage.getItem('orders')||'[]').concat(AppData.orders||[]);
    const order = orders.find(o=>o.code===code);
    if(!order){ $('#track-result').textContent = 'Pedido no encontrado.'; return; }
    $('#track-result').textContent = `Estado: ${order.status}`;
  });
});
