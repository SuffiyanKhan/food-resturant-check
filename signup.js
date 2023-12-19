
import { setDoc,  doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"; 
import{db} from "./config.js"
import { createUserWithEmailAndPassword ,GoogleAuthProvider , signInWithPopup } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import{auth} from "./config.js";
const provider = new GoogleAuthProvider();

let cname = document.querySelector('#cname');
let cemail =document.querySelector('#cemail');
let cpassword =document.querySelector('#cpassword');
let cphone =document.querySelector('#cphone');

document.querySelector('#customerRegistration').addEventListener('click',()=>{
    createUserWithEmailAndPassword(auth, cemail.value, cpassword.value)
  .then( async(userCredential) => {
    // Signed up 
    const user = userCredential.user;
    try {
            const docRef = await setDoc(doc(db, "customers",  user.uid ),{
          Namet: cname.value,
          Email: cemail.value,
          Passowrd: cpassword.value,
          Phone : cphone.value,
          uid : user.uid
        });
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your Signup has been Succeessfully',
            showConfirmButton: false,
            timer: 1500
          }).then(() =>{
            if(true){
              window.location ='./login.html'
            }
          })
      } catch (e) {
        console.error("Error adding document: ", e);
      }
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
    // ..
  });
})
// ================  Authentication with Google ================ //
 
document.querySelector('#authWithGoogle').addEventListener('click',()=>{
    signInWithPopup(auth, provider)
  .then(async(result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(user)
    let userData = {
        Name: user.displayName,
        Email: user.email,
        Phone_NO : "",
      
      };
      await setDoc(doc(db, "users", user.uid), {
        // collection name,   unique id of user
        ...userData, // setting array in a database
        userid: user.uid, // also user id in the database
      });
      localStorage.setItem('userId',user.uid)
      window.location='./index.html'
      
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = errorCode.slice(5).toUpperCase();
    const errMessage = errorMessage.replace(/-/g, " ");
    Swal.fire({
        icon: 'error',
        title: '<h3 style="color: #999 ">Oops...</h3>',
        text: errMessage,
        confirmButtonColor: "#AB2C48",
      })    // The email of the user's account used.
    // const email = error.customData.email;
    // The AuthCredential type that was used.
    // const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
})

let signup= document.querySelector('.signup');
let signup2 = document.querySelector('.signup2');
document.querySelector('.Admin').addEventListener('click',()=>{
  window.location='./Adminsignup.html'
})
document.querySelector('#Customer').addEventListener('click',()=>{
    signup.style.display ="flex";
    signup2.style.display ="none";
})
document.querySelector('#AdminRegistration').addEventListener('click',()=>{
    window.location='./index2.html'
})

