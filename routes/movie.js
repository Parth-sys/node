import express from 'express';

import {getusers,connection,getuserbyid,createmovie,patchbyid,deletebyid,getmovie} from '../helper.js'
import { auth } from '../middleware/auth.js';
const router=express.Router();


//read users

router.get('/', async(request,response)=>{

    
    const client=await connection()

    const users= await getmovie(client);
    response.send(users);
});




//get user by id

/*
router.get('/:id',auth, async (request,response)=>{
    
    const  { id } =request.params;
    const client= await connection();
    const user= await getuserbyid(client, id);
   
    console.log(user);
    response.send(user);
});

//create users


*/
router.post('/',async (request,response)=>{
    
    const client=await connection();
    const addmovie=request.body;
    
    const result= await createmovie(client, addmovie);

    console.log(addmovie,result); 
    response.send(result);


});


/*
//Update user
 

router.patch('/:id',auth, async (request,response)=>{

    const {id}=request.params;
    const client=await connection();
    const modifyuser=request.body;
    
    const result= await patchbyid(client, id, modifyuser)

    console.log(modifyuser,result); 
    response.send(result);
} );


//delete user


router.delete('/:id',auth,async (request,response)=>{

    const {id}=request.params;
    const client=await connection();
   
    const user= await deletebyid(client, id);

    console.log(user); 
    response.send(user);
});
*/
export const movierouter=router