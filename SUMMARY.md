# Katherine Claye Art — Instagram Thumbnail Grid Side Project Summary

## Overview
This side-project created an interactive, full-archive thumbnail selection grid from the **`@kclaye_art`** Instagram account. It allows reviewing all posted artwork in feed order, selecting specific images, and submitting the chosen item numbers directly via email.

---

## What Was Built

### 1. Complete Instagram Data & Asset Pull
- Downloaded and archived the full history of **79 posts** spanning from **July 2018 to April 2026** into `assets/art/` and `data/instagram_all_posts.json`.
- Processed all multi-image carousel posts into individual slides, totaling **145 high-resolution artwork images**.

### 2. Interactive Thumbnail Grid (`grid.html`)
- **Layout**: Clean, responsive 3/4-column dark-mode Instagram-style square grid.
- **Natural Feed Order**:
  - Displays images in reverse-chronological feed order (Post **#1** = newest post to Post **#79** = earliest post).
  - Multi-image posts are numbered with slide counts (e.g. `#1 [1/4]`, `#1 [2/4]`, `#3 [1/10]`), while single-image posts are labeled `#<PostNumber>` (e.g. `#14`).
- **Interactive Checkbox Selection**:
  - Tap or click any card / checkbox to select or deselect images.
  - Selected state features a distinct blue border, glow, and checkmark badge.
  - Direct Instagram button on each tile to open the live post on Instagram in a new tab without toggling selection.
- **Sticky Bottom Action Bar**:
  - Live selection counter (e.g., `X of 145 selected`).
  - Quick action buttons: **Select All** and **Clear**.
  - **Email Submission Button**: Formats the selected item numbers, image filenames, and direct Instagram links, copies them to the clipboard, and opens the default email client addressed to `gcmayson@icloud.com`.

### 3. Builder Script (`build_grid.py`)
- Python script that reads the post metadata in `data/instagram_all_posts.json`, naturally sorts multi-image slides, and regenerates `grid.html` with clean HTML/CSS/JS.

### 4. GitHub Sync & Netlify Protection
- All 145 artwork images, metadata files, builder script, and `grid.html` are synced and version-controlled on GitHub (**`morpson/kclayeart`**).
- **`netlify.toml` Redirects**: Configured with strict `404` rules for `/grid.html` and `deploy_grid/*` so the side-project remains private and is not exposed or served on the live `kclayeart` Netlify domain.

---

## File Reference
- [`grid.html`](grid.html): Standalone interactive thumbnail selection grid.
- [`build_grid.py`](build_grid.py): Generator script for rebuilding the grid.
- [`data/instagram_all_posts.json`](data/instagram_all_posts.json): Complete structured metadata for all 79 posts and 145 images.
- [`netlify.toml`](netlify.toml): Netlify configuration and security redirect rules.
