<template>
  <div class="container m-0 pl-5 pr-5 pb-5 pt-4">
    <div class="card-header container-fluid row m-0 p-0">
      <div class="back col-3 pt-3 p-0" @click="back">
        <img src="../../../assets/back.png" alt="">
      </div>
      <div class="col-9 pt-3">
        <p class="card-header-title">Confirm Code</p>
      </div>
    </div>
    <div class="card-body container-fluid m-0 p-0 pt-3">
    <p class="common-black-text mt-3">Enter code from your email</p>
    <form action="" class="form mt-4">
      <div class="form-group">
      <label for="email" class="input-label">Code :</label>
      <input type="text" id="email" v-model="input.code" placeholder="" :class="{ 'is-invalid': $v.input.code.$error }" class="input-email form-control shadow-none">
      <div v-if="!$v.input.code.required" class="invalid-feedback">Code is required</div>
      <div v-if="!$v.input.code.sameAs" class="invalid-feedback">Wrong code</div>
      </div>
      <ButtonPrimary :method="handleCompareCode"  buttonText="Submit"/>
    </form>
    </div>
  </div>
</template>

<script>
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
import ButtonPrimary from '../../base/ButtonPrimary'
export default {
  components: {
    ButtonPrimary
  },
  data () {
    return {
      input: {
        code: '',
        trueCode: null
      }
    }
  },
  validations: {
    input: {
      code: { required, minLength: minLength(6), sameAs: sameAs('trueCode') }
    }
  },
  methods: {
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
    handleCompareCode () {
      this.$v.$touch()

      if (this.$v.$invalid) {
        return
      }
      this.$router.push({ path: '/auth/confirm-password', query: { email: this.$route.query.email } })
    },
    back () {
      this.$router.go(-1)
    }
  },
  computed: {
    ...mapGetters(['getForgotPassword'])
  },
  mounted () {
    this.input.trueCode = this.getForgotPassword
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
  color: #232323 !important;
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
