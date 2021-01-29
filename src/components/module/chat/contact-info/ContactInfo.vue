<template>
    <div class="contact-info col-sm-12 col-lg-4 p-4">
      <div class="header">
        <div class="username d-flex justify-content-start">
          <div class="back2">
            <img src="../../../../assets/back.png" alt=""  @click="showContactInfo">
          </div>
            <p class="m-0 mx-auto">{{getuserChatSelected && getuserChatSelected.username ? getuserChatSelected.username : '(username not set)'}}</p>
        </div>
        <div class="photo mx-auto mt-3">
          <img :src="getuserChatSelected && getuserChatSelected.photoProfile ? getuserChatSelected.photoProfile : '/img/user-avatar.png'" alt="">
        </div>
      </div>
      <div class="body mt-3">
        <div class="name d-flex justify-content-between">
          <div>
          <p class="m-0">{{getuserChatSelected && getuserChatSelected.name ? getuserChatSelected.name : 'Name not set'}}</p>
          <p class="m-0">{{getuserChatSelected && getuserChatSelected.status ? getuserChatSelected.status : 'Status not set'}}</p>
          </div>
          <div class="chat-icon cursor-pointer" @click="directChat">
            <img src="../../../../assets/Chat-purple.png" alt="">
          </div>
        </div>
        <div class="phone-number mt-2">
          <p class="m-0">Phone Number</p>
          <p class="m-0">{{getuserChatSelected && getuserChatSelected.phoneNumber ? getuserChatSelected.phoneNumber : 'Phone number not been set'}}</p>
        </div>
        <div class="phone-number mt-2">
          <p class="m-0">Bio</p>
          <p class="m-0">{{getuserChatSelected && getuserChatSelected.bio ? getuserChatSelected.bio : 'Bio not been set'}}</p>
        </div>
        <div class="menu d-flex justify-content-center">
          <input type="radio" class="d-none" v-model="menuOption" name="menu-option" id="location" value="location">
          <label for="location" class="cursor-pointer d-flex align-items-center justify-content-center">Location</label>
          <input type="radio" class="d-none" v-model="menuOption" name="menu-option" id="image" value="image">
          <label for="image" class="cursor-pointer d-flex align-items-center justify-content-center">Image</label>
          <input type="radio" class="d-none" v-model="menuOption" name="menu-option" id="documents" value="documents">
          <label for="documents" class="cursor-pointer d-flex align-items-center justify-content-center">Documents</label>
        </div>
        <div class="menu-option">
          <div v-if="menuOption === 'image'" class="image d-flex flex-wrap justify-content-center">
            <div class="item-image" v-for="(message, index) in getChatImage" :key="index">
            <img v-lazy="message.photo" alt="">
            </div>
          </div>
          <div v-if="menuOption ==='location'" class="location">
          <LeafLetMaps v-if="getuserChatSelected.currentLocation" :coordinatesUserSelected="getuserChatSelected.currentLocation "/>
          </div>
          <div v-if="menuOption ==='documents'" class="documents"></div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import LeafLetMaps from '../../maps/Maps'
export default {
  name: 'ContactInfo',
  components: {
    LeafLetMaps
  },
  data () {
    return {
      menuOption: 'image'
    }
  },
  computed: {
    ...mapGetters(['getuserChatSelected', 'getChatImage', 'getShowContactInfo', 'getChatMessage'])
  },
  methods: {
    ...mapMutations(['SET_SHOW_CONTACT_INFO']),
    showContactInfo () {
      if (screen.width <= 576) {
        if (this.getShowContactInfo) {
          this.hideContactList()
          this.SET_SHOW_CONTACT_INFO(false)
        } else {
          this.SET_SHOW_CONTACT_INFO(true)
        }
      } else {
        if (this.getShowContactInfo) {
          this.SET_SHOW_CONTACT_INFO(false)
        } else {
          this.SET_SHOW_CONTACT_INFO(true)
        }
      }
    },
    hideContactList () {
      if (document.getElementById('left-side').classList.contains('show')) {
        document.getElementById('left-side').classList.remove('show')
      } else {
        document.getElementById('left-side').classList.add('show')
      }
    },
    directChat () {
      if (screen.width <= 576) {
        this.SET_SHOW_CONTACT_INFO(false)
        this.hideContactList()
      } else {
        this.SET_SHOW_CONTACT_INFO(false)
      }
      document.getElementById('input-message').focus()
      // if (document.getElementById('right-side').classList.contains('show')) {
      //   document.getElementById('right-side').classList.remove('show')
      // } else {
      // }
    }
  }
}
</script>

<style scoped>
.show{
  display:none;
}
.menu-option {
  max-width:100%;
  height: 200px;
  overflow: auto;
  overflow-x: hidden;
}
.menu-option .image .item-image {
  width:60px;
  height:60px;
  margin:5px;
}
.menu-option .image .item-image img{
  width:100%;
  height:100%;
  object-fit:cover;
  border-radius:10px;
}
.contact-info .body .menu label {
  font-family: Rubik;
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 19px;
/* identical to box height */
margin-top:20px;
text-align: center;
width:100%;

}
.contact-info .body .menu input[type="radio"]{
     opacity: 0;
  width: 0;
}
.contact-info .body input[type="radio"] {
  font-family: Rubik;
font-style: normal;
font-weight: normal;
font-size: 15px;
line-height: 185.17%;
/* identical to box height, or 28px */

letter-spacing: -0.165px;

color: #FFFFFF;
}
.contact-info .body .menu label:hover {
    border:none;
    color:#7E98DF;
}
.contact-info .body .menu input[type="radio"]:focus + label {
    border: 4px dashed #444;
}

.contact-info .body .menu input[type="radio"]:checked + label {
background-color:#7E98DF !important;
color:#FFFFFF;
height:50px;
border-radius:20px;
}
.back2 {
  cursor: pointer;
}
.header .username p {
  font-family: Rubik;
font-style: normal;
font-weight: 500;
font-size: 24px;
line-height: 28px;

color: #7E98DF;
}
.header .photo {
  width:82px;
  height:82px;
}
.header .photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
}
.body .name p:first-of-type {
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 26px;
  /* identical to box height */

  letter-spacing: -0.165px;

  color: #232323;
}
.body .name p:last-of-type {
font-family: Rubik;
font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 19px;
/* identical to box height */

letter-spacing: 1.335px;

color: #232323;
}
.cursor-pointer {
  cursor: pointer;
}
.phone-number p:first-of-type {
  font-family: Rubik;
font-style: normal;
font-weight: 500;
font-size: 19px;
line-height: 23px;

color: #232323;
}
.phone-number p:last-of-type {
  font-family: Rubik;
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 23px;

color: #232323;
}
</style>
