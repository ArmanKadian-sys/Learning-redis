import {Worker} from "bullmq";
import {connection} from "./queue.js";

const worker=new Worker("emails", async (job)=>{
  console.log("Started to process the email job");
  await new Promise((resolve)=>{
    setTimeout(()=>{
      console.log("Finished processing the email job");
      resolve();
    }, 1000);
  });
  console.log("Email job completed");
},
{connection});


worker.on("completed",(job)=>{
  console.log(`Job with id ${job.id} has been completed`);
});

worker.on("failed",(job, err)=>{
  console.log(`Job with id ${job.id} has failed with error ${err.message}`);
}); 