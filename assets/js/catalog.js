// Render catálogo + filtros
(function(){
  const grid = document.getElementById('catalog-grid');
  if(!grid) return;
  const typeSel = document.getElementById('filter-type');
  const searchInput = document.getElementById('search-input');

  function render(){
    const type = typeSel.value;
    const q = (searchInput.value||'').toLowerCase();
    const data = AppData.products.filter(p=>(!type || p.category===type) && (!q || p.name.toLowerCase().includes(q)));
    grid.innerHTML = data.map(p=>`
      <article class="product-card card">
        <div class="product-card__img">${p.emoji}</div>
        <h3 class="product-card__name">${p.name}</h3>
        <div class="product-card__meta"><span class="tag">${p.category}</span></div>
        <div class="product-card__price">${formatCLP(p.price)}</div>
        <div class="product-card__actions">
          <a class="btn" href="product.html?code=${p.code}">Ver</a>
          <button class="btn btn--primary" onclick="addToCart('${p.code}')">Agregar</button>
        </div>
      </article>
    `).join('');
  }
  typeSel.addEventListener('change', render);
  searchInput.addEventListener('input', render);
  render();
})();
