const { app, BrowserWindow, ipcMain, Menu, BrowserView } = require('electron');
const url = require('url');
const path = require('path');

if(process.env.NODE_ENV !== 'production'){
    require('electron-reload')(__dirname,{
        electron: path.join(__dirname,'../node_modules','.bin','electron')
    });
}


let mainWindows;
let newProductWindow;


app.on('ready', () => {
    mainWindows = new BrowserWindow({
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    });
    mainWindows.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.htm'),
        protocol: 'file',
        slashes: true
    }))
    const mainMenu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(mainMenu);
    mainWindows.maximize();
    mainWindows.on('closed',()=>{
        app.quit();
    });
});

const templateMenu = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New Product',
                accelerator: 'Ctrl-N',
                click(){
                    createNewProduct();
                 }
            },
            {
                label: 'Remove All Products',
        
            },
            {
                label: 'Exit',
                accelerator: process.platform == 'darwin' ? 'command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }   
        ]
    }     
]

if(process.platform !== 'darwin'){
    templateMenu.unshift({
        label: app.getName()
    });
}

ipcMain.on('product:new', (e, newProduct) => {
    mainWindows.webContents.send('product:new',newProduct);
    newProductWindow.close();
});

function createNewProduct(){


    newProductWindow =  new BrowserWindow({
        width:400,
        height:300,
        title: 'Add a new product',
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    });
    //newProductWindow.setMenu(null);
    newProductWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/new-product.htm'),
        protocol: 'file',
        slashes: true
    }))

    newProductWindow.on('closed',()=>{
        newProductWindow = null;
    });

}


if(process.env.NODE_ENV !== 'production'){
    templateMenu.push({
        label: 'DevTools',
        submenu: [
            {
                label: 'Show/Hide Dev Tools',
                accelerator: 'Ctrl+D',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    })
}