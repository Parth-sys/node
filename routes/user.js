import express from 'express';

import {getusers,connection,getuserbyid,createuser,patchbyid,deletebyid} from '../helper.js'

const router=express.Router();

//read users

router.get('/users', async(request,response)=>{

    
    const client=await connection()

    const users= await getusers(client);
    response.send(users);
});




//get user by id


router.get('/users/:id', async (request,response)=>{
    
    const  { id } =request.params;
    const client= await connection();
    const user= await getuserbyid(client, id);
   
    console.log(user);
    response.send(user);
});

//create users



router.post('/users', async (request,response)=>{
    
    const client=await connection();
    const adduser=request.body;
    
    const result= await createuser(client, adduser);

    console.log(adduser,result); 
    response.send(result);


});



//Update user
 

router.patch('/users/:id', async (request,response)=>{

    const {id}=request.params;
    const client=await connection();
    const modifyuser=request.body;
    
    const result= await patchbyid(client, id, modifyuser)

    console.log(modifyuser,result); 
    response.send(result);
} );


//delete user


router.delete('/users/:id',async (request,response)=>{

    const {id}=request.params;
    const client=await connection();
   
    const user= await deletebyid(client, id);

    console.log(user); 
    response.send(user);
});
