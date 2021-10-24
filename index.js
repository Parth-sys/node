
import { MongoClient } from "mongodb";
import  express, { request, response }  from "express";
import dotenv from "dotenv";

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
   
     //"mongodb://localhost/users";
    
    
     const url=   process.env.url ;  // "mongodb+srv://Parth:Parth123@cluster0.cxpc1.mongodb.net/users";       //    "mongodb+srv://Parth:parth@mon1@cluster0.cxpc1.mongodb.net/users"            
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
    response.send("Hi all");
});


//read users
app.get('/users', async(request,response)=>{

    
    const client=await connection()

    const users= await client.db("users").collection("P").find().toArray();
    response.send(users);
});

// get users by id
app.get('/users/:id', async (request,response)=>{
    
    const  { id } =request.params;
    const client= await connection();
    const user= await client.db("users").collection("P").findOne({id:id});
   
    console.log(user);
    response.send(user);
});



//get users by query
app.get('/users',async (request,response)=>{
    const client= await connection();
    const user= await client.db("users").collection("P").findOne({}).toArray();
    
    console.log(user);
    response.send(user);
});

//create user
app.post('/users', async (request,response)=>{
    
    const client=await connection();
    const adduser=request.body;
    
    const result= await client.db("users").collection("P").insertMany(adduser);

    console.log(adduser,result); 
    response.send(result);


});

//Update user
app.patch('/users/:id', async (request,response)=>{

    const {id}=request.params;
    const client=await connection();
    const modifyuser=request.body;
    
    const result= await client.db("users").collection("P").updateOne({id:id},{$set:modifyuser});

    console.log(modifyuser,result); 
    response.send(result);
} );

//delete user
app.delete('/users/:id',async (request,response)=>{

    const {id}=request.params;
    const client=await connection();
   
    const user= await client.db("users").collection("P").deleteOne({id:id});

    console.log(user); 
    response.send(user);
});

  





app.listen(PORT,()=>{
    console.log("port is live",PORT);
});
