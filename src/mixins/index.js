import Swal from 'sweetalert2'

const mixins = {
  methods: {
    alertNewUser () {
      Swal.mixin({
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
        progressSteps: ['1', '2', '3', '4', '5']
      }).queue([
        {
          title: '<strong>Hello!</strong> 🙋‍♂️',
          html: '<strong>I will introduce this application, <br/>Lets Get it</strong> 🚀'
        },
        {
          title: '<strong>Search & add new contact</strong>🕵️‍♂️',
          imageUrl: require('../assets/how to search contact.gif'),
          background: '#FFFFFF',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image'
        },
        {
          title: '<strong>Remember!</strong> 👨‍🏫',
          html: `<strong>To be able to chat with each other.
you and your friends must add friends each other.</strong>`
        },
        {
          title: '<strong>Update profile</strong>✍',
          imageUrl: require('../assets/how to contact info.gif'),
          background: '#FFFFFF',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image'
        },
        {
          title: '<strong>View detailed contact information</strong>🔍',
          imageUrl: require('../assets/how to contact info.gif'),
          background: '#FFFFFF',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image'
        }
      ]).then((result) => {
        if (result.value) {
          Swal.fire({
            // eslint-disable-next-line quotes
            title: `<strong>okay let's do it right now</strong> 😎`,
            // eslint-disable-next-line quotes
            confirmButtonText: `Let's go! 🚀'`
          })
        }
      })
    },
    alertGuideProfile () {
      Swal.mixin({
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
        progressSteps: ['1', '2', '3', '4']
      }).queue([
        {
          title: '<strong>How to update your profile!</strong> 🙋‍♂️',
          html: '<strong>I will guide you to update your personal profile<br/>Lets Get it</strong> 🚀'
        },
        {
          title: '<strong>You can change your Photo Profile & Name</strong>✍',
          imageUrl: require('../assets/header-field.png'),
          background: '#FFFFFF',
          imageWidth: 343,
          imageHeight: 207,
          imageAlt: 'Custom image'
        },
        {
          title: '<strong>You can change 3 fields in form account</strong>',
          imageUrl: require('../assets/account-field-arrow.png'),
          background: '#FFFFFF',
          imageWidth: 233,
          imageHeight: 232,
          imageAlt: 'Custom image'
        },
        {
          title: '<strong>Update Example</strong>✍',
          imageUrl: require('../assets/update-profile-page.gif'),
          background: '#FFFFFF',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image'
        }
      ]).then((result) => {
        if (result.value) {
          Swal.fire({
            // eslint-disable-next-line quotes
            title: `<strong>okay let's do it right now</strong> 😎`,
            // eslint-disable-next-line quotes
            confirmButtonText: `Let's go! 🚀'`
          })
        }
      })
    }
  }
}

export default mixins
