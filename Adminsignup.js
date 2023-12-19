

import { setDoc,  doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"; 
import{db} from "./config.js"
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import{auth} from "./config.js";
import { ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import { storage } from "./config.js";

let regFulName = document.querySelector('#regFulName');
let ResturantName = document.querySelector('#ResturantName');
let regisEmail = document.querySelector('#regisEmail');
let regisPassword = document.querySelector('#regisPassword');
let regisPhone = document.querySelector('#regisPhone');
let resgisResturantAddress = document.querySelector('#resgisResturantAddress');
let hidden = document.querySelector('#hidden');
let uploadpi =document.querySelector('#uploadpic');
let downloadUR ;
let uploaded_image = "";

document.querySelector('.main-btn').addEventListener('click',()=>{
  createUserWithEmailAndPassword(auth, regisEmail.value, regisPassword.value)
  .then(async(userCredential) => {
    // Signed up 
    const user = userCredential.user;
    try{
      await setDoc(doc(db, "Resturant_Admin", user.uid), {
        Name: regFulName.value,
        Resturant_Name: ResturantName.value,
        Email: regisEmail.value,
        Password : regisPassword.value,
        Phone_NO : regisPhone.value,
        Resturant_Address : resgisResturantAddress.value,
        uid : user.uid,
        downloadURL : downloadUR

      });
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your Signup has been Succeessfully',
        showConfirmButton: false,
        timer: 1500
      }).then(() =>{
        if(true){
          window.location='./login2.html'
        }
      })
    }catch(error){
      console.log(error)
    }
    console.log(user)
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

  console.log('hi')
})


document.querySelector('.upLoad').addEventListener('click',()=>{
  console.log(uploadpi.files[0].name)
  let getFile = uploadpi.files[0].name
  const mountainsRef = ref(storage, `image/${getFile}`);
  const uploadTask = uploadBytesResumable(mountainsRef, uploadpi.files[0]);

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      downloadUR =  downloadURL;
    });
  }
);
})

document.querySelector('.upLoad').addEventListener('click',()=>{
    hidden.style.display='block';
    document.querySelector('#upload').style.display='none'
})

uploadpi.addEventListener("change", function(){
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    uploaded_image = reader.result;
    document.getElementById("hidden").style.backgroundImage = `url(${uploaded_image})`;
  });
  reader.readAsDataURL(this.files[0])
})

