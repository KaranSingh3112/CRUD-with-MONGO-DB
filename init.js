//Initializing Database here
const mongoose = require("mongoose");
const Chat = require("./models/chat.js")

main().then(() => {
    console.log("Mongodb Connected!!!");
}).catch((err) => {
    console.log(err);
})

//Connecting with database 
async function main() {
    mongoose.connect('mongodb://127.0.0.1:27017/whatsapp')
}

let allChat = [
    {
        from: "Satish",
        to: "Karan",
        message:"Hello karan",
        created_at: new Date()
    },
    {
        from: "Ashraf",
        to: "Satish",
        message:"Hello Satish",
        created_at: new Date()
    },
    {
        from: "Karan",
        to: "Soham",
        message:"Hello Soham",
        created_at: new Date()
    },
    {
        from: "Soham",
        to: "Ashraf",
        message:"Hello Ashraf",
        created_at: new Date()
    },
]

Chat.insertMany(allChat);