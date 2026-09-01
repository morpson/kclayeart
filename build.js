#!/usr/bin/env node
/**
 * build.js — Cache-busting script for kclayeart
 *
 * Reads each versioned asset, computes a short content hash,
 * and rewrites the query strings in index.html so browsers
 * always fetch the latest version after a deployment.
 *
 * Run automatically by Netlify via the build command in netlify.toml.
 */

const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const ROOT = __dirname;
const INDEX = path.join(ROOT, 'index.html');

// Files to version-bust, relative to ROOT
const ASSETS = [
  'css/style.css',
  'js/data.js',
  'js/main.js',
];

/**
 * Returns the first 8 hex characters of the SHA-256 hash of a file's contents.
 */
function hashFile(filePath) {
  const contents = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(contents).digest('hex').slice(0, 8);
}

let html = fs.readFileSync(INDEX, 'utf8');
let changed = false;

for (const asset of ASSETS) {
  const fullPath = path.join(ROOT, asset);

  if (!fs.existsSync(fullPath)) {
    console.warn(`[cache-bust] WARNING: asset not found, skipping: ${asset}`);
    continue;
  }

  const hash = hashFile(fullPath);

  // Match src/href attributes that reference this asset, with or without an
  // existing query string.  Examples:
  //   href="css/style.css"
  //   href="css/style.css?v=6"
  //   src="js/main.js?v=abcd1234"
  const escaped = asset.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`((?:src|href)="${escaped})(?:\\?[^"]*)?(")`,'g');
  const replacement = `$1?v=${hash}$2`;

  // Check if the pattern even matches before replacing
  const testMatch = pattern.test(html);
  // Reset lastIndex after test()
  pattern.lastIndex = 0;

  if (!testMatch) {
    console.warn(`[cache-bust] WARNING: no reference to "${asset}" found in index.html`);
    continue;
  }

  const updated = html.replace(pattern, replacement);

  if (updated !== html) {
    console.log(`[cache-bust] ${asset}  →  ?v=${hash}  (updated)`);
    html = updated;
    changed = true;
  } else {
    console.log(`[cache-bust] ${asset}  →  ?v=${hash}  (already current)`);
  }
}

if (changed) {
  fs.writeFileSync(INDEX, html, 'utf8');
  console.log('[cache-bust] index.html updated.');
} else {
  console.log('[cache-bust] index.html already up to date.');
}
