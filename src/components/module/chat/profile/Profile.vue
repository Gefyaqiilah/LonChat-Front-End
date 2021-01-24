<template>
  <div class="p-0 m-0">
    <div class="header d-flex justify-content-between">
      <div class="back" @click="back">
        <img src="../../../../assets/back.png" alt="">
      </div>
      <div class="username">
        <p class="m-0">{{this.getDataUser.username}}</p>
      </div>
      <div class="div show-guide-profile" @click="alertGuideProfile()">
        <i class="fa fa-question"></i>
      </div>
    </div>
    <div class="profile d-flex flex-column mt-4">
      <div class="photo mx-auto">
        <input type="file" name="" id="input-photo-profile" accept="image/png,image/gif,image/jpeg,/image/jpg">
        <label for="input-photo-profile">
          <div class="img">
            <img id="photo-profile" :src="defaultImage" alt="">
            <i class="fa fa-edit icon-edit-image"><span class="edit-text">Edit</span></i>
          </div>
        </label>
      </div>
      <div class="name mx-auto mt-1"  @click="tapName">
        <input type="text" class="form-control text-center fullname shadow-none" @keyup.enter="handleUpdateProfile" v-model="input.name" id="name" value="+375(29)9638433" disabled>
        <p class="text-center m-0 username">{{this.getDataUser.username}}</p>
      </div>
    </div>
    <div class="account d-flex flex-column mt-4">
      <p class="text-left m-0 account-title">Account</p>
      <div class="phone-number mt-2"  @click="tapPhoneNumber">
        <input type="text" class="form-control text-left text shadow-none input-phone-number" @keyup.enter="handleUpdateProfile" v-model="input.phoneNumber" id="phone-number" value="+375(29)9638433" disabled>
        <p class="text-left m-0 desc">Phone Number</p>
      </div>
      <div class="username mt-2" @click="tapUserName">
        <input type="text" class="form-control text-left text shadow-none input-username" @keyup.enter="handleUpdateProfile" v-model="input.username" id="username" value="@wdlam" disabled>
        <p class="text-left m-0 desc">Username</p>
      </div>
      <div class="bio mt-2" @click="tapBio">
        <input type="text" class="form-control text-left text shadow-none input-bio" @keyup.enter="handleUpdateProfile" v-model="input.bio" id="bio" value="bio not set" disabled>
        <p class="text-left m-0 desc">
          Bio
        </p>
      </div>
    </div>
    <div class="settings d-flex flex-column mt-2">
      <p class="settings-title"> My Current Location :</p>
      <LeafLetMaps/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import $ from 'jquery'
import Swal from 'sweetalert2'
import mixin from '../../../../mixins/index'

export default {
  name: 'Profile',
  mixins: [mixin],
  data () {
    return {
      input: {
        name: null,
        phoneNumber: null,
        username: null,
        bio: null
      }
    }
  },
  methods: {
    ...mapActions(['getUserData', 'updateProfile', 'updatePhotoProfile']),
    back () {
      this.$router.go(-1)
    },
    handleUpdateProfile (e) {
      const target = e.target.id
      let inputName = ''
      const payload = {}
      if (target === 'phone-number') {
        if (this.input.phoneNumber === '' || this.input.phoneNumber === 'Phone number not set') {
          this.assignValueInput()
          return this.alert('Phone number cannot empty', 'error')
        }
        inputName = 'Phone number'
        payload.phoneNumber = this.input.phoneNumber
      } else if (target === 'username') {
        if (this.input.username === '' || this.input.username === 'username not set') {
          this.assignValueInput()
          return this.alert('Username cannot empty', 'error')
        }
        inputName = 'Username'
        payload.username = this.input.username.toLowerCase()
      } else if (target === 'bio') {
        if (this.input.bio === '' || this.input.bio === 'bio not set') {
          this.assignValueInput()
          return this.alert('Bio cannot empty', 'error')
        }
        inputName = 'Bio'
        payload.bio = this.input.bio
      } else if (target === 'name') {
        if (this.input.name === '' || this.input.name === 'Name not set') {
          this.assignValueInput()
          return this.alert('Name cannot empty', 'error')
        }
        inputName = 'Name'
        payload.name = this.input.name
      }
      this.updateProfile(payload)
        .then((result) => {
          e.target.focus = false
          this.alert(`${inputName} has been updated`, 'success')
          this.$noty.success(`${inputName} has been updated`, {
            killer: true,
            timeout: 6000,
            layout: 'topRight',
            theme: 'relax'
          })
        })
    },
    detectChangePhoto () {
      const self = this
      $('#input-photo-profile').change(function () {
        if (this.files && this.files[0]) {
          if (this.files[0].size >= 3 * 1000000) {
            return self.alert('Sorry,file too large', 'error')
          }
          Swal.fire({
            title: 'Are you sure?',
            icon: 'question',
            text: 'change your profile photo?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, I want to change!'
          }).then((result) => {
            if (result.isConfirmed) {
              const form = new FormData()
              form.append('photoProfile', this.files[0])
              self.$awn.asyncBlock(
                self.updatePhotoProfile(form),
                resp => {
                  self.$noty.success('Your profile photo has been updated', {
                    theme: 'relax'
                  })
                  this.value = ''
                }
              )
            }
          })
        }
      })
    },
    tapName (e) {
      const input = document.getElementById('name')
      if (input.value === 'Name not set') {
        input.value = ''
      }
      input.disabled = false
      input.focus()
    },
    tapPhoneNumber (e) {
      const input = document.getElementById('phone-number')
      if (input.value === 'Phone number not set') {
        input.value = ''
      }
      input.disabled = false
      input.focus()
    },
    tapUserName (e) {
      const input = document.getElementById('username')
      if (input.value === 'username not set') {
        input.value = ''
      }
      input.disabled = false
      input.focus()
      this.checkPhoneNumber = false
    },
    tapBio (e) {
      const input = document.getElementById('bio')
      if (input.value === 'bio not set') {
        input.value = ''
      }
      input.disabled = false
      input.focus()
      this.checkPhoneNumber = false
    },
    alert (text, icon) {
      Swal.fire({
        icon: icon,
        title: text,
        showConfirmButton: false,
        timer: 1500
      })
    },
    assignValueInput () {
      this.getDataUser.name ? this.input.name = this.getDataUser.name : this.input.name = 'Name not set'
      this.getDataUser.phoneNumber ? this.input.phoneNumber = this.getDataUser.phoneNumber : this.input.phoneNumber = 'Phone number not set'
      this.getDataUser.bio ? this.input.bio = this.getDataUser.bio : this.input.bio = 'bio not set'
      this.getDataUser.username ? this.input.username = this.getDataUser.username : this.input.username = 'username not set'
    }
  },
  computed: {
    ...mapGetters(['getDataUser']),
    defaultImage () {
      // eslint-disable-next-line quotes
      return this.getDataUser.photoProfile ? this.getDataUser.photoProfile : "/img/user-avatar.png"
    }
  },
  async mounted () {
    try {
      await this.getUserData()
      this.assignValueInput()
      this.detectChangePhoto()
    } catch (error) {
      console.log('error :>> ', error)
    }
  }
}
</script>

