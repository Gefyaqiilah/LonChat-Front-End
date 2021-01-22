<template>
    <div class="p-0 d-flex align-items-center justify-content-center">
      <p class="welcome-chat">{{text}}</p>
    </div>
</template>

<script>
export default {
  name: 'DefaultPage',
  props: ['text']
}
</script>

<style scoped>
.welcome-chat {
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;

  color: #848484;
}
</style>
