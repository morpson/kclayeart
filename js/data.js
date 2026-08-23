// Portfolio data — Curated selection of 22 artworks from @kclaye_art Instagram
// Each item includes its verified Instagram post URL, frame overlay, and precise inner mat window specifications.
const POSTS_DATA = [
  {
    "filename": "2025-12-24_18-35-41_utc_1.jpg",
    "url": "https://www.instagram.com/p/DSqA5IED9PF/",
    "likes": 45,
    "frame": "1frame",
    "aspectRatio": 0.75,
    "mat": {
      "top": 18.55,
      "left": 19.97,
      "width": 59.78,
      "height": 63.4
    }
  },
  {
    "filename": "2026-04-08_00-54-33_utc_1.jpg",
    "url": "https://www.instagram.com/p/DW2e7CPDLsH/",
    "likes": 44,
    "frame": "frame-portrait-baroque",
    "aspectRatio": 0.8351,
    "mat": {
      "top": 14.96,
      "left": 17.92,
      "width": 64.42,
      "height": 70.42
    }
  },
  {
    "filename": "2025-11-07_18-19-59_utc_1.jpg",
    "url": "https://www.instagram.com/p/DQw9u-mDyCd/",
    "likes": 43,
    "frame": "frame-portrait-silver",
    "aspectRatio": 0.8306,
    "mat": {
      "top": 15.37,
      "left": 19.3,
      "width": 60.6,
      "height": 69.02
    }
  },
  {
    "filename": "2024-01-08_03-10-02_UTC.jpg",
    "url": "https://www.instagram.com/p/C10ty9_sDBj/",
    "likes": 42,
    "frame": "4frame",
    "aspectRatio": 1.002,
    "mat": {
      "top": 8.35,
      "left": 8.53,
      "width": 82.6,
      "height": 83.1
    }
  },
  {
    "filename": "2025-12-24_18-35-41_utc_2.jpg",
    "url": "https://www.instagram.com/p/DSqA5IED9PF/",
    "likes": 41,
    "frame": "3frame",
    "aspectRatio": 0.817,
    "mat": {
      "top": 8.53,
      "left": 10.36,
      "width": 78.79,
      "height": 82.8
    }
  },
  {
    "filename": "2025-08-15_19-35-57_utc_1.jpg",
    "url": "https://www.instagram.com/p/DNYzp3yvwaO/",
    "likes": 40,
    "frame": "frame-tall-ornate",
    "aspectRatio": 0.7131,
    "mat": {
      "top": 7.77,
      "left": 10.89,
      "width": 78.77,
      "height": 84.46
    }
  },
  {
    "filename": "2025-07-05_18-03-24_utc_1.jpg",
    "url": "https://www.instagram.com/p/DLvEeHBvoD-/",
    "likes": 39,
    "frame": "frame-portrait-gold",
    "aspectRatio": 0.8322,
    "mat": {
      "top": 11.23,
      "left": 19.67,
      "width": 60.58,
      "height": 76.56
    }
  },
  {
    "filename": "2025-02-06_14-32-37_utc_2.jpg",
    "url": "https://www.instagram.com/p/DFvB59eAUpK/",
    "likes": 38,
    "frame": "frame-landscape-c",
    "aspectRatio": 0.723,
    "mat": {
      "top": 12.63,
      "left": 17.38,
      "width": 65.95,
      "height": 74.92
    }
  },
  {
    "filename": "2024-01-03_23-56-22_UTC.jpg",
    "url": "https://www.instagram.com/p/C1qEc6ZRMes/",
    "likes": 37,
    "frame": "1frame",
    "aspectRatio": 0.75,
    "mat": {
      "top": 18.55,
      "left": 19.97,
      "width": 59.78,
      "height": 63.4
    }
  },
  {
    "filename": "2025-04-18_04-43-29_utc_1.jpg",
    "url": "https://www.instagram.com/p/DIky7FFMuHE/",
    "likes": 36,
    "frame": "frame-portrait-ornate",
    "aspectRatio": 0.7805,
    "mat": {
      "top": 17.57,
      "left": 21.04,
      "width": 53.39,
      "height": 65.0
    }
  },
  {
    "filename": "2025-04-25_17-30-58_utc_1.jpg",
    "url": "https://www.instagram.com/p/DI4MUamABrq/",
    "likes": 35,
    "frame": "frame-landscape-bold",
    "aspectRatio": 1.333,
    "mat": {
      "top": 13.07,
      "left": 21.6,
      "width": 56.7,
      "height": 69.6
    }
  },
  {
    "filename": "2024-11-13_23-37-57_UTC_4.jpg",
    "url": "https://www.instagram.com/p/DCVIvtUxkRj/",
    "likes": 34,
    "frame": "2frame",
    "aspectRatio": 0.805,
    "mat": {
      "top": 21.74,
      "left": 31.25,
      "width": 37.36,
      "height": 56.25
    }
  },
  {
    "filename": "2022-12-29_20-16-45_UTC.jpg",
    "url": "https://www.instagram.com/p/Cmw9MtYvGF7/",
    "likes": 33,
    "frame": "frame-portrait-gold",
    "aspectRatio": 0.675,
    "mat": {
      "top": 11.23,
      "left": 19.67,
      "width": 60.58,
      "height": 76.56
    }
  },
  {
    "filename": "2022-12-17_02-18-10_UTC_1.jpg",
    "url": "https://www.instagram.com/p/CmQIOWorOk7/",
    "likes": 32,
    "frame": "frame-portrait-slim",
    "aspectRatio": 0.763,
    "mat": {
      "top": 12.12,
      "left": 16.19,
      "width": 66.19,
      "height": 75.25
    }
  },
  {
    "filename": "2021-01-31_19-13-26_UTC_1.jpg",
    "url": "https://www.instagram.com/p/CKuH5FEHLuB/",
    "likes": 31,
    "frame": "3frame",
    "aspectRatio": 0.817,
    "mat": {
      "top": 8.53,
      "left": 10.36,
      "width": 78.79,
      "height": 82.8
    }
  },
  {
    "filename": "2020-06-05_16-50-17_UTC_1.jpg",
    "url": "https://www.instagram.com/p/CBD4un9nzKS/",
    "likes": 30,
    "frame": "frame-tall-narrow",
    "aspectRatio": 0.84,
    "mat": {
      "top": 17.3,
      "left": 20.12,
      "width": 58.69,
      "height": 65.3
    }
  },
  {
    "filename": "2022-12-26_19-01-51_UTC_1.jpg",
    "url": "https://www.instagram.com/p/CmpGPaiPo9v/",
    "likes": 29,
    "frame": "frame-square-new",
    "aspectRatio": 1.133,
    "mat": {
      "top": 7.83,
      "left": 7.25,
      "width": 84.5,
      "height": 84.83
    }
  },
  {
    "filename": "2019-12-05_18-11-50_UTC.jpg",
    "url": "https://www.instagram.com/p/B5s0ltoH9yt/",
    "likes": 28,
    "frame": "frame-square-bold",
    "aspectRatio": 1.0,
    "mat": {
      "top": 22.2,
      "left": 21.6,
      "width": 56.7,
      "height": 52.4
    }
  },
  {
    "filename": "2019-10-03_16-14-17_UTC.jpg",
    "url": "https://www.instagram.com/p/B3KZDrlH7CJ/",
    "likes": 27,
    "frame": "frame-square-ornate",
    "aspectRatio": 1.0,
    "mat": {
      "top": 12.08,
      "left": 14.42,
      "width": 71.92,
      "height": 75.5
    }
  },
  {
    "filename": "2026-04-08_00-54-33_utc_2.jpg",
    "url": "https://www.instagram.com/p/DW2e7CPDLsH/",
    "likes": 26,
    "frame": "5frame",
    "aspectRatio": 0.667,
    "mat": {
      "top": 32.83,
      "left": 27.79,
      "width": 44.55,
      "height": 39.72
    }
  },
  {
    "filename": "2019-07-17_01-10-51_UTC.jpg",
    "url": "https://www.instagram.com/p/Bz_7qhjnOVI/",
    "likes": 25,
    "frame": "frame-portrait-ornate",
    "aspectRatio": 0.7805,
    "mat": {
      "top": 17.57,
      "left": 21.04,
      "width": 53.39,
      "height": 65.0
    }
  },
  {
    "filename": "2019-07-15_16-56-54_UTC.jpg",
    "url": "https://www.instagram.com/p/Bz6qKAXnKvE/",
    "likes": 24,
    "frame": "frame-tall-ornate",
    "aspectRatio": 0.802,
    "mat": {
      "top": 7.77,
      "left": 10.89,
      "width": 78.77,
      "height": 84.46
    }
  }
];

