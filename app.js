const express =require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https= require("https")

const app= express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    const firstname =req.body.fname;
    const lastname=req.body.lname;
    const email= req.body.email;
    // console.log(firstname,lastname,email); 
    const data={
        members : [
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME: firstname,
                    LNAME: lastname

                }

            }

        ]
        };
        const jsonData= JSON.stringify(data);
        const url = "https://us21.api.mailchimp.com/3.0/lists/ed6942083e";

        const options={
            method :"POST",
            auth:"abhinav:9c3079e8a5ad06d7a20a69f214eb840e-us21"
        }
       const request= https.request(url,options,function(response){
         if( response.statusCode===200){
            res.sendFile(__dirname +"/success.html");
         }
         else{
            res.sendFile(__dirname + "/failure.html");
         }
             response.on("data",function(data){
                console.log(JSON.parse(data));
            })


        });
        request.write(jsonData);
        request.end();
        

});

app.post("/failure",(req,res)=>{
    res.redirect("/");
})

app.post("/success",(req,res)=>{
    
    res.redirect("/");
})
  app.post("/failure",(req,res)=>{
    res.redirect("/");
  }
  )

app.listen(3000,function(){
    console.log("server is running on the port 3000");
});








//9c3079e8a5ad06d7a20a69f214eb840e-us21
//ed6942083e