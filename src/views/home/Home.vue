<template>
  <div class="container-fluid grid m-0 p-0 row">
    <div id="left-side" class="left-side col-sm-12 col-lg-4 pt-4 pr-4 pl-4 m-0">
      <router-view :socket="socket" :mobileSelectedChat="mobileSelectedChat" :hideContactList="hideContactList" :updateScroll="updateScroll"></router-view>
    </div>
    <div id="right-side" v-if="getuserChatSelected !== null" :class="!getShowContactInfo ? 'right-side show col-sm-12 col-lg-8 p-0' : 'right-side show col-sm-12 col-lg-4 p-0'">
    <div class="right-side container-fluid p-0 m-0">
    <div class="right-side-header pl-4 pt-4 pr-4 pb-3 d-flex  justify-content-between">
      <div class="chat-info d-flex">
        <div @click="handleBackMobile" class="back mr-3">
          <img src="../../assets/back.png" alt="">
        </div>
        <div class="photo-profile">
           <img v-lazy="userSelectedPhotoProfile" @click="showContactInfo" class="cursor-pointer">
        </div>
        <div class="detail-profile m-0 p-0 ml-4 d-flex flex-column justify-content-between">
          <p @click="showContactInfo" class="name cursor-pointer m-0 align-items-start text-left">{{ getuserChatSelected.name }}</p>
          <p class="status m-0 align-items-end text-left">{{ getuserChatSelected.status }}</p>
        </div>
      </div>
        <div class="clear-chat align-self-top" @click="handleDeleteAllMessage" >
          <img src="../../assets/Trash.png" alt="">
        </div>
    </div>
    <div class="right-side-body p-4" id="list-chat"  >

      <div :class="message.userSenderId === getDataUser.id ? 'chat-item-sender' : 'chat-item-receiver'" class="show-date row p-0 m-0 mt-3" v-for="message in getChatMessage" :key="message.index">
        <div @click="showDateOnClick" :class="message.userSenderId === getDataUser.id ?'col-12 p-0 m-0 d-flex flex-row-reverse' : 'col-12 p-0 m-0 d-flex flex-row'">
        <div class="chat-photo-profile align-self-end">
          <img :src="message.userSenderId === getDataUser.id ? getDataUser.photoProfile : userSelectedPhotoProfile " alt="">
        </div>
        <div class="chat-message ml-3" v-if="message.message && !message.photo">
          <p>{{message.message}}</p>
        </div>
        <div class="chat-image ml-3" v-if="!message.message && message.photo">
          <img v-lazy="message.photo" alt="">
        </div>
        <div class="time align-self-end">
          <p>{{ message.time }} </p>
          <p v-if= "showDateInfo">{{convertDate(message.createdAt)}}</p>
        </div>
        </div>
      </div>
    </div>
    </div>
    <div class="type-message pl-4 pr-4 w-100">
        <input @keyup.enter="sendMessage" type="text" v-model="input.message" name="" class="focus input-message form-control shadow-none" id="input-message">
        <input type="file" name="" @change="sendImage" class="d-none" id="input-image">
        <div class="icon d-flex">
          <div class="wrapper">
          <emoji-picker @emoji="append" :search="input.search">
    <div
      class="emoji-invoker"
      slot="emoji-invoker"
      slot-scope="{ events: { click: clickEvent } }"
      @click.stop="clickEvent"
    >
      <img src="../../assets/Vector (2).png" alt="">
    </div>
    <div slot="emoji-picker" slot-scope="{ emojis, insert }">
      <div class="emoji-picker" :style="{ top: '50%', left: '50%' }">
        <div class="emoji-picker__search">
          <input type="text" v-model="input.search" v-focus>
        </div>
        <div>
          <div v-for="(emojiGroup, category) in emojis" :key="category">
            <h5>{{ category }}</h5>
            <div class="emojis">
              <span
                v-for="(emoji, emojiName) in emojiGroup"
                :key="emojiName"
                @click="insert(emoji)"
                :title="emojiName"
              >{{ emoji }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
          </emoji-picker>
          </div>
          <label for="input-image">
            <img src="../../assets/Group 181.png" alt="">
          </label>
        </div>
    </div>
    </div>
    <ContactInfo v-show="getShowContactInfo" id="transition" :menuOption="input.menuOption" class="transition col-sm-12 col-lg-4 p-4"/>
    <DefaultPage v-if="getuserChatSelected === null" class="hide-in-mobile hide-in-medium right-side col-8" text="Please select a chat to start messaging"/>

  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import io from 'socket.io-client'
import moment from 'moment'
import Swal from 'sweetalert2'
import DefaultPage from '../../components/module/chat/default-page/DefaultPage'
import ContactInfo from '../../components/module/chat/contact-info/ContactInfo'

export default {
  name: 'Home',
  components: {
    DefaultPage,
    ContactInfo
  },
  data () {
    return {
      userChatSelected: null,
      socket: io(process.env.VUE_APP_SERVICE_API),
      input: {
        message: '',
        menuOption: '',
        search: ''
      },
      showDateInfo: false,
      longPress: 0,
      intervalClick: null
    }
  },
  methods: {
    ...mapActions(['getFriendsData', 'getLastMessage', 'updateProfile', 'readMessage', 'deleteAllMessage', 'postImageChat']),
    ...mapMutations(['SET_CHAT_MESSAGE', 'SET_CHAT_IMAGE', 'SET_CONTACT_LIST', 'PUSH_CHAT_MESSAGE', 'SET_CURRENT_LOCATION', 'SET_USER_CHAT_SELECTED', 'SET_SHOW_CONTACT_INFO']),
    updateScroll (as) {
      const element = document.getElementById('list-chat')
      element.scrollTop = element.scrollHeight - element.clientHeight
    },
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
          // document.getElementById('transition').classList.remove('transition-click')
        } else {
          this.SET_SHOW_CONTACT_INFO(true)
        }
      }
    },
    sendMessage () {
      if (this.input.message.length > 0) {
        const data = {
          message: this.input.message,
          userSenderId: this.getDataUser.id,
          photo: null,
          senderName: this.getDataUser.name,
          time: moment(new Date()).format('LT'),
          userReceiverId: this.getuserChatSelected.id
        }
        this.socket.emit('personalChat', data, async (message) => {
          const audio = new Audio('/audio/among-us-chat-sound-effect.mp3')
          audio.play()
          await this.PUSH_CHAT_MESSAGE(message)
          this.updateScroll()
          document.getElementById('input-message').focus()
          this.input.message = ''
        })
      }
    },
    async sendImage () {
      const image = document.getElementById('input-image').files[0]
      const form = new FormData()
      form.append('photo', image)
      form.append('userReceiverId', this.getuserChatSelected.id)
      form.append('time', moment(new Date()).format('LT'))
      try {
        const result = await this.postImageChat(form)
        this.socket.emit('personalChat', result, async (message) => {
          const audio = new Audio('/audio/among-us-chat-sound-effect.mp3')
          audio.play()
          await this.PUSH_CHAT_MESSAGE(message)
          setTimeout(() => this.updateScroll(), 1000)
          this.SET_CHAT_IMAGE(this.getChatMessage.filter(value => value.photo !== null))
          document.getElementById('input-message').focus()
          document.getElementById('input-image').value = ''
        })
      } catch (error) {
        console.log('error sendImage', error)
      }
    },
    loginRoomSelf () {
      const payload = {
        id: this.getDataUser.id
      }
      this.socket.emit('loginRoomSelf', payload)
    },
    mobileSelectedChat () {
      if (document.getElementById('right-side').classList.contains('show')) {
        document.getElementById('right-side').classList.remove('show')
      } else {
        document.getElementById('right-side').classList.add('show')
      }
    },
    hideContactList () {
      if (document.getElementById('left-side').classList.contains('show')) {
        document.getElementById('left-side').classList.remove('show')
      } else {
        document.getElementById('left-side').classList.add('show')
      }
    },
    handleBackMobile () {
      this.mobileSelectedChat()
      this.hideContactList()
    },
    convertDate (createdAt) {
      return moment(createdAt).format('LL')
    },
    showDateOnClick () {
      if (this.showDateInfo) {
        this.showDateInfo = false
      } else {
        this.showDateInfo = true
      }
    },
    async handleDeleteAllMessage () {
      Swal.fire({
        title: 'Delete All Message ?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$awn.asyncBlock(
            this.deleteAllMessage({ userSenderId: this.getDataUser.id, userReceiverId: this.getuserChatSelected.id }),
            resp => {
              this.SET_CHAT_MESSAGE([])
              this.alert('success', 'All Message Deleted', 'now your history chat message will be empty', false)
            },
            () => {
              this.alert('error', 'Server Error', 'Looks like server having trouble', false)
            }
          )
        }
      })
    },
    alert (icon, title, text, confirmButton) {
      Swal.fire({
        icon: icon,
        title: title,
        text: text,
        showConfirmButton: false,
        timer: 1500
      })
    },
    alertConfirmation (title, text, icon) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    },
    async handleGetFriendsData () {
      const self = this
      const result = await this.getFriendsData(this.getDataUser.id)
      const resultMapping = await Promise.all(result.map(async (el) => {
        const resultLastMessage = await self.getLastMessage(el.id)
        const resultMessage = resultLastMessage.message
        if (resultLastMessage.unreadMessage > 0) {
          this.$noty.info('You have new message from ' + el.name + ' go checkout now !', {
            killer: true,
            timeout: 6000,
            layout: 'topRight',
            theme: 'mint'
          })
        }
        el.message = resultMessage ? resultMessage.substring(0, 20) + '......' : resultMessage
        el.unreadMessage = resultLastMessage.unreadMessage
        el.lastMessageTime = resultLastMessage.time
        el.LastMessageTimeStamp = resultLastMessage.createdAt || 0
        return el
      }))
      const sortingResult = resultMapping.sort((a, b) => {
        return new Date(b.LastMessageTimeStamp) - new Date(a.LastMessageTimeStamp)
      })
      this.SET_CONTACT_LIST(sortingResult)
      return new Promise((resolve, reject) => {
        resolve(resultMapping)
      })
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
    },
    append (emoji) {
      this.input.message += emoji
    }
  },
  directives: {
    focus: {
      inserted (el) {
        el.focus()
      }
    }
  },
  computed: {
    ...mapGetters(['getContactList', 'getuserChatSelected', 'getDataUser', 'getChatMessage', 'getShowContactInfo', 'getUserChat']),
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
        const userSelectedCopy = {
          ...self.getuserChatSelected,
          status: 'online'
        }
        this.SET_USER_CHAT_SELECTED(userSelectedCopy)
      }
    })
    this.socket.on('userOffline', (data) => {
      if (self.getuserChatSelected.id === data) {
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
          this.PUSH_CHAT_MESSAGE(data)
          this.SET_CHAT_IMAGE(this.getChatMessage.filter(value => value.photo !== null))
          if (data.photo) {
            setTimeout(() => self.updateScroll(), 1000)
          } else {
            self.updateScroll()
          }
          await this.readMessage({ userSenderId: data.userSenderId, userReceiverId: data.userReceiverId })
          const audio = new Audio('/audio/among-us-chat-sound-effect.mp3')
          audio.play()
          self.updateScroll()
        }
      } else {
        self.handleGetFriendsData()
        this.$noty.info('new message from ' + data.senderName + ': " ' + data.message.substring(0, 15) + ' "', {
          killer: true,
          timeout: 6000,
          layout: 'topRight',
          theme: 'mint'
        })
        const audio = new Audio('/audio/new_message_tone.mp3')
        audio.play()
      }
    })
    this.userChatSelected = await this.getuserChatSelected
  },
  updated () {
    if (this.getuserChatSelected) {
      this.updateScroll()
    }
  }
}
</script>

