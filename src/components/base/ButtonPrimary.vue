<template>
        <button class="button-primary" @click.prevent="method" >{{ buttonText }}</button>
</template>

<script>
export default {
  name: 'ButtonPrimary',
  props: ['method', 'buttonText']
}
</script>

<style scoped>
.button-primary {
  width: 100%;
  height: 60px;
  border:none;
  background: #7E98DF;
  border-radius: 70px;

  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */

  text-align: center;

  color: #FFFFFF;
  outline:none;
  transition:box-shadow 0.5s;
}
.button-primary:hover {
box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}
</style>
