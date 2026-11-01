/**
 * NDHU Hub - Emergency Helpboard Controller
 * Interactive submission form, dynamic emergency cards, urgency tags ("Urgent", "In Progress", "Resolved"),
 * and visual badge "🚨 Emergency SOS".
 * No personal names or student IDs used.
 */

const SOSController = {
  currentCategory: 'All',
  currentUrgency: 'All',
  searchQuery: '',

  init() {
    this.render();
    this.bindEvents();
  },

  bindEvents() {
    // 1. Category Filter Pills
    const categoryPills = document.querySelectorAll('#sos-category-filters .pill-filter');
    categoryPills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        categoryPills.forEach(p => p.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.currentCategory = e.currentTarget.dataset.category;
        this.render();
      });
    });

    // 2. Urgency Filter Pills
    const urgencyPills = document.querySelectorAll('#sos-urgency-filters .pill-filter');
    urgencyPills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        urgencyPills.forEach(p => p.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.currentUrgency = e.currentTarget.dataset.urgency;
        this.render();
      });
    });

    // 3. Search Bar Input
    const searchInput = document.getElementById('sos-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.render();
      });
    }

    // 4. Toggle Inline "Ask for Emergency Help" Form
    const toggleFormBtn = document.getElementById('btn-toggle-sos-form');
    const formCard = document.getElementById('sos-interactive-form-card');
    const formBody = document.getElementById('sos-form-body');

    if (toggleFormBtn && formBody) {
      toggleFormBtn.addEventListener('click', () => {
        const isCollapsed = formBody.classList.contains('collapsed');
        formBody.classList.toggle('collapsed', !isCollapsed);
        toggleFormBtn.textContent = isCollapsed ? '▲ Close Help Form' : '🚨 Ask for Emergency Help';
        if (isCollapsed) {
          formCard?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          document.getElementById('sos-category')?.focus();
        }
      });
    }

    // Header SOS broadcast button (also opens/scrolls to form)
    const headerBtn = document.getElementById('btn-open-sos-modal');
    if (headerBtn && formBody) {
      headerBtn.addEventListener('click', () => {
        formBody.classList.remove('collapsed');
        if (toggleFormBtn) toggleFormBtn.textContent = '▲ Close Help Form';
        formCard?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        document.getElementById('sos-category')?.focus();
      });
    }

    // 5. Submit "Ask for Emergency Help" Form
    const form = document.getElementById('form-ask-emergency');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSubmit(form);
      });
    }
  },

  handleSubmit(form) {
    const category = form.category.value;
    const location = form.location.value.trim();
    const contactInfo = form.contactInfo.value.trim();
    const title = form.title.value.trim();
    const description = form.description.value.trim();

    if (!category || !location || !contactInfo || !description) {
      window.App.showToast('Please fill in all required fields!');
      return;
    }

    const finalTitle = title || `${category} near ${location}`;

    window.NDHUDataManager.addSOSPost({
      title: finalTitle,
      category,
      location,
      contactInfo,
      urgency: 'Urgent',
      description
    });

    form.reset();

    window.App.showToast('🚨 Emergency Help request posted! Local students alerted.');
    this.render();

    const firstCard = document.querySelector('#sos-cards-grid .card-sos');
    if (firstCard) {
      firstCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstCard.style.outline = '2px solid var(--danger-sos)';
      setTimeout(() => firstCard.style.outline = '', 2000);
    }
  },

  getFilteredPosts() {
    const posts = window.NDHUDataManager.getSOSPosts();

    return posts.filter(post => {
      const matchesCategory = this.currentCategory === 'All' || post.category === this.currentCategory;
      const matchesUrgency = this.currentUrgency === 'All' || post.urgency === this.currentUrgency;

      const matchesSearch = !this.searchQuery ||
        (post.location && post.location.toLowerCase().includes(this.searchQuery)) ||
        (post.title && post.title.toLowerCase().includes(this.searchQuery)) ||
        (post.description && post.description.toLowerCase().includes(this.searchQuery)) ||
        (post.contactInfo && post.contactInfo.toLowerCase().includes(this.searchQuery)) ||
        (post.category && post.category.toLowerCase().includes(this.searchQuery));

      return matchesCategory && matchesUrgency && matchesSearch;
    });
  },

  render() {
    const container = document.getElementById('sos-cards-grid');
    const badgeCount = document.getElementById('sos-active-count');
    if (!container) return;

    const allPosts = window.NDHUDataManager.getSOSPosts();
    const urgentCount = allPosts.filter(p => p.urgency === 'Urgent').length;
    if (badgeCount) {
      badgeCount.textContent = `${urgentCount} Urgent`;
    }

    const filtered = this.getFilteredPosts();

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3.5rem 1.5rem; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
          <div style="font-size: 2.8rem; margin-bottom: 0.75rem;">🛡️</div>
          <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 0.35rem; color: var(--text-main);">No Emergency Requests Found</h3>
          <p style="font-size: 0.9rem; color: var(--text-muted); max-width: 450px; margin: 0 auto 1.25rem;">
            No requests currently match "${this.currentCategory}" / "${this.currentUrgency}". Campus is safe!
          </p>
          <button class="btn btn-sm btn-outline" onclick="SOSController.resetFilters()">
            Clear Filters
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(post => {
      let urgencyClass = 'urgent';
      let cardBorderClass = 'status-urgent';

      if (post.urgency === 'In Progress') {
        urgencyClass = 'in-progress';
        cardBorderClass = 'status-helping';
      } else if (post.urgency === 'Resolved') {
        urgencyClass = 'resolved';
        cardBorderClass = 'status-resolved';
      }

      const categoryIcons = {
        'Scooter Breakdown': '🛵',
        'Item Lost': '🔍',
        'Urgent Study Advice': '📚',
        'General Help': '🆘'
      };
      const catIcon = categoryIcons[post.category] || '🚨';

      return `
        <article class="card card-sos ${cardBorderClass}" data-id="${post.id}">
          <!-- Visual Badge: Emergency SOS & Urgency Status Tag -->
          <div class="card-type-row">
            <span class="card-type-badge badge-emergency">🚨 Emergency SOS</span>
            <span class="urgency-tag ${urgencyClass}">
              ${post.urgency === 'Urgent' ? '🚨 Urgent' : (post.urgency === 'In Progress' ? '⏳ In Progress' : '✅ Resolved')}
            </span>
          </div>

          <h3 class="card-title">${this.escapeHTML(post.title)}</h3>

          <div class="card-location-meta">
            <span>📍</span>
            <strong>${this.escapeHTML(post.location)}</strong>
            <span style="opacity: 0.4;">•</span>
            <span>${catIcon} ${this.escapeHTML(post.category)}</span>
            <span style="opacity: 0.4;">•</span>
            <span class="timestamp">${post.timeAgo || 'Just now'}</span>
          </div>

          <p class="card-description">${this.escapeHTML(post.description)}</p>

          <!-- Contact Info / Telegram Handle pill -->
          <div class="telegram-pill" title="Student Contact Handle">
            <span>✈️</span>
            <span>Contact: <strong>${this.escapeHTML(post.contactInfo)}</strong></span>
          </div>

          <div class="card-footer">
            <!-- Urgency Status Switcher -->
            <div style="display: flex; align-items: center; gap: 0.45rem;">
              <span style="font-size: 0.78rem; color: var(--text-muted); font-weight: 600;">Status:</span>
              <select class="status-change-dropdown" 
                      aria-label="Update Urgency Status"
                      onchange="SOSController.updateStatus('${post.id}', this.value)">
                <option value="Urgent" ${post.urgency === 'Urgent' ? 'selected' : ''}>Urgent</option>
                <option value="In Progress" ${post.urgency === 'In Progress' ? 'selected' : ''}>In Progress</option>
                <option value="Resolved" ${post.urgency === 'Resolved' ? 'selected' : ''}>Resolved</option>
              </select>
            </div>

            <div style="display: flex; gap: 0.35rem;">
              ${post.urgency !== 'Resolved' ? `
                <button class="btn btn-sm btn-primary" onclick="SOSController.quickHelp('${post.id}')" title="Offer Assistance">
                  🤝 I Can Help!
                </button>
              ` : `
                <span style="font-size: 0.8rem; color: var(--success); font-weight: 700;">✓ Completed</span>
              `}
            </div>
          </div>
        </article>
      `;
    }).join('');
  },

  updateStatus(id, newStatus) {
    window.NDHUDataManager.updateSOSUrgency(id, newStatus);
    this.render();
    window.App.showToast(`Updated status to "${newStatus}"!`);
  },

  quickHelp(id) {
    window.NDHUDataManager.updateSOSUrgency(id, 'In Progress');
    this.render();
    window.App.showToast('❤️ Thank you! Request marked as "In Progress". Please reach out to the student.');
  },

  resetFilters() {
    this.currentCategory = 'All';
    this.currentUrgency = 'All';
    this.searchQuery = '';
    const searchInput = document.getElementById('sos-search-input');
    if (searchInput) searchInput.value = '';

    document.querySelectorAll('#sos-category-filters .pill-filter').forEach(p => {
      p.classList.toggle('active', p.dataset.category === 'All');
    });
    document.querySelectorAll('#sos-urgency-filters .pill-filter').forEach(p => {
      p.classList.toggle('active', p.dataset.urgency === 'All');
    });

    this.render();
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

window.SOSController = SOSController;