<style scoped>
.left-side{
  background-color:#FFFFFF;
}
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
  transition: border 600ms ease-in;
  transition: border 600ms ease-in;
}
.photo-profile img:hover {
  border:3px solid transparent;
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
  height:490px !important;
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
  background-color: #FAFAFA !important;
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
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  /* identical to box height */
  text-transform: capitalize;
  text-align: center;

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
  width: max-content;
  max-width: 70%;
  height:max-content;
  font-family: Rubik;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  text-align: left;
/* or 28px */

color: #FFFFFF;
}
.chat-item-receiver .chat-image {
  background: #7E98DF;
  border-radius: 35px 35px 35px 10px;
  padding: 17px 33px;
  width: max-content;
  max-width: 70%;
  height:max-content;
}
.chat-item-receiver .chat-image img{
width:100%;
height:100%;
object-fit: contain;
border-radius:10px;
}
.chat-item-sender .chat-image {
  background: #ffffff;
  border-radius: 35px 35px 35px 10px;
  padding: 17px 33px;
  width: max-content;
  max-width: 70%;
  height:max-content;
}
.chat-item-sender .chat-image img{
width:100%;
height:100%;
object-fit: contain;
border-radius:10px;
}
.chat-item-receiver .chat-message p {
  word-wrap: break-word;
}
.chat-item-sender .chat-message p {
  word-wrap: break-word;
}
.chat-item-sender .chat-message{
  background: #ffffff;
  border-radius: 35px 35px 35px 10px;
  padding: 17px 33px;
  width: max-content;
  max-width: 70%;
  height:max-content;
  font-family: Rubik;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  text-align: left;
/* or 28px */

color: #232323;
}
.chat-item-sender .time p{
  text-align:right;
   word-wrap: break-word;
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
.type-message .input-message{
 width:100%;
 height:60px;
 background: #FAFAFA;
border-radius: 15px;
padding: 0 0 0 70px;

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
.chat-item-receiver {
  overflow: hidden;
}
.chat-item-sender {
  overflow: hidden;
}
.chat-item-receiver .time p {
  color: #848484;
}
.hidden {
  display: none;
}
.back {
  display: none;
}
.back2 {
  cursor: pointer;
}
.cursor-pointer {
  cursor: pointer;
}
.detail-profile .name {
  text-transform: capitalize;
}
.clear-chat {
  display: flex;
  justify-content: center;
  align-items:center;
  border-radius: 50%;
  background-color:#7E98DF;
  width:50px;
  height:50px;
  transition:border 2s;
}
.clear-chat:hover {
  border: 5px solid #7390df;
}
.focus:focus {
  border:2px solid #7E98DF;
}

/* emoji */
.regular-input {
  padding: 0.5rem 1rem;
  border-radius: 3px;
  border: 1px solid #ccc;
  width: 20rem;
  height: 12rem;
  outline: none;
}

.regular-input:focus {
  box-shadow: 0 0 0 3px rgba(66,153,225,.5);
}

.emoji-invoker {
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
}
.emoji-invoker:hover {
  transform: scale(1.1);
}
.emoji-invoker > svg {
  fill: #b1c6d0;
}

.emoji-picker {
  position: fixed;
  z-index: 1;
  font-family: Montserrat;
  border: 1px solid #ccc;
  width: 15rem;
  height: 20rem;
  overflow: scroll;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
  background: #fff;
  box-shadow: 1px 1px 8px #c7dbe6;
}
.emoji-picker__search {
  display: flex;
}
.emoji-picker__search > input {
  flex: 1;
  border-radius: 10rem;
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  outline: none;
}
.emoji-picker h5 {
  margin-bottom: 0;
  color: #b1b1b1;
  text-transform: uppercase;
  font-size: 0.8rem;
  cursor: default;
}
.emoji-picker .emojis {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.emoji-picker .emojis:after {
  content: "";
  flex: auto;
}
.emoji-picker .emojis span {
  padding: 0.2rem;
  cursor: pointer;
  border-radius: 5px;
}
.emoji-picker .emojis span:hover {
  background: #ececec;
  cursor: pointer;
}
/* responsive */
/* X-Small devices (portrait phones, less than 576px) */
@media (max-width: 991.98px) {
  .hide-in-medium {
    display: none !important;
  }
}
@media (max-width: 575.98px) {
  .hide-in-mobile {
    display:none !important;
  }
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
.chat-photo-profile {
  width:64px;
  height: 64px;
}
.chat-photo-profile img {
  width:100%;
  height:100%;
  object-fit: cover;
  border-radius:20px;
}
 }
@media (max-width: 417px) {
.chat-photo-profile {
  display:none;
}
 }
</style>
