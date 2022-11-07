<template>
    <div class="inss">
      <new-invoice class="new" v-if="show" @atShow="atShows" />
      <div class="head">
        <div class="con">
          <h3>Invoices</h3>
          <p>{{total}}</p>
        </div>
        <div class="bun">
          <div>
            <button class="bun1" @click="showFilter">{{status}} <img class="ims" src="../assets/icon-arrow-down.svg" alt=""></button>
            <div class="asses" v-if="filter">
              <label for="all">
                <input type="radio" name="bunn" v-model="pick" value="all" id="all"> all
                <span></span>
              </label>
              <div v-for="(shows, x) in showFilters" :key="x">
              <label :for="x">
                <input type="radio" name="bunn" v-model="pick" :value="shows" :id="x"> {{shows}}
                <span></span>
              </label>
            </div>
            </div>
          </div>
          <button class="bun2" @click="showForm">
            <span><img src="../assets/icon-plus.svg" alt="plus"></span>{{dones}}
          </button>
        </div>
      </div>
      <div class="bdy">
        <Invoice :pick="pick"/>
      </div>
    </div>
  </template>
  
  <script>
import Invoice from '../components/Invoice.vue'
import { mapGetters } from 'vuex';
import NewInvoice from '../components/NewInvoice.vue';

  export default {
    name: 'invoices',
    data() {
      return{
        show: false,
        filter: false,
        pick: 'all'
      }
    },
    components: {
      Invoice,
      NewInvoice,
    },
  
    computed: {
        dones(){
          // return this.$store.getters.doneTodos
          const x = window.innerWidth >= 700 ?  ' New Invoices':' New';
          return x
        },
        total(){
          const x = window.innerWidth >= 700 ?  ` there are ${this.done} total invoices`:` ${this.done} invoices`;
          return x
        },
        status(){
          const x = window.innerWidth >= 700 ?  ` filter by status`:` filter`;
          return x
        },
        showFilters(){
          const shw =  this.$store.getters.getTodos
          const ans = [...new Set(shw.map(x => x.status)) ]
          return ans
          // console.log(ans)
        },
        ...mapGetters({
            done: "getTodosCount"
    }),
  }, 
  methods: {
    showForm() {
      this.filter = false;
      this.show = !this.show
    },
    atShows(){
      this.show = !this.show
    },
    showFilter() {
      this.filter = !this.filter;
      const x = document.querySelector('.ims')
      x.classList.toggle('imss')
    }
  }
} 
  </script>
  
  <style scoped>
    .inss{
      position: relative;
      width: 100%;
      margin: 4.9em 0 0;
      color: white;
      padding: 20px;
    }
    .head{
      position: relative;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2em;
    }
    .head .bun{
      position: relative;
      display: flex;
      align-items: center;
    }
    .con h3{
      margin-bottom: 10px;
    }
    button{
      border: none;
      outline: none;
      cursor: pointer;
    }
    .bun{
      position: relative;
      transition: .4s;
    }
    .bun .bun1{
      background: transparent;
      color: white;
      letter-spacing: 1px;
      font-size: 18px;
    }
     .imss{
      /* position: absolute; */
      transform: rotate(180deg);
      transition: .4s;
      /* padding: 10px;
      background: white; */
    }
    .bun .bun2{
      margin-left: 12px;
      color: white;
      background: #5362d3;
      border-radius: 24px;
      padding: 4px;
    }
    .bun2 span{
      position: relative;
      /* padding: 10px; */
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      background: white;
      border-radius: 50%;
    }
    .asses{
      background: #1e2139;
      position: absolute;
      padding: 20px 10px;
      left: -20px;
      top: 48px;
      transition: .4s;
      z-index: 1;
      border-radius: 8px;
      box-shadow: inset 3px 3px 2px rgba(249, 249, 249, 0.1), inset -3px -3px 2px rgba(249, 249, 249, 0.1) ;
      
    }
    .asses label{
      position: relative;
      cursor: pointer;
      padding-left: 40px;
      display: block;
      margin-bottom: 10px;
    }
    label input{
      position: absolute;
      opacity: 0;
      height: 0;
      width: 0;
      /* margin-bottom: 10px; */
    }
    label span{
      width: 20px;
      height: 20px;
      border-radius: 10%;
      /* display: inline-block; */
      position: absolute;
      left: 0;
      top: 0;
      border:1px solid #5362d3;
    }
    label input:checked ~ span::after{
      content: '';
      position: absolute;
      width: 4px;
      height: 12px;
      left: 7px;
      border-bottom:1px solid white;
      border-right: 1px solid white;
      transform: rotate(40deg);
    }
    @media screen and (min-width:768px) {
      .inss{
        min-width: 748px;
        margin: 4.9em auto 0;
      }
       .head{
        margin-bottom: 3em;
      }
      .asses{
        left: 0;
      }
    }
    @media screen and (min-width:1000px) {
      .inss{
        width: 820px;
        padding-left: 4.9em;
      }
    }
  </style> 