//jshint esversion:6

const express= require("express");

const bodyParser=require("body-parser");

const request=require("request");

app=express();

app.use(bodyParser.urlencoded({extended:true}));


app.get("/" , function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
  var crypto=req.body.crypto;
  var fiat=req.body.fiat;
  var amount = req.body.amount;
  var baseUrl = "https://apiv2.bitcoinaverage.com/convert/global";

  var options = {
    url : baseUrl,
    method : "GET",
    qs : {
      from : crypto ,
      to : fiat ,
      amount : amount
    }
  };

   request( options , function(error,response,body){
     var data=JSON.parse(body);
     var currentDate=data.time;
     res.write("<p> Current Date is: " + currentDate + "</p>");
     res.write("<h1>" + amount + "  " + crypto + " is worth " + data.price + " " + fiat + "</h1>");
     res.send();
   });
});

app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
