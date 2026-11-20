/**
 * Dental City Clinic Management System
 * Theme Manager Module
 * Supports: System Sync (Auto), Manual Dark Mode, Manual Light Mode
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'dental_city_theme';

  /**
   * 1. Retrieve stored theme setting ('light', 'dark', 'auto')
   */
  function getStoredTheme() {
    return localStorage.getItem(STORAGE_KEY) || 'auto';
  }

  /**
   * 2. Save chosen theme preference to localStorage
   */
  function setStoredTheme(theme) {
    localStorage.setItem(STORAGE_KEY, theme);
  }

  /**
   * 3. Compute active visual theme ('light' or 'dark') based on setting and OS mode
   */
  function getPreferredTheme() {
    const storedTheme = getStoredTheme();
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }
    // Auto: match system OS prefers-color-scheme
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  /**
   * 4. Update UI toggles (icons, checkmarks, labels)
   */
  function updateThemeUI(activeTheme, mode) {
    const isDark = activeTheme === 'dark';

    // Update all theme toggle buttons across the page
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      const iconEl = btn.querySelector('.theme-icon-active');
      const labelEl = btn.querySelector('.theme-text-label');

      if (iconEl) {
        if (mode === 'auto') {
          iconEl.className = 'theme-icon-active fs-6 bi bi-circle-half text-secondary';
        } else if (isDark) {
          iconEl.className = 'theme-icon-active fs-6 bi bi-moon-stars-fill text-info';
        } else {
          iconEl.className = 'theme-icon-active fs-6 bi bi-sun-fill text-warning';
        }
      }

      if (labelEl) {
        labelEl.textContent = mode === 'auto' ? 'تلقائي' : (isDark ? 'ليلي' : 'نهاري');
      }

      btn.setAttribute('aria-label', `المظهر الحالي: ${isDark ? 'الوضع الليلي' : 'الوضع النهاري'}`);
      btn.setAttribute('title', `المظهر: ${mode === 'auto' ? 'تزامن النظام تلقائياً' : (isDark ? 'الوضع الليلي' : 'الوضع النهاري')}`);
    });

    // Update dropdown items active state and checkmarks
    document.querySelectorAll('[data-theme-value]').forEach(item => {
      const val = item.getAttribute('data-theme-value');
      const checkEl = item.querySelector('.theme-check');
      const isSelected = val === mode;

      item.classList.toggle('active', isSelected);
      if (checkEl) {
        checkEl.classList.toggle('d-none', !isSelected);
      }
    });
  }

  /**
   * 5. Apply theme to document
   */
  function applyTheme(theme) {
    const resolved = (theme === 'auto')
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme;

    document.documentElement.setAttribute('data-bs-theme', resolved);
    document.documentElement.classList.remove('theme-light', 'theme-dark');
    document.documentElement.classList.add(resolved === 'dark' ? 'theme-dark' : 'theme-light');

    if (document.body) {
      document.body.classList.remove('theme-light', 'theme-dark');
      document.body.classList.add(resolved === 'dark' ? 'theme-dark' : 'theme-light');
    }

    updateThemeUI(resolved, theme);
  }

  // Pre-execution before DOM is fully loaded to prevent flicker
  applyTheme(getStoredTheme());

  /**
   * 6. Listen to OS Preference Changes (Live System Sync)
   */
  const colorSchemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  try {
    colorSchemeMediaQuery.addEventListener('change', () => {
      const storedTheme = getStoredTheme();
      if (storedTheme === 'auto') {
        applyTheme('auto');
      }
    });
  } catch (e) {
    // Legacy browser support
    colorSchemeMediaQuery.addListener(() => {
      const storedTheme = getStoredTheme();
      if (storedTheme === 'auto') {
        applyTheme('auto');
      }
    });
  }

  /**
   * 7. Event listeners for dropdown items and direct click toggles
   */
  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(getStoredTheme());

    // Delegate theme option selection in dropdowns
    document.addEventListener('click', (e) => {
      const themeOption = e.target.closest('[data-theme-value]');
      if (themeOption) {
        e.preventDefault();
        const chosen = themeOption.getAttribute('data-theme-value');
        setStoredTheme(chosen);
        applyTheme(chosen);
        return;
      }

      // Quick toggle button click
      const quickToggle = e.target.closest('.theme-quick-toggle');
      if (quickToggle) {
        e.preventDefault();
        const current = getPreferredTheme();
        const next = current === 'dark' ? 'light' : 'dark';
        setStoredTheme(next);
        applyTheme(next);
      }
    });
  });

  // Global API
  window.DentalCityTheme = {
    get: getStoredTheme,
    getEffective: getPreferredTheme,
    set: function (theme) {
      setStoredTheme(theme);
      applyTheme(theme);
    },
    toggle: function () {
      const current = getPreferredTheme();
      const next = current === 'dark' ? 'light' : 'dark';
      setStoredTheme(next);
      applyTheme(next);
    }
  };
})();
