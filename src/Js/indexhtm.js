const { ipcRenderer , remote} = require('electron');
const products = document.querySelector('#products');
const botton = document.querySelector('.nav-toggle');
const index = remote.require('./index');
const person = document.getElementById('person');

person.addEventListener('click',addPerson)

function addPerson(){
    console.log('ji')
    index.createNewProduct()
}

// ipcRenderer.on('product:new',(e,newProduct) =>{
//     const newProductTemplate = `
//         <div class="col-xs-4 p-2">
//             <div class="card text-center">
//                 <div class="card-header">
//                     <h5 class="card-title">${newProduct.name}</h5>
//                 </div>
//                 <div class="card-body">
//                     ${newProduct.description}
//                     <br>
//                     ${newProduct.price} 
//                 </div>
//                 <div class="card-footer">
//                     <button class="btn btn-danger btn-sm">
//                         DELETE
//                     </button>
//                 </div>
//             </div>
//         </div>
//     `;
//     products.innerHTML += newProductTemplate;
//     const btns = document.querySelectorAll('.btn.btn-danger');
//     btns.forEach(btn => {
//         btn.addEventListener('click',e =>{
//             e.target.parentElement.parentElement.parentElement.remove();
//         })
//     });
// });

// ==== RESPONSIVE NAVBAR === //
 const showNavbar = (toggleId, navId, bodyId, headerId)=>{
     const toggle = document.getElementById(toggleId),
     nav = document.getElementById(navId),
     bodypd = document.getElementById(bodyId),
     headerpd = document.getElementById(headerId);

     if(toggle && nav && bodypd && headerpd){
        toggle.addEventListener('click',()=>{

            nav.classList.toggle('show')

            toggle.classList.toggle('bx-x')

            bodypd.classList.toggle('body-pd')

            headerpd.classList.toggle('body-pd')
        })
     }
 }

 showNavbar('header-toggle','nav-bar','body-pd','header');

 const linkColor = document.querySelectorAll('.nav__link');

 function colorLink(){
     if(colorLink){
         linkColor.forEach(l => l.classList.remove('active'))
         this.classList.add('active')
     }
 }

 linkColor.forEach(l=> l.addEventListener('click',colorLink))
