<template>
  <div class="main-details">
    <div class="dell">
      <h3>Confirm Deletion</h3>
      <p>Are you sure you want to Delete invoice No. <span>{{datas.id}}</span>? This action cannot be undone.</p>
      <div>
        <button class="edt" @click="toggleDelete">Cancel</button>
        <button class="del" @click="deleteTodo(datas.id)">Confirm</button>
      </div>
    </div>
  <div class="details">
   
    <div class="btn">
      <button @click="backBtn"><img src="../assets/icon-arrow-left.svg" alt=""> Go back</button>
    </div>
    <div class="head">
      
      <div class="edit" v-if="totalLen">
        <div>
          <p>status</p>
          <p class="status" :class="{paid: datas.status === 'paid', pending: datas.status === 'pending', draft: datas.status === 'draft'}">
            <span :class="{paid: datas.status === 'paid', pending: datas.status === 'pending', draft: datas.status === 'draft'}"></span> {{datas.status}}</p>
        </div>
        <div class="bottom">
          <button class="edt" v-if="datas.status !== 'paid'" @click="isEdit">Edit</button>
          <button class="del" @click="toggleDelete">Delete</button>
          <button class="mrk" v-if="datas.status === 'pending'" @click="toggleTodo(datas.id)">Mark as Paid</button>
        </div>
      </div>
      <div class="pend" v-if="!totalLen">
          <p>status</p>
          <p class="status" :class="{paid: datas.status === 'paid', pending: datas.status === 'pending', draft: datas.status === 'draft'}">
            <span :class="{paid: datas.status === 'paid', pending: datas.status === 'pending', draft: datas.status === 'draft'}"></span> {{datas.status}}</p>
      </div>
    </div>
    <div class="bdy">
      <div class="one">
        <h3>
          # {{datas.id}}
        </h3>
        <p>{{datas.description}}</p>
      </div>
      <div class="two">
        <p>{{senderAddress.street}}</p>
        <p>{{senderAddress.city}}</p>
        <p>{{senderAddress.postCode}}</p>
        <p>{{senderAddress.country}}</p> 
      </div>
      <div class="three">
        <p>Invoice Date</p>
        <h3>{{datas.createdAt}}</h3>
      </div>
      <div class="four">
        <p>Bill To</p>
        <h3>{{datas.clientName}}</h3>
        <p>{{clientAddress.street}}</p>
        <p>{{clientAddress.city}}</p>
        <p>{{clientAddress.postCode}}</p>
        <p>{{clientAddress.country}}</p>
      </div>
      <div class="five">
        <p>sent to</p>
        <h3>{{datas.clientEmail}}</h3>
      </div>
      <div class="six">
        <p>Payment Due</p>
        <h3>{{datas.paymentDue}}</h3>
      </div>
      <div class="calc">
        <div class="banner" v-for="(item, i) in datas.items" :key="i">
          <div>
            <h5>{{item.name}}</h5>
            <p>{{item.quantity}} x ${{item.price}}</p>
          </div>
          <h3>${{item.total}}</h3>
        </div>
        <div class="banner1" >
          <div class="bann">
            <p class="name1">Item Name</p>
            <p class="name2">QTY</p>
            <p class="name3">Price</p>
            <p class="name4">Total</p>
            <div class="item">
              <div v-for="(item, i) in datas.items" :key="i" class="item1">
                <h5 class="ones">{{item.name}}</h5>
                <h5 class="ones1">{{item.quantity}}</h5>
                <h3>$ {{item.price}}</h3>
                <h3>$ {{item.total}}</h3>
              </div>
            </div>
          </div>
        </div>
        <div class="total">
          <p>grand Total</p>
          <h2>$ {{datas.total}}</h2>
        </div>
      </div>
    </div>
    <div class="head1">
      <div class="edit edit1">
        <div>
          <button class="edt" v-if="datas.status !== 'paid'" @click="isEdit">Edit</button>
          <button class="del" @click="toggleDelete">Delete</button>
          <button class="mrk" v-if="datas.status === 'pending'" @click="toggleTodo(datas.id)">Mark as Paid</button>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datas: [],
      clientAddress: {},
      senderAddress: {},
      id: this.$route.params.id
    }
  },
  mounted() {
     const x = this.$store.getters.getTodoById(this.id)
     this.datas = this.$store.getters.getTodoById(this.id)
     this.clientAddress = this.datas.clientAddress
     this.senderAddress = this.datas.senderAddress

     console.log(this.datas)

     console.log(this.clientAddress)
  },
  methods: {
    backBtn() {
      this.$router.go(-1)
    },
    isEdit(){
      alert('Still under construction...')
    },
    deleteTodo(id) {
      this.$store.dispatch("deleteTodo", id);
      this.$router.push('/')
      document.body.classList.remove('overflow')
    },
    toggleDelete() {
      // this.filter = !this.filter;
      const x = document.querySelector('.dell')
      x.classList.toggle('anim')
      document.body.classList.toggle('overflow')
    },
    toggleTodo(id) {
      this.$store.dispatch("toggleTodo", id);
    }
  },
  computed: {
        dones(){
          // return this.$store.getters.doneTodos
          const x = window.innerWidth >= 700 ?  ' New Invoices':' New';
          return x
        },
        totalLen(){
          const x = window.innerWidth >= 700;
          return x
        },
        status(){
          const x = window.innerWidth >= 700 ?  ` filter by status`:` filter`;
          return x
        },
  }
}
</script> 

