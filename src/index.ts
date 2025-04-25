import express, {Request,Response } from "express"
import { prisma } from "./db";


 export const app=express();

app.use(express.json());
 
app.post("/sum",async(req:Request,res:Response)=>{
    const a=req.body.a;
    const b=req.body.b;
if(a>100000000 || b>10000000){
  res.status(422).json({
    message:"Sorry we don't support big number"
  });
  return ;
}
const result= a + b;
const request = await prisma.request.create({
  data:{
    a:a,
    b:b,
    answer:a + b,
    type:"Sum"
  }
});


    
res.json({answer:result,id:request.id});

});

app.post("/multiply",async(req,res)=>{
    const a=req.body.a;
    const b=req.body.b;

    await prisma.request.create({
      data:{
        a:a,
        b:b,
        answer:a*b,
        type:"Multiply"
      }
    })

    const result = a * b;
  res.json({
    answer:result
  });
})

