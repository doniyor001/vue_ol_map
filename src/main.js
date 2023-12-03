import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './components/App.vue'
import uiComponents from './ui-components'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
uiComponents.map(component => app.component(component.name, component))
app.mount('#app')