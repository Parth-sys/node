import express, { request, response } from 'express';

import {getusers,connection,getuserbyid,createmovie,patchbyid,deletebyid,getmovie,createtheatre,getTheatre,patchbyidfortheatre} from '../helper.js'
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


router.get('/gettheatre/:location',async(request,response)=>{

    const{location}=request.params;
    const client= await connection();
    const talkies= await getTheatre(client,location)
    
    console.log(talkies)
    response.send(talkies);
  })



router.post('/theatre',async(request,response)=>{

    const client=await connection();
    const addtheatre=request.body;
    const result=await createtheatre(client,addtheatre)
    console.log(addtheatre,result);
    response.send(result);
  
  })



  router.patch('/theatre/:id', async (request,response)=>{

    const {id}=request.params;
    const client=await connection();
    const modifytheatre=request.body;
    
    const result= await patchbyidfortheatre(client, id, modifytheatre)

    console.log(modifytheatre,result); 
    response.send(result);
} );





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