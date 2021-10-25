
import { MongoClient } from "mongodb";
import  express, { request, response }  from "express";
import dotenv from "dotenv";

import {getManager,getuserbyid,genPassword,createManager,createuser,deletebyid,patchbyid,getusers} from './helper.js';
//const express=require("express");
const app=express(); 

dotenv.config();
const PORT=process.env.PORT;


// it tell the express what format of data ur going to get like xml,json,text etc
// middleware (like gatekeeper )
// all request body converted to json
//is an inbuilt middleware
//custom middlewares
//third-party middlewares

app.use(express.json());




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

connection();


app.get('/',(request,response)=>{
    response.send("Hi all local");
});


//read users

app.get('/users', async(request,response)=>{

    
    const client=await connection()

    const users= await getusers(client);
    response.send(users);
});




//get user by id


app.get('/users/:id', async (request,response)=>{
    
    const  { id } =request.params;
    const client= await connection();
    const user= await getuserbyid(client, id);
   
    console.log(user);
    response.send(user);
});






//hashing the passwords


app.post('/Manager/signup', async (request,response)=>{
    
    const client=await connection();
    const {username,password}=request.body;
    
    
    const hashpassword=  await genPassword(password);
    //console.log(username,password)
    const result= await createManager(client, username, hashpassword);


    //console.log(adduser,result); 
    response.send(result);


});






//get Manager query 




app.get('/Manager',async (request,response)=>{
    const client= await connection();
    const manager= await getManager(client);
    
    console.log(manager);
    response.send(manager);
});






//create users



app.post('/users', async (request,response)=>{
    
    const client=await connection();
    const adduser=request.body;
    
    const result= await createuser(client, adduser);

    console.log(adduser,result); 
    response.send(result);


});



//Update user
 

app.patch('/users/:id', async (request,response)=>{

    const {id}=request.params;
    const client=await connection();
    const modifyuser=request.body;
    
    const result= await patchbyid(client, id, modifyuser)

    console.log(modifyuser,result); 
    response.send(result);
} );


//delete user


app.delete('/users/:id',async (request,response)=>{

    const {id}=request.params;
    const client=await connection();
   
    const user= await deletebyid(client, id);

    console.log(user); 
    response.send(user);
});

  






app.listen(PORT,()=>{
    console.log("port is live",PORT);
});






