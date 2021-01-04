<template>
  <div class="container-fluid grid m-0 p-0 row">
    <div id="left-side" class="left-side col-sm-12 col-lg-4 pt-4 pr-4 pl-4 m-0">
      <router-view :socket="socket" :mobileSelectedChat="mobileSelectedChat" :hideContactList="hideContactList" :updateScroll="updateScroll"  :coordinates="coordinates"></router-view>
    </div>
    <div id="right-side" v-if="getuserChatSelected !== null" :class="!contactInfo ? 'right-side show col-sm-12 col-lg-8 p-0' : 'right-side show show col-sm-12 col-lg-4 p-0'">
      <div class="right-side container-fluid p-0 m-0">
    <div class="right-side-header pl-4 pt-4 pr-4 pb-3 d-flex  justify-content-between">
      <div class="chat-info d-flex">
        <div @click="handleBackMobile" class="back mr-3">
          <img src="../../assets/back.png" alt="">
        </div>
        <div class="photo-profile">
           <img :src="userSelectedPhotoProfile" @click="showContactInfo">
        </div>
        <div class="detail-profile m-0 p-0 ml-4 d-flex flex-column justify-content-between">
          <p class="name m-0 align-items-start text-left">{{ getuserChatSelected.name }}</p>
          <p class="status m-0 align-items-end text-left">{{ getuserChatSelected.status }}</p>
        </div>
      </div>
        <div class="profile-menu align-self-top">
          <img src="../../assets/Profile menu.png" alt="">
        </div>
    </div>
    <div class="right-side-body p-4" id="list-chat"  >
      <!-- receive messsage -->
      <div :class="message.userSenderId === getDataUser.id ? 'chat-item-sender' : 'chat-item-receiver'" class="chat-item-receiver row p-0 m-0 mt-3" v-for="message in getChatMessage" :key="message.index">
        <div :class="message.userSenderId === getDataUser.id ?'col-12 p-0 m-0 d-flex flex-row-reverse' : 'col-12 p-0 m-0 d-flex flex-row'">
        <div class="chat-photo-profile align-self-end">
          <img :src="message.userSenderId === getDataUser.id ? getDataUser.photoProfile : userSelectedPhotoProfile " alt="">
        </div>
        <div class="chat-message ml-3">
          {{message.message}}
        </div>
        <div class="time align-self-end">
          <p>{{ message.time }}</p>
        </div>
        </div>
      </div>
    </div>
      </div>
      <div class="type-message pl-4 pr-4 w-100">
        <input @keyup.enter="sendMessage" type="text" v-model="input.message" name="" class="form-control shadow-none" id="">
        <div class="icon">
        <img src="../../assets/Plus.png" alt="">
        <img src="../../assets/Vector (2).png" alt="">
        <img src="../../assets/Group 181.png" alt="">
        </div>
      </div>
    </div>
    <div v-if="contactInfo" class="contact-info col-sm-12 col-lg-4 p-4">
      <div class="header">
        <div class="username d-flex justify-content-start">
          <div class="back2">
            <img src="../../assets/back.png" alt=""  @click="showContactInfo">
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
          <div class="chat-icon">
            <img src="../../assets/Chat-purple.png" alt="">
          </div>
        </div>
        <div class="phone-number mt-2">
          <p class="m-0">Phone Number</p>
          <p class="m-0">{{getuserChatSelected && getuserChatSelected.phoneNumber ? getuserChatSelected.phoneNumber : 'Phone number not been set'}}</p>
        </div>
        <div class="menu d-flex justify-content-center">
          <input type="radio" class="d-none" v-model="input.menuOption" name="menu-option" id="location" value="location">
          <label for="location" class="d-flex align-items-center justify-content-center">Location</label>
          <input type="radio" class="d-none" v-model="input.menuOption" name="menu-option" id="image" value="image">
          <label for="image" class="d-flex align-items-center justify-content-center">Image</label>
          <input type="radio" class="d-none" v-model="input.menuOption" name="menu-option" id="documents" value="documents">
          <label for="documents" class="d-flex align-items-center justify-content-center">Documents</label>
        </div>
        <div class="menu-option">
          <div v-if="input.menuOption === 'image'" class="image d-flex d-flex justify-content-around">
            <img src="../../assets/Rectangle 3.png" alt="">
            <img src="../../assets/Rectangle 3.png" alt="">
            <img src="../../assets/Rectangle 3.png" alt="">
            <img src="../../assets/Rectangle 3.png" alt="">
            <img src="../../assets/Rectangle 3.png" alt="">
          </div>
          <div v-if="input.menuOption ==='location'" class="location">
          <LeafLetMaps v-if="getuserChatSelected.currentLocation" :coordinates="getuserChatSelected.currentLocation "/>
          </div>
          <div v-if="input.menuOption ==='documents'" class="documents"></div>
        </div>
      </div>
    </div>
    <div v-if="getuserChatSelected === null" class="right-side col-8 p-0 d-flex align-items-center justify-content-center">
      <p class="welcome-chat">Please select a chat to start messaging</p>
    </div>
    <!-- <div class="splash-screen d-flex justify-content-center align-items-center">
      <div class="splash-image">
      <img src="../../assets/Group 5856.png" alt="">
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import io from 'socket.io-client'
import moment from 'moment'
export default {
  name: 'Home',
  data () {
    return {
      userChatSelected: null,
      socket: io(process.env.VUE_APP_SERVICE_API),
      input: {
        message: '',
        menuOption: ''
      },
      contactInfo: false,
      coordinates: null
    }
  },
  methods: {
    ...mapActions(['getFriendsData', 'updateProfile', 'readMessage']),
    ...mapMutations(['SET_CHAT_MESSAGE', 'PUSH_CHAT_MESSAGE', 'SET_CURRENT_LOCATION', 'SET_USER_CHAT_SELECTED']),
    updateScroll (as) {
      const element = document.getElementById('list-chat')
      element.scrollTop = element.scrollHeight - element.clientHeight
    },
    showContactInfo () {
      if (screen.width <= 576) {
        if (this.contactInfo) {
          this.hideContactList()
          this.contactInfo = false
        } else {
          // this.mobileSelectedChat()
          this.contactInfo = true
        }
      } else {
        if (this.contactInfo) {
          this.contactInfo = false
        } else {
          this.contactInfo = true
        }
      }
    },
    sendMessage () {
      if (this.input.message.length > 0) {
        const data = {
          message: this.input.message,
          userSenderId: this.getDataUser.id,
          senderName: this.getDataUser.name,
          time: moment(new Date()).format('LT'),
          userReceiverId: this.getuserChatSelected.id
        }
        console.log('data send message :>> ', data)
        this.socket.emit('personalChat', data, async (message) => {
          await this.PUSH_CHAT_MESSAGE(message)
          this.updateScroll()
          this.input.message = ''
        })
      }
    },
    loginRoomSelf () {
      const payload = {
        id: this.getDataUser.id
      }
      this.socket.emit('loginRoomSelf', payload)
    },
    getLocation () {
      this.$getLocation()
        .then(coordinates => {
          this.coordinates = coordinates
          this.SET_CURRENT_LOCATION(coordinates)
          this.updateCurrentLocation(coordinates)
        })
    },
    updateCurrentLocation (coordinates) {
      const data = {
        currentLocation: JSON.stringify(coordinates)
      }
      this.updateProfile(data)
        .then((result) => {
        })
    },
    mobileSelectedChat () {
      if (document.getElementById('right-side').classList.contains('show')) {
        document.getElementById('right-side').classList.remove('show')
      } else {
        document.getElementById('right-side').classList.add('show')
      }
      console.log(document.getElementById('right-side').classList)
    },
    hideContactList () {
      if (document.getElementById('left-side').classList.contains('show')) {
        document.getElementById('left-side').classList.remove('show')
      } else {
        document.getElementById('left-side').classList.add('show')
      }
      console.log(document.getElementById('left-side').classList)
    },
    handleBackMobile () {
      this.mobileSelectedChat()
      this.hideContactList()
    }
  },
  computed: {
    ...mapGetters(['getContactList', 'getuserChatSelected', 'getDataUser', 'getChatMessage']),
    userSelectedPhotoProfile () {
      return this.getuserChatSelected.photoProfile ? this.getuserChatSelected.photoProfile : '/img/user-avatar.png'
    },
    currentLocationUserSelected () {
      return this.getuserChatSelected.currentLocation ? JSON.parse(this.getuserChatSelected.currentLocation) : ''
    },
    handlegetuserChatSelected () {
      return this.getuserChatSelected !== null
    },
    screenWidth () {
      return screen.width
    }
  },
  async mounted () {
    const self = this
    if (this.handlegetuserChatSelected) {
      this.updateScroll()
    }
    this.socket.on('userOnline', async (data) => {
      if (self.getuserChatSelected.id === data) {
        console.log('ini datauser', self.getuserChatSelected)
        const userSelectedCopy = {
          ...self.getuserChatSelected,
          status: 'online'
        }
        this.SET_USER_CHAT_SELECTED(userSelectedCopy)
      }
    })
    this.socket.on('userOffline', (data) => {
      if (self.getuserChatSelected.id === data) {
        console.log('ini datauser', self.getuserChatSelected)
        const userSelectedCopy = {
          ...self.getuserChatSelected,
          status: 'offline'
        }
        this.SET_USER_CHAT_SELECTED(userSelectedCopy)
      }
    })
    this.loginRoomSelf()
    this.socket.on('receiveMessage', async (data) => {
      if (data.userSenderId === this.getDataUser.id || data.userSenderId === this.getuserChatSelected.id) {
        if (data.userReceiverId === this.getDataUser.id || data.userReceiverId === this.getuserChatSelected.id) {
          await this.PUSH_CHAT_MESSAGE(data)
          this.updateScroll()
          await this.readMessage({ userSenderId: data.userSenderId, userReceiverId: data.userReceiverId })
        }
      } else {
        this.$noty.info('You have new message from ' + data.senderName + ' go checkout now !', {
          killer: true,
          timeout: 6000,
          layout: 'topRight',
          theme: 'mint'
        })
      }
    })
    this.userChatSelected = await this.getuserChatSelected
    await this.getLocation()
  }
}
</script>

