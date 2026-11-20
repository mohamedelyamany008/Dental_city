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
      if (!linkElement) return;
      document.querySelectorAll('.app-sidebar .sidebar-item').forEach(function (item) {
        item.classList.remove('active');
      });
      const parentItem = linkElement.closest('.sidebar-item');
      if (parentItem) {
        parentItem.classList.add('active');
      }
    }

    // 7. Tab Switching for Doctor Dashboard (Decoupled Overview vs Doctors vs Patients)
    const dashboardTabLinks = document.querySelectorAll('[data-dashboard-tab]');
    dashboardTabLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        let rawTarget = this.getAttribute('data-dashboard-tab') || '';
        let targetTabId = rawTarget;
        if (targetTabId === 'overview') targetTabId = 'overview-panel';
        else if (targetTabId === 'doctors') targetTabId = 'doctors-panel';
        else if (targetTabId === 'patients') targetTabId = 'patients-panel';
        else if (targetTabId === 'services') targetTabId = 'services-panel';
        else if (targetTabId === 'settings') targetTabId = 'settings-panel';
        else if (targetTabId === 'staff') targetTabId = 'staff-panel';

        const isDoctorDashboard = window.location.pathname.toLowerCase().includes('/doctor/dashboard');
        if (!isDoctorDashboard) {
          // If on another route, allow natural browser navigation to /Doctor/Dashboard#...
          return;
        }

        const tabTrigger = document.querySelector(`[data-bs-target="#${targetTabId}"]`) || 
                           document.getElementById(targetTabId.replace('-panel', '') + '-tab') ||
                           document.getElementById(targetTabId + '-tab') || 
                           document.getElementById(targetTabId);

        if (tabTrigger && typeof bootstrap !== 'undefined' && bootstrap.Tab) {
          e.preventDefault();
          const tab = bootstrap.Tab.getOrCreateInstance(tabTrigger);
          tab.show();
          setItemActive(link);

          const shortHash = targetTabId.replace('-panel', '');
          if (window.history && window.history.replaceState) {
            window.history.replaceState(null, null, '#' + shortHash);
          } else {
            window.location.hash = shortHash;
          }
          try {
            localStorage.setItem("activeDoctorDashboardTab", '#' + targetTabId);
          } catch (err) {}

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

    // Synchronize Sidebar Active State on Page Load, Hash Change, and Tab Switch
    function syncSidebarWithCurrentTab(specifiedTarget) {
      const isDoctorDashboard = window.location.pathname.toLowerCase().includes('/doctor/dashboard');
      if (!isDoctorDashboard) return;

      let targetId = '';
      if (typeof specifiedTarget === 'string' && specifiedTarget.trim()) {
        targetId = specifiedTarget.trim();
      } else {
        targetId = window.location.hash || '';
      }

      // Strip leading hash
      targetId = targetId.replace(/^#/, '');

      let activePanelId = 'overview-panel';
      if (targetId.includes('patients')) {
        activePanelId = 'patients-panel';
      } else if (targetId.includes('doctors')) {
        activePanelId = 'doctors-panel';
      } else if (targetId.includes('services')) {
        activePanelId = 'services-panel';
      } else if (targetId.includes('settings')) {
        activePanelId = 'settings-panel';
      } else if (targetId.includes('staff')) {
        activePanelId = 'staff-panel';
      } else if (targetId.includes('overview')) {
        activePanelId = 'overview-panel';
      } else {
        const activeTabBtn = document.querySelector('#dashboardTabs .nav-link.active');
        if (activeTabBtn) {
          const bsTarget = activeTabBtn.getAttribute('data-bs-target');
          if (bsTarget) activePanelId = bsTarget.replace('#', '');
        }
      }

      const cleanHash = activePanelId.replace('-panel', '');

      // Explicitly highlight only the matching sidebar item
      document.querySelectorAll('.app-sidebar .sidebar-item').forEach(function(item) {
        item.classList.remove('active');
      });

      const matchedLink = document.querySelector(`.app-sidebar [data-dashboard-tab="${activePanelId}"]`) ||
                          document.querySelector(`.app-sidebar [data-dashboard-tab="${cleanHash}"]`) ||
                          document.querySelector(`.app-sidebar [href*="#${cleanHash}"]`) ||
                          document.getElementById(`sidebar-nav-${cleanHash}`)?.querySelector('.sidebar-link');
      if (matchedLink) {
        const parent = matchedLink.closest('.sidebar-item');
        if (parent) parent.classList.add('active');
      } else {
        const overviewItem = document.getElementById('sidebar-nav-overview') ||
                             document.querySelector('.app-sidebar [data-dashboard-tab="overview-panel"]')?.closest('.sidebar-item');
        if (overviewItem) overviewItem.classList.add('active');
      }

      // Update URL hash cleanly without causing page reload
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, null, '#' + cleanHash);
      }
      try {
        localStorage.setItem("activeDoctorDashboardTab", cleanHash);
      } catch (err) {}
    }

    // Expose globally for instant cross-component updates
    window.syncSidebarWithCurrentTab = syncSidebarWithCurrentTab;

    // Listen globally for Bootstrap tab changes to synchronize sidebar instantly
    document.addEventListener('shown.bs.tab', function (e) {
      const target = e.target.getAttribute('data-bs-target') || e.target.getAttribute('href');
      if (target) {
        syncSidebarWithCurrentTab(target);
      }
    });

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        syncSidebarWithCurrentTab();
      });
    } else {
      syncSidebarWithCurrentTab();
    }
    window.addEventListener('hashchange', function () {
      syncSidebarWithCurrentTab();
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

    // 9. Quick Action Modals for Sections (Finance, Inventory, Reports, Staff)
    const actionLinks = document.querySelectorAll('[data-dashboard-action]');
    actionLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        const isDoctorDashboard = window.location.pathname.toLowerCase().includes('/doctor/dashboard');
        if (!isDoctorDashboard) {
          // Allow natural navigation to /Doctor/Dashboard#target
          return;
        }

        e.preventDefault();
        const actionType = this.getAttribute('data-dashboard-action');
        setItemActive(link);
        if (window.innerWidth < 992) {
          closeMobileSidebar();
        }

        // First activate the corresponding tab if present
        const tabTargetId = this.getAttribute('data-dashboard-tab') || actionType.replace('-modal', '-panel');
        const tabTrigger = document.querySelector(`[data-bs-target="#${tabTargetId}"]`) || document.getElementById(tabTargetId + '-tab');
        if (tabTrigger && typeof bootstrap !== 'undefined' && bootstrap.Tab) {
          bootstrap.Tab.getOrCreateInstance(tabTrigger).show();
          const panelEl = document.getElementById(tabTargetId);
          if (panelEl) {
            panelEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }

        // Also open the modal
        const modalTarget = document.getElementById(actionType);
        if (modalTarget) {
          if (typeof showModalSafely === 'function') {
            showModalSafely(modalTarget);
          } else if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
            bootstrap.Modal.getOrCreateInstance(modalTarget).show();
          } else if (typeof $ !== 'undefined' && typeof $.fn.modal === 'function') {
            $(modalTarget).modal('show');
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
