let fs=require("fs");

function promisifiedReadFile(filepath){
   return new Promise(function (resolve,reject){
       fs.readFile(filepath,function cb(err,data){
           if(err){
               reject(err);
           }else{
               resolve(data);
           }
       });
   });
}

let fReadPromise=promisifiedReadFile("f1.txt");
fReadPromise.then(function(data){
    console.log("content->"+data);
})
fReadPromise.catch(function(err){
    console.log(err);
})