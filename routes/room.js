import express from 'express';

import {saveroom} from '../helper.js'



const router=express.Router();


router.post('/rooms', async (request,response)=>{
    
    const client=await connection();
    const addroom=request.body;
    
    const result= await saveroom(client, addroom);

    console.log(addroom,result); 
    response.send(result);


});
   
 export const roomrouter=router