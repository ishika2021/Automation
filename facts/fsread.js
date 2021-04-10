let fs=require("fs");
console.log("before");
//cb is an older way of doing async programming
fs.readFile("f1.txt",function cb(err,data){
    if(err){
        console.log(err);
    }else{
        console.log("data->"+data);
    }
});
//promise return initial state is always pending
let promise=fs.promises.readFile("f1.txt");
console.log("Initial state",promise);
console.log("After");
//consumer function it will be called when a promise is fullfil
promise.then(function(data){
    console.log(data);
})
//reject
promise.catch(function(err){
    console.log("err",err);
})