/* ============================================================
   Katherine Claye Art — main.js
   Official Portfolio & Interactive Gallery
   ============================================================ */

  (function () {
    'use strict';

    // --- Theme -----------------------------------------------------------
    const html = document.documentElement;
    const toggle = document.getElementById('theme-toggle');
    const saved = localStorage.getItem('kc-theme');
    const current = saved || 'light';
    html.setAttribute('data-theme', current);

    function updateThemeButton() {
      if (!toggle) return;
      const isDark = html.getAttribute('data-theme') === 'dark';
      toggle.textContent = isDark ? 'dark' : 'light';
      toggle.setAttribute('aria-pressed', String(isDark));
      toggle.setAttribute('aria-label', `Color theme: currently ${isDark ? 'dark' : 'light'}. Click to toggle`);
    }
    updateThemeButton();

    if (toggle) {
      toggle.addEventListener('click', () => {
        const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', next);
        localStorage.setItem('kc-theme', next);
        updateThemeButton();
      });
    }

    // --- Intro animation & Fast/Skippable Reveal ------------------------
    const introEl = document.querySelector('.intro-text');
    if (introEl) {
      const raw = introEl.textContent;
      introEl.textContent = '';
      Array.from(raw).forEach((ch, i) => {
        const span = document.createElement('span');
        span.className = 'letter';
        span.textContent = ch === ' ' ? '\u00A0' : ch;
        span.style.animationDelay = `${0.15 + i * 0.04}s`;
        introEl.appendChild(span);
      });
    }

    const siteHeader = document.getElementById('site-header');
    const artistWrap = document.getElementById('artist-name-wrap');
    const rightWrap = document.getElementById('right-menu-wrap');
    const gallery = document.getElementById('gallery');
    const touchHint = document.getElementById('touch-hint');
    const introOverlay = document.getElementById('intro-overlay');

    let introDismissed = false;

    function dismissIntro() {
      if (introDismissed) return;
      introDismissed = true;
      if (introOverlay) {
        introOverlay.classList.add('dismissed');
        setTimeout(() => {
          introOverlay.style.display = 'none';
        }, 350);
      }
      if (siteHeader) siteHeader.classList.add('visible');
      if (gallery) gallery.classList.add('visible');
      if (!firstLayoutDone) layout(false);

      // Show touch hint briefly after intro
      if (touchHint) {
        setTimeout(() => {
          touchHint.classList.add('visible');
        }, 600);
        setTimeout(() => {
          touchHint.classList.remove('visible');
          touchHint.classList.add('fadeout');
          touchHint.addEventListener('transitionend', () => {
            touchHint.style.display = 'none';
          }, { once: true });
        }, 4200);
      }
    }

    if (introOverlay) {
      introOverlay.addEventListener('click', dismissIntro);
    }
    document.addEventListener('keydown', (e) => {
      if (!introDismissed && !e.metaKey && !e.ctrlKey && !e.altKey) {
        dismissIntro();
      }
    }, { once: true });

    // Auto-dismiss intro smoothly after 1.25s
    setTimeout(dismissIntro, 1250);

    // --- Header scroll fade ----------------------------------------------
    let lastScrollY = window.scrollY || 0;
    let scrollTicking = false;

    function updateHeaderScroll() {
      const currentY = window.scrollY || 0;
      const delta = currentY - lastScrollY;

      if (siteHeader && siteHeader.classList.contains('visible')) {
        // Immediately collapse open menus on any scroll
        if (Math.abs(delta) > 1 && (siteHeader.classList.contains('menu-open') || (artistWrap && artistWrap.classList.contains('hovered')) || (rightWrap && rightWrap.classList.contains('hovered')))) {
          closeBothMenus(0);
        }

        if (currentY <= 20) {
          siteHeader.classList.remove('scrolled-down');
        } else if (delta > 3 && currentY > 40) {
          siteHeader.classList.add('scrolled-down');
          closeBothMenus(0);
        } else if (delta < -3) {
          siteHeader.classList.remove('scrolled-down');
        }
      }

      lastScrollY = currentY;
      scrollTicking = false;
    }

    window.addEventListener('scroll', () => {
      if (!scrollTicking) {
        requestAnimationFrame(updateHeaderScroll);
        scrollTicking = true;
      }
    }, { passive: true });

    // --- Gallery build with responsive WebP & descriptive metadata --------
    if (typeof POSTS_DATA === 'undefined' || !gallery) return;

    const sorted = [...POSTS_DATA];

    const items = sorted.map((post, index) => {
      const aspect = post.aspectRatio || 1;
      const link = document.createElement('a');
      link.href = '#artwork-' + (post.id || (index + 1));
      link.className = 'art-link';
      link.dataset.aspect = String(aspect);
      link.dataset.index = String(index);
      link.setAttribute('role', 'button');
      link.setAttribute('tabindex', '0');
      link.setAttribute('aria-label', `${post.title || 'Artwork'} — view details`);

      const wrap = document.createElement('div');
      wrap.className = 'art-frame-wrap';
      wrap.style.aspectRatio = String(aspect);

      const mat = document.createElement('div');
      mat.className = 'art-mat';
      if (post.mat) {
        mat.style.top = `${post.mat.top}%`;
        mat.style.left = `${post.mat.left}%`;
        mat.style.width = `${post.mat.width}%`;
        mat.style.height = `${post.mat.height}%`;
      } else {
        mat.style.inset = '12%';
      }

      const art = document.createElement('img');
      art.className = 'artwork';
      art.src = post.webp ? post.webp.med : `assets/art/${post.filename}`;
      if (post.webp) {
        art.srcset = `${post.webp.thumb} 400w, ${post.webp.med} 800w, ${post.webp.full} 1200w`;
        art.sizes = '(max-width: 680px) 90vw, (max-width: 1100px) 46vw, 30vw';
      }
      art.alt = post.alt || post.title || 'Artwork by Katherine Claye';
      art.width = post.width || 1080;
      art.height = post.height || 1350;

      // Load first row eagerly with high fetchpriority for first image
      if (index === 0) {
        art.loading = 'eager';
        art.setAttribute('fetchpriority', 'high');
        art.decoding = 'sync';
      } else if (index < 3) {
        art.loading = 'eager';
        art.decoding = 'async';
      } else {
        art.loading = 'lazy';
        art.decoding = 'async';
      }

      const frame = document.createElement('img');
      frame.className = 'frame-overlay';
      frame.src = `assets/frames/webp/${post.frame}.webp`;
      frame.alt = '';
      frame.setAttribute('aria-hidden', 'true');
      frame.loading = index < 3 ? 'eager' : 'lazy';

      mat.appendChild(art);
      wrap.appendChild(mat);
      wrap.appendChild(frame);
      link.appendChild(wrap);
      gallery.appendChild(link);

      // Clicking artwork always brings selected art into larger full view (with details) in one click
      link.addEventListener('click', (e) => {
        e.preventDefault();
        openArtworkModal(index);
      });
      link.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openArtworkModal(index);
        }
      });

      return { el: link, aspect: aspect };
    });

    // --- Layout engine ---------------------------------------------------
    function autoTier() {
      const w = window.innerWidth;
      if (w >= 1100) return '3col';
      if (w >= 680) return '2col';
      return '1col';
    }

    function getGap() {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue('--gap').trim();
      return parseFloat(raw) || 50;
    }

    let manualOverrideTier = null;
    let layoutMode = autoTier();

    const savedMode = localStorage.getItem('kc-layout');
    const savedTier = localStorage.getItem('kc-layout-tier');
    if (savedMode && savedTier && savedTier === autoTier()) {
      layoutMode = savedMode;
      manualOverrideTier = savedTier;
    }

    function colCount() {
      if (layoutMode === '1col') return 1;
      if (layoutMode === '2col') return 2;
      if (layoutMode === '3col') return 3;
      return 1;
    }

    function innerContentWidth() {
      const style = getComputedStyle(gallery);
      const pl = parseFloat(style.paddingLeft) || 0;
      const pr = parseFloat(style.paddingRight) || 0;
      return gallery.offsetWidth - pl - pr;
    }

    function layout(animate) {
      const cols = colCount();
      const gap = getGap();
      const totalW = innerContentWidth();
      const cw = (totalW - gap * (cols - 1)) / cols;

      const lp = parseFloat(getComputedStyle(gallery).paddingLeft) || 0;
      const tp = parseFloat(getComputedStyle(gallery).paddingTop) || 0;
      const bp = parseFloat(getComputedStyle(gallery).paddingBottom) || 0;

      const singleColOffset = cols === 1 ? (totalW - cw) / 2 : 0;
      const heights = new Array(cols).fill(tp);

      const targets = items.map((item) => {
        const aspect = item.aspect || 1;
        const itemH = cw / aspect;
        const minH = Math.min(...heights);
        const colIdx = heights.indexOf(minH);
        const x = lp + singleColOffset + colIdx * (cw + gap);
        const y = minH;
        heights[colIdx] += itemH + gap;
        return { link: item.el, cw, itemH, x, y };
      });

      const totalH = `${Math.max(...heights) - gap + bp}px`;

      if (animate) {
        gallery.classList.remove('resizing');
        targets.forEach(({ link, cw, itemH, x, y }) => {
          link.style.width = `${cw}px`;
          link.style.height = `${itemH}px`;
          link.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        });
        gallery.style.height = totalH;
      } else {
        gallery.classList.add('resizing');
        targets.forEach(({ link, cw, itemH, x, y }) => {
          link.style.width = `${cw}px`;
          link.style.height = `${itemH}px`;
          link.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        });
        gallery.style.height = totalH;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => gallery.classList.remove('resizing'))
        );
      }

      updateLayoutButtonText();
    }

    // --- Layout cycle button ---------------------------------------------
    const layoutCycleBtn = document.getElementById('layout-cycle-btn') || document.getElementById('sort-cycle-btn');
    const LAYOUT_SEQUENCE = ['1col', '2col', '3col'];

    function updateLayoutButtonText() {
      if (!layoutCycleBtn) return;
      const currentCols = colCount();
      layoutCycleBtn.textContent = 'layout';
      layoutCycleBtn.setAttribute('aria-label', `Gallery layout: currently ${currentCols} column${currentCols > 1 ? 's' : ''}. Click to cycle`);
      layoutCycleBtn.setAttribute('aria-pressed', String(manualOverrideTier !== null));
    }

    function setLayout(mode, isManual = true) {
      layoutMode = mode;
      if (isManual) {
        manualOverrideTier = autoTier();
        localStorage.setItem('kc-layout', mode);
        localStorage.setItem('kc-layout-tier', manualOverrideTier);
      }
      layout(isManual);
    }

    if (layoutCycleBtn) {
      layoutCycleBtn.addEventListener('click', () => {
        const idx = LAYOUT_SEQUENCE.indexOf(layoutMode);
        const next = LAYOUT_SEQUENCE[(idx + 1) % LAYOUT_SEQUENCE.length];
        setLayout(next, true);
      });
    }

    let lastTier = autoTier();
    function checkAutoLayout() {
      const tier = autoTier();
      if (tier !== lastTier) {
        lastTier = tier;
        manualOverrideTier = null;
        localStorage.removeItem('kc-layout');
        localStorage.removeItem('kc-layout-tier');
      }
      if (!manualOverrideTier && layoutMode !== autoTier()) {
        setLayout(autoTier(), false);
      }
    }

    window.addEventListener('resize', checkAutoLayout);
    window.addEventListener('orientationchange', () => {
      setTimeout(checkAutoLayout, 150);
    });

    // --- Image readiness & first layout ----------------------------------
    const artImgs = Array.from(gallery.querySelectorAll('img.artwork'));
    let loadedN = 0;
    let firstLayoutDone = false;

    function onImgReady() {
      loadedN++;
      if (loadedN >= Math.min(6, artImgs.length) && !firstLayoutDone) {
        firstLayoutDone = true;
        layout(false);
        if (introDismissed) {
          gallery.classList.add('visible');
          if (siteHeader) siteHeader.classList.add('visible');
        }
      }
    }

    artImgs.forEach((img) => {
      if (img.complete && img.naturalWidth > 0) {
        onImgReady();
      } else {
        img.addEventListener('load', onImgReady);
        img.addEventListener('error', onImgReady);
      }
    });

    // --- ResizeObserver for smooth responsive reflow ---------------------
    let prevWidth = 0;
    let resizeTimer = null;

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const currentWidth = entry.contentRect.width;
        if (prevWidth === 0) {
          prevWidth = currentWidth;
          return;
        }
        if (Math.abs(currentWidth - prevWidth) > 3) {
          prevWidth = currentWidth;
          gallery.classList.add('resizing');
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(() => {
            layout(false);
          }, 60);
        }
      }
    });

    ro.observe(gallery);

    // --- Synchronized Left & Right Menu Controller -----------------------
    let menuLeaveTimer = null;
    let menuAutoCloseTimer = null;

    function scheduleMenuAutoClose(ms = 4000) {
      clearTimeout(menuAutoCloseTimer);
      menuAutoCloseTimer = setTimeout(() => {
        closeBothMenus(300);
      }, ms);
    }

    function cancelMenuAutoClose() {
      clearTimeout(menuAutoCloseTimer);
    }

    function openBothMenus() {
      if (isAutoScrolling) return;
      clearTimeout(menuLeaveTimer);
      if (artistWrap) artistWrap.classList.add('hovered');
      if (rightWrap) rightWrap.classList.add('hovered');
      if (siteHeader) siteHeader.classList.add('menu-open');
      scheduleMenuAutoClose(4000);
    }

    function closeBothMenus(delay = 0) {
      clearTimeout(menuLeaveTimer);
      cancelMenuAutoClose();
      if (delay > 0) {
        menuLeaveTimer = setTimeout(() => {
          if (artistWrap) artistWrap.classList.remove('hovered');
          if (rightWrap) rightWrap.classList.remove('hovered');
          if (siteHeader) siteHeader.classList.remove('menu-open', 'menu-left-open', 'menu-right-open');
        }, delay);
      } else {
        if (artistWrap) artistWrap.classList.remove('hovered');
        if (rightWrap) rightWrap.classList.remove('hovered');
        if (siteHeader) siteHeader.classList.remove('menu-open', 'menu-left-open', 'menu-right-open');
      }
    }

    function toggleBothMenus() {
      if (isAutoScrolling) {
        stopAutoScroll();
        closeBothMenus(0);
        return;
      }
      const isCurrentlyOpen = (siteHeader && siteHeader.classList.contains('menu-open')) ||
        (artistWrap && artistWrap.classList.contains('hovered')) ||
        (rightWrap && rightWrap.classList.contains('hovered'));
      if (isCurrentlyOpen) {
        closeBothMenus(0);
      } else {
        openBothMenus();
      }
    }

    const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (artistWrap) {
      if (hasHover) {
        artistWrap.addEventListener('mouseenter', openBothMenus);
        artistWrap.addEventListener('mouseleave', () => closeBothMenus(300));
      }
      artistWrap.addEventListener('click', (e) => {
        if (e.target.closest('.artist-nav__link')) return;
        if (e.stopPropagation) e.stopPropagation();
        toggleBothMenus();
      });
    }

    if (rightWrap) {
      if (hasHover) {
        rightWrap.addEventListener('mouseenter', openBothMenus);
        rightWrap.addEventListener('mouseleave', () => closeBothMenus(300));
      }
      rightWrap.addEventListener('click', (e) => {
        if (e.target.closest('.right-menu-item')) {
          // Keep menu responsive: allow user to toggle/cycle, but collapse after 2.5s idle
          scheduleMenuAutoClose(2500);
          return;
        }
        if (e.stopPropagation) e.stopPropagation();
        toggleBothMenus();
      });
    }

    // Tap or click outside site header collapses both menus instantly on mobile and desktop
    ['click', 'pointerdown', 'touchstart'].forEach((evtType) => {
      document.addEventListener(evtType, (e) => {
        const clickedInsideLeft = artistWrap && artistWrap.contains(e.target);
        const clickedInsideRight = rightWrap && rightWrap.contains(e.target);
        if (!clickedInsideLeft && !clickedInsideRight) {
          closeBothMenus(0);
        }
      }, { passive: true });
    });

    // --- Keyboard Focus Trap Helper -------------------------------------
    function trapFocus(modalEl, e) {
      if (e.key !== 'Tab') return;
      const focusables = Array.from(modalEl.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'))
        .filter((el) => el.offsetParent !== null);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        last.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    }

    // --- Glass Modal Controller (About & Contact) ------------------------
    const modal = document.getElementById('glass-modal');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalTabs = document.querySelectorAll('.glass-modal__tab');
    const modalSections = document.querySelectorAll('.glass-modal__section');
    const navLinks = document.querySelectorAll('.artist-nav__link');
    const maiseyVideo = document.getElementById('maisey-walk-video');
    let maiseyLoopTimer = null;
    let lastModalTrigger = null;

    const MAISEY_TRACK = [
      [0.25, 0.0385, 0.1802, 0.119, 0.037, 0.201],
      [0.5, 0.0385, 0.1807, 0.118, 0.0359, 0.2],
      [0.75, 0.0385, 0.1807, 0.1198, 0.0354, 0.2042],
      [1.0, 0.0385, 0.1807, 0.1227, 0.037, 0.2083],
      [1.25, 0.0385, 0.1807, 0.1227, 0.0365, 0.2089],
      [1.5, 0.0385, 0.1807, 0.1255, 0.0344, 0.2167],
      [1.75, 0.0375, 0.1807, 0.125, 0.0354, 0.2146],
      [2.0, 0.037, 0.2109, 0.1313, 0.0333, 0.2292],
      [2.25, 0.0359, 0.2583, 0.1471, 0.0333, 0.2609],
      [2.5, 0.0286, 0.262, 0.1583, 0.025, 0.2917],
      [2.75, 0.0219, 0.2609, 0.1784, 0.0167, 0.3401],
      [3.0, 0.012, 0.3208, 0.1859, 0.0083, 0.3635],
      [3.25, 0.0094, 0.3672, 0.1917, 0.0083, 0.375],
      [3.5, 0.0208, 0.3656, 0.2068, 0.0177, 0.3958],
      [3.75, 0.0573, 0.3583, 0.2216, 0.0229, 0.4203],
      [4.0, 0.1203, 0.3464, 0.2484, 0.062, 0.4349],
      [4.25, 0.1224, 0.3823, 0.2594, 0.0703, 0.4484],
      [4.5, 0.1234, 0.4583, 0.2753, 0.0807, 0.4698],
      [4.75, 0.1385, 0.4604, 0.2888, 0.0807, 0.4969],
      [5.0, 0.2089, 0.4547, 0.3182, 0.1141, 0.5224],
      [5.25, 0.2167, 0.4589, 0.3271, 0.1156, 0.5385],
      [5.5, 0.2208, 0.4906, 0.344, 0.1307, 0.5573],
      [5.75, 0.225, 0.5573, 0.3529, 0.1328, 0.5729],
      [6.0, 0.2401, 0.5505, 0.368, 0.1495, 0.5865],
      [6.25, 0.2865, 0.5531, 0.3753, 0.1495, 0.601],
      [6.5, 0.2984, 0.549, 0.3956, 0.1792, 0.612],
      [6.75, 0.2984, 0.5443, 0.3995, 0.1792, 0.6198],
      [7.0, 0.2958, 0.5495, 0.4086, 0.1911, 0.626],
      [7.25, 0.2974, 0.5615, 0.4135, 0.1958, 0.6312],
      [7.5, 0.2943, 0.5557, 0.4174, 0.2031, 0.6318],
      [7.75, 0.2974, 0.5479, 0.4164, 0.2078, 0.625],
      [8.0, 0.3474, 0.5385, 0.4135, 0.2083, 0.6188],
      [8.25, 0.3448, 0.5344, 0.4115, 0.2083, 0.6146],
      [8.5, 0.3443, 0.5292, 0.4062, 0.2036, 0.6089],
      [8.75, 0.3604, 0.5245, 0.4018, 0.2031, 0.6005],
      [9.0, 0.2245, 0.5193, 0.3979, 0.2042, 0.5917],
      [9.25, 0.2214, 0.5172, 0.3953, 0.2068, 0.5839],
      [9.5, 0.2167, 0.5151, 0.3885, 0.2083, 0.5687],
      [9.75, 0.213, 0.513, 0.3812, 0.2083, 0.5542],
      [10.0, 0.2062, 0.5109, 0.375, 0.2042, 0.5458],
      [10.25, 0.2099, 0.5104, 0.3766, 0.2073, 0.5458],
      [10.5, 0.2271, 0.5104, 0.3831, 0.224, 0.5422],
      [10.75, 0.2339, 0.5094, 0.3891, 0.2328, 0.5453],
      [11.0, 0.2307, 0.5094, 0.3839, 0.2292, 0.5385],
      [11.25, 0.2307, 0.5099, 0.3826, 0.2276, 0.5375],
      [11.5, 0.2307, 0.5099, 0.3807, 0.226, 0.5354],
      [11.75, 0.2307, 0.5099, 0.3833, 0.2292, 0.5375],
      [12.0, 0.2297, 0.5099, 0.3841, 0.2271, 0.5411],
      [12.25, 0.2297, 0.5099, 0.3828, 0.2276, 0.538],
      [12.5, 0.2307, 0.5094, 0.3857, 0.2292, 0.5422],
      [12.75, 0.2307, 0.5094, 0.3875, 0.2292, 0.5458],
      [13.0, 0.2271, 0.5089, 0.3917, 0.225, 0.5583],
      [13.25, 0.224, 0.5078, 0.3935, 0.2203, 0.5667],
      [13.5, 0.2214, 0.5052, 0.4003, 0.2193, 0.5813],
      [13.75, 0.2255, 0.5036, 0.4081, 0.2203, 0.5958],
      [14.0, 0.213, 0.5427, 0.4094, 0.2104, 0.6083],
      [14.25, 0.2047, 0.5927, 0.4091, 0.2021, 0.6161],
      [14.5, 0.3464, 0.6141, 0.4229, 0.2104, 0.6354],
      [14.75, 0.3521, 0.6094, 0.4432, 0.224, 0.6625],
      [15.0, 0.3479, 0.6, 0.4607, 0.2328, 0.6885],
      [15.25, 0.3516, 0.6516, 0.4701, 0.2328, 0.7073],
      [15.5, 0.3589, 0.7161, 0.4977, 0.2651, 0.7302],
      [15.75, 0.4094, 0.7052, 0.5268, 0.2906, 0.763],
      [16.0, 0.401, 0.7, 0.5495, 0.3068, 0.7922],
      [16.25, 0.4094, 0.7906, 0.5651, 0.3135, 0.8167],
      [16.5, 0.4896, 0.8063, 0.5974, 0.3531, 0.8417],
      [16.75, 0.4938, 0.7979, 0.6133, 0.3573, 0.8693],
      [17.0, 0.4927, 0.8766, 0.6474, 0.3906, 0.9042],
      [17.25, 0.5234, 0.9234, 0.6578, 0.3906, 0.925],
      [17.5, 0.5927, 0.9135, 0.7148, 0.475, 0.9547],
      [17.75, 0.5062, 0.9036, 0.7336, 0.4917, 0.9755],
      [18.0, 0.5344, 0.9594, 0.7469, 0.5344, 0.9594]
    ];

    function getMaiseyTrackAt(timeSec) {
      if (timeSec <= MAISEY_TRACK[0][0]) return MAISEY_TRACK[0];
      if (timeSec >= MAISEY_TRACK[MAISEY_TRACK.length - 1][0]) return MAISEY_TRACK[MAISEY_TRACK.length - 1];

      let low = 0;
      let high = MAISEY_TRACK.length - 1;
      while (low <= high) {
        const mid = (low + high) >> 1;
        if (MAISEY_TRACK[mid][0] < timeSec) {
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }

      const p1 = MAISEY_TRACK[Math.max(0, low - 1)];
      const p2 = MAISEY_TRACK[Math.min(MAISEY_TRACK.length - 1, low)];
      const dt = p2[0] - p1[0];
      const ratio = dt > 0 ? (timeSec - p1[0]) / dt : 0;

      return [
        timeSec,
        p1[1] + (p2[1] - p1[1]) * ratio,
        p1[2] + (p2[2] - p1[2]) * ratio,
        p1[3] + (p2[3] - p1[3]) * ratio,
        p1[4] + (p2[4] - p1[4]) * ratio,
        p1[5] + (p2[5] - p1[5]) * ratio
      ];
    }

    let charElements = [];
    let topRowChars = [];
    let physicsRaf = null;

    function initMaiseyTextSplitting() {
      const firstP = document.querySelector('.about-text-flow p:first-child');
      if (!firstP || firstP.dataset.split) return;
      firstP.dataset.split = 'true';

      const text = firstP.textContent.trim();
      const words = text.split(/\s+/);
      firstP.innerHTML = words.map((word) => {
        const chars = Array.from(word).map((c) => `<span class="maisey-char">${c}</span>`).join('');
        return `<span class="maisey-word" style="display:inline-block;white-space:nowrap;">${chars}</span>`;
      }).join(' ');

      refreshTopRowChars();
    }

    function refreshTopRowChars() {
      charElements = Array.from(document.querySelectorAll('.about-text-flow p:first-child .maisey-char'));
      if (!charElements.length) return;
      const firstTop = charElements[0].getBoundingClientRect().top;
      topRowChars = charElements.filter((el) => {
        const rect = el.getBoundingClientRect();
        return Math.abs(rect.top - firstTop) < 18;
      });
    }

    function startMaiseyPhysics() {
      if (physicsRaf) cancelAnimationFrame(physicsRaf);
      refreshTopRowChars();

      function stepPhysics() {
        if (!maiseyVideo || maiseyVideo.paused || maiseyVideo.ended || !modal || !modal.classList.contains('active')) {
          resetMaiseyPhysics();
          return;
        }

        const t = maiseyVideo.currentTime;
        const track = getMaiseyTrackAt(t);
        const videoRect = maiseyVideo.getBoundingClientRect();

        if (videoRect.width > 0 && maiseyVideo.style.opacity === '1') {
          const pawLeft = videoRect.left + track[1] * videoRect.width;
          const pawRight = videoRect.left + track[2] * videoRect.width;

          for (let i = 0; i < topRowChars.length; i++) {
            const ch = topRowChars[i];
            const r = ch.getBoundingClientRect();
            const chMid = r.left + r.width / 2;
            if (chMid >= pawLeft - 4 && chMid <= pawRight + 4) {
              ch.classList.add('stepped');
            } else {
              ch.classList.remove('stepped');
            }
          }
        } else {
          resetMaiseyPhysics(false);
        }

        physicsRaf = requestAnimationFrame(stepPhysics);
      }

      physicsRaf = requestAnimationFrame(stepPhysics);
    }

    function resetMaiseyPhysics(cancel = true) {
      if (cancel && physicsRaf) {
        cancelAnimationFrame(physicsRaf);
        physicsRaf = null;
      }
      if (charElements.length) {
        charElements.forEach((ch) => ch.classList.remove('stepped'));
      }
    }

    function scheduleMaiseyWalk(delayMs = 10000) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (maiseyLoopTimer) {
        clearTimeout(maiseyLoopTimer);
        maiseyLoopTimer = null;
      }
      resetMaiseyPhysics();
      if (maiseyVideo) {
        maiseyVideo.style.opacity = '0';
        maiseyVideo.pause();
      }
      maiseyLoopTimer = setTimeout(() => {
        if (modal && modal.classList.contains('active')) {
          playMaiseyWalk();
        }
      }, delayMs);
    }

    function playMaiseyWalk() {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (maiseyVideo) {
        try {
          maiseyVideo.currentTime = 0;
          maiseyVideo.style.opacity = '1';
          const playPromise = maiseyVideo.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => { });
          }
          startMaiseyPhysics();
        } catch (err) { }
      }
    }

    function pauseMaiseyWalk() {
      if (maiseyLoopTimer) {
        clearTimeout(maiseyLoopTimer);
        maiseyLoopTimer = null;
      }
      resetMaiseyPhysics();
      if (maiseyVideo) {
        try {
          maiseyVideo.style.opacity = '0';
          maiseyVideo.pause();
        } catch (err) { }
      }
    }

    if (maiseyVideo) {
      maiseyVideo.addEventListener('ended', () => {
        maiseyVideo.style.opacity = '0';
        resetMaiseyPhysics();
        scheduleMaiseyWalk(10000);
      });
    }

    function openModal(sectionName, updateHistory = true) {
      if (!modal) return;
      lastModalTrigger = document.activeElement;
      closeBothMenus(0);
      initMaiseyTextSplitting();
      const target = sectionName || 'about';
      switchModalSection(target);
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');

      if (modalCloseBtn) {
        modalCloseBtn.focus();
      }

      if (target === 'about') {
        scheduleMaiseyWalk(5000);
      }

      if (updateHistory) {
        history.pushState({ modal: target }, '', `/${target}`);
      }
    }

    function closeModal(updateHistory = true) {
      if (!modal || !modal.classList.contains('active')) return;
      pauseMaiseyWalk();
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');

      if (lastModalTrigger && typeof lastModalTrigger.focus === 'function') {
        lastModalTrigger.focus();
      }

      if (updateHistory) {
        const curPath = window.location.pathname.replace(/\/$/, '');
        if (curPath === '/about' || curPath === '/contact' || window.location.hash) {
          history.pushState({}, '', '/');
        }
      }
    }

    function switchModalSection(sectionName) {
      initMaiseyTextSplitting();
      modalTabs.forEach((tab) => {
        const isTarget = tab.dataset.target === sectionName;
        tab.classList.toggle('active', isTarget);
        tab.setAttribute('aria-selected', String(isTarget));
      });

      modalSections.forEach((section) => {
        const isTarget = section.dataset.section === sectionName;
        section.classList.toggle('active', isTarget);
      });

      if (sectionName === 'about') {
        scheduleMaiseyWalk(5000);
      } else {
        pauseMaiseyWalk();
      }
    }

    navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.dataset.nav || 'about';
        openModal(target);
      });
    });

    const footerInquiryLink = document.getElementById('footer-inquiry-link');
    if (footerInquiryLink) {
      footerInquiryLink.addEventListener('click', (e) => {
        e.preventDefault();
        openModal('contact');
      });
    }

    modalTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        switchModalSection(tab.dataset.target);
        const target = tab.dataset.target;
        history.replaceState({ modal: target }, '', `/${target}`);
      });
    });

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', () => closeModal(true));
    if (modalBackdrop) modalBackdrop.addEventListener('click', () => closeModal(true));

    // --- Artwork Detail View Modal Controller ----------------------------
    const artworkModal = document.getElementById('artwork-modal');
    const artworkModalBackdrop = document.getElementById('artwork-modal-backdrop');
    const artworkModalCloseBtn = document.getElementById('artwork-modal-close-btn');
    const artworkModalTitle = document.getElementById('artwork-modal-title');
    const artworkModalImg = document.getElementById('artwork-modal-img');
    const artworkModalFrame = document.getElementById('artwork-modal-frame');
    const artworkModalFrameWrap = document.getElementById('artwork-modal-frame-wrap');
    const artworkModalMat = document.getElementById('artwork-modal-mat');
    const artworkSpecMedium = document.getElementById('artwork-spec-medium');
    const artworkSpecYear = document.getElementById('artwork-spec-year');
    const artworkSpecDimensions = document.getElementById('artwork-spec-dimensions');
    const artworkSpecAvail = document.getElementById('artwork-spec-avail');
    const artworkModalStory = document.getElementById('artwork-modal-story');
    const artworkInquireBtn = document.getElementById('artwork-inquire-btn');
    const artworkInstagramLink = document.getElementById('artwork-instagram-link');
    const artworkPrevBtn = document.getElementById('artwork-prev-btn');
    const artworkNextBtn = document.getElementById('artwork-next-btn');
    const artworkCounter = document.getElementById('artwork-counter');

    let currentArtworkIndex = 0;
    let lastArtworkTrigger = null;

    function updateArtworkModalContent(index) {
      const post = sorted[index];
      if (!post) return;
      currentArtworkIndex = index;

      if (artworkModalTitle) artworkModalTitle.textContent = post.title || 'Untitled Artwork';

      if (artworkSpecMedium) {
        artworkSpecMedium.textContent = post.medium || '';
        artworkSpecMedium.style.display = post.medium ? 'inline-block' : 'none';
      }
      if (artworkSpecYear) {
        artworkSpecYear.textContent = post.year || '';
        artworkSpecYear.style.display = post.year ? 'inline-block' : 'none';
      }
      if (artworkSpecDimensions) {
        artworkSpecDimensions.textContent = post.dimensions || '';
        artworkSpecDimensions.style.display = post.dimensions ? 'inline-block' : 'none';
      }
      if (artworkSpecAvail) {
        artworkSpecAvail.textContent = post.availability || 'Available for inquiry';
      }

      if (artworkModalStory) {
        artworkModalStory.textContent = post.story || '';
      }

      if (artworkModalImg) {
        artworkModalImg.src = post.webp ? post.webp.full : `assets/art/${post.filename}`;
        artworkModalImg.alt = post.alt || post.title || 'Artwork by Katherine Claye';
      }

      const isModern = currentFrameStyle === 'modern' && post.modern;
      const activeFrame = isModern ? post.modern : post;
      const frameSrc = isModern
        ? `assets/frames/modern_frames_webp/${post.modern.frame.replace(/\.[^/.]+$/, '')}.webp`
        : `assets/frames/webp/${post.frame}.webp`;

      if (artworkModalFrame) {
        artworkModalFrame.src = frameSrc;
      }

      if (artworkModalFrameWrap) {
        artworkModalFrameWrap.style.aspectRatio = String(activeFrame.aspectRatio || post.aspectRatio || 1);
      }

      if (artworkModalMat && activeFrame.mat) {
        artworkModalMat.style.top = `${activeFrame.mat.top}%`;
        artworkModalMat.style.left = `${activeFrame.mat.left}%`;
        artworkModalMat.style.width = `${activeFrame.mat.width}%`;
        artworkModalMat.style.height = `${activeFrame.mat.height}%`;
      }

      if (artworkInstagramLink) {
        artworkInstagramLink.href = post.url || 'https://www.instagram.com/kclaye_art/';
      }

      if (artworkCounter) {
        artworkCounter.textContent = `${index + 1} of ${sorted.length}`;
      }
    }

    function openArtworkModal(index) {
      if (!artworkModal) return;
      lastArtworkTrigger = document.activeElement;
      closeBothMenus(0);
      updateArtworkModalContent(index);
      artworkModal.classList.add('active');
      artworkModal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open', 'artwork-view-active');

      if (artworkModalCloseBtn) {
        artworkModalCloseBtn.focus();
      }
    }

    function closeArtworkModal() {
      if (!artworkModal || !artworkModal.classList.contains('active')) return;
      artworkModal.classList.remove('active');
      artworkModal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open', 'artwork-view-active');

      if (lastArtworkTrigger && typeof lastArtworkTrigger.focus === 'function') {
        lastArtworkTrigger.focus();
      }
    }

    if (artworkModalCloseBtn) artworkModalCloseBtn.addEventListener('click', closeArtworkModal);
    if (artworkModalBackdrop) artworkModalBackdrop.addEventListener('click', closeArtworkModal);

    if (artworkPrevBtn) {
      artworkPrevBtn.addEventListener('click', () => {
        const prevIdx = (currentArtworkIndex - 1 + sorted.length) % sorted.length;
        updateArtworkModalContent(prevIdx);
      });
    }

    if (artworkNextBtn) {
      artworkNextBtn.addEventListener('click', () => {
        const nextIdx = (currentArtworkIndex + 1) % sorted.length;
        updateArtworkModalContent(nextIdx);
      });
    }

    // --- Artwork Inquiry Action Pre-fill ---------------------------------
    if (artworkInquireBtn) {
      artworkInquireBtn.addEventListener('click', () => {
        const post = sorted[currentArtworkIndex];
        closeArtworkModal();
        openModal('contact');

        const msgInput = document.getElementById('contact-message');
        const subjectInput = document.getElementById('contact-subject');
        if (msgInput && post) {
          msgInput.value = `Hi Katherine,\n\nI'm inquiring about your artwork \"${post.title}\" (${post.year ? post.year + ', ' : ''}${post.medium || 'original'}). Could you please share more information regarding availability, details, and pricing?\n\nThank you!`;
          msgInput.focus();
        }
        if (subjectInput && post) {
          subjectInput.value = `Katherine Claye Art — Inquiry: ${post.title}`;
        }
      });
    }

    // --- Global Keyboard Handler (Escape, Arrows, Tab Trap) -------------

    document.addEventListener('keydown', (e) => {
      // 1. Modal close on Escape
      if (e.key === 'Escape') {
        if (artworkModal && artworkModal.classList.contains('active')) {
          closeArtworkModal();
          return;
        }
        if (modal && modal.classList.contains('active')) {
          closeModal(true);
          return;
        }
      }


      // 2. Tab focus trap
      if (e.key === 'Tab') {
        if (artworkModal && artworkModal.classList.contains('active')) {
          trapFocus(artworkModal, e);
        } else if (modal && modal.classList.contains('active')) {
          trapFocus(modal, e);
        }
      }

      // 3. Arrow key navigation in artwork detail modal
      if (artworkModal && artworkModal.classList.contains('active')) {
        if (e.key === 'ArrowLeft') {
          const prevIdx = (currentArtworkIndex - 1 + sorted.length) % sorted.length;
          updateArtworkModalContent(prevIdx);
        } else if (e.key === 'ArrowRight') {
          const nextIdx = (currentArtworkIndex + 1) % sorted.length;
          updateArtworkModalContent(nextIdx);
        }
      }
    });

    // --- SPA Direct-Link Routing Handler --------------------------------
    function handleRoute() {
      const rawPath = window.location.pathname.replace(/\/$/, '');
      const hash = window.location.hash;

      if (rawPath === '/about' || hash === '#about') {
        openModal('about', false);
      } else if (rawPath === '/contact' || hash === '#contact') {
        openModal('contact', false);
      } else {
        closeModal(false);
      }
    }

    // Check route on initial load
    handleRoute();
    window.addEventListener('popstate', handleRoute);

    // --- Contact Form Handling (FormSubmit Email Routing) ----------------
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('contact-submit-btn');

    if (contactForm) {
      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const nameInput = document.getElementById('contact-name');
        const emailInput = document.getElementById('contact-email');
        const msgInput = document.getElementById('contact-message');

        const name = (nameInput ? nameInput.value : '').trim();
        const email = (emailInput ? emailInput.value : '').trim();
        const msg = (msgInput ? msgInput.value : '').trim();

        if (!name || !email || !msg) {
          if (formStatus) {
            formStatus.className = 'form-status error';
            formStatus.textContent = 'Please complete all fields before sending.';
          }
          return;
        }

        if (submitBtn) {
          submitBtn.disabled = true;
          const btnText = submitBtn.querySelector('.btn-text');
          if (btnText) btnText.textContent = 'Sending...';
        }

        const formData = new FormData(contactForm);

        fetch('https://formsubmit.co/ajax/cgillis15@gmail.com', {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: formData
        })
          .then(async (response) => {
            const data = await response.json().catch(() => ({}));
            if (response.ok || data.success === 'true' || data.success === true) {
              if (formStatus) {
                formStatus.className = 'form-status success';
                formStatus.innerHTML = `<strong>Thank you!</strong> Your message has been sent to Katherine Claye.`;
              }
              contactForm.reset();
            } else {
              throw new Error(data.message || 'Submission failed');
            }
          })
          .catch((error) => {
            if (formStatus) {
              formStatus.className = 'form-status error';
              formStatus.innerHTML = `Unable to submit directly. Please send your message directly to <strong>cgillis15@gmail.com</strong>.`;
            }
          })
          .finally(() => {
            if (submitBtn) {
              submitBtn.disabled = false;
              const btnText = submitBtn.querySelector('.btn-text');
              if (btnText) btnText.textContent = 'send inquiry';
            }
          });
      });
    }

    // --- Auto-scroll Play Toggle ------------------------------------------
    const autoScrollBtn = document.getElementById('auto-scroll-toggle');
    let isAutoScrolling = false;
    let autoScrollRaf = null;
    let autoScrollStartTime = 0;

    function stopAutoScroll() {
      if (!isAutoScrolling) return;
      isAutoScrolling = false;
      document.body.classList.remove('is-autoscrolling');
      if (siteHeader) siteHeader.classList.remove('auto-scrolling', 'scrolled-down');
      if (autoScrollRaf) {
        cancelAnimationFrame(autoScrollRaf);
        autoScrollRaf = null;
      }
      if (autoScrollBtn) {
        autoScrollBtn.classList.remove('playing');
        autoScrollBtn.setAttribute('aria-pressed', 'false');
        autoScrollBtn.textContent = 'play';
        autoScrollBtn.setAttribute('aria-label', 'Toggle auto-scroll slideshow: currently paused');
      }
    }

    function startAutoScroll() {
      if (isAutoScrolling) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      isAutoScrolling = true;
      autoScrollStartTime = Date.now();

      document.body.classList.add('is-autoscrolling');
      if (siteHeader) siteHeader.classList.add('auto-scrolling', 'scrolled-down');
      closeBothMenus(0);

      if (autoScrollBtn) {
        autoScrollBtn.classList.add('playing');
        autoScrollBtn.setAttribute('aria-pressed', 'true');
        autoScrollBtn.textContent = 'pause';
        autoScrollBtn.setAttribute('aria-label', 'Toggle auto-scroll slideshow: currently playing');
      }

      const scrollSpeed = 1.1;
      let lastTime = performance.now();

      function step(now) {
        if (!isAutoScrolling) return;
        const dt = Math.min(now - lastTime, 50);
        lastTime = now;

        const maxScroll = Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.offsetHeight
        ) - window.innerHeight;

        const currentScroll = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;

        if (currentScroll >= maxScroll - 4) {
          stopAutoScroll();
          return;
        }

        const delta = (scrollSpeed * dt) / 16.67;
        window.scrollTo({
          top: currentScroll + delta,
          left: 0,
          behavior: 'instant'
        });

        autoScrollRaf = requestAnimationFrame(step);
      }

      autoScrollRaf = requestAnimationFrame(step);
    }

    if (autoScrollBtn) {
      autoScrollBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeBothMenus(0);
        if (document.activeElement && typeof document.activeElement.blur === 'function') {
          document.activeElement.blur();
        }

        if (isAutoScrolling) {
          stopAutoScroll();
        } else {
          startAutoScroll();
        }
      });

      window.addEventListener('wheel', (e) => {
        if (isAutoScrolling && Date.now() - autoScrollStartTime > 600 && Math.abs(e.deltaY) > 3) {
          stopAutoScroll();
        }
      }, { passive: true });

      let touchStartY = 0;
      window.addEventListener('touchstart', (e) => {
        if (e.touches && e.touches[0]) {
          touchStartY = e.touches[0].clientY;
        }
      }, { passive: true });

      window.addEventListener('touchmove', (e) => {
        if (isAutoScrolling && Date.now() - autoScrollStartTime > 800) {
          if (e.touches && e.touches[0] && Math.abs(e.touches[0].clientY - touchStartY) > 20) {
            stopAutoScroll();
          }
        }
      }, { passive: true });

      window.addEventListener('keydown', (e) => {
        if (isAutoScrolling && ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Space'].includes(e.code)) {
          stopAutoScroll();
        }
      });
    }

    // --- Frame style toggle (Eclectic <-> Modern) -------------------------
    const frameStyleToggle = document.getElementById('frame-style-toggle');
    let currentFrameStyle = 'eclectic';

    if (frameStyleToggle) {
      frameStyleToggle.setAttribute('aria-pressed', 'false');
      frameStyleToggle.setAttribute('aria-label', 'Toggle frame style: currently eclectic');

      frameStyleToggle.addEventListener('click', () => {
        currentFrameStyle = currentFrameStyle === 'eclectic' ? 'modern' : 'eclectic';
        const isModern = currentFrameStyle === 'modern';
        frameStyleToggle.classList.toggle('modern', isModern);
        frameStyleToggle.setAttribute('aria-pressed', String(isModern));
        frameStyleToggle.setAttribute('aria-label', `Toggle frame style: currently ${currentFrameStyle}`);

        items.forEach((item, index) => {
          const post = sorted[index];
          const wrapDiv = item.el.querySelector('.art-frame-wrap');
          const frameImg = item.el.querySelector('.frame-overlay');
          const matDiv = item.el.querySelector('.art-mat');

          const staggerDelay = index * 35;
          setTimeout(() => {
            item.el.classList.add('frame-switching');

            setTimeout(() => {
              frameImg.style.opacity = '0';

              if (currentFrameStyle === 'modern' && post.modern) {
                frameImg.src = `assets/frames/modern_frames_webp/${post.modern.frame.replace(/\.[^/.]+$/, '')}.webp`;
                matDiv.style.top = `${post.modern.mat.top}%`;
                matDiv.style.left = `${post.modern.mat.left}%`;
                matDiv.style.width = `${post.modern.mat.width}%`;
                matDiv.style.height = `${post.modern.mat.height}%`;
                item.aspect = post.modern.aspectRatio || post.aspectRatio;
                wrapDiv.style.aspectRatio = String(item.aspect);
              } else {
                frameImg.src = `assets/frames/webp/${post.frame}.webp`;
                if (post.mat) {
                  matDiv.style.top = `${post.mat.top}%`;
                  matDiv.style.left = `${post.mat.left}%`;
                  matDiv.style.width = `${post.mat.width}%`;
                  matDiv.style.height = `${post.mat.height}%`;
                } else {
                  matDiv.style.inset = '12%';
                }
                item.aspect = post.aspectRatio;
                wrapDiv.style.aspectRatio = String(item.aspect);
              }

              requestAnimationFrame(() => {
                frameImg.style.opacity = '1';
              });
            }, 160);

            setTimeout(() => {
              item.el.classList.remove('frame-switching');
            }, 550);
          }, staggerDelay);
        });

        setTimeout(() => {
          layout(true);
        }, 200);

        // If artwork modal is currently open, update its frame as well
        if (artworkModal && artworkModal.classList.contains('active')) {
          updateArtworkModalContent(currentArtworkIndex);
        }
      });
    }

  })();
