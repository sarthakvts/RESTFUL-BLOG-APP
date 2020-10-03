
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
 mongoose.set('useFindAndModify', false);
 app.use(require("method-override")("_method"));
 
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
});
//INDEX
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});
//NEW
app.get("/blogs/new", function(req, res){
    res.render("new");
});
//CREATE ROUTE
app.post("/blogs/", function(req, res){
    //Create Blog
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        } else {
            res.redirect("/Blogs");
        }
    });
});
//Show Route
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("show", {blog: foundBlog});
        }
    });
});

//EDIT Route
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: foundBlog})
        }
    });
});

//UPDATE Route
app.put("/blogs/:id", function(req, res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/"+req.params.id);
        }
    });
});

//DELETE Route
app.delete("/blogs/:id", function(req, res){
    //destroy
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    });
    //redirect
});

app.listen(3000, function(){
    console.log("server is running");
});