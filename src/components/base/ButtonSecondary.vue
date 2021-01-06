<template>
      <button class="button-secondary"><img src="../../assets/google.png" alt=""> Google</button>
</template>

<script>
export default {
  name: 'ButtonSecondary'
}
</script>

<style scoped>
.button-secondary {
  width: 100%;
  height: 60px;

  background: #FFFFFF;
  border: 1px solid #7E98DF;
  box-sizing: border-box;
  border-radius: 70px;

  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */
  text-align: center;
  color: #7E98DF;
  outline:none;
  transition:box-shadow 0.5s;
}
.button-secondary:hover {
box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}
</style>
