import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

const isRealtimeEnabled = import.meta.env.VITE_ENABLE_REALTIME === "true";

const echo = isRealtimeEnabled
  ? new Echo({
      broadcaster: "reverb",
      key: import.meta.env.VITE_REVERB_APP_KEY,

      wsHost: import.meta.env.VITE_REVERB_HOST,
      wsPort: import.meta.env.VITE_REVERB_PORT,
      wssPort: import.meta.env.VITE_REVERB_PORT,

      forceTLS: import.meta.env.VITE_REVERB_SCHEME === "https",

      enabledTransports: ["ws", "wss"],
      wsPath: "/app",
    })
  : null;

export default echo;