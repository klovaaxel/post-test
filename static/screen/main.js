if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("../static/screen/sw.js");
}

navigator.serviceWorker.addEventListener("message", function (e) {
    var message = e.data;
    switch (message) {
        case "reload":
            window.location.reload(true);
            break;
        default:
            console.warn("Message '" + message + "' not handled.");
            break;
    }
});

async function getScreen() {
    const sw = await navigator.serviceWorker.ready;
    const sub = await sw.pushManager.getSubscription();

    console.log("Hello");

    if (sub == null) {
        sub = await sw.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey:
                "BP2ZcBmZKNslT37y_GC1xeFPdO_5c9dB4jPcJ-VJ2_7dOUZvz_jaG6pVrMSWHfREWsPGa-uA3xv1ZhjA10Q4Dnw",
        });
    }

    console.log(JSON.stringify(sub));
    // FIXME: put this in a qr code

    screen = await fetch(`../rest/screen?endpoint=${sub}`);
}

getScreen();
