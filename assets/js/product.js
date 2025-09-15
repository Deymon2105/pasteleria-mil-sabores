// Render detalle de producto
(function(){
  const el = document.getElementById('product-detail');
  if(!el) return;
  const params = new URLSearchParams(location.search);
  const code = params.get('code');
  const p = AppData.products.find(x=>x.code===code) || AppData.products[0];
  el.innerHTML = `
    <div class="product-detail__img card"><img src="${p.img}"></div>
    <div class="product-detail__info card">
      <h1 class="product-detail__name">${p.name}</h1>
      <p class="product-detail__desc">${p.desc}</p>
      <p class="product-detail__meta"><span class="tag">${p.category}</span></p>
      <p class="product-detail__price">${formatCLP(p.price)}</p>
      <div class="product-card__actions">
        <button class="btn btn--primary" onclick="addToCart('${p.code}')">Agregar al carrito</button>
      </div>
      <div class="form__field">
        <label>Mensaje para la torta (opcional)</label>
        <input class="form__input" placeholder="¡Feliz Cumpleaños, Ana!">
      </div>
    </div>
  `;
})();
