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
}
</style>
