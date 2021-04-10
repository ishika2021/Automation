let puppeteer=require("puppeteer");
let browserWillBeLaunchedPromise=puppeteer.launch({
    headless:false
})
// browserWillBeLaunchedPromise.then(function(browserInstance){
//     //new tab
//     let newPagePromise=browserInstance.newPage();
//     newPagePromise.then(function(newPage){
//         console.log("new tab opened");
//         //go to pepcoding
//         let pageWillBeOpenedPromise=newPage.goto("https://www.pepcoding.com/index");
//         pageWillBeOpenedPromise.then(function(){
//             console.log("page is opened");
//         })
//     })
// })

browserWillBeLaunchedPromise
.then(function(browserInstance){
    //new tab
    let newPagePromise=browserInstance.newPage();
    return newPagePromise // here return is imp so that the next then will run after this then is completed succesfully
}).then(function(newPage){
    console.log("new tab opened");
    //go to pepcoding
    let pageWillBeOpenedPromise=newPage.goto("https://www.pepcoding.com/index");
    return pageWillBeOpenedPromise;
}).then(function(){
    console.log("page is opened");
}).catch(function(){
    console.log(err);
})