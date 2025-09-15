const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

function formatCLP(value){
  return value.toLocaleString('es-CL',{style:'currency', currency:'CLP'});
}

function getCart(){
  return JSON.parse(localStorage.getItem('cart')||'[]');
}

function setCart(cart){
  localStorage.setItem('cart', JSON.stringify(cart));
  const count = cart.reduce((a,it)=>a+it.qty,0);
  const badge = document.getElementById('header-cart-count');
  if(badge) badge.textContent = count;
}

function addToCart(code){
  const prod = AppData.products.find(p=>p.code===code);
  if(!prod) return;
  const cart = getCart();
  const idx = cart.findIndex(i=>i.code===code);
  if(idx>-1) cart[idx].qty += 1; else cart.push({code,qty:1});
  setCart(cart);
  alert('Producto agregado al carrito');
}

function removeFromCart(code){
  const cart = getCart().filter(i=>i.code!==code);
  setCart(cart);
  renderCart();
}

function changeQty(code, delta){
  const cart = getCart();
  const idx = cart.findIndex(i=>i.code===code);
  if(idx>-1){
    cart[idx].qty = Math.max(1, cart[idx].qty + delta);
    setCart(cart);
    renderCart();
  }
}

(function renderFeatured(){
  const cont = document.getElementById('featured-products');
  if(!cont) return;
  const featured = AppData.products.slice(0,4);
  cont.innerHTML = featured.map(p=>`
    <article class="product-card card">
      <div class="product-card__img"><img src="${p.img}"></div>
      <h3 class="product-card__name">${p.name}</h3>
      <div class="product-card__meta">
        <span class="tag">${p.category}</span>
      </div>
      <div class="product-card__price">${formatCLP(p.price)}</div>
      <div class="product-card__actions">
        <a class="btn" href="product.html?code=${p.code}">Ver</a>
        <button class="btn btn--primary" onclick="addToCart('${p.code}')">Agregar</button>
      </div>
    </article>
  `).join('');
})();
