<template>
  <div class="container m-0 pl-5 pr-5 pb-5 pt-4">
    <div class="card-header container-fluid row m-0 p-0">
      <div class="back col-3 pt-3 p-0" @click="back">
        <img src="../../../assets/back.png" alt="">
      </div>
      <div class="col-9 pt-3">
        <p class="card-header-title">Confirm Password</p>
      </div>
    </div>
    <div class="card-body container-fluid m-0 p-0 pt-3">
    <p class="common-black-text mt-3">Create your new password</p>
    <form action="" class="form mt-4">
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
              src="../../../assets/ic_sharp-remove-red-eye.png"
              alt="password"
          /></span>
            </div>
          <div v-if="!$v.input.password.required" class="invalid-feedback">Password is required</div>
          <div v-if="!$v.input.password.mingLength" class="invalid-feedback">The minimum password character is 6 characters</div>
          </div>
        </div>
        <div class="form-group">
        <label for="password" class="input-label">Repeat Password</label>
          <div class="input-group">
            <input
              type="password"
              v-model="input.repeatPassword"
              :class="{ 'is-invalid': $v.input.repeatPassword.$error }"
              id="repeat-password"
              class="input-password form-control shadow-none"
              placeholder="Enter your repeat password"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          <div class="input-group-prepend">
          <span class="input-group-text" :class="{ 'is-invalid': $v.input.repeatPassword.$error }" id="basic-addon1"
            ><img
              @click="showPassword"
              id="btnShowPassword"
              src="../../../assets/ic_sharp-remove-red-eye.png"
              alt="repeat-password"
          /></span>
            </div>
          <div v-if="!$v.input.password.required" class="invalid-feedback">Password is required</div>
          <div v-if="!$v.input.password.sameAsPassword" class="invalid-feedback">Repeat password not match with password</div>
          </div>
        </div>
        <ButtonPrimary :method="handleChangePassword"  buttonText="Change your password"/>
    </form>
    </div>
  </div>
</template>

<script>
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
import ButtonPrimary from '../../base/ButtonPrimary'
import { mapActions } from 'vuex'
import Swal from 'sweetalert2'
export default {
  components: {
    ButtonPrimary
  },
  data () {
    return {
      input: {
        password: '',
        repeatPassword: ''
      }
    }
  },
  validations: {
    input: {
      password: { required, minLength: minLength(6) },
      repeatPassword: { required, sameAsPassword: sameAs('password') }
    }
  },
  methods: {
    ...mapActions(['forgotAndChangePassword']),
    showPassword (e) {
      let inputPassword
      if (e.target.alt === 'password') {
        inputPassword = document.getElementById('password')
      } else if (e.target.alt === 'repeat-password') {
        inputPassword = document.getElementById('repeat-password')
      }
      if (inputPassword.type === 'password') {
        inputPassword.type = 'text'
      } else {
        inputPassword.type = 'password'
      }
    },
    handleChangePassword () {
      this.$v.$touch()

      if (this.$v.$invalid) {
        return
      }
      const payload = {
        email: this.$route.query.email,
        data: {
          password: this.input.password
        }
      }
      this.$awn.asyncBlock(
        this.forgotAndChangePassword(payload),
        resp => {
          Swal.fire({
            icon: 'success',
            title: 'Your Password has been changed',
            timer: 1500,
            showConfirmButton: false
          })
          this.$router.push({ path: '/auth/login' })
        }
      )
    },
    back () {
      this.$router.go(-1)
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
</style>
