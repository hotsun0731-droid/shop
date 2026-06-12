let cart = JSON.parse(localStorage.getItem('maison-cart') || '[]');
let wishlist = new Set(JSON.parse(localStorage.getItem('maison-wishlist') || '[]'));

function saveCart() {
  localStorage.setItem('maison-cart', JSON.stringify(cart));
}

function saveWishlist() {
  localStorage.setItem('maison-wishlist', JSON.stringify([...wishlist]));
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

function addToCart(productId, qty = 1) {
  const product = getProductById(productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, qty });
  }

  saveCart();
  updateCart();
  showToast(`${product.name}이(가) 장바구니에 담겼습니다`);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCart();
}

function updateQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
  } else {
    saveCart();
    updateCart();
  }
}

function updateCart() {
  const countEl = document.querySelector('.cart-count');
  const itemsEl = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  const checkoutBtn = document.querySelector('.cart-footer .btn-primary');

  if (!countEl) return;

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  countEl.textContent = totalQty;

  if (!itemsEl) return;

  if (cart.length === 0) {
    itemsEl.innerHTML = '<p class="cart-empty">장바구니가 비어 있습니다.</p>';
    if (checkoutBtn) checkoutBtn.disabled = true;
  } else {
    itemsEl.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p class="price">${formatPrice(item.price)}</p>
          <div class="cart-item-actions">
            <button class="qty-btn" data-id="${item.id}" data-delta="-1">−</button>
            <span class="cart-item-qty">${item.qty}</span>
            <button class="qty-btn" data-id="${item.id}" data-delta="1">+</button>
            <button class="cart-item-remove" data-id="${item.id}">삭제</button>
          </div>
        </div>
      </div>
    `).join('');
    if (checkoutBtn) checkoutBtn.disabled = false;
  }

  if (totalEl) totalEl.textContent = formatPrice(totalPrice);
}

function openCart() {
  const drawer = document.querySelector('.cart-drawer');
  if (!drawer) return;
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  const drawer = document.querySelector('.cart-drawer');
  if (!drawer) return;
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function toggleWishlist(productId, btn) {
  if (wishlist.has(productId)) {
    wishlist.delete(productId);
    if (btn) btn.classList.remove('active');
    showToast('위시리스트에서 제거되었습니다');
  } else {
    wishlist.add(productId);
    if (btn) btn.classList.add('active');
    showToast('위시리스트에 추가되었습니다');
  }
  saveWishlist();
}

function initCartEvents() {
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('product-quick-add')) {
      e.preventDefault();
      e.stopPropagation();
      addToCart(Number(e.target.dataset.id));
    }

    if (e.target.classList.contains('product-wishlist')) {
      e.preventDefault();
      e.stopPropagation();
      toggleWishlist(Number(e.target.dataset.id), e.target);
    }

    if (e.target.classList.contains('qty-btn')) {
      updateQty(Number(e.target.dataset.id), Number(e.target.dataset.delta));
    }

    if (e.target.classList.contains('cart-item-remove')) {
      removeFromCart(Number(e.target.dataset.id));
    }
  });

  const cartBtn = document.querySelector('.cart-btn');
  const cartClose = document.querySelector('.cart-close');
  const cartOverlay = document.querySelector('.cart-overlay');

  if (cartBtn) cartBtn.addEventListener('click', openCart);
  if (cartClose) cartClose.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
}

function initHeader() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  if (!menuToggle || !nav) return;

  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function createProductCard(product) {
  const card = document.createElement('article');
  card.className = 'product-card';
  card.dataset.category = product.category;
  card.dataset.id = product.id;

  const priceHtml = product.originalPrice
    ? `<span class="original">${formatPrice(product.originalPrice)}</span>${formatPrice(product.price)}`
    : formatPrice(product.price);

  card.innerHTML = `
    <div class="product-image-wrap">
      ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
      <button class="product-wishlist ${wishlist.has(product.id) ? 'active' : ''}" data-id="${product.id}" aria-label="위시리스트">♡</button>
      <img src="${product.image.replace('w=800', 'w=500')}" alt="${product.name}" loading="lazy">
      <button class="product-quick-add" data-id="${product.id}">장바구니 담기</button>
    </div>
    <div class="product-info">
      <p class="product-category">${product.categoryLabel}</p>
      <h3>${product.name}</h3>
      <p class="product-price">${priceHtml}</p>
    </div>
  `;

  card.addEventListener('click', (e) => {
    if (e.target.closest('.product-wishlist, .product-quick-add')) return;
    window.location.href = `product.html?id=${product.id}`;
  });

  return card;
}
