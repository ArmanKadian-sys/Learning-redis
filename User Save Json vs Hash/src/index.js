import express from 'express';
import Redis from 'ioredis';

const app = express();


const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');


const generateUserKey=(id, method)=>{
  return "user:"+id+":"+method;
}


app.use(express.json());

app.post("/user/:id/json", async(req, res)=>{
  const {id}=req.params;
  await redis.set(generateUserKey(id, "json"), JSON.stringify(req.body));
  res.json({message:"user data has been saved as json"});
  return;
})


app.get("/user/:id/json", async(req, res)=>{
  const {id}=req.params;
  const user=await redis.get(generateUserKey(id, "json"));
  res.json({user:JSON.parse(user)});
  return;
})


app.post("/user/:id/hash", async(req, res)=>{
  const {id}=req.params;
  await redis.hset(generateUserKey(id, "hash"), req.body);
  res.json({message:"user data has been saved as hash"});
  return;
})



app.get("/user/:id/hash", async(req, res)=>{
  const {id}=req.params;
  const user=await redis.hgetall(generateUserKey(id, "hash"));
  res.json({user});
  return;
})



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});