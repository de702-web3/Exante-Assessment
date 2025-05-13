import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { installVueQuery } from './lib/vue-query'

const app = createApp(App)

// Initialize Vue Query
installVueQuery(app)

app.mount('#app')