const MODERN_FRAMES = [
  {"filename": "modern_frame10.PNG", "aspectRatio": 1.00, "mat": {"top": 14.67, "left": 14.75, "width": 70.50, "height": 70.67}},
  {"filename": "modern_frame11.PNG", "aspectRatio": 1.00, "mat": {"top": 8.22, "left": 17.43, "width": 64.80, "height": 83.39}},
  {"filename": "modern_frame12.PNG", "aspectRatio": 1.00, "mat": {"top": 20.17, "left": 19.92, "width": 60.00, "height": 60.00}},
  {"filename": "modern_frame13.PNG", "aspectRatio": 1.23, "mat": {"top": 19.98, "left": 16.17, "width": 67.08, "height": 59.94}},
  {"filename": "modern_frame14.PNG", "aspectRatio": 0.98, "mat": {"top": 11.53, "left": 18.93, "width": 62.26, "height": 77.18}},
  {"filename": "modern_frame15.PNG", "aspectRatio": 0.80, "mat": {"top": 18.56, "left": 20.10, "width": 59.70, "height": 62.88}},
  {"filename": "modern_frame16.PNG", "aspectRatio": 1.00, "mat": {"top": 32.42, "left": 32.33, "width": 35.50, "height": 35.58}},
  {"filename": "modern_frame17.PNG", "aspectRatio": 1.00, "mat": {"top": 16.33, "left": 16.17, "width": 67.67, "height": 67.33}},
  {"filename": "modern_frame18.PNG", "aspectRatio": 1.00, "mat": {"top": 19.08, "left": 18.58, "width": 62.08, "height": 62.08}},
  {"filename": "modern_frame19.PNG", "aspectRatio": 0.88, "mat": {"top": 14.93, "left": 20.20, "width": 59.70, "height": 69.43}},
  {"filename": "modern_frame2.PNG", "aspectRatio": 0.74, "mat": {"top": 10.60, "left": 14.09, "width": 72.09, "height": 79.10}},
  {"filename": "modern_frame20.PNG", "aspectRatio": 1.27, "mat": {"top": 17.81, "left": 14.60, "width": 71.00, "height": 64.38}},
  {"filename": "modern_frame21.PNG", "aspectRatio": 0.56, "mat": {"top": 14.84, "left": 16.94, "width": 65.93, "height": 69.01}},
  {"filename": "modern_frame22.PNG", "aspectRatio": 1.43, "mat": {"top": 18.48, "left": 13.56, "width": 72.46, "height": 62.73}},
  {"filename": "modern_frame23.PNG", "aspectRatio": 0.67, "mat": {"top": 6.90, "left": 13.94, "width": 71.81, "height": 86.10}},
  {"filename": "modern_frame24.PNG", "aspectRatio": 0.80, "mat": {"top": 24.23, "left": 26.00, "width": 48.43, "height": 51.31}},
  {"filename": "modern_frame25.PNG", "aspectRatio": 1.23, "mat": {"top": 18.21, "left": 15.60, "width": 68.64, "height": 63.58}},
  {"filename": "modern_frame26.PNG", "aspectRatio": 0.86, "mat": {"top": 13.48, "left": 17.75, "width": 64.42, "height": 72.97}},
  {"filename": "modern_frame27.PNG", "aspectRatio": 1.00, "mat": {"top": 16.83, "left": 18.58, "width": 63.17, "height": 63.17}},
  {"filename": "modern_frame28.PNG", "aspectRatio": 0.76, "mat": {"top": 11.09, "left": 13.43, "width": 72.86, "height": 77.61}},
  {"filename": "modern_frame29.PNG", "aspectRatio": 0.56, "mat": {"top": 31.77, "left": 28.52, "width": 42.96, "height": 35.78}},
  {"filename": "modern_frame3.PNG", "aspectRatio": 1.26, "mat": {"top": 16.25, "left": 11.17, "width": 76.63, "height": 67.10}},
  {"filename": "modern_frame4.PNG", "aspectRatio": 1.00, "mat": {"top": 23.50, "left": 29.20, "width": 38.60, "height": 52.40}},
  {"filename": "modern_frame5.PNG", "aspectRatio": 0.71, "mat": {"top": 14.70, "left": 20.31, "width": 57.98, "height": 70.20}},
  {"filename": "modern_frame6.PNG", "aspectRatio": 0.67, "mat": {"top": 17.74, "left": 21.17, "width": 60.00, "height": 64.52}},
  {"filename": "modern_frame7.PNG", "aspectRatio": 0.83, "mat": {"top": 27.73, "left": 18.75, "width": 62.58, "height": 52.19}},
  {"filename": "modern_frame8.PNG", "aspectRatio": 0.97, "mat": {"top": 20.44, "left": 24.75, "width": 51.75, "height": 57.27}},
  {"filename": "modern_frame9.PNG", "aspectRatio": 1.25, "mat": {"top": 21.25, "left": 18.10, "width": 63.70, "height": 57.75}}
];
