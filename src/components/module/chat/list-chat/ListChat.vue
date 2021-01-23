<template>
  <div class="p-0 m-0">
          <div class="left-side-header p-0 m-0">
        <div class="title d-flex m-0 justify-content-between">
          <p class="p-0 m-0 title-text">Lon-Chat</p>
          <div class="menu-icon">
          <img class="m-0 p-0" @click="showMenu" src="../../../../assets/Menu.png" alt="">
          </div>
          <div class="show p-0 m-0" id="show-menu">
          <div class="show-menu d-flex flex-column p-4">
            <div class="settings mb-4 d-flex" @click="toSettings">
              <div class="icon">
                <img src="../../../../assets/Settings.png" alt="">
              </div>
              <p class="m-0 ml-4">Settings</p>
            </div>
            <div class="invite-friends mb-4 d-flex" @click="inviteFriends">
               <div class="icon">
                <img src="../../../../assets/Invite friends.png" alt="">
              </div>
              <p class="m-0 ml-4">Invite Friends</p>
            </div>
            <div class="guide mb-4 d-flex" @click="alertNewUser()">
              <div class="icon">
                <i class="far fa-hands-helping"></i>
              </div>
              <p class="m-0 ml-4">Show Guide</p>
            </div>
            <div class="about mb-4 d-flex">
              <div class="icon">
                <img src="../../../../assets/FAQ.png" alt="">
              </div>
              <p class="m-0 ml-4">About</p>
            </div>
            <div class="contacts mb-4 d-flex" @click="logout(getUserChat && getDataUser ? {userSelectedChat: getUserChat.id, user: getDataUser.id} : '')">
              <div class="icon">
                <img src="../../../../assets/Contacts.png" alt="">
              </div>
              <p class="m-0 ml-4">Logout</p>
            </div>
          </div>
          </div>
        </div>
        <div class="search-box d-flex justify-content-between mt-5">
          <img class="search-icon" src="../../../../assets/Search.png" alt="">
          <input type="text" id="searchInput" @keyup.enter="handleSearchFriend" v-model="input.searchUser" class="search-input form-control shadow-none" placeholder="type and enter to search your friends">
          <div class="plus-icon ml-4" v-if="!input.searchUser">
           <img src="../../../../assets/Plus.png" alt="">
          </div>
          <div @click="clearSearchInput" class="clear-icon ml-4" v-if="input.searchUser">
           <img src="../../../../assets/Plus.png" alt="">
          </div>
        </div>
        <div class="menu-message-status container-fluid p-0 m-0 mt-3 d-flex">
          <div class="col-4 p-2">
          <input type="radio" name="option-status" v-model="input.optionMenuStatus" value="all" class="option-status" id="all">
          <label for="all" class="label-option">All</label>
          </div>
          <div class="col-4 p-2">
          <input type="radio" name="option-status" v-model="input.optionMenuStatus" value="important" class="option-status" id="important">
          <label for="important" class="label-option">Important</label>
          </div>
          <div class="col-4 p-2">
          <input type="radio" name="option-status" v-model="input.optionMenuStatus" value="unread" class="option-status" id="unread">
          <label for="unread" class="label-option">Unread</label>
          </div>
        </div>
      </div>
      <div class="left-side-body mt-3">
        <div class="list-chat">
          <div v-show="!input.searchUser" v-for="contact in getContactList" :key="contact.id" @click="selectedChat(contact.id)" class="item-chat row p-0 m-0 mb-4">
            <div class="photo-profile col-2 p-0 m-0">
              <div class="photo">
              <img :src="contact.photoProfile ? contact.photoProfile : '/img/user-avatar.png'" alt="">
              </div>
              <div class="online" v-if="contact.status === 'online'">
              </div>
            </div>
            <div class="details-chat col-8 p-0 pl-lg-2 m-0">
              <div class="name h-50 p-0 m-0">
                <p class="m-0 p-0">{{ contact.name }}</p>
              </div>
              <div class="message h-50 p-0 m-0">
                <p class="m-0 p-0">{{ contact.message || contact.bio }}</p>
              </div>
            </div>
            <div class="info-chat col-2 p-0 m-0">
              <div class="time h-50">
                <p class="m-0 p-0">{{ contact.lastMessageTime }}</p>
              </div>
              <div class="chat-amount h-50" v-if="contact.unreadMessage>0">
                <p class="m-0 p-0">{{ contact.unreadMessage }}</p>
              </div>
            </div>
          </div>
          <div v-show="input.searchUser" v-for="(contact, index) in dataSearch" :key="index" class="item-chat row p-0 m-0 mb-3">
            <div class="photo-profile col-2 p-0 m-0">
              <div class="photo">
              <img :src="contact.photoProfile ? contact.photoProfile : '/img/user-avatar.png'" alt="">
              </div>
              <div class="online" v-if="contact.status ==='online'">
              </div>
            </div>
            <div class="details-chat col-8 p-0 pl-2 m-0">
              <div class="name h-50 p-0 m-0">
                <p class="m-0 p-0">{{ contact.name }}</p>
              </div>
              <div class="message h-50 p-0 m-0">
                <p class="m-0 p-0">{{ contact.bio }}</p>
              </div>
            </div>
            <div v-if="!getContactList.find(item=>item.id === contact.id)" class="info-chat-search col-2 p-0 m-0 d-flex align-items-center justify-content-center">
                <div class="icon-add-friend d-flex" @click="handleAddNewFriend(contact.id, contact.name)">
                <img class="d-block align-self-center mx-auto" src="../../../../assets/Invite friends.png" alt="">
                </div>
            </div>
          </div>
          <div class="item-chat"  v-show="input.searchUser && dataSearch.length===0">
          <DefaultPage text="Looking for friends? 🧐" class="item-chat row p-0 m-0 mb-3"/>
          <DefaultPage text="You can search for your friends by email, username and phone number" class="item-chat row p-0 m-0 mb-3"/>
          </div>
          <div class="item-chat"  v-show="!input.searchUser && dataSearch.length===0 &&getContactList.length === 0">
          <DefaultPage :text="'Welcome to Lon-Chat 🥳'" class="item-chat row p-0 m-0 mb-3"/>
          <DefaultPage text="You don't have a friend contact, , get the contact now in the search column above" class="item-chat row p-0 m-0 mb-3"/>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Swal from 'sweetalert2'
