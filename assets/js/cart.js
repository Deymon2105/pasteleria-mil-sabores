// Lógica de carrito + descuentos según requisitos
function calcAge(birthdateStr){
  if(!birthdateStr) return 0;
  const d = new Date(birthdateStr);
  const t = new Date();
  let age = t.getFullYear()-d.getFullYear();
  const m = t.getMonth()-d.getMonth();
  if(m<0 || (m===0 && t.getDate()<d.getDate())) age--;
  return age;
}

function computeDiscounts(subtotal, code, birthdate, email){
  let discount = 0;
  // 50% para > 50 años
  const age = calcAge(birthdate);
  if(age >= 50){
    discount = Math.max(discount, subtotal*0.5);
  }
  // 10% de por vida con FELICES50
  if((code||'').trim().toUpperCase()==='FELICES50'){
    discount = Math.max(discount, subtotal*0.10);
  }
  // Torta gratis para estudiantes DUOC en cumpleaños (si hay al menos 1 torta)
  const isDuoc = (email||'').toLowerCase().endsWith('@duoc.cl');
  const today = new Date();
  const bd = new Date(birthdate||today);
  const isBirthday = (bd.getDate()===today.getDate() && bd.getMonth()===today.getMonth());
  if(isDuoc && isBirthday){
    // Encuentra producto tipo torta con mayor precio para descontar
    const cart = getCart();
    const products = cart.map(i=>{
      const p = AppData.products.find(x=>x.code===i.code);
      return {...p, qty:i.qty};
    });
    const isCake = p => /Tortas/.test(p.category);
    const maxCake = products.filter(isCake).sort((a,b)=>b.price-a.price)[0];
    if(maxCake){
      discount = Math.max(discount, maxCake.price); // 1 torta gratis
    }
  }
  return Math.min(discount, subtotal);
}

function renderCart(){
  const container = document.getElementById('cart-items');
  if(!container) return;
  const cart = getCart();
  if(cart.length===0){
    container.innerHTML = '<p>Tu carrito está vacío.</p>';
    $('#subtotal').textContent = formatCLP(0);
    $('#discount').textContent = formatCLP(0);
    $('#total').textContent = formatCLP(0);
    return;
  }
  const products = cart.map(i=>{
    const p = AppData.products.find(x=>x.code===i.code);
    return {...p, qty:i.qty};
  });
  container.innerHTML = products.map(p=>`
    <div class="cart__item">
      <div class="cart__thumb"><img src="${p.img}"></div>
      <div class="cart__info">
        <div class="cart__name">${p.name}</div>
        <div class="cart__meta"><span class="tag">${p.category}</span> · ${formatCLP(p.price)}</div>
        <div class="quantity">
          <button class="quantity__btn" onclick="changeQty('${p.code}',-1)">-</button>
          <span class="quantity__value">${p.qty}</span>
          <button class="quantity__btn" onclick="changeQty('${p.code}',1)">+</button>
        </div>
      </div>
      <div class="cart__amount">${formatCLP(p.price*p.qty)}</div>
      <button class="quantity__btn" onclick="removeFromCart('${p.code}')" title="Quitar">✖</button>
    </div>
  `).join('');
  const subtotal = products.reduce((a,p)=>a+p.price*p.qty,0);
  const discount = computeDiscounts(subtotal, $('#discount-code').value, $('#birthdate').value, $('#email').value);
  const total = subtotal - discount;
  $('#subtotal').textContent = formatCLP(subtotal);
  $('#discount').textContent = formatCLP(discount);
  $('#total').textContent = formatCLP(total);
}

['discount-code','birthdate','email'].forEach(id=>{
  const el = document.getElementById(id);
  if(el) el.addEventListener('input', renderCart);
});

document.addEventListener('DOMContentLoaded', ()=>{
  renderCart();
  const checkout = document.getElementById('checkout-btn');
  if(checkout){
    checkout.addEventListener('click', ()=>{
      const cart = getCart();
      if(cart.length===0) return;
      const orderCode = 'PED-' + (Math.random()*10000|0).toString().padStart(4,'0');
      const total = $('#total').textContent;
      // Guardar "pedido" simple
      const orders = JSON.parse(localStorage.getItem('orders')||'[]');
      orders.push({code:orderCode,status:'Preparación',created:new Date().toISOString(),total});
      localStorage.setItem('orders', JSON.stringify(orders));
      setCart([]);
      $('#checkout-msg').textContent = `Pedido ${orderCode} confirmado. ¡Gracias!`;
      renderCart();
    });
  }
});
