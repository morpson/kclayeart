// Portfolio data — sorted by likes descending, then chronologically.
// Each entry maps an artwork image to its assigned frame PNG.
// Frame chosen by closest aspect ratio match; varied to avoid repetition.
const POSTS_DATA = [
  {
    filename: "2025-12-24_18-35-41_UTC_1.jpg",
    url: "https://www.instagram.com/p/DTOASKgj-8P/",
    likes: 40,
    frame: "frame-portrait-ornate"      // art 0.750 → closest 0.781, diff 0.031
  },
  {
    filename: "2025-04-18_04-43-29_UTC_1.jpg",
    url: "https://www.instagram.com/p/DIky7FFMuHE/",
    likes: 33,
    frame: "frame-portrait-silver"      // art 0.802 → 0.831, diff 0.029 (vary from ornate)
  },
  {
    filename: "2026-04-08_00-54-33_UTC_1.jpg",
    url: "https://www.instagram.com/p/DSqA5IED9PF/",
    likes: 31,
    frame: "frame-portrait-gold"        // art 0.804 → 0.832, diff 0.028 (vary)
  },
  {
    filename: "2026-01-07_18-03-02_UTC_1.jpg",
    url: "https://www.instagram.com/p/DW2e7CPDLsH/",
    likes: 0,
    frame: "frame-landscape-wide"       // art 1.802 → 1.805, diff 0.003 (IMG_4918 rotated+cropped)
  },
  {
    filename: "2025-11-07_18-19-59_UTC_1.jpg",
    url: "https://www.instagram.com/p/DQw9u-mDyCd/",
    likes: 0,
    frame: "frame-portrait-baroque"     // art 0.779 → 0.835, diff 0.056 (vary from ornate)
  },
  {
    filename: "2025-08-15_19-35-57_UTC_1.jpg",
    url: "https://www.instagram.com/p/DNYzp3yvwaO/",
    likes: 0,
    frame: "frame-tall-narrow"          // art 0.769 → 0.840, diff 0.071
  },
  {
    filename: "2025-07-05_18-03-24_UTC_1.jpg",
    url: "https://www.instagram.com/p/DLvEeHBvoD-/",
    likes: 0,
    frame: "frame-portrait-ornate"      // art 0.800 → 0.781, diff 0.019 (best match)
  },
  {
    filename: "2025-04-25_17-30-58_UTC_1.jpg",
    url: "https://www.instagram.com/p/DI4MUamABrq/",
    likes: 0,
    frame: "frame-landscape-c"          // art 1.333 → landscape frame (IMG_4919 rotated, ratio 1.414)
  },
  {
    filename: "2025-02-06_14-32-37_UTC_1.jpg",
    url: "https://www.instagram.com/p/DFvB59eAUpK/",
    likes: 0,
    frame: "frame-portrait-silver"      // art 0.810 → 0.831, diff 0.021 (best match)
  },
  {
    filename: "2024-12-02_23-06-54_UTC_1.jpg",
    url: "https://www.instagram.com/p/DDGAS6TP-V-/",
    likes: 0,
    frame: "frame-tall-narrow"          // art 0.891 → 0.840, diff 0.051 (best match)
  }
];
