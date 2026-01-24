self.addEventListener('fetch', (event) => {
  // This is a pass-through worker to satisfy PWA requirements
  event.respondWith(fetch(event.request));
});
