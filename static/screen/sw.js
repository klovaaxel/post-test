importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js"
);

// This is your Service Worker, you can put any of your custom Service Worker
// code in this file, above the `precacheAndRoute` line.

self.addEventListener("push", () => {
    clients
        .matchAll({
            type: "window",
            includeUncontrolled: true,
        })
        .then((clients) => {
            for (client of clients) {
                client.postMessage("reload"); // <= TRIGGER 'RELOAD' EVENT HERE
            }
        });
});

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);
