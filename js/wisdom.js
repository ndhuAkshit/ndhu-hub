/**
 * NDHU Hub - Senior Wisdom & Experience Hub Controller
 * Categorized by topics (General Life, Dorm Tips, Recommended Electives, Club Life),
 * Search bar to filter senior advice posts, 3 pre-populated realistic advice posts,
 * and visual badge "Senior Tip".
 * No personal names or student IDs used.
 */

const WisdomController = {
  currentTopic: 'All',
  searchQuery: '',
  showOnlyBookmarks: false,

  init() {
    this.render();
    this.bindEvents();
  },

  bindEvents() {
    // 1. Topic Filter Pills (General Life, Dorm Tips, Recommended Electives, Club Life, All)
    const topicPills = document.querySelectorAll('#wisdom-topic-filters .pill-filter');
    topicPills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        topicPills.forEach(p => p.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.currentTopic = e.currentTarget.dataset.topic;
        this.render();
      });
    });

    // 2. Search Bar to filter senior advice posts
    const searchInput = document.getElementById('wisdom-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.render();
      });
    }

    // 3. Saved Bookmarks Filter Button
    const bookmarkBtn = document.getElementById('btn-filter-bookmarked');
    if (bookmarkBtn) {
      bookmarkBtn.addEventListener('click', () => {
        this.showOnlyBookmarks = !this.showOnlyBookmarks;
        bookmarkBtn.classList.toggle('active', this.showOnlyBookmarks);
        this.render();
      });
    }

    // 4. Toggle Inline Advice Submission Form
    const toggleFormBtn = document.getElementById('btn-toggle-wisdom-form');
    const formCard = document.getElementById('wisdom-interactive-form-card');
    const formBody = document.getElementById('wisdom-form-body');

    if (toggleFormBtn && formBody) {
      toggleFormBtn.addEventListener('click', () => {
        const isCollapsed = formBody.classList.contains('collapsed');
        formBody.classList.toggle('collapsed', !isCollapsed);
        toggleFormBtn.textContent = isCollapsed ? '▲ Close Advice Form' : '🎓 Share Senior Advice';
        if (isCollapsed) {
          formCard?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          document.getElementById('wisdom-post-title')?.focus();
        }
      });
    }

    const headerWisdomBtn = document.getElementById('btn-open-wisdom-modal');
    if (headerWisdomBtn && formBody) {
      headerWisdomBtn.addEventListener('click', () => {
        formBody.classList.remove('collapsed');
        if (toggleFormBtn) toggleFormBtn.textContent = '▲ Close Advice Form';
        formCard?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        document.getElementById('wisdom-post-title')?.focus();
      });
    }

    // 5. Submit Advice Form
    const form = document.getElementById('form-submit-senior-wisdom');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSubmit(form);
      });
    }
  },

  handleSubmit(form) {
    const title = form.title.value.trim();
    const topic = form.topic.value;
    const authorRole = form.authorRole.value.trim() || 'Senior NDHU Mentor';
    const summary = form.summary.value.trim();
    const content = form.content.value.trim();

    if (!title || !summary || !content) {
      window.App.showToast('Please fill in Guide Title, Summary, and Detailed Advice!');
      return;
    }

    window.NDHUDataManager.addWisdomPost({
      title,
      topic,
      authorRole,
      summary,
      content
    });

    form.reset();

    window.App.showToast('🎓 Senior advice posted to the Life Archive! Thank you for helping juniors.');
    this.render();

    const firstCard = document.querySelector('#wisdom-cards-grid .card-wisdom');
    if (firstCard) {
      firstCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstCard.style.outline = '2px solid var(--wisdom-indigo)';
      setTimeout(() => firstCard.style.outline = '', 2000);
    }
  },

  getFilteredPosts() {
    const posts = window.NDHUDataManager.getWisdomPosts();
    const bookmarks = window.NDHUDataManager.getBookmarks();

    return posts.filter(item => {
      const matchesTopic = this.currentTopic === 'All' || item.topic === this.currentTopic;
      const matchesBookmarks = !this.showOnlyBookmarks || bookmarks.includes(item.id);

      const matchesSearch = !this.searchQuery ||
        item.title.toLowerCase().includes(this.searchQuery) ||
        item.summary.toLowerCase().includes(this.searchQuery) ||
        item.content.toLowerCase().includes(this.searchQuery) ||
        item.topic.toLowerCase().includes(this.searchQuery) ||
        (item.authorRole && item.authorRole.toLowerCase().includes(this.searchQuery)) ||
        (item.tags && item.tags.some(t => t.toLowerCase().includes(this.searchQuery)));

      return matchesTopic && matchesBookmarks && matchesSearch;
    });
  },

  render() {
    const container = document.getElementById('wisdom-cards-grid');
    if (!container) return;

    const filtered = this.getFilteredPosts();
    const bookmarks = window.NDHUDataManager.getBookmarks();

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3.5rem 1.5rem; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
          <div style="font-size: 2.8rem; margin-bottom: 0.75rem;">📚</div>
          <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 0.35rem; color: var(--text-main);">No Advice Posts Found</h3>
          <p style="font-size: 0.9rem; color: var(--text-muted); max-width: 450px; margin: 0 auto 1.25rem;">
            ${this.showOnlyBookmarks ? 'You have not saved any bookmarks yet.' : `No articles found matching topic "${this.currentTopic}".`}
          </p>
          <button class="btn btn-sm btn-outline" onclick="WisdomController.resetFilters()">
            Clear Filters & Search
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(item => {
      const isBookmarked = bookmarks.includes(item.id);

      const topicIcons = {
        'General Life': '🌿',
        'Dorm Tips': '🏠',
        'Recommended Electives': '🎓',
        'Club Life': '🎭'
      };
      const icon = topicIcons[item.topic] || '📖';

      return `
        <article class="card card-wisdom" onclick="WisdomController.viewPost('${item.id}')">
          <!-- Visual Badge: Senior Tip & Topic Tag -->
          <div class="card-type-row">
            <span class="card-type-badge badge-wisdom">🎓 Senior Tip</span>
            <span class="wisdom-topic-tag">${icon} ${this.escapeHTML(item.topic)}</span>
          </div>

          <h3 class="card-title">${this.escapeHTML(item.title)}</h3>

          <div style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 0.75rem; display: flex; align-items: center; justify-content: space-between;">
            <span>By: <strong>${this.escapeHTML(item.authorRole || 'NDHU Senior')}</strong></span>
            <span>⏱️ ${this.escapeHTML(item.readTime || '3 min read')}</span>
          </div>

          <p class="card-description">${this.escapeHTML(item.summary)}</p>

          <div class="card-tags">
            <span class="tag-item">Topic: ${this.escapeHTML(item.topic)}</span>
            ${(item.tags || []).map(t => `<span class="tag-item">#${this.escapeHTML(t)}</span>`).join('')}
          </div>

          <div class="card-footer">
            <div style="display: flex; align-items: center; gap: 0.65rem;">
              <button class="btn-bookmark ${isBookmarked ? 'bookmarked' : ''}" 
                      title="${isBookmarked ? 'Remove Bookmark' : 'Save Bookmark'}"
                      onclick="event.stopPropagation(); WisdomController.toggleBookmark('${item.id}', this)">
                ${isBookmarked ? '★' : '☆'}
              </button>
              <span style="font-size: 0.78rem; color: var(--text-muted);">
                👍 <strong>${item.helpfulCount || 1}</strong> helpful
              </span>
            </div>

            <span style="font-size: 0.85rem; color: var(--wisdom-indigo); font-weight: 700;">
              Read Guide →
            </span>
          </div>
        </article>
      `;
    }).join('');
  },

  viewPost(id) {
    const posts = window.NDHUDataManager.getWisdomPosts();
    const post = posts.find(p => p.id === id);
    if (!post) return;

    const modalTitle = document.getElementById('wisdom-modal-title');
    const modalBody = document.getElementById('wisdom-modal-content');

    if (modalTitle) modalTitle.textContent = post.title;
    if (modalBody) {
      modalBody.innerHTML = `
        <div style="margin-bottom: 1.25rem; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; font-size: 0.85rem; color: var(--text-muted);">
          <span>Topic: <strong style="color: var(--wisdom-indigo);">${this.escapeHTML(post.topic)}</strong></span>
          <span>Author: <strong>${this.escapeHTML(post.authorRole || 'Senior Mentor')}</strong></span>
        </div>
        <div style="line-height: 1.7; font-size: 0.95rem; color: var(--text-main);">
          ${this.formatMarkdown(post.content)}
        </div>
        <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--border-color); display: flex; align-items: center; justify-content: space-between;">
          <span style="font-size: 0.82rem; color: var(--text-muted);">Did this campus experience help you?</span>
          <button class="btn btn-sm btn-primary" onclick="WisdomController.likePost('${post.id}')">
            👍 Mark Helpful (${post.helpfulCount || 1})
          </button>
        </div>
      `;
    }

    window.App.openModal('modal-view-wisdom');
  },

  toggleBookmark(id, btnEl) {
    const isNowBookmarked = window.NDHUDataManager.toggleBookmark(id);
    if (btnEl) {
      btnEl.innerHTML = isNowBookmarked ? '★' : '☆';
      btnEl.classList.toggle('bookmarked', isNowBookmarked);
    }
    window.App.showToast(isNowBookmarked ? '🔖 Saved to your bookmarks!' : 'Removed from bookmarks.');
    if (this.showOnlyBookmarks) {
      this.render();
    }
  },

  likePost(id) {
    window.NDHUDataManager.likeWisdomPost(id);
    this.render();
    window.App.showToast('❤️ Thank you for marking this post as helpful!');
  },

  resetFilters() {
    this.currentTopic = 'All';
    this.showOnlyBookmarks = false;
    this.searchQuery = '';
    const searchInput = document.getElementById('wisdom-search-input');
    if (searchInput) searchInput.value = '';

    document.querySelectorAll('#wisdom-topic-filters .pill-filter').forEach(p => {
      p.classList.toggle('active', p.dataset.topic === 'All');
    });

    const bookmarkBtn = document.getElementById('btn-filter-bookmarked');
    if (bookmarkBtn) bookmarkBtn.classList.remove('active');

    this.render();
  },

  formatMarkdown(text) {
    if (!text) return '';
    let html = this.escapeHTML(text);
    html = html.replace(/### (.*?)\n/g, '<h4 style="margin: 1.25rem 0 0.45rem; font-size: 1.12rem; color: var(--text-main); font-weight: 700;">$1</h4>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/- (.*?)\n/g, '<li style="margin-left: 1.35rem; margin-bottom: 0.4rem;">$1</li>');
    html = html.replace(/(\d+)\. (.*?)\n/g, '<li style="margin-left: 1.35rem; margin-bottom: 0.4rem;">$2</li>');
    html = html.split('\n\n').map(p => p.trim() ? `<p style="margin-bottom: 0.85rem;">${p}</p>` : '').join('');
    return html;
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

window.WisdomController = WisdomController;
