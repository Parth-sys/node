
import { MongoClient } from "mongodb";
import  express, { request, response }  from "express";
import dotenv from "dotenv";
import nodemailer from 'nodemailer'
import {getManager,getuserbyid,genPassword,createManager,createuser,deletebyid,patchbyid,getusers,connection,createtheatre, getTheatre} from './helper.js';
import { managerrouter } from "./routes/manager.js";
import { userrouter } from "./routes/user.js";
import { movierouter } from "./routes/movie.js";
import cors from 'cors';
import { roomrouter } from "./routes/room.js";


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
app.use(cors());
app.use('/Manager',managerrouter);
app.use('/users',userrouter);
app.use('/movie',movierouter);
app.use('/room',roomrouter);



app.get('/',(request,response)=>{
    response.send("Hi all local");
});


//read users

app.get('/users', async(request,response)=>{

    
    const client=await connection()

    const users= await getusers(client);
    response.send(users);
});



const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', //replace with your email provider
    port:465,
    secure:true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });


  transporter.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });







app.post('/send', async (req, res, next) => {
    var name = req.body.name
    var email = req.body.email
    var subject = req.body.subject
    var message = req.body.message
  
    var mail = {
      from: email,
      to: '9156parth@gmai.com',// receiver email,
      subject: subject,
      text: message
    }
  
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          status: 'fail'
        })
      } else {
        res.json({
         status: 'success'
        })
      }
    })
  })






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


app.post('/theatre',async(request,response)=>{

  const client=await connection();
  const addtheatre=request.body;
  const result=await createtheatre(client,addtheatre)
  console.log(addtheatre,result);
  response.send(result);

})

app.get('/gettheatre/:location',async(request,response)=>{
  const {location}=request.params;

  const client= await connection();
  const talkies= await getTheatre(client,location)
  
  console.log(talkies)
  response.send(talkies);
})



app.patch('/theatre/:id', async (request,response)=>{

  const {id}=request.params;
  const client=await connection();
  const modifytheatre=request.body;
  
  const result= await patchbyidfortheatre(client, id, modifytheatre)

  console.log(modifytheatre,result); 
  response.send(result);
} );





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






