const express = require("express");
const app = express();
const port = 3002
const users = [
    {
        id: 1001,
        name: "Anuj Mishra" ,
        email: "anujmishrabes2022@gmail.com",
        password: "abes"
    }
]

app.use(express.json());

app.get("/users",(req,res)=>{
    res.status(200);
    res.json(users);

})



app.post("/user",(req,res)=>{
    const {name,email,password} = req.body;  // Object Destructuring - Reduces the Line of Code 4 Line Code in One Line
    // id = req.body.id
    // name = req.body.name
    // email = req.body.email
    // password = req.body.password

    const newId = users.length>0? users[users.length-1].id+1:1001;


    const newUser = {
        id: newId,name,email,password
    }
    users.push(newUser);
    res.status(201);
    res.json({status: "success" , message: "user created successfully"})
})

app.delete("/deleteuser/:id",(req,res)=>{
    const uid = req.params.id;
    if(uid!=null){
        const index = users.findIndex(ind=>ind.id == uid)
        if(index!=-1){
            users.splice(index,1);
            res.status(200);
            res.json({status: "success" , message: "user deleted successfully"})
        } 
        else{
            res.status(400);
            res.json({status: "fail" , message: "Wrong user id"})
        }
    }

})



app.listen(3002,(err)=>{
    try{
        if(err) throw err;
        else{
            console.log(`Server is Running on ${port}`)
        }
    }
    catch(err){
        console.log("Server Error:",err.message);
    }
})

// promise
// async-await
// callback


//json.stringify
//json.parse