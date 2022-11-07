<template>
  <div class="head">
    <div class="logo">
      <img src="../assets/logo.svg" alt="logo">
    </div>
    <div class="icon">
      <div class="mode">
        <button>
          <img @click="mode" src="../assets/icon-sun.svg" alt="sun">
        </button>
      </div>
      <div class="pic">
        <img src="../assets/image-avatar.jpg" alt="avatar">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    mode() {
      alert('Still under construction...')
    }
  }
} 
</script>

<style scoped>
  .head{
    position: fixed;
    top: 0;
    background: #1e2139;
    display: flex;
    justify-content: space-between;  
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(20);
  } 
  button{
    background-color: inherit;
    outline: none;
    border: none;
  }
  .head .logo{
    position: relative;
    background: rgba(100, 70, 220, 0.999);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0 14px 14px 0;
    color:#dfe3fa, #f9fafe, #888eb0,#F9FAFE,#7e88c3,
     rgba(55, 59, 83, 0.06),rgba(72, 84, 159, 0.25),
     rgba(12, 14, 22, .4),
  }
  .logo img{
    z-index: 1;
  } 
  .head .logo::after{
    position: absolute;
    content: '';
    width: 100%;
    height: 59%;
    background: #7e88c3;
    border-radius: 14px 0 ;
    bottom: 0;
  }
  .head .icon{
    position: relative;
    width: 140px;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    display: flex;
  }
  .icon .mode{
    position: relative;
    align-items: center;
    display: flex;
    justify-content: center;
    height: 100%;
    width: 80px;
  }
  .icon .pic{
    position: relative;
    width: 30px;
    height: 30px;
  }
  .pic img{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%; 
    border-radius: 70%;
  }
  @media screen and (max-width: 1000px) {
    .head{
      width: 100%;
      height: 70px;
      padding: 0 25px;
      padding-left: 0;
    }
    .head .logo{
      height: 100%;
      width: 80px;
      z-index: 1;
    }
    .icon .mode{
      border-right: 1px solid #777;
    }
  }
  @media screen and (min-width: 1000px) {
    .head{
      width: 80px;
      height: 100vh;
      flex-direction: column;
      padding:0 0 20px;
      
    }
    .head .logo{
      width: 100%;
      height: 80px;
    }
    .head .icon{
    height: 140px;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    display: flex;
    flex-direction: column;
  }
  .icon .mode{
    width: 100%;
    height: 80px;
  }
  .icon .mode{
      border-bottom: 1px solid #777;
    }
  }

</style>