<style scoped>
.grid {
  height:100vh;
}
.photo-profile {
  width:64px;
  height:64px;
}
.photo-profile img {
  width:100%;
  height:100%;
  object-fit: cover;
  border-radius: 20px;
}
.title-text {
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 29px;
  line-height: 34px;
  text-align: center;

  color: #7E98DF;
}
.menu-icon img{
  width:100%;
  height:100%;
  object-fit: contain;
}
.search-input {
  /* width:90%; */
  height: 60px;
  left: 30px;
  top: 127px;
  padding-left:40px;
  background: #FAFAFA;
  border-radius: 15px;
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */

  color: #848484;

}

.plus-icon img{
  height:100%;
  width:100%;
  object-fit: contain;
}
.option-status {
  display:none;
}
.menu-message-status {
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  /* identical to box height */

  text-align: center;
}
.label-option {
  width: 100%;
  height: 50px;
  box-sizing:border-box;
  border-radius: 20px;
  padding:10px;
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  /* identical to box height */

  text-align: center;
  cursor: pointer;
  color: #232323;
}
#list-chat {
  height:450px !important;
  overflow-y:auto;
}
.details-chat .name p {
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  letter-spacing: -0.165px;

  color: #232323;
}
.details-chat .message p {
  font-family: Rubik;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */

  text-align: left;

  color: #7E98DF;
}
.info-chat .time p {
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */

  text-align: left;
  letter-spacing: -0.165px;

  color: #848484;
}
.info-chat .chat-amount p {
  text-align: center;
  width:20px;
  height:20px;
  background: #7E98DF;
  border-radius: 30px;
  color:white;
  padding:90px;
}
.search-icon {
  position: relative;
  top:20px;
  left:40px;
  width:22px;
  height:22px;
}
.menu-message-status input[type="radio"]{
     opacity: 0;
  position: fixed;
  width: 0;
}
.menu-message-status label:hover {
    border: 3px solid #7E98DF;
    color:#6A4029;
}

