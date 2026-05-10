import Echo from "laravel-echo";

import Pusher from "pusher-js";

const ENABLE_REALTIME = import.meta.env.VITE_ENABLE_REALTIME === "true";

let echo = null;

if (ENABLE_REALTIME) {
  window.Pusher = Pusher;

  echo = new Echo({
    broadcaster: "reverb",

    key: import.meta.env.VITE_REVERB_APP_KEY,

    wsHost: import.meta.env.VITE_REVERB_HOST,

    wsPort: import.meta.env.VITE_REVERB_PORT,

    forceTLS: import.meta.env.VITE_REVERB_SCHEME === "https",

    enabledTransports: ["ws", "wss"],

    disableStats: true,
  });

  console.log("Realtime Enabled");
} else {
  console.log("Realtime Disabled");
}

export default echo;
