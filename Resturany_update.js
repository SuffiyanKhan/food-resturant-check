
import {collection, addDoc, doc, deleteDoc,onSnapshot ,orderBy, query } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"; 
import{db} from "./config.js"
import { ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import { storage } from "./config.js";

let resurant_id = localStorage.getItem('userId');
let getCategory = document.querySelector('#getCategory');
let addC = document.querySelector('#addC')
let downloadUR ;
let uploaded_image = "";

// ======================== add category ======================== //

document.querySelector('#addC').addEventListener('click', async()=>{
    try {
        const docRef = await addDoc(collection(db, resurant_id), {
         getCategory: getCategory.value,
         download_Url:downloadUR,
         time: new Date().toLocaleString(),
        //  id : docRef.id
        });
        document.querySelector('.profilePopup').style.zIndex=-1;
        document.querySelector('.profilePopup').style.opacity=0
        document.querySelector('.profilePopup').style.display ='none';
        console.log("Document written with ID: ", docRef.id);
        location.reload()
      } catch (e) {
        // console.error("Error adding document: ", e);
    }   
})
let getfile = document.querySelector('#getfile');

let nav = document.querySelector('.navigation-wrap');
window.onscroll = ()=>{
    if(document.documentElement.scrollTop > 20){
        nav.classList.add('scroll-on')
    }else{
        nav.classList.remove('scroll-on')
    }
}
// ======================== store image in storage ======================== //
getfile.addEventListener("change", function(){
    document.querySelector('#hidden').style.display ='flex'
    document.querySelector('#show').style.display='none';
    let getfiles = getfile.files[0].name
    const mountainImagesRef = ref(storage, `CategoryImages/${getfiles}`);
    const uploadTask = uploadBytesResumable(mountainImagesRef, getfile.files[0]);

uploadTask.on('state_changed', 
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    if(progress == 100){
        const reader = new FileReader();
  reader.addEventListener("load", () => {
    uploaded_image = reader.result;
    document.getElementById("hidden").style.backgroundImage = `url(${uploaded_image})`;
  });
  reader.readAsDataURL(this.files[0])
  document.getElementById('hidden').innerHTML="";
    }else{
        document.getElementById('hidden').innerHTML='Loading ....'
    }
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        addC.disabled = false
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      downloadUR = downloadURL;
      addC.style.display = 'flex'

    });
  }
);
})

// ======================== show Category ======================== //
let showCategory = document.querySelector('.showCategory')

onSnapshot(query(collection(db, resurant_id),orderBy("time")), (data) => {
    data.docChanges().forEach((data) => {
        if (data.type == "removed") {
          let delLi = document.getElementById(data.doc.id);
          if (delLi) {
            delLi.remove()
          }
        } else if (data.type === "added") {
            showCategory.innerHTML +=`
    <div class="card col-lg-4 col-md-6 mb-lg-0 mb-4" id="${data.doc.id}" >
        <img id="showInnerCat" src="${data.doc.data().download_Url}" onclick="showInnerCategory('${data.doc.id}')" class="card-img-top">
        <div class="card-body d-flex ssd">
        <h2 class="card-title"> ${data.doc.data().getCategory}</h2>
        <abbr title="Delete Category">
        <i class="fa-solid fa-trash delete" onclick="delet('${data.doc.id}')"></i>
        </abbr>
        </div>
    </div>
    `
    // console.log("Current data: ", data.doc.id);
        }
    })
});

//  ================== Delete Catedory ================== //
let delet=async (e)=>{
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
    confirmButtonText: 'Delete Category!',
    cancelButtonText: 'Cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your Category has been Delete',
        showConfirmButton: false,
        timer: 3000
      }).then( async() => {
        if (true) {
          await deleteDoc(doc(db, resurant_id, e));
        }
      });
    }
  })
    // await deleteDoc(doc(db, resurant_id, e));
    // console.log('successfully')
}

// =================== Show Inner Categorys =================== //

let showInnerCategory=(e)=>{
  localStorage.setItem('userIDS',e)
  window.location='./practice.html'
  console.log(e)
}


window.showInnerCategory = showInnerCategory
window.delet= delet

// ======================== hidden popups ======================== //
document.querySelector('#showPopupS').addEventListener('click',()=>{
    document.querySelector('.profilePopup').style.zIndex=1;
    document.querySelector('.profilePopup').style.opacity=1
    document.querySelector('.profilePopup').style.display ='block';
})
document.querySelector('#addC').addEventListener('click', async()=>{
    document.querySelector('.profilePopup').style.zIndex=-1;
    document.querySelector('.profilePopup').style.opacity=0
    document.querySelector('.profilePopup').style.display ='none';   
})








