<template>
  <div class="p-0 m-0">
          <div class="left-side-header p-0 m-0">
        <div class="title d-flex m-0 justify-content-between">
          <p class="p-0 m-0 title-text">Telegram</p>
          <div class="menu-icon">
          <img class="m-0 p-0" src="../../../assets/Menu.png" alt="">
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
          <div class="item-chat row p-0 m-0 mb-3">
            <div class="photo-profile col-2 p-0 m-0">
              <img src="../../../assets/Rectangle 3.png" alt="">
              <div class="online">
              </div>
            </div>
            <div class="details-chat col-8 p-0 pl-2 m-0">
              <div class="name h-50 p-0 m-0">
                <p class="m-0 p-0">Theresa Web Theresa Web</p>
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
          <div class="item-chat row p-0 m-0 mb-3">
            <div class="photo-profile col-2 p-0 m-0">
              <img src="../../../assets/Rectangle 3.png" alt="">
            </div>
            <div class="details-chat col-8 p-0 pl-2 m-0">
              <div class="name h-50 p-0 m-0">
                <p class="m-0 p-0">Theresa Web Theresa Web</p>
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
          <div class="item-chat row p-0 m-0 mb-3">
            <div class="photo-profile col-2 p-0 m-0">
              <img src="../../../assets/Rectangle 3.png" alt="">
            </div>
            <div class="details-chat col-8 p-0 pl-2 m-0">
              <div class="name h-50 p-0 m-0">
                <p class="m-0 p-0">Theresa Web Theresa Web</p>
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
          <div class="item-chat row p-0 m-0 mb-3">
            <div class="photo-profile col-2 p-0 m-0">
              <img src="../../../assets/Rectangle 3.png" alt="">
            </div>
            <div class="details-chat col-8 p-0 pl-2 m-0">
              <div class="name h-50 p-0 m-0">
                <p class="m-0 p-0">Theresa Web Theresa Web</p>
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
          <div class="item-chat row p-0 m-0 mb-3">
            <div class="photo-profile col-2 p-0 m-0">
              <img src="../../../assets/Rectangle 3.png" alt="">
            </div>
            <div class="details-chat col-8 p-0 pl-2 m-0">
              <div class="name h-50 p-0 m-0">
                <p class="m-0 p-0">Theresa Web Theresa Web</p>
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
          <div class="item-chat row p-0 m-0 mb-3">
            <div class="photo-profile col-2 p-0 m-0">
              <img src="../../../assets/Rectangle 3.png" alt="">
            </div>
            <div class="details-chat col-8 p-0 pl-2 m-0">
              <div class="name h-50 p-0 m-0">
                <p class="m-0 p-0">Theresa Web Theresa Web</p>
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
          <div class="item-chat row p-0 m-0 mb-3">
            <div class="photo-profile col-2 p-0 m-0">
              <img src="../../../assets/Rectangle 3.png" alt="">
            </div>
            <div class="details-chat col-8 p-0 pl-2 m-0">
              <div class="name h-50 p-0 m-0">
                <p class="m-0 p-0">Theresa Web Theresa Web</p>
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
export default {
  name: 'ListChat',
  data () {
    return {
      input: {
        optionMenuStatus: 'important'
      }
    }
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
</style>
