const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Chat = require("./models/chat.js")
const methodOverride = require("method-override");

app.use(methodOverride("_method"));

app.set("views", path.join(__dirname, "views"))
app.set("view engine", 'ejs')
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}))

main().then(() => {
    console.log("Mongodb Connected!!!");
}).catch((err) => {
    console.log(err);
})
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp')
}

//Index route
app.get("/chats",async (req,res)=>{
    let chats = await Chat.find();
    res.render("chats.ejs",{chats});
})

//Sending new messages
app.get("/chats/new",(req,res)=>{
    res.render("newChat.ejs");
})
app.post("/chats",(req,res)=>{
    let {name,message,receiver} = req.body;
    let chat = new Chat({
        from: name,
        to: receiver,
        message: message,
        created_at: new Date()  
    })
    chat.save().then(()=>{
        res.redirect("/chats");
    }).catch((err)=>{console.log(err);
    })
})

//Updating message
app.get("/chats/:id/edit",async (req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id)
    res.render("edit.ejs",{chat})
})
app.put("/chats/:id",async (req,res)=>{
    let {id} = req.params;
    let {message} = req.body;
    let newMsg = await Chat.findByIdAndUpdate(id, {message: message}, {runValidators:true}, {new: true});
    console.log(newMsg);
    res.redirect("/chats");
})

//Deleting
app.delete("/chats/:id",async (req,res)=>{
    let {id} = req.params;
    let delt = await Chat.findByIdAndDelete(id);
    console.log(delt);
    res.redirect("/chats");
})

app.listen(8080, () => {
    console.log(`App listens on port 8080`);
})