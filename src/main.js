import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

store.subscribe((mutation, state) => {
    // The code inside the curly brackets fires any time a mutation occurs.
    // When a mutation occurs, we'll stringify our entire state object - which
    // contains our todo list. We'll put it in the users localStorage, so that
    // their data will persist even if they refresh the page.
	localStorage.setItem('store', JSON.stringify(state));
})

createApp(App).use(store).use(router).mount('#app') 
  