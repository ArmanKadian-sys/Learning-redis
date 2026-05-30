import express from 'express';
import Redis from 'ioredis';

const app = express();
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');


const generateOtpKey=(phone)=>{
  return "otp:"+phone;
}


app.use(express.json());
app.post("/banner", async(req, res)=>{
  await redis.set(BANNER_KEY, req.body.message||"Random Banner Value");
  res.json({status: true});
})


app.get("/banner", async(req, res)=>{
  const message=await redis.get(BANNER_KEY);

  if(message){
    res.json({message});
  } else {
    res.status(404).json({error: "Banner not found"});
  }
});

app.delete("/banner", async(req, res)=>{

  try{await redis.del(BANNER_KEY);}
  catch(err){
    console.error(err);
    res.status(500).json({error: "Failed to delete banner"});
  }

  res.json({status: true});
});


app.get("/banner/exists", async(req, res)=>{
  const exists=await redis.exists(BANNER_KEY);
  res.json({exists: !!exists});
});






app.listen(3000, () => {
  console.log('Server is running on port 3000');
});