import {  onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {auth} from "./config.js"
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    // ...
  } else {
    window.location='./signup.html'
    // User is signed out
    // ...
  }
});

onAuthStateChanged(auth, async (user) => {
if (!user) {
localStorage.removeItem("UserId")
location.href = "./signup.html";
}
});
let nav = document.querySelector('.navigation-wrap');
window.onscroll = ()=>{
if(document.documentElement.scrollTop > 20){
nav.classList.add('scroll-on')
}else{
nav.classList.remove('scroll-on')

}
}
document.querySelector('#oredrnow').addEventListener('click',()=>{
window.location='./orderNow.html'
})






document.querySelector('#logout').addEventListener('click', async ()=>{
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Log out!',
    cancelButtonText: 'Cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your Account has been Logout',
        showConfirmButton: false,
        timer: 1500
      }).then( async() => {
        if (true) {
          auth.signOut().then(() => {
            // localStorage.remove("UserId");
            location.href = "./login.html";
          })          
        }
      });
    }
  })
  // auth.signOut().then(() => {
  //   // localStorage.remove("UserId");
  //   location.href = "./login.html";
  // })
  console.log('hi')
})

      