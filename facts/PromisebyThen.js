let fs=require("fs");
let frP=fs.promises.readFile("f1.txt");
console.log("Before");
let thenKP=frP.then(cb);
console.log("then ka promise",thenKP);
function cb(data){
    console.log("data"+data);
    return 10;
}

setTimeout(function(){
    console.log("then ka promise",thenKP);
},1000);

console.log("After");