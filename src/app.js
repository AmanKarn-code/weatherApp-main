const express=require("express");
const app=express();
const path=require("path")
const hbs=require("hbs")

const PORT=process.env.PORT || 3000;

// public static file
const static_path=path.join(__dirname,"../public")
const templates_path=path.join(__dirname,"../templates/views")
const partial_path=path.join(__dirname,"../templates/partials")

app.set("view engine","hbs");
app.use(express.static(static_path));
app.set("views",templates_path);
hbs.registerPartials(partial_path);


// routing
app.get("",(req,res)=>{
    res.render("index")
})
app.get("/about",(req,res)=>{
    res.render("about")
})

app.get("/whether",(req,res)=>{
    res.render("wheather")
})
// app.get("/whether/*",(req,res)=>{
//     res.render("error",{
//         errMsg:"Opps! page not found"
//     })
// })
app.get("*",(req,res)=>{
    res.render("error",{
        errMsg:"Opps! page not found"
    })
})
app.get("/*",(req,res)=>{
    res.render("error",{
        errMsg:"Opps! page not found"
    })
})
app.listen(PORT,()=>{
    console.log(`server created successfully on port ${PORT}`);
})