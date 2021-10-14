const express = require('express');
const mongoose = require(`mongoose`);
const path = require('path');
const app = express();
const hbs = require('hbs');

require("./db/conn");

const Register =require("./models/register");

const port= process.env.PORT || 3000;

const static_path = path.join(__dirname,"../public")
const template_path = path.join(__dirname,"../templates/views")
const partials_path = path.join(__dirname,"../templates/partials")

app.use(express.json());
app.use(express.urlencoded({ extended:false}));

//console.log(path.join(__dirname));
app.use(express.static(static_path));
app.set('view engine', 'hbs');


app.set("views",template_path);
hbs.registerPartials(partials_path);

app.get('/', (req, res) => {
    res.render("index")
});

app.get("/registration",(req, res) => {
    res.render("registration")
});



app.post("/registration",async(req, res) => {
    try {
      
     const password = req.body.password;
     const cpassword = req.body.confirmpassword;

     if(password===cpassword) {
       
      const registerEmployee =new Register({
        fullName:req.body.fullName,
        UserName:req.body.UserName,
        MobileNo:req.body.MobileNo,
        email:req.body.email,
        password:password,
        confirmpassword:cpassword 
      })

      const registered =await registerEmployee.save();
       res.status(201).render("index");
     }else{
         res.send("password not matched")
     }
     
    }catch(error) {
       res.status(400).send(error);
    }
})



app.post("/login",(req, res) => {
  try{
 const email =req.body.email;
 const password =req.body.password;

 const useremail = await Register.findOne({email:email})
 res.send(useremail);

 if(useremail.password === password) {
     res.status(201).render("index");
 }else{
     res.send("password not matched")
 }

 console.log(`${email} and password is ${password}`)
} catch(error) {
    res.status(404).send("invalid Email")
}
})

app.listen(port,()=>{
    console.log(`server is running at port no ${port}`);
})


