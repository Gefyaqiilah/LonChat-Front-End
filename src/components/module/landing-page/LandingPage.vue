<template>
    <div class="splash-screen d-flex justify-content-center align-items-center">
      <div class="splash-image">
      <img src="../../../assets/Group 5856.png" alt="">
      </div>
    </div>
</template>

<script>
export default {
  name: 'LandingPage',
  mounted () {
    setTimeout(() => {
      this.$router.push({ path: '/auth/login' })
    }, 3000)
  }
}
</script>

<style scoped>
.splash-screen {
  background-color:#7E98DF;
  width:100%;
  height:100vh;
}
.splash-screen .splash-image img {
  width:100%;
  animation: rotation 2s infinite linear;
}
@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
