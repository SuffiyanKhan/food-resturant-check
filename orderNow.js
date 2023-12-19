import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"; 
import{db} from "./config.js"

const querySnapshot = await getDocs(collection(db, "Resturant_Admin"));
querySnapshot.forEach((doc) => {
    document.querySelector('.show').innerHTML +=`
    <div class="card col-lg-4 col-md-6 mb-lg-0 mb-4 resCard"  id="${doc.id}" >
        <img src="${doc.data().downloadURL}" onclick="resCard('${doc.id}')" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${doc.data().Resturant_Name}</h5>
        <p class="card-text">${doc.data().Resturant_Address}</p>
        <p>Closes 12:20 am | Serves: 1</p>
        </div>
    </div>
    `
});

window.resCard = (id)=>{
    window.location='./other.html';
    localStorage.setItem('costomerUse',id)
    console.log(id)
}

let nav = document.querySelector('.navigation-wrap');
window.onscroll = ()=>{
if(document.documentElement.scrollTop > 20){
nav.classList.add('scroll-on')
}else{
nav.classList.remove('scroll-on')

}
}
