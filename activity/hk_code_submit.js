let fs = require("fs");
let puppeteer = require("puppeteer");
let { password, email } = require("./secrets");
let { codes } = require("./code");
let gtab;
console.log("Before");
let browserPromise = puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start maximized"]
})
browserPromise
    .then(function (browserInstance) {
        let newTabPromise = browserInstance.newPage();
        return newTabPromise;
    }).then(function (newTab) {
        let loginPageWillBeOpenedPromise = newTab.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
        gtab = newTab;
        return loginPageWillBeOpenedPromise;
    }).then(function () {
        //console.log("login page opened");
        let emailWillBeTypedPromise = gtab.type("#input-1", email, { delay: 200 });
        return emailWillBeTypedPromise;
    }).then(function () {
        let passwordWillBeTypedPromise = gtab.type("#input-2", password, { delay: 200 });
        return passwordWillBeTypedPromise;
    }).then(function () {
        let loginPageWillBeClickedPromise = gtab.click("button[data-analytics='LoginPassword']");
        return loginPageWillBeClickedPromise;
    }).then(function () {
        let clickIPKIt = waitAndClick(".card-content h3[title='Interview Preparation Kit']");
        return clickIPKIt;
    }).then(function () {
        let warmupClick = waitAndClick("a[data-attr1='warmup']");
        return warmupClick;
    }).then(function () {
        // console.log("Go to warmup page");
        return gtab.url();
    }).then(function (url) {
        //console.log(url);
        let questionObj = codes[0];
      let fqsp=questionSolver(url, questionObj.soln, questionObj.qName);

      for(let i=1;i<codes.length;i++){
          fqsp=fqsp.then(function(){
              return questionSolver(url,codes[i].soln,codes[i].qName);
          })
      }
      return fqsp;
    }).catch(function (err) {
        console.log(err);
    })
//promise based function wait and click
function waitAndClick(selector) {
    return new Promise(function (resolve, reject) {
        let selectorWaitPromise = gtab.waitForSelector(selector, { visible: true });
        selectorWaitPromise.then(function () {
            let selectorClickPromise = gtab.click(selector);
            // return selectorWaitPromise;
            return selectorClickPromise;
        }).then(function () {
            resolve();
        }).catch(function (err) {
            reject();
        })
    })
}
//this function will solve all the question listed on the passed url
function questionSolver(modulepageURL, code, questionName) {
    return new Promise(function (resolve, reject) {
        //page visit
        let reachedPageUrlPromise = gtab.goto(modulepageURL);
        reachedPageUrlPromise.then(function () {
            //this function runs on the browser console i.e, all the functions used here are only available on the browser
            function browserconsolerunFn(questionName) {
                //selecting all the h4 elements - 4
                let allH4elem = document.querySelectorAll("h4");
                console.log(allH4elem);
                let textArr = [];
                for (let i = 0; i < allH4elem.length; i++) {
                    //extracting the text written in h4 element, innertext is used to get the innertext written in a html tag, split to only get the name
                    let myQuestion = allH4elem[i].innerText.split("\n")[0];
                    textArr.push(myQuestion);
                }
                //not the array textArr will have "Question Solver"
                let idx = textArr.indexOf(questionName);
                //find the idx so that we can click that particular question listed in the allH4elem
                allH4elem[idx].click();
            }
            let pageClickPromise = gtab.evaluate(browserconsolerunFn, questionName);
            return pageClickPromise;
        }).then(function () {
            let inputCheckboxisClickedPromise = waitAndClick(".custom-checkbox.inline");
            return inputCheckboxisClickedPromise;
        }).then(function () {
            let codeWillBeTypedPromise = gtab.type(".custominput", code);
            return codeWillBeTypedPromise;
        }).then(function(){
            let controlIsPressed=gtab.keyboard.down("Control");
            return controlIsPressed;
        }).then(function(){
            let keyAisPressed=gtab.keyboard.press("a");
            return keyAisPressed;
        }).then(function(){
            let keyXisPressed=gtab.keyboard.press("x");
            return keyXisPressed;
        }).then(function(){
            let editorIsClickedPromise=gtab.click(".monaco-editor.no-user-select.vs");
            return editorIsClickedPromise;
        }).then(function(){
            let keyVisPressedPromise=gtab.keyboard.press("a");
            return keyVisPressedPromise;
        }).then(function(){
            let keyVisPressedPromise=gtab.keyboard.press("v");
            return keyVisPressedPromise;
        }).then(function(){
            let submitButtonisClicked=gtab.click(".pull-right.btn.btn-primary.hr-monaco-submit");
            return submitButtonisClicked;
        }).then(function () {
            resolve();
        })
    })
}

console.log("after");