<style scoped>
  .main-details{
    position: relative;
    width: 100%;
    margin: 4.9em 0 0;
    padding: 40px 20px 20px;
    color: #fff;
  }
  .dell{
    position: absolute;
    left: 50%;
    top: 0%;
    transform: translateX(-50%);
    width: 80%;
    padding: 22px 12px;
    background: #252945;  
    z-index: -1;
    border-radius: 10px;
    letter-spacing: 1px;
    opacity: 0;
    transition: .3s;
    box-shadow: 3px 3px 22px #101010 ;
  }
   .anim{ 
    top:30%;
    opacity: 1;
    z-index: 1000;
  }
  
  .overflow .details{
    opacity: .3;
    z-index: -1;
    overflow: hidden;
  }
  .dell h3{
    margin-bottom: 4px;
  }
  .dell span{
    color: rgba(100, 70, 220, 0.999);
  }
  .dell div{
    display: flex;
    align-items: center;
    justify-content: right;
    gap: 10px;
    margin-top: 10px;
  }
  .btn {
    position: relative;
    padding: 0;
    margin-bottom: 20px;
  }
   button{
    background: transparent;
    outline: none;
    border: none;
    color: white;
  }
  .btn img{
    margin-right: 10px;
  }
  .head, .head1{
    position: relative;
    width: 100%;
    padding: 24px;
    background-color: #1e2238;
    border-radius: 10px;
    margin-bottom: 20px;
  }
  .head1{
    display: none;
  }
  .pend{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .edit, .edit1{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .edit div, .dell div{
    display: flex;
    align-items: center;
    /* justify-content: space-between; */
    gap: 10px;
  }
  .edit button, .dell button{
    /* margin-left: 14px; */
    padding: 14px 17px;
    border-radius: 22px;
  }
   .edt {
    background: rgba(0, 0, 0, 0.2);
  }
   .del{
    background: rgba(240, 100, 110, 0.9);
  }
   .mrk{
    background: rgba(100, 70, 220, 0.999);

  }
  .pend p:nth-child(1){
    margin-right: 10px;
  }
  .status{
    position: relative;
    padding: 12px;
    width: 100px;
    text-align: center;
    border-radius: 7px;
    display: inline-block;
  }
   .status span{
    position: relative;
    display: inline-block;
    width: 8px; 
    height: 8px;
    background: #0C0e16;
    border-radius: 50%;
    top: 50%;
  }
   .status .paid {
    background-color: rgba(0, 255, 0, .7);
  }
   .paid {
    background-color: rgba(0, 220, 0, 0.1);
    color: rgba(0, 255, 0, .7);
  }
   .status .pending{
    background: rgba(250,180, 0, .8);
  }
   .pending{
    background-color: rgba(225, 120, 0, 0.1);
    color: rgba(250,180, 0, .8);
  }
   .status .draft{
    background-color: #fff;
    /* color: rgba(255,170, 0, .3); */
  }
   .draft{
    background-color: rgba(0, 0, 0, 0.14);
    /* color: rgba(255,170, 0, .3); */
  }

  .bdy{
    position: relative;
    margin: 0;
    margin-bottom: 20px;
    padding: 2em;
    background-color: #1e2238;
    border-radius: 10px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    grid-auto-rows: minmax(40px, auto);
  }
  .bdy p{
    color: rgba(255, 255, 255, 0.7);
    letter-spacing: 1px;
    font-size: 14px;
    line-height: 18px;
  }
  .bdy h3{
    margin: 10px 0;
  }
  .one {
  grid-column: 1;
  grid-row: 1;
}
.two {
  grid-column: 1;
  grid-row: 2 ;
}
.three {
  grid-column: 1;
  grid-row: 3 ;
}
.four {
  grid-column: 2/3;
  grid-row: 3/ 5;
}
.five {
  grid-column: 1/3;
  grid-row: 5;
}
.six {
  grid-column: 1;
  grid-row: 4;
}
.calc{
  grid-column: 1/3;
  grid-row: 6;
  background: #252945;
  border-radius: 8px;
  overflow: hidden;
}

.banner1, .banner{
  display: none;
}
.total{
  position: relative;
  margin: 0;
  display: flex;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
  background: #0C0e16;
}
.total h3{
  margin: 0;
  padding: 0;
}
@media screen and (max-width:768px) {
  .head1{
    display: flex;
  }
  .edit1{
    position: relative;
    width: 100%;
  }
   .edit1 div {
    width: 100%;
    position: relative;
    right: 0;
    justify-content: flex-end;
  }
  .anim{
    top:50%;
    /* transform: translate(-50%, -50%); */
  }
  .edit .bottom{
    display: none;
  }
  .banner{
  padding: 20px;
  padding-bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
}
  @media screen and (min-width:768px) {
      .main-details{
        width: 748px;
        margin: 4.9em auto 0;
      }
      .bdy{
        grid-template-columns: repeat(4, 1fr);
        gap:20px;
        
      }
      
      .one {
      grid-column: 1/3;
      grid-row: 1;

    }
    .two {
      grid-column: 4;
      grid-row: 1 ;
      text-align: right;
    }
    .three {
      grid-column: 1;
      grid-row: 2 ;
    }
    .four {
      grid-column: 2/3;
      grid-row: 2/ 4;
    }
    .five {
      grid-column: 3/5;
      grid-row: 2;
    }
    .six {
      grid-column: 1;
      grid-row: 3;
    }
    .calc{
      grid-column: 1/5;
      grid-row: 5;
      background: #252945;
      border-radius: 8px;
      overflow: hidden;
      margin-top: 0;
      gap:0;
    }
    .banner1{
      display: block;
      padding: 20px;
    }
    .banner1 .bann{
      display: grid;
      grid-template-columns: 2fr 40px 1fr 1fr;
      gap: 20px;
      grid-auto-rows: minmax(40px, auto);
      width: 100%;
      /* background: #fff; */
    }
    .banner1 .bann p:not(.name1){
      text-align: right;
    }
    .name1{
      grid-column: 1;
      grid-row: 1 ;
    }
    .item{
      grid-column: 1/5;
      /* grid-row: 2/4; */
      width: 100%;
      display: flex;
      flex-direction: column;

    }
    .item .item1{
      display: grid;
      grid-template-columns: 2fr 40px 1fr 1fr;
      grid-auto-rows: minmax(40px, auto);
      gap: 20px;
    }
    
    .item .item1 h3 {
      text-align: right;
      margin: 0;
      padding: 0;
      /* align-items: end; */
    }
    .item .item1 .ones1{
      text-align: center;
    }

    }
    @media screen and (min-width:1000px) {
      .main-details{
        width: 820px;
      }
    }
  
</style>