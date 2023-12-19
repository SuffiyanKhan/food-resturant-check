import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import{auth} from "./config.js";



let lemail = document.querySelector('#lemail')
let lpassword=document.querySelector('#lpassword')

document.querySelector('#Login').addEventListener('click',()=>{
    signInWithEmailAndPassword(auth, lemail.value, lpassword.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user.uid)
    Swal.fire({
        icon: 'success',
        title: '<h3 style="color: #999 ">Great! You are now logged in. Click OK to proceed.</h3>',
        confirmButtonColor: "#AB2C48",
        // iconColor: '#00AD96',
      }).then(()=>{
        if(true){
          window.location="./index2.html"
        }
      })
      
    localStorage.setItem('userId',user.uid)

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = errorCode.slice(5).toUpperCase();
    const errMessage = errorMessage.replace(/-/g, " ");
    Swal.fire({
      icon: 'error',
      title: '<h3 style="color: #999 ">Oops...</h3>',
      text: errMessage,
      confirmButtonColor: "#AB2C48",
    })
  });
    console.log('hi')
})













