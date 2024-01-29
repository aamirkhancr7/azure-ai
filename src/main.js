import { createApp } from 'vue';
import { Quasar, Notify } from 'quasar';
import App from './App.vue'

// Import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css';
import '@quasar/extras/material-icons-round/material-icons-round.css';
import '@quasar/extras/material-icons-sharp/material-icons-sharp.css';

import './assets/main.css';
import 'quasar/src/css/index.sass';


Notify.setDefaults({
    position: 'top-right',
    timeout: 4000,
    textColor: 'white',
    actions: [{ icon: 'close', color: 'white' }],
});

const app = createApp(App);

app.use(Quasar, {
    plugins: {
        Notify,
    },
});

app.mount('#app');
