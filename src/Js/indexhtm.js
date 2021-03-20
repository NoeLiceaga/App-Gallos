const { ipcRenderer } = require('electron');
const products = document.querySelector('#products');
const botton = document.querySelector('.nav-toggle');
botton.addEventListener('click',AddHTML);
function AddHTML(){
    botton.innerHTML 
}

ipcRenderer.on('product:new',(e,newProduct) =>{
    const newProductTemplate = `
        <div class="col-xs-4 p-2">
            <div class="card text-center">
                <div class="card-header">
                    <h5 class="card-title">${newProduct.name}</h5>
                </div>
                <div class="card-body">
                    ${newProduct.description}
                    <br>
                    ${newProduct.price} 
                </div>
                <div class="card-footer">
                    <button class="btn btn-danger btn-sm">
                        DELETE
                    </button>
                </div>
            </div>
        </div>
    `;
    products.innerHTML += newProductTemplate;
    const btns = document.querySelectorAll('.btn.btn-danger');
    btns.forEach(btn => {
        btn.addEventListener('click',e =>{
            e.target.parentElement.parentElement.parentElement.remove();
        })
    });
});