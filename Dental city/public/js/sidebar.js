/**
 * Dental City Clinic Management & Booking System
 * Interactive RTL Sidebar Controller & Layout Manager
 */

(function () {
  'use strict';

  function initSidebar() {
    const body = document.body;
    const desktopToggleBtn = document.getElementById('sidebarDesktopToggle');
    const mobileToggleBtn = document.getElementById('sidebarMobileToggle');
    const mobileCloseBtn = document.getElementById('sidebarMobileClose');
    const backdrop = document.getElementById('sidebarBackdrop');
    const sidebar = document.getElementById('appSidebar');

    // 1. Tooltips initialization for desktop sidebar
    let activeTooltips = [];
    function setupTooltips() {
      if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
        // Destroy existing
        activeTooltips.forEach(function (t) {
          try { t.dispose(); } catch (_) {}
        });
        activeTooltips = [];

        const isCollapsed = body.classList.contains('sidebar-collapsed');
        // Enable tooltips on collapsed desktop, or wherever specified
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('.app-sidebar [data-bs-toggle="tooltip"]'));
        activeTooltips = tooltipTriggerList.map(function (tooltipTriggerEl) {
          return new bootstrap.Tooltip(tooltipTriggerEl, {
            placement: 'left',
            boundary: document.body,
            trigger: isCollapsed ? 'hover' : 'manual'
          });
        });
      }
    }

    // 2. Restore desktop collapsed preference from localStorage
    const savedCollapsed = localStorage.getItem('dental_sidebar_collapsed');
    if (savedCollapsed === 'true' && window.innerWidth >= 992) {
      body.classList.add('sidebar-collapsed');
    }
    setupTooltips();

    // 3. Desktop Toggle Action
    if (desktopToggleBtn) {
      desktopToggleBtn.addEventListener('click', function (e) {
        e.preventDefault();
        body.classList.toggle('sidebar-collapsed');
        const isCollapsed = body.classList.contains('sidebar-collapsed');
        localStorage.setItem('dental_sidebar_collapsed', isCollapsed ? 'true' : 'false');
        setupTooltips();
      });
    }

    // 4. Mobile Open Action
    if (mobileToggleBtn) {
      mobileToggleBtn.addEventListener('click', function (e) {
        e.preventDefault();
        body.classList.add('sidebar-mobile-open');
      });
    }

    // 5. Mobile Close Actions
    function closeMobileSidebar() {
      body.classList.remove('sidebar-mobile-open');
    }

    if (mobileCloseBtn) {
      mobileCloseBtn.addEventListener('click', function (e) {
        e.preventDefault();
        closeMobileSidebar();
      });
    }

    if (backdrop) {
      backdrop.addEventListener('click', closeMobileSidebar);
    }

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && body.classList.contains('sidebar-mobile-open')) {
        closeMobileSidebar();
      }
    });

    // 6. Navigation Link Highlighting helper
    function setItemActive(linkElement) {
      document.querySelectorAll('.app-sidebar .sidebar-item').forEach(function (item) {
        item.classList.remove('active');
      });
      const parentItem = linkElement.closest('.sidebar-item');
      if (parentItem) {
        parentItem.classList.add('active');
      }
    }

    // 7. Tab Switching for Doctor Dashboard
    const dashboardTabLinks = document.querySelectorAll('[data-dashboard-tab]');
    dashboardTabLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        const targetTabId = this.getAttribute('data-dashboard-tab');
        const tabTrigger = document.querySelector(`[data-bs-target="#${targetTabId}"]`) || document.getElementById(targetTabId);

        if (tabTrigger && typeof bootstrap !== 'undefined' && bootstrap.Tab) {
          e.preventDefault();
          const tab = bootstrap.Tab.getOrCreateInstance(tabTrigger);
          tab.show();
          setItemActive(link);

          if (window.innerWidth < 992) {
            closeMobileSidebar();
          }

          const panelEl = document.getElementById(targetTabId);
          if (panelEl) {
            panelEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });

    // 8. Tab Switching for Patient Portal
    const patientTabLinks = document.querySelectorAll('[data-patient-tab]');
    patientTabLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        const targetTabId = this.getAttribute('data-patient-tab');
        const normalizedId = targetTabId.startsWith('p-') ? targetTabId : 'p-' + targetTabId.replace('patient-', '');
        const tabTrigger = document.querySelector(`[data-bs-target="#${normalizedId}"]`) || document.getElementById(normalizedId + '-tab');

        if (tabTrigger && typeof bootstrap !== 'undefined' && bootstrap.Tab) {
          e.preventDefault();
          const tab = bootstrap.Tab.getOrCreateInstance(tabTrigger);
          tab.show();
          setItemActive(link);

          if (window.innerWidth < 992) {
            closeMobileSidebar();
          }

          const panelEl = document.getElementById(normalizedId);
          if (panelEl) {
            panelEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });

    // 9. Quick Action Modals for Sections (Prescriptions, Finance, Inventory, Reports, Staff)
    const actionLinks = document.querySelectorAll('[data-dashboard-action]');
    actionLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const actionType = this.getAttribute('data-dashboard-action');
        setItemActive(link);
        if (window.innerWidth < 992) {
          closeMobileSidebar();
        }

        const modalTarget = document.getElementById(actionType);
        if (modalTarget && typeof bootstrap !== 'undefined' && bootstrap.Modal) {
          const modalInstance = bootstrap.Modal.getOrCreateInstance(modalTarget);
          modalInstance.show();
        } else {
          // If modal does not exist, switch to overview or bookings tab smoothly
          const bookingsTrigger = document.querySelector('[data-bs-target="#bookings-panel"]');
          if (bookingsTrigger && typeof bootstrap !== 'undefined' && bootstrap.Tab) {
            bootstrap.Tab.getOrCreateInstance(bookingsTrigger).show();
          }
        }
      });
    });

    // 10. URL Hash Detection on Load (e.g., #bookings, #doctors, #appointments, #records)
    if (window.location.hash) {
      const hash = window.location.hash.replace('#', '');
      
      // Check dashboard tab
      const matchingDash = document.querySelector(`[data-dashboard-tab="${hash}-panel"]`) || 
                           document.querySelector(`[href*="#${hash}"]`);
      if (matchingDash) {
        setTimeout(function () {
          matchingDash.click();
        }, 150);
      }

      // Check patient portal tab
      const matchingPatient = document.querySelector(`[data-patient-tab="patient-${hash}"]`) ||
                              document.querySelector(`[data-patient-tab="p-${hash}"]`);
      if (matchingPatient) {
        setTimeout(function () {
          matchingPatient.click();
        }, 150);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSidebar);
  } else {
    initSidebar();
  }
})();