import DefaultPage from '../default-page/DefaultPage'
import mixin from '../../../../mixins/index'

export default {
  name: 'ListChat',
  components: {
    DefaultPage
  },
  mixins: [mixin],
  data () {
    return {
      input: {
        optionMenuStatus: 'important',
        showMenuProfile: false,
        userSelectedId: null,
        searchUser: ''
      },
      dataSearch: [],
      userLoginStatus: []
    }
  },
  props: ['socket', 'updateScroll', 'mobileSelectedChat', 'hideContactList'],
  methods: {
    ...mapActions(['getFriendsData', 'getUserChatSelected', 'getAllMessageUserSelected', 'searchFriend', 'addNewFriend', 'readMessage', 'getLastMessage']),
    ...mapMutations(['SET_USER_CHAT_SELECTED', 'SET_CHAT_MESSAGE', 'REMOVE_ALL_VALUE_STATE', 'SET_CONTACT_LIST']),
    showMenu () {
      const menu = document.getElementById('show-menu')
      if (this.showMenuProfile) {
        menu.style.display = 'none'
        this.showMenuProfile = false
      } else {
        menu.style.display = 'flex'
        this.showMenuProfile = true
      }
    },
    toSettings () {
      this.$router.push({ path: '/profile' })
    },
    async handleGetFriendsData () {
      const result = await this.getFriendsData(this.getDataUser.id)
      if (result.length === 0) {
        if (!this.getContactList) {
          this.alertNewUser()
        }
      }
      const resultMapping = await Promise.all(result.map(async (el) => {
        const resultLastMessage = await this.getLastMessage(el.id)
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
        return el
      }))
      this.SET_CONTACT_LIST(resultMapping)
    },
    selectedChat (id) {
      this.getUserChatSelected(id)
        .then((result) => {
          const data = { senderId: this.getDataUser.id, receiverId: id }
          if (this.getUserChat !== null) {
            this.socket.emit('leave', this.getUserChat.id)
            this.SET_CHAT_MESSAGE([])
          }
          this.socket.emit('joinPersonalChat', data)
          this.SET_USER_CHAT_SELECTED(result)
          const payload = {
            userReceiverId: id,
            userSenderId: this.getDataUser.id
          }
          const screenWidth = screen.width
          this.getAllMessageUserSelected(payload)
            .then(async (result) => {
              if (screenWidth <= 576) {
                this.mobileSelectedChat()
                this.hideContactList()
              }
              this.SET_CHAT_MESSAGE(result)
              await this.readMessage({ userSenderId: id, userReceiverId: this.getDataUser.id })
              this.getContactList.map(el => {
                if (el.id === id) {
                  el.unreadMessage = 0
                }
                return el
              })
              this.updateScroll('awd')
            }).catch((err) => {
              console.error(err)
            })
        }).catch(() => {
        })
    },
    async logout (data) {
      this.showMenuProfile = false
      this.socket.emit('leave', { userSenderId: data.user, userReceiverId: data.userSelectedChat })
      this.socket.emit('logout', this.getDataUser.id)
      this.REMOVE_ALL_VALUE_STATE()
      Swal.fire({
        title: 'See you later :)',
        showConfirmButton: false,
        timer: 1500
      })
      this.$router.push({ path: '/auth/login' })
    },
    handleSearchFriend () {
      const self = this
      if (!this.input.searchUser) {
        Swal.fire({
          icon: 'error',
          title: 'Input cannot empty',
          showConfirmButton: false,
          timer: 1500
        })
      }
      this.$awn.asyncBlock(
        this.searchFriend(this.input.searchUser),
        result => {
          console.log('result friend ', result)
          if (result.length === 0) {
            return self.$noty.error('there is no suitable friend data', {
              theme: 'relax'
            })
          }
          this.dataSearch = result
          console.log('result.length', result.length)
        },
        err => {
          console.log('err', err)
        }
      )
    },
    handleAddNewFriend (friendId, name) {
      const data = {
        userId: this.getDataUser.id,
        friendId: friendId
      }
      this.addNewFriend(data)
        .then((result) => {
          this.input.searchUser = ''
          this.dataSearch = []
          this.handleGetFriendsData()
          this.alert('success', 'Congratulations now you are friends😁', name + ' is your friend right now')
        })
    },
    handleGetLastMessage (userSenderId) {
      this.getLastMessage(userSenderId)
        .then(() => {
          return 'awdawd'
        })
    },
    alert (icon, title, text) {
      Swal.fire({
        icon: icon,
        title: title,
        text: text,
        showConfirmButton: false,
        timer: 1500
      })
    },
    clearSearchInput () {
      this.input.searchUser = ''
      this.dataSearch = []
    },
    async inviteFriends () {
      const searchInput = document.getElementById('searchInput')
      const menu = document.getElementById('show-menu')
      menu.style.display = 'none'
      searchInput.focus()
    }
  },
  computed: {
    ...mapGetters(['getContactList', 'getDataUser', 'getUserChat', 'getChatMessage'])
  },
  async mounted () {
    this.handleGetFriendsData()
    this.socket.on('userOnline', (data) => {
      if (!this.userLoginStatus.find(value => value === data && data !== this.getDataUser.id)) {
        this.getContactList.map((el) => {
          if (el.id === data) {
            el.status = 'online'
          }
          return el
        })
      }
    })
    this.socket.on('userOffline', (data) => {
      if (!this.userLoginStatus.find(value => value === data && data !== this.getDataUser.id)) {
        this.getContactList.map((el) => {
          if (el.id === data) {
            el.status = 'offline'
          }
          return el
        })
      }
    })
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
  cursor: pointer;
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
.search-input:focus {
  border:3px solid #7E98DF;
}
.plus-icon img{
  height:100%;
  width:100%;
  object-fit: contain;
  cursor: pointer;
}
.clear-icon img{
  height:100%;
  width:100%;
  object-fit: contain;
  transform: rotate(45deg);  /* This timing applies on the way OUT */
  animation: close 2s linear infinite;
  cursor: pointer;
}
.clear-icon img:hover {
  animation-play-state: paused;
}

@keyframes close {
  0% {
    width:100%;
  }
  50% {
    width:130%;
  }
  100% {
    width:100%;
  }
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
.list-chat {
  height:370px;
  overflow-y:auto;
}
.details-chat .name p {
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  text-transform: capitalize;

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
  display:flex;
  justify-content: center;
  width:25px;
  height:25px;
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
#show-menu {
  display:none;
  position: absolute;
  left:170px;
  top:52px;
  z-index:1;
}
.show-menu {
  width: 250px;
  height: max-content;

  background: #7E98DF;
  border-radius: 35px 10px 35px 35px;
}
.settings {
  cursor: pointer;
}
.settings .icon {
  width:22px;
  height:22px;
}
.settings .icon img {
  width:100%;
  height:100%;
  object-fit: contain;
}
.settings p {
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */
  color: #FFFFFF;
}
.contacts {
  cursor: pointer;
}
.contacts .icon {
  width:22px;
  height:22px;
}
.contacts .icon img {
  width:100%;
  height:100%;
  object-fit: contain;
}
.contacts p {
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */
  color: #FFFFFF;
}
.calls {
  cursor: pointer;
}
.calls .icon {
  width:22px;
  height:22px;
}
.calls .icon img {
  width:100%;
  height:100%;
  object-fit: contain;
}
.calls p {
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */
  color: #FFFFFF;
}
.save-messages {
  cursor: pointer;
}
.save-messages .icon {
  width:22px;
  height:22px;
}
.save-messages .icon img {
  width:100%;
  height:100%;
  object-fit: contain;
}
.save-messages p {
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */
  color: #FFFFFF;
}
.invite-friends {
  cursor: pointer;
}
.invite-friends .icon {
  width:22px;
  height:22px;
}
.invite-friends .icon img {
  width:100%;
  height:100%;
  object-fit: contain;
}
.invite-friends p {
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */
  color: #FFFFFF;
}
.faq {
  cursor: pointer;
}
.faq .icon {
  width:22px;
  height:22px;
}
.faq .icon img {
  width:100%;
  height:100%;
  object-fit: contain;
}
.faq p {
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */
  color: #FFFFFF;
}
.about {
  cursor: pointer;
}
.about .icon {
  width:22px;
  height:22px;
}
.about .icon img {
  width:100%;
  height:100%;
  object-fit: contain;
}
.about p {
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */
  color: #FFFFFF;
}
.guide {
  cursor: pointer;
}
.guide .icon {
  width:22px;
  height:22px;
  color:white;
}
.guide p {
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */
  color: #FFFFFF;
}
.photo-profile .photo {
  width:64px;
  height:64px;
}
.photo-profile .photo img {
  width:100%;
  height:100%;
  object-fit: cover;
  border-radius: 20px;
}

.info-chat-search .icon-add-friend {
  background-color: #7E98DF;
  border-radius:50%;
  height:50px;
  width:50px;
  cursor: pointer;
}
@media screen and (max-width: 575.98px) {

.photo-profile .photo {
  width:64px;
  height:64px;
}
.photo-profile .photo img {
  width:100%;
  height:100%;
  object-fit: cover;
  border-radius: 20px;
}
.label-option {
  font-size: 1em;
}
.menu-message-status input[type="radio"]:checked + label {
  font-size: 1em;
}
}
@media screen and (max-width: 461px) {

.photo-profile .photo {
  width:80%;
  height:80%;
}
.photo-profile .photo img {
  width:100%;
  height:100%;
  object-fit: cover;
  border-radius: 20px;
}
.online {
  left: 0;
}
.label-option {
  font-size: 0.9em;
}
.menu-message-status input[type="radio"]:checked + label {
  font-size: 4vw;
  display:flex;
  justify-content:center;
  align-items:center;
}
}
</style>