.menu-message-status input[type="radio"]:focus + label {
    border: 4px dashed #444;
}

.menu-message-status input[type="radio"]:checked + label {
  background: #7E98DF;
  border-radius: 20px;
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  /* identical to box height */

  text-align: center;

  color: #FFFFFF;
}
.online {
  width:15px;
  height:15px;
  position:relative;
  box-sizing: border-box;
  border:3px solid white;
  left:50px;
  bottom:15px;
  border-radius:50%;
  background-color:#7E98DF;
}
.right-side {
  background-color: #FAFAFA;
}
.item-chat {
  cursor: pointer;
}
.right-side-header {
  background-color: #FFFFFF;
  box-sizing: border-box;
}
.detail-profile {
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  text-align: center;

  color: #232323;
}
.status {
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 18px;
  /* identical to box height */

  text-align: center;
  letter-spacing: -0.165px;

  color: #7E98DF;
}
.chat-photo-profile {
  width:54px;
  height: 54px;
}
.chat-photo-profile img {
  width:100%;
  height:100%;
  object-fit: cover;
  border-radius:20px;
}
.time p{
font-family: Rubik;
font-style: normal;
font-weight: 500;
font-size: 13px;
text-align: left;
/* or 28px */
margin:10px;
color: #232323;
}
.chat-item-receiver .chat-message {
  background: #7E98DF;
  border-radius: 35px 35px 35px 10px;
  padding: 17px 33px;

  font-family: Rubik;
font-style: normal;
font-weight: 400;
font-size: 15px;
text-align: left;
/* or 28px */

color: #FFFFFF;
}
.chat-item-sender .chat-message{
  background: #FFFFFF;
  border-radius: 35px 35px 35px 10px;
  padding: 17px 33px;

  font-family: Rubik;
font-style: normal;
font-weight: 400;
font-size: 15px;
/* or 28px */
text-align: right;
color: #232323;
}
.right-side-body {
  height:550px;
  overflow-y:auto;
}
.type-message{
  position: absolute;
  bottom: 10px;
  height: max-content;
}
.type-message input{
 width:100%;
 height:60px;
 background: #FAFAFA;
border-radius: 15px;
padding: 0 0 0 110px;

font-family: Rubik;
font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 19px;
/* identical to box height */

color: #848484;

}
.type-message .icon {
  position:relative;
  bottom:40px;
  left:10px;
  width:max-content;
}
.type-message .icon img {
  margin: 0 10px 0 0;
}
.welcome-chat {
  font-family: Rubik;
font-style: normal;
font-weight: normal;
font-size: 24px;
line-height: 28px;

color: #848484;
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
.splash-screen {
  background-color:#7E98DF;
  width:100%;
  height:100vh;
  position:fixed;
  top:0;
  z-index: 1;
}
.splash-screen .splash-image img {
  animation: rotation 2s infinite linear;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
.back {
  display: none;
}
/* responsive */
/* X-Small devices (portrait phones, less than 576px) */
@media (max-width: 575.98px) {
  .show{
    display:none;
  }
  #list-chat {
  height:70vh !important;
  overflow-y:auto;
}
.back {
  display: block;
}
 }
</style>
