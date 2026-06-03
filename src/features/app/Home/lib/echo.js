import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const echoInstance = new Echo({
    broadcaster: 'reverb',
    key: 'hhzqc32btlkfjee8crvu', 
    wsHost: '127.0.0.1',
    wsPort: 8080,
    wssPort: 8080,
    forceTLS: false,
    enabledTransports: ['ws', 'wss'],
});

export default echoInstance;