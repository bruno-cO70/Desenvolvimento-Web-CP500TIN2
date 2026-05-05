import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/style.css'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'

async function bootstrap() {
	const app = createApp(App)
	const pinia = createPinia()
	const authStore = useAuthStore(pinia)

	app.use(pinia).use(router)

	await authStore.inicializar()
	app.mount('#app')
}

bootstrap()