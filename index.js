const express=require("express")
const users=require("./MOCK_DATA.json")
const app=express();
const fs=require('fs')
const port=8000;


//middleware
app.use(express.urlencoded({extended:false}))

//Routes
app.get("/api/users",(req,res)=>{
    return res.json(users);
})
// app.get("/users",(req,res)=>{
//    const html=`
//    <ul>
//    ${users.map((user)=>`<li>${user.first_name}</li>`)}
//    </ul>`
// })
app.route("/api/users/:id")
.get((req,res)=>{
    const id=Number(req.params.id);
    const user=users.find((user)=>user.id===id);
    return  res.json(user);
})
.patch((req,res)=>{
  //todo :edit a  user 
  
  return res.json({status:"pending"})
})
.delete((req,res)=>{
 //todo :delete a  user 
 const id=Number(req.params.id);
 const user=users.find((user)=>user.id===id)
 users.pop({user})
 fs.delete('MOCK_DATA.json',user)
 return res.json({status:"sucess"})
})

app.post("/api/users",(req,res)=>{
    //todo :create a new user 
    const body=req.body;
    users.push({...body,id: users.length+ 1})
    fs.writeFile('MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
        return res.status(201).json({status:"Sucess",id:users.length});
    })
   
})

//in the below /api/users/:id this part is common so we use routing
// app.get("/api/users/:id",(req,res)=>{
//    const id=Number(req.params.id);
//    const user=users.find((user)=>user.id===id);
//    return  res.json(user);
// })


// app.patch("/api/users/:id",(req,res)=>{
//     //todo :edit a  user 
//     return res.json({status:"pending"})
// })

// app.delete("/api/users/:id",(req,res)=>{
//     //todo :delete a  user 
//     return res.json({status:"pending"})
// })

app.listen(port,()=>{
    console.log(`Server started at ${port}`)
})