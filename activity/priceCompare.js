let puppeteer=require("puppeteer");
let fs=require("fs");
let links=["https://www.amazon.in","https://www.flipkart.com","https://paytmmall.com"];
let pName=process.argv[2];

console.log("Before");
(async function(){
    try{
        let browserInstance=await puppeteer.launch({
            headless:false,
            defaultViewport:null,
            args:["--start-maximized",]
        });
      let AmazonArr=await getListingFromAmazon(links[0],browserInstance,pName);
      let FlipkartArr=await getListingFromFlipkart(links[1],browserInstance,pName);
       let PaytmArr=await getListingFromPaytm(links[2],browserInstance,pName);
      console.table(AmazonArr);
      console.table(FlipkartArr);
       console.table(PaytmArr);
    }
    catch(err){
        console.log(err);
    }
})();

//inp: product name,url of amazon home page
//op: top 5 matching product

async function getListingFromAmazon(link,browserInstance,pName){
    let newTab = await browserInstance.newPage();
    await newTab.goto(link);
    await newTab.click(".nav-search-field");
    await newTab.type(".nav-search-field",pName);
    await newTab.keyboard.press("Enter");
    await newTab.waitForSelector(".a-price-whole",{visible:true});
    function consoleFn(priceSelector,pNameSelector){
        let priceArr=document.querySelectorAll(priceSelector);
        let PName=document.querySelectorAll(pNameSelector);
        let details=[];
        for(let i=0;i<5;i++){
            let price =priceArr[i].innerText;
            let Name=PName[i].innerText;
            details.push({
                price,Name
            });
        }
        return details;
    }
    return newTab.evaluate(consoleFn,".a-price-whole",".a-size-medium.a-color-base.a-text-normal");
   // console.log(detailsArr);
    //return detailsArr;
}
async function getListingFromFlipkart(link,browserInstance,pName){
    let newTab = await browserInstance.newPage();
    await newTab.goto(link);
    await newTab.click("._2KpZ6l._2doB4z");
   await newTab.click("._3OO5Xc");
    await newTab.type("._3OO5Xc",pName);
    await newTab.keyboard.press("Enter");
   // await newTab.keyboard.press("Enter");
    await newTab.waitForSelector("._4rR01T",{visible:true});
    await newTab.waitForSelector("._30jeq3._1_WHN1",{visible:true});
    function consoleFn(priceSelector,pNameSelector){
        let priceArr=document.querySelectorAll(priceSelector);
        let PName=document.querySelectorAll(pNameSelector);
        let details=[];
        for(let i=0;i<5;i++){
            let price =priceArr[i].innerText;
            let Name=PName[i].innerText;
            details.push({
                price,Name
            });
        }
        return details;
    }
    return newTab.evaluate(consoleFn,"._30jeq3._1_WHN1","._4rR01T");
}

async function getListingFromPaytm(link,browserInstance,pName){
    let newTab = await browserInstance.newPage();
    await newTab.goto(link);
    await newTab.type("#searchInput",pName,{delay:200});
    await newTab.keyboard.press("Enter",{delay:200});
    await newTab.waitForSelector(".UGUy",{visible:true});
    await newTab.waitForSelector("._1kMS",{visible:true});
    function consoleFn(priceSelector,pNameSelector){
        let priceArr=document.querySelectorAll(priceSelector);
        let PName=document.querySelectorAll(pNameSelector);
        let details=[];
        for(let i=0;i<5;i++){
            let price =priceArr[i].innerText;
            let Name=PName[i].innerText;
            details.push({
                price,Name
            });
        }
        return details;
    }
    return newTab.evaluate(consoleFn,"._1kMS",".UGUy");
}