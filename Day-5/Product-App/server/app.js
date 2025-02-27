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
    const {pid,pname,price,quantity} = req.body; // Object Destructor
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
