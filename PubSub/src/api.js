import express from "express";
import Redis from "ioredis";

const app=express();

app.use(express.json());

const publisher=new Redis(process.env.REDIS_URL||"redis://localhost:6379");


app.post("/notification", async(req, res)=>{

  const reciever=await publisher.publish("notifications", JSON.stringify(req.body));

  res.json({message:"The notificaiton has been published to reciever "+reciever})
  return;
})


app.listen(3000, ()=>{
  console.log("server started on port 3000");
})