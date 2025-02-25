const express = require("express");
const app = express();
const port = 3000
const products = [
    {
        pid: 101,
        pname: "Soap",
        price: "10",
        quantity: "5"
    },
    {
        pid: 102,
        pname: "Vaccum Cleaner",
        price: "25",
        quantity: "19"
    }
]

app.use(express.json());

app.get("/products",(req,res)=>{
    res.status(200);
    res.json(products);

})



app.post("/products",(req,res)=>{
    const {pid,pname,price,quantity} = req.body;  // Object Destructuring - Reduces the Line of Code 4 Line Code in One Line
    // id = req.body.id
    // name = req.body.name
    // email = req.body.email
    // password = req.body.password


    const newProduct = {
        pid,pname,price,quantity
    }
    products.push(newProduct);
    res.status(201);
    res.json({status: "success" , message: "product created successfully",newProduct});
})

// app.delete("/deleteproduct/:id",(req,res)=>{
//     const uid = req.params.id;
//     if(uid!=null){
//         const index = users.findIndex(ind=>ind.id == uid)
//         if(index!=-1){
//             users.splice(index,1);
//             res.status(200);
//             res.json({status: "success" , message: "user deleted successfully"})
//         } 
//         else{
//             res.status(400);
//             res.json({status: "fail" , message: "Wrong user id"})
//         }
//     }

// })

// app.get("/product/:id",(req,res)=>{
//    const pid = req.params.id;
//    const index = products.findIndex(ind=>ind.id==pid);
//    if()
// })


app.listen(3000,(err)=>{
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