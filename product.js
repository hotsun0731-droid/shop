let selectedSize = null;
let selectedColor = null;
let selectedQty = 1;
let currentProduct = null;

function renderProductDetail(product) {
  currentProduct = product;
  document.title = `${product.name} — MAISON`;

  const priceHtml = product.originalPrice
    ? `<span class="original">${formatPrice(product.originalPrice)}</span><span class="sale">${formatPrice(product.price)}</span>`
    : `<span>${formatPrice(product.price)}</span>`;

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const images = product.images || [product.image];

  document.getElementById('breadcrumb-category').textContent = product.categoryLabel;
  document.getElementById('breadcrumb-name').textContent = product.name;
  document.getElementById('tab-description-text').textContent = product.description;

  document.getElementById('product-specs').innerHTML = `
    <div><dt>소재</dt><dd>${product.material}</dd></div>
    <div><dt>카테고리</dt><dd>${product.categoryLabel}</dd></div>
    <div><dt>배송</dt><dd>5만원 이상 무료배송</dd></div>
  `;

  document.getElementById('product-detail').innerHTML = `
    <div class="product-gallery">
      <div class="gallery-main">
        <img src="${images[0]}" alt="${product.name}" id="gallery-main-img">
      </div>
      ${images.length > 1 ? `
        <div class="gallery-thumbs">
          ${images.map((img, i) => `
            <button class="gallery-thumb ${i === 0 ? 'active' : ''}" data-src="${img}" aria-label="이미지 ${i + 1}">
              <img src="${img.replace('w=800', 'w=200')}" alt="">
            </button>
          `).join('')}
        </div>
      ` : ''}
    </div>

    <div class="product-detail-info">
      ${product.badge ? `<span class="detail-badge">${product.badge}</span>` : ''}
      <p class="product-category">${product.categoryLabel}</p>
      <h1>${product.name}</h1>
      <div class="detail-price">
        ${priceHtml}
        ${discount ? `<span class="discount-rate">${discount}% OFF</span>` : ''}
      </div>
      <p class="detail-description">${product.description}</p>

      <div class="option-group">
        <label>사이즈</label>
        <div class="option-buttons" id="size-options">
          ${product.sizes.map(size => `
            <button class="option-btn" data-size="${size}">${size}</button>
          `).join('')}
        </div>
      </div>

      <div class="option-group">
        <label>컬러</label>
        <div class="option-buttons" id="color-options">
          ${product.colors.map(color => `
            <button class="option-btn" data-color="${color}">${color}</button>
          `).join('')}
        </div>
      </div>

      <div class="option-group">
        <label>수량</label>
        <div class="qty-selector">
          <button class="qty-btn" id="qty-minus">−</button>
          <span id="qty-value">1</span>
          <button class="qty-btn" id="qty-plus">+</button>
        </div>
      </div>

      <div class="detail-actions">
        <button class="btn btn-primary btn-full" id="add-to-cart-btn">장바구니 담기</button>
        <button class="detail-wishlist ${wishlist.has(product.id) ? 'active' : ''}" id="detail-wishlist" aria-label="위시리스트">♡</button>
      </div>

      <ul class="detail-trust">
        <li>✦ 무료 반품 · 7일 이내</li>
        <li>✦ 프리미엄 포장</li>
        <li>✦ 당일 출고 (평일 14시 전)</li>
      </ul>
    </div>
  `;

  bindDetailEvents(product);
}

function bindDetailEvents(product) {
  document.querySelectorAll('.gallery-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      document.getElementById('gallery-main-img').src = thumb.dataset.src;
    });
  });

  document.querySelectorAll('#size-options .option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#size-options .option-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedSize = btn.dataset.size;
    });
  });

  document.querySelectorAll('#color-options .option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#color-options .option-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedColor = btn.dataset.color;
    });
  });

  document.getElementById('qty-minus').addEventListener('click', () => {
    if (selectedQty > 1) {
      selectedQty--;
      document.getElementById('qty-value').textContent = selectedQty;
    }
  });

  document.getElementById('qty-plus').addEventListener('click', () => {
    if (selectedQty < 10) {
      selectedQty++;
      document.getElementById('qty-value').textContent = selectedQty;
    }
  });

  document.getElementById('add-to-cart-btn').addEventListener('click', () => {
    if (!selectedSize) {
      showToast('사이즈를 선택해 주세요');
      return;
    }
    if (!selectedColor) {
      showToast('컬러를 선택해 주세요');
      return;
    }
    addToCart(product.id, selectedQty);
  });

  document.getElementById('detail-wishlist').addEventListener('click', () => {
    toggleWishlist(product.id, document.getElementById('detail-wishlist'));
  });
}

function renderRelated(product) {
  const container = document.getElementById('related-products');
  const related = getRelatedProducts(product);

  if (related.length === 0) {
    document.querySelector('.related-products').style.display = 'none';
    return;
  }

  related.forEach(p => {
    container.appendChild(createProductCard(p));
  });
}

function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const product = getProductById(id);

  updateCart();
  initCartEvents();
  initHeader();
  initTabs();

  if (!product) {
    document.getElementById('product-detail').innerHTML = `
      <div class="product-not-found">
        <h2>상품을 찾을 수 없습니다</h2>
        <p>요청하신 상품이 존재하지 않거나 판매가 종료되었습니다.</p>
        <a href="index.html" class="btn btn-primary">쇼핑 계속하기</a>
      </div>
    `;
    document.querySelector('.product-tabs').style.display = 'none';
    document.querySelector('.related-products').style.display = 'none';
    return;
  }

  renderProductDetail(product);
  renderRelated(product);
});
