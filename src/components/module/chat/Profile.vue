<template>
  <div class="p-0 m-0">
    <div class="header d-flex">
      <div class="back">
        <img src="../../../assets/back.png" alt="">
      </div>
      <div class="username mx-auto">
        <p class="m-0">@wdlam</p>
      </div>
    </div>
    <div class="profile d-flex flex-column mt-4">
      <div class="photo mx-auto">
        <img src="../../../assets/Rectangle 9.png" alt="">
      </div>
      <div class="name mx-auto mt-3">
        <p class="text-center m-0 fullname">Gloria Mckinney</p>
        <p class="text-center m-0 username">@wdlam</p>
      </div>
    </div>
    <div class="account d-flex flex-column mt-4">
      <p class="text-left m-0 account-title">Account</p>
      <div class="phone-number mt-2">
        <p class="text-left m-0 text">+375(29)9638433</p>
        <p class="text-left m-0 desc">Tap to change phone number</p>
      </div>
      <div class="username mt-2">
        <p class="text-left m-0 text">@wdlam</p>
        <p class="text-left m-0 desc">Username</p>
      </div>
      <div class="bio mt-2">
        <p class="text-left m-0 text">
          I’m Senior Frontend Developer from Microsoft
        </p>
        <p class="text-left m-0 desc">
          Bio
        </p>
      </div>
    </div>
    <div class="settings d-flex flex-column mt-4">
      <p class="text-left m-0 text">Settings</p>
      <div class="notification-sounds d-flex mt-3">
      <div class="icon">
      <img src="../../../assets/Union.png" alt="">
      </div>
      <p class="text-left m-0">Notification and Sounds</p>
      </div>
      <div class="privaty-security d-flex mt-3">
      <div class="icon">
      <img src="../../../assets/Group 5.png" alt="">
      </div>
      <p class="text-left m-0">Privaty and Security</p>
      </div>
      <div class="data-usage d-flex mt-3">
      <div class="icon">
      <img src="../../../assets/Group 6.png" alt="">
      </div>
      <p class="text-left m-0">Data and Stronge</p>
      </div>
      <div class="chat-settings d-flex mt-3">
      <div class="icon">
      <img src="../../../assets/Chat.png" alt="">
      </div>
      <p class="text-left m-0">Chat settings</p>
      </div>
      <div class="devices d-flex mt-3">
      <div class="icon">
      <img src="../../../assets/Device.png" alt="">
      </div>
      <p class="text-left m-0">Devices</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile'
}
</script>

<style scoped>
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
  /* identical to box height */

  letter-spacing: -0.165px;

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
.account .account-title {
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
}
.account .phone-number .desc {
  color:#7E98DF;
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
</style>
