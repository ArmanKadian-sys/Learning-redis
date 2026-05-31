import express from 'express';
import {emailQueue} from "./queue.js";

const app = express();

app.use(express.json());

app.post("/email", async(req, res)=>{
  const job = await emailQueue.add("send-email", 
    {
      to: req.body.to, 
      name: req.body.name || "Learner"
    }, 
    {
      attempts: 3, 
      backoff:{
        type: "exponential", 
        delay: 1000,
      },
    },
   )

   res.json({message:"The job "+job.name+" has been created successfully"})
});


app.listen(3000, () => {
    console.log('API is running on port 3000');
});