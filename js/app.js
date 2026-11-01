/**
 * NDHU Hub - Main Application Controller
 * Handles tab navigation, modal state, theme toggling, and module initialization.
 * No personal names or student IDs used.
 */

const App = {
  activeTab: 'sos',

  init() {
    this.initTheme();
    this.initNavigation();
    this.initModals();

    // Initialize sub-controllers
    if (window.SOSController) window.SOSController.init();
    if (window.FoodController) window.FoodController.init();
    if (window.WisdomController) window.WisdomController.init();
    if (window.AIAssistant) window.AIAssistant.init();

    // Check URL hash for direct tab linking
    this.handleInitialHash();

    console.log('NDHU Hub initialized successfully.');
  },

  initTheme() {
    const savedTheme = localStorage.getItem('ndhu_hub_theme_preference') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.updateThemeButton(savedTheme);

    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('ndhu_hub_theme_preference', next);
        this.updateThemeButton(next);
        this.showToast(`Switched to ${next} theme mode.`);
      });
    }
  },

  updateThemeButton(theme) {
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) {
      btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
      btn.title = `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`;
    }
  },

  initNavigation() {
    const tabButtons = document.querySelectorAll('.nav-tab-btn');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetTab = e.currentTarget.dataset.tab;
        this.switchTab(targetTab);
      });
    });

    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '');
      if (['sos', 'food', 'wisdom'].includes(hash)) {
        this.switchTab(hash, false);
      }
    });
  },

  handleInitialHash() {
    const hash = window.location.hash.replace('#', '');
    if (['sos', 'food', 'wisdom'].includes(hash)) {
      this.switchTab(hash, false);
    } else {
      this.switchTab('sos', false);
    }
  },

  switchTab(tabId, updateHash = true) {
    this.activeTab = tabId;

    // Update Tab Buttons
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      const isTarget = btn.dataset.tab === tabId;
      btn.classList.toggle('active', isTarget);
      btn.setAttribute('aria-selected', isTarget ? 'true' : 'false');
    });

    // Update Tab Panes
    document.querySelectorAll('.tab-pane').forEach(pane => {
      const isTarget = pane.id === `tab-pane-${tabId}`;
      pane.classList.toggle('active', isTarget);
    });

    if (updateHash) {
      window.location.hash = tabId;
    }

    // Scroll to top of content
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  initModals() {
    // Backdrop click to close
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeModal(modal.id);
        }
      });
    });

    // Close buttons
    document.querySelectorAll('.modal-close-btn, .btn-modal-cancel').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modal = e.currentTarget.closest('.modal-overlay');
        if (modal) {
          this.closeModal(modal.id);
        }
      });
    });

    // Keyboard ESC to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(modal => {
          this.closeModal(modal.id);
        });
        if (window.AIAssistant?.isOpen) {
          window.AIAssistant.closePanel();
        }
      }
    });

    // Reset data button
    const resetBtn = document.getElementById('btn-reset-demo-data');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Reset NDHU Hub data to fresh demo defaults? This will restore original sample posts and reviews.')) {
          window.NDHUDataManager.resetToDefaults();
          window.location.reload();
        }
      });
    }
  },

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      const firstInput = modal.querySelector('input, select, textarea');
      if (firstInput) setTimeout(() => firstInput.focus(), 100);
    }
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  },

  showToast(message) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  }
};

window.App = App;

// Bootstrap on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
