const express = require("express");
const fd = require('fs/promises'); 
const app = express();
const port = 3005;

let users = [];

const loadUser = async () => {
    try {
        const data = await fd.readFile("./users.json", "utf-8"); 
        users = JSON.parse(data);
    } catch (err) {
        users = [];
    }
};

const savedata = async () => {
    await fd.writeFile("./users.json", JSON.stringify(users, null, 2)); 
};

app.use(express.json()); // BuiltIn Middleware (Application Level Middleware)
loadUser();

app.get("/users", (req, res) => {
    res.status(200).json(users);
});

app.get("/user/:id", (req, res) => {                                    // get api
    const uid = req.params.id;
    const index = users.findIndex(ind => ind.id == uid);
    if (index === -1) {
        return res.status(400).json({ status: "fail", message: "User Not Found" });
    }
    res.status(200).json({ status: "success", message: "User found", data: users[index] });
});

app.post("/createuser", async (req, res) => {                                                              // post api
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ status: "fail", message: "All fields are required" });
    }
    const newId = Date.now();
    const newUser = { id: newId, name, email };
    users.push(newUser);
    await savedata();
    res.status(200).json({ status: "success", message: "User Created Successfully", data: newUser });
});

app.patch("/edituser/:id", async (req, res) => {
    const uid = req.params.id;
    const { name, email } = req.body;
    const index = users.findIndex(ind => ind.id == uid);
    if (index === -1) {
        return res.status(400).json({ status: "fail", message: "User Not Found" });
    }
    
    if (name) users[index].name = name;
    if (email) users[index].email = email;
    
    await savedata();
    res.status(200).json({ status: "success", message: "User Data Edited Successfully", data: users[index] });
});

app.delete("/deleteuser/:id", async (req, res) => {
    const uid = req.params.id;
    const index = users.findIndex(ind => ind.id == uid);
    if (index === -1) {
        return res.status(400).json({ status: "fail", message: "User Not Found" });
    }
    const deletedData = users.splice(index, 1);
    await savedata();
    res.status(200).json({ status: "success", message: "User Deleted Successfully", data: deletedData });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
