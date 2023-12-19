import { ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import { storage } from "./config.js";
import {collection, addDoc, getDocs,onSnapshot,deleteDoc,doc} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import{db} from "./config.js"

        let getfile = document.querySelector('#getfile');
        let addC = document.querySelector('#addC');
        let getCategoryName = document.querySelector('#getCategoryName');
        let getCategoryPrice= document.querySelector('#getCategoryPrice');
        let getCategoryTimeDuration = document.querySelector('#getCategoryTimeDuration');
        let userIDS = localStorage.getItem('userIDS');
        let showCategorys = document.querySelector('.showCategorys')
        let downloadUR ;
        let uploaded_image ="";
// ========================== Add Categorys ========================== //

        addC.addEventListener('click', async()=>{
            try {
  const docRef = await addDoc(collection(db, userIDS), {
    Categorys_Image: downloadUR,
    Category_Name : getCategoryName.value,
    Category_Price : getCategoryPrice.value,
    Category_TimeDuration: getCategoryTimeDuration.value,
  });

  console.log("Document written with ID: ", docRef.id);
} catch (e) {
}
document.querySelector('.profilePopup1').style.zIndex=-1;
document.querySelector('.profilePopup1').style.opacity=0;
document.querySelector('.profilePopup1').style.display='none'
        })


        onSnapshot((collection(db, userIDS)), (data) => {
            data.docChanges().forEach((element) => {
                if(element.type == "removed"){
                    let deletCategorys = document.querySelector('#element.doc.id');
                    if(deletCategorys){
                        deletCategorys.remove()
                    }
                }else if(element.type === "added"){
                    let CategorysName = element.doc.data().Category_Name;
                    let CategoryPrice = element.doc.data().Category_Price;
                    let CategoryId = element.doc.id;
                    let CategoryImage = element.doc.data().Category_Image;
                    let CategoryTimeDuration = element.doc.data().Category_TimeDuration
                    displayCards(CategorysName , CategoryPrice , CategoryId ,CategoryImage , CategoryTimeDuration);
                  
                }
            });
        })
        let displayCards=(CategorysName , CategoryPrice , CategoryId ,CategoryImage , CategoryTimeDuration)=>{
            showCategorys.innerHTML +=`
                    <div class="card col-lg-4 col-md-6 mb-lg-0 mb-4" id="${CategoryId}">
                        <div class="card-body">
                            <div class="d-flex sf">
                                <h2 class="card-title">${CategorysName}</h2>
                                <i class="fa-solid fa-ellipsis-vertical
                                deleteCate" onclick="deleteCate('${CategoryId}')"></i>
                            </div>
                           <p>Time: ${CategoryTimeDuration} Minutes | Serves: 1</p>
                                <span>Price :$${CategoryPrice}</span>
                            <button onclick="addToChart('${CategoryId}' , '${CategorysName}' , '${CategoryPrice}' ,'${CategoryImage}' , '${CategoryTimeDuration}')" class="main-btn mt-4">Order Now</button>
                        </div>
                    </div>
                    `
            console.log(CategoryId)
        }
        let uniqueId = localStorage.getItem("uniqueId");
function generateRandomId() {
    // Get the current timestamp
    const timestamp = new Date().getTime();

    // Generate a random number (use Math.random() or a more advanced random function)
    const randomNumber = Math.floor(Math.random() * 1000);

    // Concatenate timestamp and random number to create the ID
    const randomId = `${timestamp}${randomNumber}`;

    return randomId;
}


        if (!uniqueId) {
    uniqueId = generateRandomId();
    localStorage.setItem("uniqueId", uniqueId);
}
let cartNoPara = document.querySelector('#cartNo')
let cartQuant;
const getCarts = () => {
    onSnapshot(collection(db, uniqueId), (data) => {
        cartQuant = data.size;
        console.log(data.size)
        if (cartQuant) {
            btn.disabled = false
            cartNoPara.style.display = "flex";
            cartNoPara.innerHTML = `${cartQuant}`
        } else {
            cartNoPara.style.display = "none";
        }
    })
}
getCarts();

async function addToChart(CategoryId, CategorysName, CategoryPrice, CategoryImage) {
    try {
        let singleProduct = {
            Categoryid : CategoryId,
            Categorysname : CategorysName,
            Categoryprice : CategoryPrice,
            Categoryimage : CategoryImage
        }
        const docRef = await addDoc(collection(db, uniqueId), {
            ...singleProduct,
            time: new Date().toLocaleString()
        });
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

let cartList = document.querySelector('.cartList');
let cartBtn = document.querySelector('#cartBtn');
let cartTotalPricePara = document.querySelector('.cartTotalPricePara')
cartBtn.addEventListener("click", () => {

cartList.innerHTML = "";
let cartTotalPrice = 0;
let UpdPrice=0;

onSnapshot(collection(db, uniqueId), (data) => {
    cartQuant = data.size;
    console.log(cartQuant)
    if (cartQuant) {
        btn.disabled = false
        data .docChanges().forEach((singleCartProduct) => {
            let cartProductPrice = +singleCartProduct.doc.data().Categoryprice;
            if (singleCartProduct.type === "added") {
                console.log(singleCartProduct.doc.data().Categorysname)
                const cartProductId = singleCartProduct.doc.data().CategoryId;
                const cartProductImg = singleCartProduct.doc.data().CategoryImage;
                const cartProductTitle = singleCartProduct.doc.data().CategorysName;
                cartTotalPrice += cartProductPrice;
                console.log(cartTotalPrice)

                cartList.innerHTML += `
                <li class="cartProductList mt-3" id="${singleCartProduct.doc.id}">
                    <div class="cartProductDetailDiv">
                        <p><i class="fa-regular fa-circle" style="color: #4B1EB1;"></i></p>
                        <div class="cartProductImgDiv">
                            
                        </div>
                        <div class="cartProductTitle">
                            <p id="cartProductTitlePara">${singleCartProduct.doc.data().Categorysname}</p>
                        </div>
                    </div>
                    <div class="cartProductPrice">
                        <p id="cartProductPricePara">$${singleCartProduct.doc.data().Categoryprice}</p>
                        <p id="xMark" onclick="delCartProduct('${singleCartProduct.doc.id}')"><i class="fa-solid fa-xmark fa-lg" style="color: #f55555;"></i></p>
                    </div>
                </li>
                `

            } else if (singleCartProduct.type === "removed") {
                let delLi = document.getElementById(singleCartProduct.doc.id)
                if (delLi) {
                    delLi.remove()
                }
                cartTotalPrice -= cartProductPrice;
            }
            cartTotalPricePara.innerHTML = `$${cartTotalPrice}`
        })
    } else {
        
    }
})

})
async function delCartProduct(id) {
    await deleteDoc(doc(db, uniqueId, id));
}
let deleteCate =async(id)=>{
    await deleteDoc(doc(db, userIDS, id));
    console.log(id)
}
window.deleteCate = deleteCate
window.addToChart = addToChart
window.delCartProduct = delCartProduct


// ========================== Send Categorys Images ========================== //
        getfile.addEventListener("change", function(){
            console.log(getfile.files[0].name)
    document.querySelector('#hidden').style.display ='flex'
    document.querySelector('#show').style.display='none';
    let getfiles = getfile.files[0].name
    const mountainImagesRef = ref(storage, `CategorysImages/${getfiles}`);
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
  addC.disabled = false
//   addC.style.display = 'block'
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
      addC.style.display = 'block'

    });
  }
);
})
       document.querySelector('#showPopups').addEventListener('click',()=>{
        document.querySelector('.profilePopup1').style.zIndex=1;
        document.querySelector('.profilePopup1').style.opacity=1;
        document.querySelector('.profilePopup1').style.display='block'
        console.log('hi')
       })

