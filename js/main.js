/* ============================================================
   Katherine Claye Art — main.js
   ============================================================ */

(function () {
  'use strict';

  // --- Theme -----------------------------------------------------------
  const html   = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const saved  = localStorage.getItem('kc-theme') || 'light';
  html.setAttribute('data-theme', saved);

  toggle.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('kc-theme', next);
  });

  // --- Intro animation -------------------------------------------------
  const introEl = document.querySelector('.intro-text');
  if (introEl) {
    const raw = introEl.textContent;
    introEl.textContent = '';
    Array.from(raw).forEach((ch, i) => {
      const span = document.createElement('span');
      span.className   = 'letter';
      span.textContent = ch === ' ' ? '\u00A0' : ch;
      span.style.animationDelay = `${0.3 + i * 0.055}s`;
      introEl.appendChild(span);
    });
  }

  // Fade in persistent header and gallery after intro (3.9s total)
  const siteHeader = document.getElementById('site-header');
  const gallery    = document.getElementById('gallery');

  // --- Touch-hint overlay -----------------------------------------------
  // Show the touch-hint for ~3.5s after the intro finishes, then fade it out.
  const touchHint = document.getElementById('touch-hint');
  if (touchHint) {
    // Appear as soon as the intro fades (~3.9s)
    setTimeout(() => {
      touchHint.classList.add('visible');
    }, 3900);

    // Fade out 3.5s later (7.4s total), then fully remove from paint
    setTimeout(() => {
      touchHint.classList.remove('visible');
      touchHint.classList.add('fadeout');
      // After the fade transition ends, hide it completely
      touchHint.addEventListener('transitionend', () => {
        touchHint.style.display = 'none';
      }, { once: true });
    }, 7400);
  }

  setTimeout(() => {
    if (siteHeader) siteHeader.classList.add('visible');
    if (gallery)    gallery.classList.add('visible');
  }, 3900);

  // --- Header scroll fade -----------------------------------------------
  // Fades toolbar slightly when scrolling down; restores full visibility when scrolling up or at top
  let lastScrollY = window.scrollY || 0;
  let scrollTicking = false;

  function updateHeaderScroll() {
    const currentY = window.scrollY || 0;
    const delta = currentY - lastScrollY;

    if (siteHeader && siteHeader.classList.contains('visible')) {
      if (currentY <= 20) {
        siteHeader.classList.remove('scrolled-down');
        if (typeof frameTooltip !== 'undefined' && frameTooltip && !frameTooltipHiddenPermanently) {
          frameTooltip.classList.add('visible');
        }
      } else if (delta > 6 && currentY > 60) {
        // Scrolling down
        siteHeader.classList.add('scrolled-down');
        if (typeof frameTooltip !== 'undefined' && frameTooltip) {
          frameTooltip.classList.remove('visible');
        }
      } else if (delta < -6) {
        // Scrolling up
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

  // --- Gallery build ---------------------------------------------------
  if (typeof POSTS_DATA === 'undefined' || !gallery) return;

  const sorted = [...POSTS_DATA];

  const items = sorted.map((post) => {
    const aspect = post.aspectRatio || 1;
    const link  = document.createElement('a');
    link.href   = post.url;
    link.target = '_blank';
    link.rel    = 'noopener noreferrer';
    link.className = 'art-link';
    link.dataset.aspect = String(aspect);

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
    art.src       = `assets/art/${post.filename}`;
    art.alt       = 'Artwork by Katherine Claye';
    art.loading   = 'lazy';

    const frame = document.createElement('img');
    frame.className = 'frame-overlay';
    frame.src       = `assets/frames/${post.frame}.png`;
    frame.alt       = '';
    frame.setAttribute('aria-hidden', 'true');
    frame.loading   = 'lazy';

    mat.appendChild(art);
    wrap.appendChild(mat);
    wrap.appendChild(frame);
    link.appendChild(wrap);
    gallery.appendChild(link);
    return { el: link, aspect: aspect };
  });

  // --- Layout engine ---------------------------------------------------

  // Breakpoints for auto column selection:
  //   < 680px   → 1 col
  //   680–1099px → 2 col
  //   ≥ 1100px  → 3 col
  // Manual button clicks override auto within the current breakpoint tier.
  // Crossing into a new tier resets the override so auto resumes.

  function autoTier() {
    const w = window.innerWidth;
    if (w >= 1100) return '3col';
    if (w >= 680)  return '2col';
    return '1col';
  }

  // The CSS --gap custom property value (px) — read once
  function getGap() {
    const raw = getComputedStyle(document.documentElement)
                  .getPropertyValue('--gap').trim();
    return parseFloat(raw) || 60;
  }

  // Track whether the user manually chose a layout within the current tier
  let manualOverrideTier = null;
  let layoutMode = autoTier();

  // Restore any saved manual choice, but only if still in the same breakpoint tier
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
    const pl    = parseFloat(style.paddingLeft)  || 0;
    const pr    = parseFloat(style.paddingRight) || 0;
    return gallery.offsetWidth - pl - pr;
  }

  function layout(animate) {
    const cols   = colCount();
    const gap    = getGap();
    const totalW = innerContentWidth();
    const cw     = (totalW - gap * (cols - 1)) / cols;

    const lp = parseFloat(getComputedStyle(gallery).paddingLeft)  || 0;
    const tp = parseFloat(getComputedStyle(gallery).paddingTop)   || 0;
    const bp = parseFloat(getComputedStyle(gallery).paddingBottom)|| 0;

    // Centre single-column layout horizontally
    const singleColOffset = cols === 1 ? (totalW - cw) / 2 : 0;

    const heights = new Array(cols).fill(tp);

    if (!animate) gallery.classList.add('resizing');

    items.forEach((item) => {
      const link   = item.el;
      const aspect = item.aspect || 1;
      const itemH  = cw / aspect;

      link.style.width  = `${cw}px`;
      link.style.height = `${itemH}px`;

      const minH   = Math.min(...heights);
      const colIdx = heights.indexOf(minH);
      const x      = lp + singleColOffset + colIdx * (cw + gap);
      const y      = minH;

      link.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      heights[colIdx] += itemH + gap;
    });

    gallery.style.height = `${Math.max(...heights) - gap + bp}px`;

    if (!animate) {
      requestAnimationFrame(() =>
        requestAnimationFrame(() => gallery.classList.remove('resizing'))
      );
    }
  }

  // --- Sort / layout buttons -------------------------------------------
  const sortBtns = document.querySelectorAll('.sort-btn');

  function updateButtonUI() {
    sortBtns.forEach((b) => {
      const active = b.dataset.layout === layoutMode;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', String(active));
    });
  }

  function setLayout(mode, isManual = true) {
    layoutMode = mode;
    if (isManual) {
      manualOverrideTier = autoTier();
      localStorage.setItem('kc-layout', mode);
      localStorage.setItem('kc-layout-tier', manualOverrideTier);
    }
    updateButtonUI();
    // Use animate=true for smooth re-arranging when manually triggered
    layout(isManual);
  }

  // Wire up buttons
  sortBtns.forEach((btn) => {
    const mode = btn.dataset.layout;
    btn.addEventListener('click', () => setLayout(mode, true));
  });
  updateButtonUI();

  // On resize: if breakpoint tier changed, reset override and apply auto
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

  // --- Wait for images, then run first layout --------------------------
  const artImgs = Array.from(gallery.querySelectorAll('img.artwork'));
  let loadedN   = 0;
  let firstLayoutDone = false;

  function onImgReady() {
    loadedN++;
    if (loadedN >= artImgs.length && !firstLayoutDone) {
      firstLayoutDone = true;
      layout(false);
      // Only add visible here if the intro timer hasn't already done it
      gallery.classList.add('visible');
      if (siteHeader) siteHeader.classList.add('visible');
    }
  }

  artImgs.forEach((img) => {
    if (img.complete && img.naturalWidth > 0) {
      onImgReady();
    } else {
      img.addEventListener('load',  onImgReady);
      img.addEventListener('error', onImgReady);
    }
  });

  // After intro: show gallery (images may or may not be loaded yet).
  // If images already loaded, firstLayoutDone is true and layout is good.
  // If images are still loading, show the gallery anyway and re-layout
  // when the last one finishes (onImgReady will still fire).
  setTimeout(() => {
    if (siteHeader) siteHeader.classList.add('visible');
    gallery.classList.add('visible');
    // If no images loaded yet at all, do a best-effort layout now
    if (!firstLayoutDone) layout(false);
  }, 3900);

  // --- ResizeObserver for smooth responsive reflow ---------------------
  let prevCols    = colCount();
  let rafPending  = false;
  let resizeTimer = null;

  const ro = new ResizeObserver(() => {
    if (rafPending) return;
    rafPending = true;

    requestAnimationFrame(() => {
      rafPending = false;
      const newCols    = colCount();
      const colChanged = newCols !== prevCols;
      prevCols = newCols;

      if (colChanged) {
        layout(false); // snap on column count change
      } else {
        gallery.classList.add('resizing');
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          layout(true);
          requestAnimationFrame(() =>
            requestAnimationFrame(() => gallery.classList.remove('resizing'))
          );
        }, 60);
      }
    });
  });

  ro.observe(gallery);

  // --- Artist-name hover state -----------------------------------------
  // On hover/touch, add .hovered to pause the cycle animation and show
  // both nav labels simultaneously. Includes grace period on mouseleave.
  const artistWrap = document.getElementById('artist-name-wrap');
  let hoverLeaveTimer = null;

  if (artistWrap) {
    artistWrap.addEventListener('mouseenter', () => {
      clearTimeout(hoverLeaveTimer);
      artistWrap.classList.add('hovered');
    });

    artistWrap.addEventListener('mouseleave', () => {
      clearTimeout(hoverLeaveTimer);
      hoverLeaveTimer = setTimeout(() => {
        artistWrap.classList.remove('hovered');
      }, 400); // 400ms grace window prevents menu from snapping shut on quick mouse movement
    });

    // Touch / tap toggle for mobile
    function toggleHover(e) {
      if (e.target.closest('.artist-nav__link')) return; // let nav links fire
      if (e.stopPropagation) e.stopPropagation();
      artistWrap.classList.toggle('hovered');
    }

    artistWrap.addEventListener('click', toggleHover);
    artistWrap.addEventListener('touchend', (e) => {
      if (e.target.closest('.artist-nav__link')) return;
      e.preventDefault();
      toggleHover(e);
    }, { passive: false });

    // Dismiss when tapping outside
    document.addEventListener('click', (e) => {
      if (!artistWrap.contains(e.target)) {
        clearTimeout(hoverLeaveTimer);
        artistWrap.classList.remove('hovered');
      }
    });
    document.addEventListener('touchstart', (e) => {
      if (!artistWrap.contains(e.target)) {
        clearTimeout(hoverLeaveTimer);
        artistWrap.classList.remove('hovered');
      }
    }, { passive: true });
  }

  // --- Glass Modal Controller (About & Contact) ------------------------
  const modal         = document.getElementById('glass-modal');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTabs     = document.querySelectorAll('.glass-modal__tab');
  const modalSections = document.querySelectorAll('.glass-modal__section');
  const navLinks      = document.querySelectorAll('.artist-nav__link');

  function openModal(sectionName) {
    if (!modal) return;
    switchModalSection(sectionName || 'about');
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (window.location.hash === '#about' || window.location.hash === '#contact') {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }

  function switchModalSection(sectionName) {
    modalTabs.forEach((tab) => {
      const isTarget = tab.dataset.target === sectionName;
      tab.classList.toggle('active', isTarget);
      tab.setAttribute('aria-selected', String(isTarget));
    });

    modalSections.forEach((section) => {
      const isTarget = section.dataset.section === sectionName;
      section.classList.toggle('active', isTarget);
    });
  }

  // Navigation link click triggers (header ABOUT / CONTACT)
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.dataset.nav || 'about';
      openModal(target);
    });
  });

  // Modal in-card tabs click triggers
  modalTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      switchModalSection(tab.dataset.target);
    });
  });

  // Close handlers
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closeModal);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Open modal if page is loaded with hash #about or #contact
  if (window.location.hash === '#about') {
    openModal('about');
  } else if (window.location.hash === '#contact') {
    openModal('contact');
  }

  // --- Contact Form Handling (FormSubmit Email Routing) ----------------
  const contactForm = document.getElementById('contact-form');
  const formStatus  = document.getElementById('form-status');
  const submitBtn   = document.getElementById('contact-submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameInput  = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const msgInput   = document.getElementById('contact-message');

      const name  = (nameInput ? nameInput.value : '').trim();
      const email = (emailInput ? emailInput.value : '').trim();
      const msg   = (msgInput ? msgInput.value : '').trim();

      if (!name || !email || !msg) {
        if (formStatus) {
          formStatus.className = 'form-status error';
          formStatus.textContent = 'Please fill out all fields before sending.';
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
        headers: {
          'Accept': 'application/json'
        },
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
          formStatus.innerHTML = `Unable to send message directly. Please try again or email <strong>cgillis15@gmail.com</strong>.`;
        }
      })
      .finally(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          const btnText = submitBtn.querySelector('.btn-text');
          if (btnText) btnText.textContent = 'Send';
        }
      });
    });
  }

  // --- Frame style toggle -----------------------------------------------
  const frameStyleToggle = document.getElementById('frame-style-toggle');
  const frameTooltip = document.getElementById('frame-toggle-tooltip');
  let currentFrameStyle = 'eclectic';
  window.frameTooltipHiddenPermanently = false;

  if (frameStyleToggle) {
    frameStyleToggle.addEventListener('click', () => {
      window.frameTooltipHiddenPermanently = true;
      if (frameTooltip) frameTooltip.classList.remove('visible');

      currentFrameStyle = currentFrameStyle === 'eclectic' ? 'modern' : 'eclectic';
      frameStyleToggle.classList.toggle('modern', currentFrameStyle === 'modern');

      items.forEach((item, index) => {
        const post = sorted[index];
        const artAspect = post.aspectRatio || 1;
        const frameImg = item.el.querySelector('.frame-overlay');
        const matDiv = item.el.querySelector('.art-mat');

        if (currentFrameStyle === 'modern') {
          let bestFit = MODERN_FRAMES[0];
          let bestDiff = Infinity;

          MODERN_FRAMES.forEach(mf => {
            const diff = Math.abs(mf.aspectRatio - artAspect);
            if (diff < bestDiff) {
              bestDiff = diff;
              bestFit = mf;
            }
          });

          frameImg.src = `assets/frames/modern frames/${bestFit.filename}`;
          matDiv.style.top = `${bestFit.mat.top}%`;
          matDiv.style.left = `${bestFit.mat.left}%`;
          matDiv.style.width = `${bestFit.mat.width}%`;
          matDiv.style.height = `${bestFit.mat.height}%`;
        } else {
          // Revert to eclectic
          frameImg.src = `assets/frames/${post.frame}.png`;
          if (post.mat) {
            matDiv.style.top = `${post.mat.top}%`;
            matDiv.style.left = `${post.mat.left}%`;
            matDiv.style.width = `${post.mat.width}%`;
            matDiv.style.height = `${post.mat.height}%`;
          } else {
            matDiv.style.inset = '12%';
            matDiv.style.width = 'auto';
            matDiv.style.height = 'auto';
          }
        }
      });
    });
  }

})();

