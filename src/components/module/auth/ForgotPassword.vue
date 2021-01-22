<template>
  <div class="container m-0 pl-5 pr-5 pb-5 pt-4">
    <div class="card-header container-fluid row m-0 p-0">
      <div class="back col-2 pt-3 p-0" @click="back">
        <img src="../../../assets/back.png" alt="">
      </div>
      <div class="col-10 pt-3">
        <p class="card-header-title">Forgot Password</p>
      </div>
    </div>
    <div class="card-body container-fluid m-0 p-0 pt-3">
    <p class="common-black-text mt-3">You’ll get messages soon on your e-mail </p>
        <form action="" class="form mt-4">
      <div class="form-group">
      <label for="email" class="input-label">Email</label>
      <input type="text" id="email" v-model="input.email" placeholder="telegram@gmail.com" :class="{ 'is-invalid': $v.input.email.$error }" class="input-email form-control shadow-none">
      <div v-if="!$v.input.email.required" class="invalid-feedback">Email is required</div>
      <div v-if="!$v.input.email.email" class="invalid-feedback">Invalid format email</div>
      </div>
        <ButtonPrimary :method="handleForgotPassword" buttonText="Send"/>
    </form>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import { mapActions, mapMutations } from 'vuex'
import ButtonPrimary from '../../base/ButtonPrimary'
import cryptoRandomString from 'crypto-random-string'
import Swal from 'sweetalert2'

export default {
  name: 'ForgotPassword',
  data () {
    return {
      input: {
        email: ''
      }
    }
  },
  validations: {
    input: {
      email: {
        required,
        email
      }
    }
  },
  components: {
    ButtonPrimary
  },
  methods: {
    ...mapActions(['forgotPassword']),
    ...mapMutations(['SET_FORGOT_PASSWORD_CODE']),
    handleForgotPassword () {
      // stop here if form is invalid
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      const code = cryptoRandomString({ length: 6, type: 'numeric' })
      const data = {
        email: this.input.email,
        code
      }
      this.$awn.asyncBlock(
        this.forgotPassword(data),
        resp => {
          this.SET_FORGOT_PASSWORD_CODE(code)
          this.alert('success', 'Check your email ', 'Please check the email we have sent', true)
          this.$router.push({ path: '/auth/confirm-code', query: { email: this.input.email } })
        },
        error => {
          if (error === 'Wrong email') {
            this.alert('error', 'Invalid E-mail', 'Invalid email, please check your email again', false)
          }
        }
      )
    },
    back () {
      this.$router.go(-1)
    },
    alert (icon, title, text, confirmButton) {
      Swal.fire({
        icon: icon,
        title: title,
        text: text,
        showConfirmButton: confirmButton,
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
.input-label {
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 17px;
  /* identical to box height */
  color: #232323;
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
</style>
