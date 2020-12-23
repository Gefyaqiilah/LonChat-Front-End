<template>
  <div class="container m-0 pl-5 pr-5 pb-5 pt-4">
    <div class="card-header container-fluid row m-0 p-0">
      <div class="col-4 pt-3 p-0">
        <img src="../../../assets/back.png" alt="">
      </div>
      <div class="col-8 pt-3">
        <p class="card-header-title">Register</p>
      </div>
    </div>
    <div class="card-body container-fluid m-0 p-0 pt-3">
    <p class="common-black-text mt-3">Let’s create your account!</p>
    <form action="" class="form mt-4">
      <div class="form-group">
      <label for="name" class="input-label">Name</label>
      <input type="text" id="name" v-model="inputEmail" placeholder="Telegram app" class="input-name form-control shadow-none" required>
      </div>
      <div class="form-group">
      <label for="email" class="input-label">Email</label>
      <input type="text" id="email" v-model="inputName" placeholder="Ex: telegram@gmail.com" class="input-email form-control shadow-none" required>
      </div>
        <div class="form-group">
        <label for="password" class="input-label">Password</label>
          <div class="input-group">
            <input
              type="password"
              v-model="inputPassword"
              id="password"
              class="input-password form-control shadow-none"
              placeholder="Enter your password"
              aria-label="Username"
              aria-describedby="basic-addon1"
              required
            />
          <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1"
            ><img
              @click="showPassword"
              id="btnShowPassword"
              src="../../../assets/ic_sharp-remove-red-eye.png"
              alt=""
          /></span>
            </div>
          </div>
        </div>
        <button class="button-primary">Register</button>
        <div class="separator p-4">Register With</div>
        <button class="button-secondary">Google</button>
    </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      inputEmail: '',
      inputName: '',
      inputPassword: ''
    }
  },
  methods: {
    showPassword () {
      const inputPassword = document.getElementById('password')
      if (inputPassword.type === 'password') {
        inputPassword.type = 'text'
      } else {
        inputPassword.type = 'password'
      }
    }
  }
}
</script>

<style scoped>
* {
  /* border:1px solid red; */
}
.card-header {
  background-color:#FFFFFF !important;
  border:none;
}
.card-header-title {
font-family: Rubik;
font-style: normal;
font-weight: 500;
font-size: 22px;
line-height: 26px;
/* identical to box height */

text-align: left;
letter-spacing: -0.165px;

color: #7E98DF;
}
.common-black-text {
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 17px;
  /* identical to box height */
  color: #232323;
}
.input-name {
  border:none;
  border-radius: 0;
  border-bottom:1px solid black;
}
.input-email {
  border:none;
  border-radius: 0;
  border-bottom:1px solid black;
}
.input-password {
  border:none;
  border-radius: 0;
  border-bottom:1px solid black !important;
}
::placeholder {
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */
  color: #232323 !important;
}
.form-group {
  margin-bottom:35px;
}
.input-label {
  font-family: Rubik;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 17px;
  /* identical to box height */
  color: #848484;
  opacity: 0.75;
}
.form-control {
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */
  color: #232323;
}
.input-group-text {
  border: none !important;
  border-bottom:1px solid black !important;
  border-radius: 0 !important;
  background-color: transparent !important;
}

.input-group-prepend {
  border:none !important;
  border-radius: 0 !important;
  background-color: transparent !important;
}
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
}
.separator {
  display: flex;
  align-items: center;
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */
  text-align: center;
  color: #848484;
}
.separator::before, .separator::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #848484;
}
.separator::before {
    margin-right: .25em;
}
.separator::after {
    margin-left: .25em;
}
</style>
