
import {genPassword,connection,createManager,getManager} from '../helper.js';
import express from 'express';
import  jwt  from 'jsonwebtoken'; 
import bcrypt from "bcrypt";

const router=express.Router();
//create Manger
router.post('/signup', async (request,response)=>{
    
    const client=await connection();
    const {username,password}=request.body;
    
    
    const hashpassword=  await genPassword(password);
    //console.log(username,password)
    const result= await createManager(client, username, hashpassword);
    

    //console.log(adduser,result); 
    response.send(result);


});



router.post('/Login', async (request,response)=>{
    
    const client=await connection();
    const {username,password}=request.body;
    
    
//const hashpassword=  await genPassword(password);
    //console.log(username,password)
    const result= await client.db('users').collection('Managers').findOne({username:username});

   const storedpass=result.password
   const isMatch= await bcrypt.compare(password,storedpass); 
   //console.log(adduser,result); 
     if(isMatch){

         const token=jwt.sign({id:result._id},process.env.SECRET_KEY) //jwt token

    response.status( 200).send({ message:"login sucessful",token:token});
     }
     else{
         response.status( 401).send({message:"inavalid login"});
     }

});







router.get('/', async(request,response)=>{
    const client= await connection();
    const manager= await getManager(client);
    
    console.log(manager);
    response.send(manager);
});






export  const managerrouter=router;





//get Manager query 




router.get('/Manager',async (request,response)=>{
    const client= await connection();
    const manager= await getManager(client);
    
    console.log(manager);
    response.send(manager);
});





