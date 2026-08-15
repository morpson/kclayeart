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
  // Show the touch-hint for ~3s after the intro finishes, then fade it out.
  const touchHint = document.getElementById('touch-hint');
  if (touchHint) {
    // Appear as soon as the intro fades (~3.9s)
    setTimeout(() => {
      touchHint.classList.add('visible');
    }, 3900);

    // Fade out 3s later (6.9s total), then fully remove from paint
    setTimeout(() => {
      touchHint.classList.remove('visible');
      touchHint.classList.add('fadeout');
      // After the fade transition ends, hide it completely
      touchHint.addEventListener('transitionend', () => {
        touchHint.style.display = 'none';
      }, { once: true });
    }, 6900);
  }

  setTimeout(() => {
    if (siteHeader) siteHeader.classList.add('visible');
    if (gallery)    gallery.classList.add('visible');
  }, 3900);

  // --- Gallery build ---------------------------------------------------
  if (typeof POSTS_DATA === 'undefined' || !gallery) return;

  const sorted = [...POSTS_DATA].sort((a, b) => b.likes - a.likes);

  const items = sorted.map((post) => {
    const link  = document.createElement('a');
    link.href   = post.url;
    link.target = '_blank';
    link.rel    = 'noopener noreferrer';
    link.className = 'art-link';

    const wrap = document.createElement('div');
    wrap.className = 'art-frame-wrap';

    const art = document.createElement('img');
    art.className = 'artwork';
    art.src       = `assets/art/${post.filename}`;
    art.alt       = 'Artwork by Katherine Claye';

    const frame = document.createElement('img');
    frame.className = 'frame-overlay';
    frame.src       = `assets/frames/${post.frame}.png`;
    frame.alt       = '';
    frame.setAttribute('aria-hidden', 'true');
    frame.loading   = 'lazy';

    wrap.appendChild(art);
    wrap.appendChild(frame);
    link.appendChild(wrap);
    gallery.appendChild(link);
    return link;
  });

  // --- Layout engine ---------------------------------------------------

  // Layout modes:
  //   'auto'  → shortest-column masonry, col count from viewport width
  //   '3col'  → fixed 3 columns, shortest-column fill
  //   '1col'  → single centred column

  let layoutMode = localStorage.getItem('kc-layout') || 'auto';

  // The CSS --gap custom property value (px) — read once
  function getGap() {
    const raw = getComputedStyle(document.documentElement)
                  .getPropertyValue('--gap').trim();
    return parseFloat(raw) || 60;
  }

  function colCount() {
    if (layoutMode === '1col') return 1;
    if (layoutMode === '3col') return 3;
    // 'auto': responsive
    const w = window.innerWidth;
    if (w <= 640)  return 1;
    if (w <= 1100) return 2;
    return 3;
  }

  function innerContentWidth() {
    const style = getComputedStyle(gallery);
    const pl    = parseFloat(style.paddingLeft)  || 0;
    const pr    = parseFloat(style.paddingRight) || 0;
    return gallery.offsetWidth - pl - pr;
  }

  function layout(animate) {
    const cols    = colCount();
    const gap     = getGap();
    const totalW  = innerContentWidth();
    // Column width accounts for gaps between columns
    const cw      = (totalW - gap * (cols - 1)) / cols;

    const lp = parseFloat(getComputedStyle(gallery).paddingLeft)  || 0;
    const tp = parseFloat(getComputedStyle(gallery).paddingTop)   || 0;
    const bp = parseFloat(getComputedStyle(gallery).paddingBottom)|| 0;

    // For single column, centre it horizontally
    const singleColOffset = cols === 1
      ? (totalW - cw) / 2
      : 0;

    const heights = new Array(cols).fill(tp);

    if (!animate) gallery.classList.add('resizing');

    items.forEach((link) => {
      link.style.width = `${cw}px`;

      const minH   = Math.min(...heights);
      const colIdx = heights.indexOf(minH);
      const x      = lp + singleColOffset + colIdx * (cw + gap);
      const y      = minH;

      link.style.transform = `translate(${x}px, ${y}px)`;
      heights[colIdx] += link.getBoundingClientRect().height + gap;
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

  function setLayout(mode, btn) {
    layoutMode = mode;
    localStorage.setItem('kc-layout', mode);

    sortBtns.forEach((b) => {
      const active = b === btn;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', String(active));
    });

    layout(false); // snap to new layout
  }

  // Restore saved mode on load
  sortBtns.forEach((btn) => {
    const mode = btn.dataset.layout;
    if (mode === layoutMode) {
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
    } else {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
    }
    btn.addEventListener('click', () => setLayout(mode, btn));
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
  // both nav labels simultaneously. Remove on mouse-leave or outside click.
  const artistWrap = document.getElementById('artist-name-wrap');

  if (artistWrap) {
    artistWrap.addEventListener('mouseenter', () => {
      artistWrap.classList.add('hovered');
    });
    artistWrap.addEventListener('mouseleave', () => {
      artistWrap.classList.remove('hovered');
    });

    // Touch / click toggle for mobile
    artistWrap.addEventListener('click', (e) => {
      if (e.target.closest('.artist-nav__link')) return; // let nav links fire
      artistWrap.classList.toggle('hovered');
    });

    document.addEventListener('click', (e) => {
      if (!artistWrap.contains(e.target)) {
        artistWrap.classList.remove('hovered');
      }
    });
  }

})();
