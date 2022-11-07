<template>
    <div class="new">
      <h2>New Invoice</h2>
      <form  @submit.prevent="save">
          <p>Bill from</p>
        <div class="label labels">
          <label class="nm1">
           <span> street Address</span>
          <input type="text" name="" v-model="newInvoice.street" required>
          </label>
          <label class="nm2">
            <span>City</span>
            <input type="text" name="" v-model="newInvoice.city" required>
          </label>
          <label class="nm3">
            <span>Post Code</span>
            <input type="text" name="" v-model="newInvoice.postCode" required>
          </label>
          <label class="nm4">
            <span>Country</span>
            <input type="text" name="" v-model="newInvoice.country" required>
          </label>
        </div>
          <p>Bill To</p>
        <div class="label1 labels">
          <label class="nm1">
            <span>Client's Name</span>
          <input type="text" placeholder="name" v-model="newInvoice.clientName" required>
          </label>
          <label class="nm2">
            <span>Client's Email</span>
            <input type="text" name="" v-model="newInvoice.clientEmail" required>
          </label>
          <label class="nm3">
            <span>Street Address </span>
            <input type="text" name="" v-model="newInvoice.clientStreet" required>
          </label>
          <label class="nm4">
            <span>City</span>
            <input type="text" name="" v-model="newInvoice.clientCity">
          </label>
          <label class="nm7">
            <span>Post Code</span>
            <input type="text" name="" v-model="newInvoice.clientPostCode" required>
          </label>
          <label class="nm8">
            <span>Country</span>
            <input type="text" name="" v-model="newInvoice.clientCountry" required>
          </label>
        </div>
        <div class="label2 labels">
          <label class="nm1">
            <span>Invoice Date</span>
          <input type="date" v-model="newInvoice.createdAt" required>
          </label>
          <label class="nm2">
            <span>Payment Terms</span>
            <select class="nm2" v-model="newInvoice.paymentTerm"  required>
              <option value="one">Next 1 Days</option>
              <option value="seven">Next 7 Days</option>
              <option value="fourteen">Next 14 Days</option>
              <option value="thirty">Next 30 Days</option>
            </select>
          </label>
          <label class="nm3">
            <span>Project description </span>
            <input type="text" name="" v-model="newInvoice.projectDescription" required>
          </label>
        </div>

        <p>Item List</p>
        <div v-for="(item, x) in newInvoice.items" :key="x" class="disp">
          <p>name<br><span>{{item.name}}</span></p>
          <p>quantity<br><span>{{item.quantity}}</span></p>
          <p>price<br><span>{{item.price}}</span></p>
          <p>total<br><span>{{item.total}}</span></p>
          <button @click.prevent="deleteItem(x)"><img src="../assets/icon-delete.svg" alt=""></button>
        </div>
        <div>
          <form @submit.prevent="newItem" class="labels label3">
          <label class="nm1">
            <span>Item Name</span>
          <input type="text" placeholder="name" v-model="listItems.name" id="lbl1" required >
          </label>
          <label class="nm2">
            <span>Qty</span> 
            <input type="number" min="1" v-model="listItems.quantity">
          </label>
          <label class="nm3">
            <span>Price</span>
            <input type="number" name="nm" min="1" v-model="listItems.price">
          </label>
          <button  type="submit">Add New Item</button>
        </form>
        </div>
        <div class="sumbit">
          <button class="bun" type="button" @click.prevent="discard">Discard</button>
          <div>
            <button class="bun1" type="button" @click.prevent="draft">Save as Draft</button>
            <button  type="submit" class="bun2" id="bun2">Save and Send</button>
          </div>
        </div>
      </form>
    </div>
  </template>
  
  <script>

    const bun = document.querySelectorAll('button')[0]

      const x = document.querySelectorAll('input')
        console.log(bun)
        const y = [...x].some(el => el.value == '')
        // bun.disabled = true;
        console.log(y)
        if(y){
        console.log('hello')
        } else{
        // bun.disabled = false;
        }

  export default {
    props: {
      show: String
    },
    data() {
      return{
        newInvoice: {
          street: '',
          city: '',
          postCode: '',
          country: '',
          clientName: '',
          clientEmail: '',
          clientStreet: '',
          clientCity: '',
          clientPostCode: '',
          clientCountry: '',
          createdAt: new Date().toISOString().slice(0,10),
          paymentTerm: "thirty",
          description: '',
          items : [],
          total: 0,
          status: "pending",
          paymentDue: '',
          id: '',
        },
        listItems: {
          name: '',
          quantity: 1,
          price: 0,
          total: 0,
        },
      }
    },
    methods: {
      save() { 
        this.newId()
        this.invoiceDue()
        this.totalAmnt()

        const x = {
        ...this.newInvoice 
        };       
        this.$store.dispatch("addTodo", x);
        this.newInvoice.items = []    
        this.$emit('atShow')
      },
    
      draft(){
        this.newId()
        this.invoiceDue()
        this.totalAmnt()

        const x = {
        ...this.newInvoice ,
          status: 'draft'
        };       
        this.$store.dispatch("addTodo", x);
        this.newInvoice.items = []    
        this.$emit('atShow')
      },
      discard(){
        this.$emit('atShow')
      },
      newItem(){
        this.listItems.total = this.listItems.price * this.listItems.quantity
        const item = {...this.listItems}
        this.newInvoice.items.unshift(item)
        const bun = document.querySelector('.bun2')
        bun.disabled = false;

        this.listItems.name = ''
        this.listItems.price = 0;
        this.listItems.quantity = 0;
        this.listItems.total = 0
      },
      newId() { 
        const x = Math.random()*(90 - 65) + 65
        const y = Math.random()*(90 - 65) + 65
        const z = Math.floor(Math.random()*(9999 - 1000) + 1000)
        return this.newInvoice.id = String.fromCharCode(x,y)+ z
      },
      invoiceDue() {
        const b = Date.parse(this.newInvoice.createdAt)
        // const IPOdate = new Date(b);
        // The number of milliseconds in a day is calculated as (1000*60*60*24) 
        const x = this.newInvoice.paymentTerm;
        let y = 1000*60*60*24;
        var z= 0

        if(x === 'one'){
          z = 1 * y
        }
        if(x === 'seven'){
          z = 7 * y
        }
        if(x === 'fourteen'){
          z = 14 * y
        }
        if(x === 'thirty'){
          z = 30 * y
        }
        return this.newInvoice.paymentDue = new Date(b + z).toISOString().slice(0,10)
      },
      totalAmnt() {
        const total = this.newInvoice.items
        .map(x => x.total)
        .reduce((a,b) => a+b, 0)
        this.newInvoice.total = total
      },
      deleteItem(index){
        const y = this.newInvoice.items.findIndex(x => x.index)
        this.newInvoice.items.splice(y, 1)
      }
    },
    mounted() {
      const bun = document.querySelector('.bun2')
      bun.disabled = true;

      // const x = document.querySelectorAll('input')
      //   console.log([...x].some(el => el.value == ''))
      //   const y = [...x].some(el => el.value == '')
      //   console.log(y)
      //   if(y){
      //   console.log('hello')
      //   } else{
      //   bun.disabled = false;
      //   }
    
    }
  }
  </script>
  
  <style scoped> 
    .new{
      position: fixed;
      left: 0%;
      bottom: 0;
      width: 80%;
      background: #141625;
      height: calc(100% - 4.5em);
      z-index: 100000;
      overflow-y: scroll;
      padding: 20px;
      margin: 0;
    }
    .style{
      left: 0;
    }
    .new h2{
      margin-bottom: 20px;
    }
    form:not(.label3){
      position: relative;
      margin: 0;
      height: 100%;
      padding-bottom: 20px;
      letter-spacing: 1px;
    }
    p{
      margin-bottom: 14px;
      color: rgba(100, 70, 220, 0.999);
    }
    .labels:not(.sumbit, .disp){
      display: grid;
      margin-bottom: 40px;
      width: 100%;
      gap:10px;
      grid-template-columns: 1fr 1fr;
      grid-auto-rows: minmax(40px, auto);
    }
    .disp{
      display: flex;
      flex-wrap: wrap;
      /* grid-template-columns: 1fr 1fr; */
      justify-content: space-between;
      align-items: center;
    }
    .disp p{
      color: white;
    }
    .disp p span{
      color: darkgray;
      background:rgba(72, 84, 159, 0.15);
      padding: 12px;
      display: inline-block;
      /* min-width: 100px; */
      border-radius: 8px;
    }
    div label{
      margin:4px 0;
      width: 100%;
    }
    label span{
      font-size: 14px;
      color: rgba(244, 244, 244, 0.7);
    }
    .label .nm1{
      grid-column: 1/3;
      grid-row: 1 ;
    }
    .label .nm4{
      grid-column: 1/3;
      grid-row: 3 ;    
    }
    .label1 .nm1{
      grid-column: 1/3;
      grid-row: 1 ;
    }
    .label1 .nm2{
      grid-column: 1/3;
      grid-row: 2 ;
    }
    .label1 .nm3{
      grid-column: 1/3;
      grid-row: 3 ;
    }
    .label1 .nm8{
      grid-column: 1/3;
      grid-row:  5;
    }
    .label2 .nm1{
      grid-column: 1/3;
      grid-row:  1;
    }
    .label2 .nm2{
      grid-column: 1/3;
      grid-row:  2;
    }
    .label2 .nm3{
      grid-column: 1/3;
      grid-row:  3;
    }
    .label3 .nm1{
      grid-column: 1/3;
      grid-row:  1;
    }
    
    .label3 .nm4{
      grid-column: 1/3;
      grid-row:  3;
    }
    .label3 button{
      grid-column: 1/3;
      grid-row:  4;
      border-radius: 24px;
      background: rgba(100, 70, 220, 0.999);
      border: none;
      outline: none;
      color: white;
    }
    input, select{
      outline: none;
      border: none;
      padding: 12px;
      border-radius: 7px;
      background:rgba(72, 84, 159, 0.15);
      width: 100%;
      color: white;
    }
    select option{
      color: black;
    }
    .sumbit {
      position: relative;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      display: flex;
      padding-bottom: 20px;
    }
    .sumbit > div{
      display: flex;
      gap: 4px;
    }
    .sumbit button{
      outline: none;
      border: none;
      padding: 14px;
      border-radius: 24px;
      font-size: 9px;
      color: white;
    }
    .sumbit .bun {
      background: rgba(244, 244, 244, 0.9);
      color: #141625;
    }
   .bun1{
    background: rgba(244, 244, 244, 0.1);
  }
   .bun2{
    background: rgba(100, 70, 220, 0.999);
  }
    @media screen and (min-width: 768px) {
      .new{
        width: 760px;
      }
      form >div:not(.sumbit){
      grid-template-columns: repeat(3, 1fr);
      grid-auto-rows: minmax(40px, auto);
    }
    .sumbit button{
      font-size: 17px;
    }
    .disp{
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
    .label .nm1{
      grid-column: 1/4;
      grid-row: 1 ;
    }
    .label .nm2{
      grid-column: 1/2;
      grid-row: 2 ;    
    }
    .label .nm4{
      grid-column: 2/3;
      grid-row: 2 ;    
    }
    .label .nm4{
      grid-column: 3/4;
      grid-row: 2;    
    }
    .label1 .nm1{
      grid-column: 1/4;
      grid-row: 1 ;
    }
    .label1 .nm2{
      grid-column: 1/4;
      grid-row: 2 ;
    }
    .label1 .nm3{
      grid-column: 1/4;
      grid-row: 3 ;
    }
    .label1 .nm4{
      grid-column: 1/2;
      grid-row: 4;
    }
    .label1 .nm7{
      grid-column: 2/3;
      grid-row: 4;
    }
    .label1 .nm8{
      grid-column: 3/4;
      grid-row: 4;
    }
    .label2 .nm1{
      grid-column: 1/2;
      grid-row:  1;
    }
    .label2 .nm2{
      grid-column: 2/3;
      grid-row: 1;
    }
    .label2 .nm3{
      grid-column: 3/4;
      grid-row: 1;
    }
    .label3 .nm1{
      grid-column: 1/4;
      grid-row:  1;
    }
    
    .label3 .nm4{
      grid-column: 3/4;
      grid-row: 2;
      align-items: center;
    }
    }
    @media screen and (min-width: 1000px) {
      .new{
        height: 100%;
        left: 4.99em;
      }
    }
  </style> 