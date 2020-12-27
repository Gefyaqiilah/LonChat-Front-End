<template>
  <div class="p-0 m-0">
          <div class="left-side-header p-0 m-0">
        <div class="title d-flex m-0 justify-content-between">
          <p class="p-0 m-0 title-text">Telegram</p>
          <div class="menu-icon">
          <img class="m-0 p-0" @click="showMenu" src="../../../assets/Menu.png" alt="">
          </div>
          <div class="show p-0 m-0" id="show-menu">
          <div class="show-menu d-flex flex-column p-4">
            <div class="settings mb-4 d-flex" @click="toSettings">
              <div class="icon">
                <img src="../../../assets/Settings.png" alt="">
              </div>
              <p class="m-0 ml-4">Settings</p>
            </div>
            <div class="contacts mb-4 d-flex">
              <div class="icon">
                <img src="../../../assets/Contacts.png" alt="">
              </div>
              <p class="m-0 ml-4">Contacts</p>
            </div>
            <div class="calls mb-4 d-flex">
               <div class="icon">
                <img src="../../../assets/Vector (3).png" alt="">
              </div>
              <p class="m-0 ml-4">Calls</p>
            </div>
            <div class="save-messages mb-4 d-flex">
              <div class="icon">
                <img src="../../../assets/Rectangle 37.png" alt="">
              </div>
              <p class="m-0 ml-4">Save Messages</p>
            </div>
            <div class="invite-friends mb-4 d-flex">
               <div class="icon">
                <img src="../../../assets/Invite friends.png" alt="">
              </div>
              <p class="m-0 ml-4">Invite Friends</p>
            </div>
            <div class="faq mb-4 d-flex">
              <div class="icon">
                <img src="../../../assets/FAQ.png" alt="">
              </div>
              <p class="m-0 ml-4">Telegram FAQ</p>
            </div>
          </div>
          </div>
        </div>
        <div class="search-box d-flex justify-content-between mt-5">
          <img class="search-icon" src="../../../assets/Search.png" alt="">
          <input type="text" class="search-input form-control shadow-none" placeholder="Type your message...">
          <div class="plus-icon ml-4">
           <img src="../../../assets/Plus.png" alt="">
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
          <div v-for="contact in getContactList" :key="contact.id" @click="selectedChat(contact.id)" class="item-chat row p-0 m-0 mb-3">
            <div class="photo-profile col-2 p-0 m-0">
              <div class="photo">
              <img :src="contact.photoProfile ? contact.photoProfile : '/img/user-avatar.png'" alt="">
              </div>
              <div class="online">
              </div>
            </div>
            <div class="details-chat col-8 p-0 pl-2 m-0">
              <div class="name h-50 p-0 m-0">
                <p class="m-0 p-0">{{ contact.name }}</p>
              </div>
              <div class="message h-50 p-0 m-0">
                <p class="m-0 p-0">Lorem ipsum dolor sit amet awd</p>
              </div>
            </div>
            <div class="info-chat col-2 p-0 m-0">
              <div class="time h-50">
                <p class="m-0 p-0">15.20</p>
              </div>
              <div class="chat-amount h-50">
                <p class="m-0 p-0">2</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'ListChat',
  data () {
    return {
      input: {
        optionMenuStatus: 'important',
        showMenuProfile: false
      }
    }
  },
  props: ['socket'],
  methods: {
    ...mapActions(['getUser', 'getUserChatSelected']),
    ...mapMutations(['SET_USER_CHAT_SELECTED']),
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
    handleGetUser () {
      this.getUser()
        .then((result) => {
        }).catch((err) => {
          console.log('err :>> ', err)
        })
    },
    selectedChat (id) {
      console.log('this.getUserChatSelected.id :>> ', this.getuserChatSelected.id)
      this.getUserChatSelected(id)
        .then((result) => {
          const data = { senderId: this.getDataUser.id, receiverId: id }
          if (this.getuserChatSelected.id) {
            console.log('this.getUserChatSelected.id :>> ', this.getuserChatSelected.id)
            this.socket.emit('leave', this.getuserChatSelected.id)
          }
          this.socket.emit('joinPersonalChat', data)
          this.SET_USER_CHAT_SELECTED(result)
        }).catch((err) => {
          console.log(err)
        })
    }
  },
  computed: {
    ...mapGetters(['getContactList', 'getDataUser', 'getuserChatSelected'])
  },
  mounted () {
    this.handleGetUser()
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
</style>
