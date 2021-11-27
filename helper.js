import bcrypt from "bcrypt";
import { MongoClient } from "mongodb";

async function connection(){
   
    const url=   process.env.url ;        
   const client=new MongoClient(url);
 
    await client.connect();
    console.log("mongodb connected");
     return client
   
     //const user= await client
   //.db("users")         // this connection function returns the mongo client which is use for query 
          //without client we cant make query ,so it is very important 
   //.collection("P")
   //.findOne({id:"5"});

   //console.log(user)
}



//read user
 async function getusers(client) {
    return await client.db("users").collection("P").find().toArray();
}


//get user by i
 async function getuserbyid(client, id) {
    return await client.db("users").collection("P").findOne({ id: id });
}

//hashing the password
 async function genPassword(password){
    const salt=await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt);
}

//create Mange
 async function createManager(client, username, hashpassword) {
    return await client.db("users").collection("Managers").insertOne({ username: username, password: hashpassword });
}

// read Manage
 async function getManager(client) {
    return await client.db("users").collection("Managers").find({}).toArray();
}

//create user
 async function createuser(client, adduser) {
    return await client.db("users").collection("P").insertMany(adduser);
}


//Update user

 async function patchbyid(client, id, modifyuser) {
    return await client.db("users").collection("P").updateOne({ id: id }, { $set: modifyuser });
}

//delete user
 async function deletebyid(client, id) {
    return await client.db("users").collection("P").deleteOne({ id: id });
}







async function createmovie(client, addmovie) {
    return await client.db("users").collection("movie").insertMany(addmovie);
}


async function createtheatre(client,addtheatre){
    return await client.db("users").collection("theatre").insertMany(addtheatre);
}


async function getTheatre(client,location) {
    return await client.db("users").collection("theatre").findOne({location:location});
}


async function getmovie(client) {
    return await client.db("users").collection("movie").find().toArray();
}

async function patchbyidfortheatre(client, id, modifytheatre) {
    return await client.db("users").collection("theatre").updateOne({ id: id }, { $set: modifytheatre });
}


//hallbooking api


async function saveroom(client,addroom){
    return await client.db('users').collection("room").insertMany(addroom);
}









export {getManager,getuserbyid,genPassword,
    createManager,createuser,deletebyid,patchbyid,getusers,
    connection,createmovie,getmovie,createtheatre,getTheatre,patchbyidfortheatre,saveroom}