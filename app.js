let currentCategory = 'all';
let priceMin = 0;
let priceMax = Infinity;

function getFilteredProducts() {
  return products.filter(p => {
    const categoryMatch = currentCategory === 'all' || p.category === currentCategory;
    const priceMatch = p.price >= priceMin && p.price <= priceMax;
    return categoryMatch && priceMatch;
  });
}

function renderProducts() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const filtered = getFilteredProducts();

  if (filtered.length === 0) {
    grid.innerHTML = '<p class="product-empty">해당 가격대의 상품이 없습니다.</p>';
    return;
  }

  filtered.forEach(product => {
    grid.appendChild(createProductCard(product));
  });
}

function setCategoryFilter(category) {
  currentCategory = category;
  document.querySelectorAll('.filter-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.filter === category);
  });
  renderProducts();
}

function updatePriceRangeTrack(minVal, maxVal, rangeMin, rangeMax) {
  const track = document.getElementById('price-slider-range');
  if (!track) return;

  const span = rangeMax - rangeMin;
  const left = ((minVal - rangeMin) / span) * 100;
  const width = ((maxVal - minVal) / span) * 100;

  track.style.left = `${left}%`;
  track.style.width = `${width}%`;
}

function updatePriceDisplay(minVal, maxVal) {
  const display = document.getElementById('price-range-display');
  if (display) {
    display.textContent = `${formatPrice(minVal)} — ${formatPrice(maxVal)}`;
  }
}

function initPriceFilter() {
  const minInput = document.getElementById('price-min');
  const maxInput = document.getElementById('price-max');
  if (!minInput || !maxInput) return;

  const range = getPriceRange();

  minInput.min = range.min;
  minInput.max = range.max;
  minInput.step = range.step;
  minInput.value = range.min;

  maxInput.min = range.min;
  maxInput.max = range.max;
  maxInput.step = range.step;
  maxInput.value = range.max;

  priceMin = range.min;
  priceMax = range.max;

  function syncSlider(changedInput) {
    let minVal = Number(minInput.value);
    let maxVal = Number(maxInput.value);

    if (minVal > maxVal - range.step) {
      if (changedInput === minInput) {
        minVal = maxVal - range.step;
        minInput.value = minVal;
      } else {
        maxVal = minVal + range.step;
        maxInput.value = maxVal;
      }
    }

    priceMin = minVal;
    priceMax = maxVal;

    updatePriceRangeTrack(minVal, maxVal, range.min, range.max);
    updatePriceDisplay(minVal, maxVal);
    renderProducts();
  }

  minInput.addEventListener('input', () => syncSlider(minInput));
  maxInput.addEventListener('input', () => syncSlider(maxInput));

  updatePriceRangeTrack(range.min, range.max, range.min, range.max);
  updatePriceDisplay(range.min, range.max);
}

function renderFeatured() {
  const container = document.getElementById('featured-products');
  if (!container) return;
  container.innerHTML = '';

  products
    .filter(p => p.featured)
    .forEach(product => {
      container.appendChild(createProductCard(product));
    });
}

document.addEventListener('DOMContentLoaded', () => {
  updateCart();
  initCartEvents();
  initHeader();
  initPriceFilter();
  renderFeatured();
  renderProducts();

  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      setCategoryFilter(tab.dataset.filter);
    });
  });

  document.querySelectorAll('.category-card[data-filter]').forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      setCategoryFilter(card.dataset.filter);
      document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    });
  });

  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('뉴스레터 구독이 완료되었습니다. 감사합니다!');
      e.target.reset();
    });
  }
});
