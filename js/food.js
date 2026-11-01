/**
 * NDHU Hub - Campus Food & Dish Reviews Controller
 * Restaurant directory with filter tags (Near Main Gate, Zhixue Street, Shoufeng Town),
 * Review submission form (Restaurant Name, Recommended Dish, Rating 1-5, Price Range, Student Review),
 * and visual badges ("Campus Food Review" & "Must Try Dish").
 * No personal names or student IDs used.
 */

const FoodController = {
  currentTag: 'All',
  searchQuery: '',
  selectedRating: 5,

  init() {
    this.render();
    this.bindEvents();
  },

  bindEvents() {
    // 1. Filter Tag Pills (Near Main Gate, Zhixue Street, Shoufeng Town, All)
    const filterPills = document.querySelectorAll('#food-filter-tags .pill-filter');
    filterPills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        filterPills.forEach(p => p.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.currentTag = e.currentTarget.dataset.tag;
        this.render();
      });
    });

    // 2. Search input
    const searchInput = document.getElementById('food-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.render();
      });
    }

    // 3. Interactive Star Rating selector in the form
    this.initStarSelector();

    // 4. Toggle Inline Review Form
    const toggleFormBtn = document.getElementById('btn-toggle-food-form');
    const formCard = document.getElementById('food-interactive-form-card');
    const formBody = document.getElementById('food-form-body');

    if (toggleFormBtn && formBody) {
      toggleFormBtn.addEventListener('click', () => {
        const isCollapsed = formBody.classList.contains('collapsed');
        formBody.classList.toggle('collapsed', !isCollapsed);
        toggleFormBtn.textContent = isCollapsed ? '▲ Close Review Form' : '🍱 Add Restaurant Review';
        if (isCollapsed) {
          formCard?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          document.getElementById('food-restaurant-name')?.focus();
        }
      });
    }

    const headerReviewBtn = document.getElementById('btn-open-food-modal');
    if (headerReviewBtn && formBody) {
      headerReviewBtn.addEventListener('click', () => {
        formBody.classList.remove('collapsed');
        if (toggleFormBtn) toggleFormBtn.textContent = '▲ Close Review Form';
        formCard?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        document.getElementById('food-restaurant-name')?.focus();
      });
    }

    // 5. Submit Review Form
    const form = document.getElementById('form-submit-food-review');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSubmit(form);
      });
    }

    // 6. Food Roulette
    const rouletteBtn = document.getElementById('btn-food-roulette');
    if (rouletteBtn) {
      rouletteBtn.addEventListener('click', () => {
        this.openRouletteModal();
      });
    }
  },

  initStarSelector() {
    const starBtns = document.querySelectorAll('#star-selector .star-btn');
    starBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const val = parseInt(e.currentTarget.dataset.value, 10);
        this.setStarRating(val);
      });
    });
  },

  setStarRating(rating) {
    this.selectedRating = rating;
    const starBtns = document.querySelectorAll('#star-selector .star-btn');
    starBtns.forEach(btn => {
      const starVal = parseInt(btn.dataset.value, 10);
      btn.classList.toggle('active', starVal <= rating);
    });

    const hiddenRatingInput = document.getElementById('food-rating-value');
    if (hiddenRatingInput) hiddenRatingInput.value = rating;

    const ratingLabel = document.getElementById('star-rating-text');
    if (ratingLabel) ratingLabel.textContent = `${rating} Star${rating > 1 ? 's' : ''}`;
  },

  handleSubmit(form) {
    const name = form.restaurantName.value.trim();
    const filterTag = form.filterTag.value;
    const recommendedDish = form.recommendedDish.value.trim();
    const priceRange = form.priceRange.value.trim() || '$ (NT$ 60 - 120)';
    const studentReview = form.studentReview.value.trim();
    const rating = this.selectedRating;

    if (!name || !recommendedDish || !studentReview) {
      window.App.showToast('Please fill in Restaurant Name, Recommended Dish, and your Student Review!');
      return;
    }

    window.NDHUDataManager.addFoodReview({
      name,
      filterTag,
      recommendedDish,
      rating,
      priceRange,
      studentReview,
      address: filterTag === 'Near Main Gate' ? 'NDHU Main Campus / University Rd' : (filterTag === 'Zhixue Street' ? 'Zhixue Food Street' : 'Shoufeng Township')
    });

    form.reset();
    this.setStarRating(5);

    window.App.showToast(`🍱 Review for "${name}" published!`);
    this.render();

    const firstCard = document.querySelector('#food-cards-grid .card-food');
    if (firstCard) {
      firstCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstCard.style.outline = '2px solid var(--warm-amber)';
      setTimeout(() => firstCard.style.outline = '', 2000);
    }
  },

  getFilteredList() {
    const reviews = window.NDHUDataManager.getFoodReviews();
    return reviews.filter(item => {
      const matchesTag = this.currentTag === 'All' || item.filterTag === this.currentTag;

      const matchesSearch = !this.searchQuery ||
        item.name.toLowerCase().includes(this.searchQuery) ||
        item.recommendedDish.toLowerCase().includes(this.searchQuery) ||
        item.studentReview.toLowerCase().includes(this.searchQuery) ||
        item.filterTag.toLowerCase().includes(this.searchQuery) ||
        (item.priceRange && item.priceRange.toLowerCase().includes(this.searchQuery));

      return matchesTag && matchesSearch;
    });
  },

  render() {
    const container = document.getElementById('food-cards-grid');
    if (!container) return;

    const filtered = this.getFilteredList();

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3.5rem 1.5rem; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
          <div style="font-size: 2.8rem; margin-bottom: 0.75rem;">🍜</div>
          <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 0.35rem; color: var(--text-main);">No Restaurants Found</h3>
          <p style="font-size: 0.9rem; color: var(--text-muted); max-width: 450px; margin: 0 auto 1.25rem;">
            No eateries currently match "${this.currentTag}". Try selecting "All Locations" or adding a new review above!
          </p>
          <button class="btn btn-sm btn-outline" onclick="FoodController.resetFilters()">
            Show All Locations
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(item => {
      const fullStars = '★'.repeat(item.rating);
      const emptyStars = '☆'.repeat(Math.max(0, 5 - item.rating));

      return `
        <article class="card card-food" data-id="${item.id}">
          <!-- Visual Badge: Campus Food Review & Location Tag -->
          <div class="card-type-row">
            <span class="card-type-badge badge-food">🍜 Campus Food Review</span>
            <span class="status-badge" style="background-color: var(--primary-light); color: var(--univ-navy);">
              📍 ${this.escapeHTML(item.filterTag)}
            </span>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.4rem;">
            <h3 class="card-title" style="margin-bottom: 0;">${this.escapeHTML(item.name)}</h3>
            <div class="food-rating-badge" title="${item.rating} out of 5 stars">
              <span style="color: #f59e0b; font-size: 0.95rem;">${fullStars}${emptyStars}</span>
              <span style="font-weight: 800; font-size: 0.82rem; margin-left: 0.2rem;">${item.rating}.0</span>
            </div>
          </div>

          <div style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 0.75rem; display: flex; justify-content: space-between; align-items: center;">
            <span>💰 <strong>Price:</strong> ${this.escapeHTML(item.priceRange)}</span>
            <span>📍 ${this.escapeHTML(item.address || item.filterTag)}</span>
          </div>

          <!-- Prominent Visual Badge: Must Try Dish -->
          <div class="dish-badge must-try">
            <div class="dish-badge-header">
              <span class="must-try-tag">✨ Must Try Dish</span>
              <span style="font-size: 0.72rem; color: #b45309; font-weight: 600;">必點推薦</span>
            </div>
            <strong class="dish-name">${this.escapeHTML(item.recommendedDish)}</strong>
          </div>

          <!-- Student Review Field -->
          <p class="card-description">
            <span style="font-weight: 600; color: var(--text-main); display: block; font-size: 0.82rem; margin-bottom: 0.25rem;">Student Review:</span>
            ${this.escapeHTML(item.studentReview)}
          </p>

          <div class="card-footer">
            <span style="font-size: 0.78rem; color: var(--text-subtle);">
              👍 Verified Student Review
            </span>
            <button class="btn btn-sm btn-outline" onclick="FoodController.upvote('${item.id}')">
              👍 Helpful (${item.upvotes || 0})
            </button>
          </div>
        </article>
      `;
    }).join('');
  },

  upvote(id) {
    window.NDHUDataManager.upvoteFoodReview(id);
    this.render();
    window.App.showToast('❤️ Marked review as helpful!');
  },

  resetFilters() {
    this.currentTag = 'All';
    this.searchQuery = '';
    const searchInput = document.getElementById('food-search-input');
    if (searchInput) searchInput.value = '';

    document.querySelectorAll('#food-filter-tags .pill-filter').forEach(p => {
      p.classList.toggle('active', p.dataset.tag === 'All');
    });

    this.render();
  },

  openRouletteModal() {
    window.App.openModal('modal-food-roulette');
    this.spinRoulette();
  },

  spinRoulette() {
    const reviews = window.NDHUDataManager.getFoodReviews();
    const displayBox = document.getElementById('roulette-result-display');
    const spinBtn = document.getElementById('btn-spin-again');
    if (!displayBox || reviews.length === 0) return;

    if (spinBtn) spinBtn.disabled = true;
    displayBox.innerHTML = `
      <div style="font-size: 2.2rem; animation: pulse-badge 0.4s infinite alternate;">🎲</div>
      <p style="margin-top: 0.5rem; font-weight: 600; color: var(--primary);">Shuffling NDHU student favorites...</p>
    `;

    let counter = 0;
    const interval = setInterval(() => {
      const item = reviews[Math.floor(Math.random() * reviews.length)];
      displayBox.innerHTML = `
        <div class="roulette-dish-title">${this.escapeHTML(item.name)}</div>
        <div class="roulette-dish-sub">📍 ${this.escapeHTML(item.filterTag)} • 💰 ${this.escapeHTML(item.priceRange)}</div>
      `;
      counter++;
      if (counter >= 12) {
        clearInterval(interval);
        const finalPick = reviews[Math.floor(Math.random() * reviews.length)];
        displayBox.innerHTML = `
          <div style="font-size: 2.2rem; margin-bottom: 0.35rem;">🎉</div>
          <h2 class="roulette-dish-title" style="color: var(--primary);">${this.escapeHTML(finalPick.name)}</h2>
          <div class="roulette-dish-sub" style="font-weight: 600; margin-bottom: 0.75rem;">
            📍 ${this.escapeHTML(finalPick.filterTag)} • 💰 ${this.escapeHTML(finalPick.priceRange)}
          </div>
          <div class="dish-badge must-try" style="max-width: 440px; margin: 0 auto; text-align: left;">
            <div class="dish-badge-header">
              <span class="must-try-tag">✨ Must Try Dish</span>
              <span style="font-size: 0.72rem; color: #b45309; font-weight: 600;">必點推薦</span>
            </div>
            <strong class="dish-name">${this.escapeHTML(finalPick.recommendedDish)}</strong>
          </div>
        `;
        if (spinBtn) spinBtn.disabled = false;
      }
    }, 100);
  },

  escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }
};

window.FoodController = FoodController;
