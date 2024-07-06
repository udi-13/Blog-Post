const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require("lodash");
var postDetails=[];
const homeStartingContent = "Welcome to the Bharaths blogpost site type whatever is in your mind with a brief heading and make it as your dairy read them whenever you want";
const aboutContent = "Myself a student @ iit dhanbad currently; who is trying to explore as many things as possible in upcoming years.";
const contactContent ="You can reach me by my phone number : 9392610657 or by mailing me ryuzakiagent9000@gmail.com ";

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/posts/:task",(req,res)=>{
  var xy=req.params.task;var glo=0;
  var xyz;
  console.log(_.lowerCase(xy));
  postDetails.forEach(function(PD){
    console.log(_.lowerCase(PD.composetitle));
    if(_.lowerCase(PD.composetitle)===_.lowerCase(xy))
      {
        xyz=PD;
        glo++;
      }
  })
  if(glo>0){
    res.render("redirs",{redirhead:xyz.composetitle,redircontent:xyz.composecontent});
  }
  else{
    res.render("redirs",{redirhead:"404 error",redircontent:"page not found"});
  }
});
app.get("/",(req,res)=>{
  res.render("home",{homeContent:homeStartingContent,pD:postDetails});
});

app.get("/contact",(req,res)=>{
  res.render("contact",{contactCon:contactContent});
});

app.get("/about",(req,res)=>{
  res.render("about",{aboutCon:aboutContent});
});

app.get("/compose",(req,res)=>{
  res.render("compose");
});

app.listen(3000, ()=> {
  console.log("Server started on port 3000");
});

app.post("/compose",(req,res)=>{
  postDetails.push({
    composetitle: req.body.postTitle,
    composecontent: req.body.postBody
  });
  res.redirect("/");
});
