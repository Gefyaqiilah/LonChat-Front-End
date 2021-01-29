<template>
  <div class="login container p-5">
    <div class="card-header container-fluid row m-0 p-0">
      <div class="col-4 pt-3 p-0">
        <!-- <img src="../../../assets/back.png" alt=""> -->
      </div>
      <div class="col-8 pt-3">
        <p class="card-header-title">Login</p>
      </div>
    </div>
    <div class="card-body container-fluid m-0 p-0 pt-3">
    <p class="common-black-text mt-3">Hi, Welcome back!</p>
    <form action="" class="form mt-4">
      <div class="form-group">
      <label for="email" class="input-label">Email</label>
      <input type="text" id="email" v-model="input.email" placeholder="Ex: lonchat@gmail.com" :class="{ 'is-invalid': $v.input.email.$error }" class="input-email form-control shadow-none">
      <div v-if="!$v.input.email.required" class="invalid-feedback">Email is required</div>
      <div v-if="!$v.input.email.email" class="invalid-feedback">Invalid format email</div>
      </div>
        <div class="form-group">
        <label for="password" class="input-label">Password</label>
          <div class="input-group">
            <input
              type="password"
              v-model="input.password"
              :class="{ 'is-invalid': $v.input.password.$error }"
              id="password"
              class="input-password form-control shadow-none"
              placeholder="Enter your password"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          <div class="input-group-prepend">
          <span class="input-group-text" :class="{ 'is-invalid': $v.input.password.$error }" id="basic-addon1"
            ><img
              @click="showPassword"
              id="btnShowPassword"
              class="pointer"
              src="../../../assets/ic_sharp-remove-red-eye.png"
              alt=""
          /></span>
            </div>
          <div v-if="!$v.input.password.required" class="invalid-feedback">Password is required</div>
          </div>
          <p @click="toForgotPassword" class="text-right forgot-password mt-3">Forgot Password ?</p>
        </div>
        <ButtonPrimary :method="handleLogin" buttonText="Login"/>
        <div class="separator p-4">Login With</div>
        <ButtonSecondary/>
        <p class="sign-up text-center mt-4">Don’t have an account? <span class="purple" @click="toSignUp">Sign Up</span></p>
    </form>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import ButtonPrimary from '../../base/ButtonPrimary'
import ButtonSecondary from '../../base/ButtonSecondary'
import { mapActions, mapMutations } from 'vuex'
import Swal from 'sweetalert2'
export default {
  name: 'Login',
  components: {
    ButtonPrimary,
    ButtonSecondary
  },
  data () {
    return {
      input: {
        email: '',
        password: ''
      }
    }
  },
  validations: {
    input: {
      email: {
        required,
        email
      },
      password: {
        required
      }
    }
  },
  methods: {
    ...mapActions(['login', 'updateProfile']),
    ...mapMutations(['SET_USER_DATA', 'SET_CURRENT_LOCATION']),
    showPassword () {
      const inputPassword = document.getElementById('password')
      if (inputPassword.type === 'password') {
        inputPassword.type = 'text'
      } else {
        inputPassword.type = 'password'
      }
    },
    handleLogin () {
      // stop here if form is invalid
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      const data = {
        email: this.input.email,
        password: this.input.password
      }
      this.$awn.asyncBlock(
        this.login(data),
        resp => {
          Swal.fire({
            icon: 'success',
            title: 'Welcome :)',
            showConfirmButton: false,
            timer: 1500
          })
          this.getLocation()
          this.alert('success', 'Welcome :)', 'let\'s cheer up for today', false)
          this.$router.push({ path: '/list-chat' })
        },
        error => {
          if (error === 'Invalid email or password') {
            this.alert('error', 'Invalid email or password', 'Please check your email and password')
          }
        }
      )
    },
    toForgotPassword () {
      this.$router.push({ path: '/auth/forgot-password' })
    },
    toSignUp () {
      this.$router.push({ path: '/auth/register' })
    },
    getLocation () {
      this.$getLocation()
        .then(coordinates => {
          this.SET_CURRENT_LOCATION(coordinates)
          this.updateCurrentLocation(coordinates)
        })
    },
    async updateCurrentLocation (coordinates) {
      const data = {
        currentLocation: JSON.stringify(coordinates)
      }
      await this.updateProfile(data)
    },
    alert (icon, title, text, confirmButton) {
      Swal.fire({
        icon: icon,
        title: title,
        text: text,
        showConfirmButton: false,
        timer: 1500
      })
    }
  }
}
</script>

<style scoped>
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
.input-email {
  border:none;
  border-radius: 0;
  border-bottom:1px solid black;
}
.input-email:focus {
  border-bottom: 2px solid #7E98DF;
}
.input-password {
  border:none;
  border-radius: 0;
  border-bottom:1px solid black;
}
.input-password:focus {
  border: none;
  border-bottom: 2px solid #7E98DF;
}
::placeholder {
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */
  color: #615d5d !important;
}
.form-group {
  margin-bottom:35px;
}
.pointer {
  cursor: pointer;
}
.input-label {
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 17px;
  /* identical to box height */
  color: #232323;
  opacity: 1;
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
  border-radius: 0 !important;
  background-color: transparent !important;
}
.forgot-password {
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 34px;
  text-align: center;
  letter-spacing: -0.165px;
  cursor: pointer;
  color: #7E98DF;
}
.sign-up {
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 34px;
  text-align: center;
  letter-spacing: -0.165px;
  color: #313131;
}
.sign-up .purple {
  color: #7E98DF;
  cursor: pointer;
}
.input-group-prepend {
  border:none !important;
  border-radius: 0 !important;
  background-color: transparent !important;
  border-bottom: 1px solid black !important;
}
.input-password:focus + .input-group-prepend {
  border-bottom: 2px solid #7E98DF !important;
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
/* Small devices (landscape phones, 576px and up)*/
@media (max-width: 575.98px) {
  .login {
    padding:40px !important;
  }
 }

/* Medium devices (tablets, 768px and up)*/
@media (min-width: 768px) {

 }

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {

 }

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {

 }
</style>
