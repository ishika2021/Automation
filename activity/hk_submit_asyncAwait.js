//hackerrank automation with the help of async await.

let puppeteer=require("puppeteer");
let {password,email}=require("./secrets");
let {codes}=require("./code");
let fs=require("fs");
console.log("Before");

(async function(){
    let browserInstance=await puppeteer.launch({
        headless:false,
        defaultViewport:null,
        args:["--start-maximized",]
    });
    let newTab=await browserInstance.newPage();
    await newTab.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
    await newTab.type("#input-1",email,{delay:200});
    await newTab.type("#input-2",password,{delay:200});
    await newTab.click("button[data-analytics='LoginPassword']");
    await waitAndClick(".card-content h3[title='Interview Preparation Kit']",newTab);
    await waitAndClick("a[data-attr1='warmup']",newTab);
    let url=newTab.url();
  // let questionObj=codes[0];
    //await questionSolver(url, questionObj.soln, questionObj.qName,newTab);
    for(let i=0;i<codes.length;i++){
        let questionObj=codes[i];
        await questionSolver(url, questionObj.soln, questionObj.qName,newTab);
    }


})();
async function waitAndClick(selector,newTab){
    await newTab.waitForSelector(selector,{visible:true});
    let selectorClickPromise=newTab.click(selector);
    return selectorClickPromise;
}

async function questionSolver(modulepageURL, code, questionName,newTab){
    await newTab.goto(modulepageURL);
    function browserconsolerunFn(questionName){
        let allH4elem = document.querySelectorAll("h4");
        let textArr = [];
                for (let i = 0; i < allH4elem.length; i++) {
                    //extracting the text written in h4 element, innertext is used to get the innertext written in a html tag, split to only get the name
                    let myQuestion = allH4elem[i].innerText.split("\n")[0];
                    textArr.push(myQuestion);
                }
                let idx = textArr.indexOf(questionName);
                allH4elem[idx].click();
    }
    await newTab.evaluate(browserconsolerunFn,questionName);
    await waitAndClick(".custom-checkbox.inline",newTab);
    await newTab.type(".custominput", code);
    await newTab.keyboard.down("Control");
    await newTab.keyboard.press("a");
    await newTab.keyboard.press("x");
    await newTab.click(".monaco-editor.no-user-select.vs");
    await newTab.keyboard.press("a");
    await newTab.keyboard.press("v");
    await newTab.click(".pull-right.btn.btn-primary.hr-monaco-submit");
    //last promise shouldn't be awaited, rather return a pending promise so that the line where it is called i.e, 27 wait for this to complete first then continue;
    return newTab.keyboard.up("Control");

}