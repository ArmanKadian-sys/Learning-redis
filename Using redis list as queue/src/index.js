import express from 'express';
import Redis from 'ioredis';

const app = express();


const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');


const QUEUE_KEY="email:queue";

app.use(express.json());


app.post("/email/enqueue", async(req, res)=>{

  const{email, subject, body}=req.body;
  const job={email, subject, body};

  await redis.lpush(QUEUE_KEY,JSON.stringify(job));

  res.json({message:"email enqueued", job});
})



app.get("/email/dequeue", async(req, res)=>{
  const rawData=await redis.rpop(QUEUE_KEY);
  console.log(rawData);
  // email sending
  res.json({message:"job dequeued", job: JSON.parse(rawData)});
})


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});