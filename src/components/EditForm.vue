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
            <input type="text" name="" v-model="newInvoice.clientCity" required>
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
            <select class="nm2" v-model="newInvoice.paymentTerm">
              <option value="one">Next 1 Days</option>
              <option value="seven">Next 7 Days</option>
              <option value="fourteen">Next 14 Days</option>
              <option value="thirty">Next 30 Days</option>
            </select>
          </label>
          <label class="nm3">
            <span>Project description </span>
            <input type="text" name="" v-model="newInvoice.description" required>
          </label>
        </div>

        <p>Item List</p>
        <div class="dip">
          <div v-for="(item, x) in newInvoice.items" :key="x" class="disp">
          <p>name<br><span>{{item.name}}</span></p>
          <p>qty<br><span>{{item.quantity}}</span></p>
          <p>price<br><span>{{item.price}}</span></p>
          <p>total<br><span>{{item.total}}</span></p>
          <button @click.prevent="deleteItem(x)"><img src="../assets/icon-delete.svg" alt="dele"></button>
        </div>
        </div>
        <div>
          <form @submit.prevent="newItem" class="labels label3">
          <label class="nm1">
            <span>Item Name</span>
          <input type="text" placeholder="name" v-model="listItems.name" id="lbl1"  required>
          </label>
          <label class="nm2">
            <span>Qty</span> 
            <input type="number" min="1" v-model="listItems.quantity">
          </label>
          <label class="nm3">
            <span>Price</span>
            <input type="number" name="nm" min="1" v-model="listItems.price">
          </label>
          <button  type="submit"><img src="../assets/icon-plus.svg" alt="plus"> Add New Item</button>
        </form>
        </div>
        <div class="sumbit">
          <button class="bun" type="button" @click.prevent="discard">Cancel</button>
          <div>
            <button  type="submit" class="bun2" id="bun2">Update</button>
          </div>
        </div>
      </form>
    </div>
  </template>
  
  <script>

  export default {
    props: {
      show: String,
      datas: Object
    },
    data() { 
      return{
        newInvoice: {
          street: this.datas.senderAddress.street,
          city: this.datas.senderAddress.city,
          postCode: this.datas.senderAddress.postCode,
          country: this.datas.senderAddress.country,
          clientName: this.datas.clientName,
          clientEmail: this.datas.clientEmail,
          clientStreet: this.datas.clientAddress.street,
          clientCity: this.datas.clientAddress.city,
          clientPostCode: this.datas.clientAddress.postCode,
          clientCountry: this.datas.clientAddress.country,
          createdAt:this.datas.createdAt,
          paymentTerm:this.datas.paymentTerm,
          description:this.datas.description,
          items : [...this.datas.items],
          total:this.datas.total,
          status: 'pending' ,
          paymentDue:this.datas.paymentDue,
          id:this.datas.id,
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
        this.totalAmnt()

        const x = {
        ...this.newInvoice 
        };       
        this.$store.dispatch("editTodo", x);
        this.newInvoice.items = []    
        this.$emit('atShow')
        this.$router.push('/')
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
    
      totalAmnt() {
        const total = this.newInvoice.items
        .map(x => x.total)
        .reduce((a,b) => a+b, 0)
        this.newInvoice.total = total
      },
      deleteItem(index){
        let y = this.newInvoice.items.findIndex((x, i) => i == index)
          return this.newInvoice.items.splice(y, 1)
      }
    },
    mounted() {
      // const bun = document.querySelector('.bun2')
      // bun.disabled = true;
   
      // const x = document.querySelectorAll('input')
      //   console.log([...x].some(el => el.value == ''))
      //   const y = [...x].some(el => el.value == '')
        console.log(this.datas)
    
    }
  }
  </script>
  
  <style scoped> 
    .new{
      position: fixed;
      left: 0%;
      bottom: 0;
      width: 100%;
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
    .dip{
      position: relative;
    }
    .dip .disp{
      position: relative;
      display: flex;
      flex-wrap: wrap;
      column-gap: 10px;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 10px;
    }
    .disp::after{
      content: '';
      position: absolute;
      width: 100%;
      height: 1px;
      background: rgba(100, 70, 220, 0.999);
      left: 0;
      bottom: 0;
    }
    .disp p{
      /* flex-basis:100px; */
      color: white;
    }
    .disp button{
      background: transparent;
      border: none;
      padding: 12px;
      border-radius: 8px;
      outline: none;
      cursor: pointer;
      border: 1px dashed  rgba(100, 70, 220, 0.999);;
    }
    .label3 button img {
      margin-right: 12;
    }
    .disp p span{
      color: darkgray;
      background:rgba(72, 84, 159, 0.15);
      padding: 12px;
      display: inline-block;
      margin-top: 4px;
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
      background: rgba(0, 0, 0, 0.4);
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
      /* font-size: 9px; */
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