<style scoped>
/* * {
  border:1px solid red;
} */
.header .username p {
  font-family: Rubik;
font-style: normal;
font-weight: 500;
font-size: 24px;
line-height: 28px;

color: #7E98DF;
}
.header .name p {
  font-family: Rubik;
font-style: normal;
font-weight: 500;
font-size: 22px;

color: #232323;

}
.profile .name .fullname {
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 26px;
  text-transform: capitalize;
  /* identical to box height */

  color: #232323;
  border:none;
  transition: font-size 1s;
}
.profile .name .fullname:focus {
  /* border: 1px solid #7E98DF; */
  background-color:rgb(126,152,223);
  color: white;
  font-size: 17px;
}
.profile .name .fullname:disabled {
border:none;
background-color:white;
  color: #232323;
}
.profile .name .username {
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */

  color: #848484;
}
.input-username {
  text-transform: lowercase;
}
#input-photo-profile {
  display:none;
}
.account .account-title {
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 19px;
  line-height: 23px;

  color: #232323;
}
.settings .settings-title {
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 19px;
  line-height: 23px;

  color: #232323;
}
.account .phone-number {
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */
}
.account .phone-number .text {
  color:#232323;
  font-weight: 500;
  border:none;
  padding: 0;
  transition: font-size 1s;
}
.account .phone-number .desc {
  color:#848484;
}
.account .phone-number .text:disabled {
  border:none;
  padding: 0;
  background-color:white;
}
.input-phone-number:focus {
  background-color:#7E98DF;
  color: white !important;
  font-size: 15px;
  padding: 5px !important;
}

.account .username {
  font-family: Rubik;
  font-style: normal;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */
}
.account .username .text {
  font-weight: 500;
  border:none;
  padding: 0;
  color: #232323;
  transition: font-size 1s;
}
.account .username .text:focus {
  background-color:#7E98DF;
  color: white !important;
  font-size: 15px;
  padding: 5px;
}
.account .username .text:disabled {
  font-weight: 500;
  border:none;
  padding: 0;
  background-color:white;
}
.account .username .desc {
  color: #848484;
}
.account .bio {
  font-family: Rubik;
  font-style: normal;
  font-size: 16px;
  line-height: 19px;
}
.account .bio .text {
  font-weight: 500;
  border:none;
  padding:0;
  color: #232323;
  transition: font-size 1s;
}
.account .bio .text:focus {
  background-color:#7E98DF;
  color: white !important;
  font-size: 15px;
  padding: 5px !important;
}
.account .bio .text:disabled {
  border:none;
  background-color:white;
  color: #232323;
}
.account .bio .desc {
  color: #848484;
}
.settings {
  font-family: Rubik;
  font-style: normal;
  font-size: 17px;
  font-weight:400;
  line-height: 19px;
}
.settings .text {
  font-weight: 500;
  font-size: 19px;
}
.settings .icon {
  width:30px;
  height:30px;
  margin: 0 10px 0 0;
}
.settings .icon img {
  width:100%;
  height:100%;
  object-fit: contain;
}
.back {
  cursor: pointer;
}
.profile .photo .img {
  width:100px;
  height:100px;
}
.profile .photo .img img{
  width:100%;
  height:100%;
  object-fit: cover;
  border-radius: 50px;
  filter: brightness(100%);
 transition: filter 0.25s ease-out;
 cursor:pointer;
}
.profile .photo .img:hover img{
  filter: brightness(70%);
 transition: filter 0.25s ease-in;
}
.profile .photo .img img:hover + .icon-edit-image{
  display:inline;
 transition: display 0.25s ease-in;
}
.icon-edit-image {
  display:none;
position: absolute;
margin-left: auto;
margin-right: auto;
top:115px;
left: 0;
right: 0;
text-align: center;
width:max-content;
height:max-content;
color:white !important;
opacity:0.9;
font-size:20px !important;
}
.icon-edit-image .edit-text{
  font-family: Rubik;
  font-style: normal;
  font-size: 15px;
  font-weight:700;
  line-height: 19px;
  color:white;
  width:max-content;
  height:max-content;
}
.show-guide-profile {
  color: #7E98DF;
  font-size:20px;
  cursor: pointer;
}
</style>
