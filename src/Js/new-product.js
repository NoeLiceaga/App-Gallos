const form = document.querySelector('form');

const  {ipcRenderer } = require('electron');

form.addEventListener('submit', e =>{
    const productName = document.querySelector('#name').value;
    const productPrice = document.querySelector('#price').value;
    const productDescription = document.querySelector('#description').value;
    
    const newProduct = {
        name:productName,
        price:productPrice,
        description: productDescription
    };
    ipcRenderer.send('product:new',newProduct);

    e.preventDefault();
});