import Redis from "ioredis";

const subscriber=new Redis(process.env.REDIS_URL||"redis://localhost:6379");

subscriber.subscribe("notifications",(err)=>{
if(err){
  console.log("This is the error while subscribing to notifications", err);
  return;
}

console.log("Successfully subscribed to notifications");

})


subscriber.on("message", (channel, message)=>{
  console.log("the message "+message+" has been recieved on channel "+channel);
})