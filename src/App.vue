<template>
 <div class="app">
    <Heade />
    <router-view></router-view> 
 </div>
</template>

<script>
import { useStore } from 'vuex';
import Heade from './components/Heade.vue';

export default {

    mounted() {
        // this.$store.commit("loadDaas");
        // console.log(this.$store.getters.getTodos);
        // console.log(this.$store.state.count);
        // this.$store.commit("increment");
      // const store = useStore()
      //   this.todos = store.getters.todos
        // console.log(this.todos)
      const store = useStore()
		  store.commit('loadStore');
        // this.dele() 
    },
    beforeCreate() {
      const store = useStore()
		  store.commit('loadStore');
	  },
    
    methods: {
      delDone(id) {
        this.$store.dispatch("toggleTodos", id);
        // console.log(id)
      },
      unDone(id){
        this.$store.dispatch("toggle", id);
        console.log(id)
      },
         
    },
    computed: {
      dones(){
        return this.$store.getters.getTodos
      }
    },
   
    components: { Heade }
}
</script>

<style>
  *{
    margin: 0; 
    padding: 0;
    box-sizing: border-box;
  }
  body{
    font-family:'Assistant', sans-serif;
    position: relative;
    width: 100%;
    background: #141625;
    margin: 0;
  }
  .overflow {
    overflow: hidden;
  }
  .app{
    position: relative;
    margin: 0;
    padding: 0;
    display: grid;
  }

  button{
    cursor: pointer;
  }
  @media screen and (min-width: 1000px) {
    .app{
      grid-template-columns: 1fr; 
    }
  }
</style>