<template>
  <div class="container-fluid m-0 p-3 d-flex">
    <div class="card mx-auto m-0 p-0 align-self-center">
    <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.card {
  width:500px;
  height:max-content;
  margin:100px 400px 100px 400px;
  background: #FFFFFF;
  box-shadow: 0px 20px 20px rgba(126, 152, 223, 0.05);
  border-radius: 30px;
}
</style>
