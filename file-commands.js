
const os=require('os');
const fs=require('fs');




fs.readFile("./n.txt","utf8",(err,data)=>{    // READING FILE HERE AND USING UTF8 FORMAT TO READ ,IF FORMAT NOT SET THEN IT WILL SHOW FILE CONTENT IN BINARY FORMAT
    if(err){
        console.log(err ,"Error here")
    }

    console.log(data)

    fs.writeFile("./new.txt",data,()=>{   // COPYING DATA HERE AND CREATING NEW FILE AND WRITING DATA 
           console.log("completed writing in new.txt")})
})

   
fs.copyFile("./n.txt","./new.txt",()=>{
    console.log("copy complete");

    fs.rename("./new.txt","./awsome.txt",()=>{
        console.log("rename is complete");
    })
});





console.log( " operating system CPU architecture is",os.arch() )

console.log(" free mem in bytes" +"::"+ os.freemem())

console.log(" free mem in bytes" +"::"+ os.totalmem())

const Marks=[20,30,40,60,10];

console.log( "maximum no from array",  Math.max(...Marks))

function double(num){
    return num *2
}


console.log(process.argv);
const num=process.argv[2]
console.log("double is ",double(num))



fs.appendFile("./n.txt","\n good night" ,()=>{
    console.log("Append complete")
})

