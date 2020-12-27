<template>
  <div class="container-fluid grid m-0 p-0 row">
    <div class="left-side col-4 pt-4 pr-4 pl-4 m-0">
      <router-view :socket="socket" :updateScroll="updateScroll"></router-view>
    </div>
    <div v-if="getuserChatSelected !== null" class="right-side col-8 p-0">
      <div class="right-side container-fluid p-0 m-0">
    <div class="right-side-header pl-4 pt-4 pr-4 pb-3 d-flex  justify-content-between">
      <div class="chat-info d-flex">
        <div class="photo-profile">
           <img :src="userSelectedPhotoProfile" alt="">
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
        </div>
      </div>
      <!-- sender messsage
      <div class="chat-item-sender row p-0 m-0 mt-3" v-if="senderMessage.senderId !== getDataUser.id">
        <div class="col-12 p-0 m-0 d-flex flex-row-reverse">
        <div class="chat-photo-profile align-self-end">
          <img src="../../assets/Rectangle 9.png" alt="">
        </div>
        <div class="chat-message mr-3">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam optio quam asperiores aliquam hic corrupti quaerat, reiciendis possimus, debitis tempore placeat provident doloribus? Rerum, doloremque?
        </div>
        </div>
      </div> -->
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
    <div v-if="getuserChatSelected === null" class="right-side col-8 p-0 d-flex align-items-center justify-content-center">
      <p class="welcome-chat">Please select a chat to start messaging</p>
    </div>
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
        message: ''
      }
    }
  },
  methods: {
    ...mapActions(['getUser']),
    ...mapMutations(['SET_CHAT_MESSAGE', 'PUSH_CHAT_MESSAGE']),
    updateScroll (as) {
      console.log(as)
      const element = document.getElementById('list-chat')
      console.log(element.scrollHeight)
      element.scrollTop = element.scrollHeight - element.clientHeight
    },
    sendMessage () {
      const data = {
        message: this.input.message,
        userSenderId: this.getDataUser.id,
        time: moment(new Date()).format('LT'),
        userReceiverId: this.getuserChatSelected.id
      }
      console.log('data :>> ', data)
      this.socket.emit('personalChat', data, async (message) => {
        await this.PUSH_CHAT_MESSAGE(message)
        this.updateScroll()
        this.input.message = ''
      })
      console.log('this.chatMegetChatMessagessage :>> ', this.getChatMessage)
    },
    loginRoomSelf () {
      const payload = {
        id: this.getDataUser.id
      }
      this.socket.emit('loginRoomSelf', payload)
    }
  },
  computed: {
    ...mapGetters(['getContactList', 'getuserChatSelected', 'getDataUser', 'getChatMessage']),
    userSelectedPhotoProfile () {
      return this.getuserChatSelected.photoProfile ? this.getuserChatSelected.photoProfile : '/img/user-avatar.png'
    }
  },
  async mounted () {
    if (this.getuserChatSelected !== null) {
      this.updateScroll()
      this.loginRoomSelf()
    }
    this.socket.on('receiveMessage', async (data) => {
      console.log('data :>> ', data)
      await this.PUSH_CHAT_MESSAGE(data)
      this.updateScroll()
    })
    this.userChatSelected = await this.getuserChatSelected
  }
}
</script>

<style scoped>
/* * {
  border:1px solid red;
} */
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

font-family: Rubik;
font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 19px;
/* identical to box height */

color: #848484;

}
.type-message .icon {
  position: relative;
  bottom:40px;
  text-align:right;
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
</style>
