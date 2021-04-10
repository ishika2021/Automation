let fs=require("fs");

function myPromiseReadFile(filepath){
    return new Promise(function(resolve,reject){
        fs.readFile(filepath,function cb(err,data){
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        });
    });
}

let frP=myPromiseReadFile("f1.txt");
console.log(frP);
frP.then(function(data){
    console.log("data->"+data);
})
frP.catch(function(err){
    console.log("error->"+err);
})
console.log("after");