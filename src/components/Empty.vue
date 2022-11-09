<template>
  <div class="emp">
    <div class="empy">
        <img src="../assets/illustration-empty.svg" alt="empty">
    </div>
    <h1>Empty Invoice </h1>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .emp{
        margin: 0;
        padding: 0;
        position: relative;
        margin-top: 4em;
        width: 100%;
        text-align:  center;
    }
    .emp h1{
        color: white;
        letter-spacing: 1px;
    }
    .empy{
        position: relative;
        width: 40vw;
        height: 40%;
        /* left: 50%;
        top: 50%; */
        margin: 4em auto 0;
        /* transform: translate(-50%, -50%); */
    }
    .emp img{
        width: 100%;
    }
</style>