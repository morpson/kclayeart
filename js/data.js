// Portfolio data — Curated selection of 22 artworks from @kclaye_art Instagram
// Each item includes verified Instagram post URL, eclectic frame with precise mat specs,
// and curated modern frame pairing with matching aspect ratio and exact mat window.

const POSTS_DATA = [
  {
    "filename": "2025-12-24_18-35-41_utc_1.jpg",
    "url": "https://www.instagram.com/p/DSqA5IED9PF/",
    "likes": 45,
    "subject": "pet",
    "frame": "1frame",
    "aspectRatio": 0.75,
    "mat": { "top": 18.55, "left": 19.97, "width": 59.78, "height": 63.4 },
    "modern": {
      "frame": "modern_frame2.PNG",
      "aspectRatio": 0.738,
      "mat": { "top": 10.6, "left": 14.23, "width": 72.09, "height": 79.2 }
    }
  },
  {
    "filename": "2025-08-15_19-35-57_utc_1.jpg",
    "url": "https://www.instagram.com/p/DNYzp3yvwaO/",
    "likes": 40,
    "subject": "landscape",
    "frame": "frame-tall-ornate",
    "aspectRatio": 0.7131,
    "mat": { "top": 7.77, "left": 10.89, "width": 78.77, "height": 84.46 },
    "modern": {
      "frame": "modern_frame24.PNG",
      "aspectRatio": 0.8,
      "mat": { "top": 24.34, "left": 26.0, "width": 48.43, "height": 51.2 }
    }
  },
  {
    "filename": "2026-04-08_00-54-33_utc_2.jpg",
    "url": "https://www.instagram.com/p/DW2e7CPDLsH/",
    "likes": 26,
    "subject": "figure",
    "frame": "frame-portrait-silver",
    "aspectRatio": 0.8306,
    "mat": { "top": 15.37, "left": 19.3, "width": 60.6, "height": 69.02 },
    "modern": {
      "frame": "modern_frame28.PNG",
      "aspectRatio": 0.761,
      "mat": { "top": 11.3, "left": 13.71, "width": 72.57, "height": 77.39 }
    }
  },
  {
    "filename": "2026-04-08_00-54-33_utc_1.jpg",
    "url": "https://www.instagram.com/p/DW2e7CPDLsH/",
    "likes": 44,
    "subject": "pet",
    "frame": "frame-portrait-baroque",
    "aspectRatio": 0.8351,
    "mat": { "top": 14.96, "left": 17.92, "width": 64.42, "height": 70.42 },
    "modern": {
      "frame": "modern_frame15.PNG",
      "aspectRatio": 0.8,
      "mat": { "top": 18.64, "left": 20.1, "width": 59.8, "height": 62.8 }
    }
  },
  {
    "filename": "2024-01-08_03-10-02_UTC.jpg",
    "url": "https://www.instagram.com/p/C10ty9_sDBj/",
    "likes": 42,
    "subject": "nature",
    "frame": "4frame",
    "aspectRatio": 1.002,
    "mat": { "top": 8.35, "left": 8.53, "width": 82.6, "height": 83.1 },
    "modern": {
      "frame": "modern_frame17.PNG",
      "aspectRatio": 1.0,
      "mat": { "top": 16.33, "left": 16.25, "width": 67.58, "height": 67.42 }
    }
  },
  {
    "filename": "2025-12-24_18-35-41_utc_2.jpg",
    "url": "https://www.instagram.com/p/DSqA5IED9PF/",
    "likes": 41,
    "subject": "animal",
    "frame": "3frame",
    "aspectRatio": 0.8173,
    "mat": { "top": 8.53, "left": 10.36, "width": 78.79, "height": 82.8 },
    "modern": {
      "frame": "modern_frame26.PNG",
      "aspectRatio": 0.86,
      "mat": { "top": 13.48, "left": 17.83, "width": 64.33, "height": 72.97 }
    }
  },
  {
    "filename": "2025-11-07_18-19-59_utc_1.jpg",
    "url": "https://www.instagram.com/p/DQw9u-mDyCd/",
    "likes": 43,
    "subject": "pet",
    "frame": "frame-portrait-silver",
    "aspectRatio": 0.8306,
    "mat": { "top": 15.37, "left": 19.3, "width": 60.6, "height": 69.02 },
    "modern": {
      "frame": "modern_frame19.PNG",
      "aspectRatio": 0.883,
      "mat": { "top": 14.93, "left": 20.3, "width": 59.6, "height": 69.43 }
    }
  },
  {
    "filename": "2025-02-06_14-32-37_utc_2.jpg",
    "url": "https://www.instagram.com/p/DFvB59eAUpK/",
    "likes": 38,
    "subject": "landscape",
    "frame": "frame-landscape-c",
    "aspectRatio": 0.7071,
    "mat": { "top": 12.63, "left": 17.38, "width": 65.95, "height": 74.92 },
    "modern": {
      "frame": "modern_frame5.PNG",
      "aspectRatio": 0.714,
      "mat": { "top": 14.8, "left": 20.45, "width": 57.98, "height": 70.2 }
    }
  },
  {
    "filename": "2020-06-05_16-50-17_UTC_1.jpg",
    "url": "https://www.instagram.com/p/CBD4un9nzKS/",
    "likes": 30,
    "subject": "figure",
    "frame": "frame-tall-narrow",
    "aspectRatio": 0.84,
    "mat": { "top": 17.3, "left": 20.12, "width": 58.69, "height": 65.3 },
    "modern": {
      "frame": "modern_frame8.PNG",
      "aspectRatio": 0.969,
      "mat": { "top": 20.44, "left": 24.75, "width": 51.83, "height": 57.35 }
    }
  },
  {
    "filename": "2025-07-05_18-03-24_utc_1.jpg",
    "url": "https://www.instagram.com/p/DLvEeHBvoD-/",
    "likes": 39,
    "subject": "pet",
    "frame": "frame-portrait-gold",
    "aspectRatio": 0.8322,
    "mat": { "top": 11.23, "left": 19.67, "width": 60.58, "height": 76.56 },
    "modern": {
      "frame": "modern_frame28.PNG",
      "aspectRatio": 0.761,
      "mat": { "top": 11.3, "left": 13.71, "width": 72.57, "height": 77.39 }
    }
  },
  {
    "filename": "2025-04-25_17-30-58_utc_1.jpg",
    "url": "https://www.instagram.com/p/DI4MUamABrq/",
    "likes": 35,
    "subject": "landscape",
    "frame": "frame-landscape-bold",
    "aspectRatio": 1.3333,
    "mat": { "top": 13.07, "left": 21.6, "width": 56.7, "height": 69.6 },
    "modern": {
      "frame": "modern_frame20.PNG",
      "aspectRatio": 1.272,
      "mat": { "top": 17.81, "left": 14.7, "width": 71.0, "height": 64.38 }
    }
  },
  {
    "filename": "2021-01-31_19-13-26_UTC_1.jpg",
    "url": "https://www.instagram.com/p/CKuH5FEHLuB/",
    "likes": 31,
    "subject": "figure",
    "frame": "3frame",
    "aspectRatio": 0.8173,
    "mat": { "top": 8.53, "left": 10.36, "width": 78.79, "height": 82.8 },
    "modern": {
      "frame": "modern_frame2.PNG",
      "aspectRatio": 0.738,
      "mat": { "top": 10.6, "left": 14.23, "width": 72.09, "height": 79.2 }
    }
  },
  {
    "filename": "2024-01-03_23-56-22_UTC.jpg",
    "url": "https://www.instagram.com/p/C1qEc6ZRMes/",
    "likes": 37,
    "subject": "pet",
    "frame": "1frame",
    "aspectRatio": 0.75,
    "mat": { "top": 18.55, "left": 19.97, "width": 59.78, "height": 63.4 },
    "modern": {
      "frame": "modern_frame26.PNG",
      "aspectRatio": 0.86,
      "mat": { "top": 13.48, "left": 17.83, "width": 64.33, "height": 72.97 }
    }
  },
  {
    "filename": "2024-11-13_23-37-57_UTC_4.jpg",
    "url": "https://www.instagram.com/p/DCVIvtUxkRj/",
    "likes": 34,
    "subject": "architecture",
    "frame": "2frame",
    "aspectRatio": 1.0,
    "mat": { "top": 21.74, "left": 31.25, "width": 37.36, "height": 56.25 },
    "modern": {
      "frame": "modern_frame18.PNG",
      "aspectRatio": 1.0,
      "mat": { "top": 19.17, "left": 18.58, "width": 62.17, "height": 62.08 }
    }
  },
  {
    "filename": "2019-12-05_18-11-50_UTC.jpg",
    "url": "https://www.instagram.com/p/B5s0ltoH9yt/",
    "likes": 28,
    "subject": "figure",
    "frame": "frame-square-bold",
    "aspectRatio": 1.0,
    "mat": { "top": 22.2, "left": 21.6, "width": 56.7, "height": 52.4 },
    "modern": {
      "frame": "modern_frame10.PNG",
      "aspectRatio": 1.0,
      "mat": { "top": 14.67, "left": 14.75, "width": 70.58, "height": 70.75 }
    }
  },
  {
    "filename": "2025-04-18_04-43-29_utc_1.jpg",
    "url": "https://www.instagram.com/p/DIky7FFMuHE/",
    "likes": 36,
    "subject": "pet",
    "frame": "frame-portrait-ornate",
    "aspectRatio": 0.7805,
    "mat": { "top": 17.57, "left": 21.04, "width": 53.39, "height": 65.0 },
    "modern": {
      "frame": "modern_frame15.PNG",
      "aspectRatio": 0.8,
      "mat": { "top": 18.64, "left": 20.1, "width": 59.8, "height": 62.8 }
    }
  },
  {
    "filename": "2022-12-17_02-18-10_UTC_1.jpg",
    "url": "https://www.instagram.com/p/CmQIOWorOk7/",
    "likes": 32,
    "subject": "landscape",
    "frame": "frame-portrait-slim",
    "aspectRatio": 0.7071,
    "mat": { "top": 12.12, "left": 16.19, "width": 66.19, "height": 75.25 },
    "modern": {
      "frame": "modern_frame19.PNG",
      "aspectRatio": 0.883,
      "mat": { "top": 14.93, "left": 20.3, "width": 59.6, "height": 69.43 }
    }
  },
  {
    "filename": "2019-10-03_16-14-17_UTC.jpg",
    "url": "https://www.instagram.com/p/B3KZDrlH7CJ/",
    "likes": 27,
    "subject": "figure",
    "frame": "frame-square-ornate",
    "aspectRatio": 1.0,
    "mat": { "top": 12.08, "left": 14.42, "width": 71.92, "height": 75.5 },
    "modern": {
      "frame": "modern_frame12.PNG",
      "aspectRatio": 1.0,
      "mat": { "top": 20.25, "left": 20.0, "width": 60.0, "height": 59.92 }
    }
  },
  {
    "filename": "2022-12-29_20-16-45_UTC.jpg",
    "url": "https://www.instagram.com/p/Cmw9MtYvGF7/",
    "likes": 33,
    "subject": "pet",
    "frame": "frame-portrait-gold",
    "aspectRatio": 0.8322,
    "mat": { "top": 11.23, "left": 19.67, "width": 60.58, "height": 76.56 },
    "modern": {
      "frame": "modern_frame26.PNG",
      "aspectRatio": 0.86,
      "mat": { "top": 13.48, "left": 17.83, "width": 64.33, "height": 72.97 }
    }
  },
  {
    "filename": "2019-07-17_01-10-51_UTC.jpg",
    "url": "https://www.instagram.com/p/Bz_7qhjnOVI/",
    "likes": 25,
    "subject": "portrait",
    "frame": "frame-portrait-ornate",
    "aspectRatio": 0.7805,
    "mat": { "top": 17.57, "left": 21.04, "width": 53.39, "height": 65.0 },
    "modern": {
      "frame": "modern_frame24.PNG",
      "aspectRatio": 0.8,
      "mat": { "top": 24.34, "left": 26.0, "width": 48.43, "height": 51.2 }
    }
  },
  {
    "filename": "2022-12-26_19-01-51_UTC_1.jpg",
    "url": "https://www.instagram.com/p/CmpGPaiPo9v/",
    "likes": 29,
    "subject": "pet",
    "frame": "frame-square-new",
    "aspectRatio": 1.0,
    "mat": { "top": 7.83, "left": 7.25, "width": 84.5, "height": 84.83 },
    "modern": {
      "frame": "modern_frame27.PNG",
      "aspectRatio": 1.0,
      "mat": { "top": 16.83, "left": 18.58, "width": 63.25, "height": 63.17 }
    }
  },
  {
    "filename": "2019-07-15_16-56-54_UTC.jpg",
    "url": "https://www.instagram.com/p/Bz6qKAXnKvE/",
    "likes": 24,
    "subject": "portrait",
    "frame": "frame-tall-ornate",
    "aspectRatio": 0.7131,
    "mat": { "top": 7.77, "left": 10.89, "width": 78.77, "height": 84.46 },
    "modern": {
      "frame": "modern_frame5.PNG",
      "aspectRatio": 0.714,
      "mat": { "top": 14.8, "left": 20.45, "width": 57.98, "height": 70.2 }
    }
  }
];
