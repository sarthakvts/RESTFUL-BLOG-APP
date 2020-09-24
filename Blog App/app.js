var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    app = express();
//APP CONFIG
 mongoose.set('useNewUrlParser', true);
 mongoose.set('useUnifiedTopology', true);
 app.set("view engine", "ejs");
 mongoose.connect("mongodb://localhost/restful_blog_app");   
 app.use(express.static("public"));
 app.use(bodyParser.urlencoded({extended: true})); 
 //Mongoose Model Config
 var blogSchema = new mongoose.Schema({
     title: String,
     image: String,
     body: String,
     created: {type: Date, default: Date.now}
 });
 var Blog = mongoose.model("Blog", blogSchema);

//  blog.create({
//      title: "Test",
//      image: "https://images.unsplash.com/photo-1600784740157-c3fcc87beb64?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//      body: "A beautiful capture"
//  })

 //RESFTUL-ROUTES
 app.get("/", function(req, res){
    res.redirect("/blogs");
})
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        } else {
            res.render("index", {blogs: blogs});
        }
    });
})

app.listen(3000, function(){
    console.log("server is running");
});