import Swal from 'sweetalert2'

const mixins = {
  methods: {
    alertNewUser () {
      Swal.mixin({
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
        progressSteps: ['1', '2', '3', '4']
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
    }
  }
}

export default mixins
