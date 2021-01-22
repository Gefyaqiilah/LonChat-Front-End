<template>
  <div class="container m-0 pl-5 pr-5 pb-5 pt-4">
    <div class="card-header container-fluid row m-0 p-0">
      <div class="back col-4 pt-3 p-0" @click="back">
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
      <input type="text" id="name" v-model="input.name" placeholder="Telegram app" :class="{ 'is-invalid':  $v.form.name.$error }" class="input-name form-control shadow-none">
       <div v-if="!$v.input.name.required" class="invalid-feedback">Name is required</div>
      </div>
      <div class="form-group">
      <label for="email" class="input-label">Email</label>
      <input type="text" id="email" v-model="input.email" placeholder="Ex: telegram@gmail.com" :class="{ 'is-invalid': $v.input.email.$error }" class="input-email form-control shadow-none">
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
          <div v-if="!$v.input.password.mingLength" class="invalid-feedback">The minimum password character is 6 characters</div>
          </div>
        </div>
        <ButtonPrimary :method="handleRegister" buttonText="Register"/>
        <div class="separator p-4">Register With</div>
        <ButtonSecondary/>
    </form>
    </div>
  </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

import Swal from 'sweetalert2'
import ButtonPrimary from '../../../components/base/ButtonPrimary'
import ButtonSecondary from '../../../components/base/ButtonSecondary'
export default {
  name: 'Register',
  data () {
    return {
      input: {
        email: '',
        name: '',
        password: ''
      },
      submitted: false
    }
  },
  validations: {
    input: {
      name: {
        required
      },
      email: {
        required, email
      },
      password: {
        required,
        minLength: minLength(6)
      }
    }
  },
  components: {
    ButtonPrimary,
    ButtonSecondary
  },
  methods: {
    ...mapActions(['register']),
    showPassword () {
      const inputPassword = document.getElementById('password')
      if (inputPassword.type === 'password') {
        inputPassword.type = 'text'
      } else {
        inputPassword.type = 'password'
      }
    },
    handleRegister () {
      // stop here if form is invalid
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      const data = {
        email: this.input.email,
        password: this.input.password,
        name: this.input.name
      }
      this.$awn.asyncBlock(
        this.register(data),
        resp => {
          this.$router.push({ path: '/auth/login' })
          this.alert('success', 'Yeayy!', 'Your data has been created')
        },
        err => {
          if (err === 'Email has been used by other user') {
            this.alert('error', 'Sorry', 'Your Email has been used by other user')
          }
        }
      )
    },
    back () {
      this.$router.go(-1)
    },
    alert (icon, title, text) {
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
  border-bottom:1px solid black;
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
.back {
  cursor: pointer;
}
.pointer {
  cursor: pointer;
}
</style>
