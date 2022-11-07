import { createStore } from 'vuex'
import data from "../datas/dass.json";

export default createStore({
  state: {
        todos: [...data]
  },
  getters: {
   
    getTodos (state) { 
      return state.todos 
      // console.log(state.todos)
    }, 
    getFilters (state) {
      return state.todos
    },
    getTodosCount (state, getters) {
      return getters.getTodos.length
    },
    getTodoById: (state) => (id) => {
      return state.todos.find(todo => todo.id === id)
    },
  },
  mutations: {
    loadStore() {
			if(localStorage.getItem('store')) {
        try {
            this.replaceState(JSON.parse(localStorage.getItem('store')));
        }
        catch(e) {
            console.log('Could not initialize store', e);
        }
			}
		}, 
    ADD_TODO: (state, payload) => {

      const newTask = {
          id: payload.id,
          clientEmail: payload.clientEmail,
          status: payload.status,
          clientName: payload.clientName,
          createdAt: payload.createdAt,
          items: payload.items,
          description: payload.description,
          paymentDue: payload.paymentDue,
          paymentTerms: payload.paymentTerms,
          total: payload.total,
          clientAddress: {street: payload.clientAddress, city: payload.clientCity, country: payload.clientCountry, postCode: payload.clientPostCode},
          senderAddress: {street: payload.street, city: payload.city, country: payload.country, postCode: payload.postCode}
      }
      console.log(newTask.items)

      state.todos.unshift(newTask);
    },
    DELE_TODO(state, payload) {
      const index = state.todos.findIndex(dos => dos.id === payload)
      state.todos.splice(index, 1)
    },
    TOGGLE_TODO(state, payload){ 
      const index = state.todos.find(dos => dos.id === payload)
      index.status = 'paid'
    },
  }, 
  actions: {
    addTodo: (context, payload) => {
      context.commit("ADD_TODO", payload)
    },
    toggleTodo(context,payload) {
      return context.commit('TOGGLE_TODO',payload)
    },
    deleteTodo(context, payload) {
      return context.commit('DELE_TODO', payload)
    }
  },
  modules: {
  }
})
