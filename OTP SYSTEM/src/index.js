import express from 'express';
import Redis from 'ioredis';

const app = express();
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');


const generateOtpKey=(phone)=>{
  return "otp:"+phone;
}


app.use(express.json());


app.post("/getOtp", async(req, res)=>{
  const {phone}=req.body;
  const otp = Math.floor(1000 + Math.random() * 9000);
  await redis.set(generateOtpKey(phone), otp, "EX", 60);
  res.json({otp, message:"otp has been set successfully"}); 
})


app.post("/postOtp", async(req, res)=>{
  const {otp, phone}=req.body;

  const savedOtp=await redis.get(generateOtpKey(phone));

  if(!savedOtp){
    res.json({message:"Otp expired or not found"});
  }

  if(savedOtp==otp){
    res.json({message:"otp verified"});
    return;
  }
  else{
    res.json({message:"otp entered is wrong"});
    return;
  }

})


app.get("/getTtl", async(req, res)=>{
  const {phone}=req.body;
  const ttl=await redis.ttl(generateOtpKey(phone));
  res.json({ttl});
})





app.listen(3000, () => {
  console.log('Server is running on port 3000');
});