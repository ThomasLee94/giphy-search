// Project: Giphy Search
// Name: Thomas J Lee

// Requiring npm modules
var express = require("express");
var handlebars = require("express-handlebars");
var http = require("http");
var giphy = require("giphy-api")()
// ! Above npm modules installed

// Creating an instance of app through express
var app = express();

// Initialising express-handlebars
app.engine("handlebars", handlebars({defaultLayout: "main"}));
app.set("view engine", "handlebars")

app.use(express.static("public"));

// Index route
app.get("/", (req, res) => {
    var searchString = req.query.term 
    // Query string doesn't necessarily exist
    if(searchString){
        giphy.search(searchString, (err, response) => {
            res.render("home", {gifs: response.data})
          });
    } else {
        giphy.trending((err, response) => {
            res.render("home", {gifs: response.data})
        })
    }
    
});


app.listen(3000, function() {
    console.log("App listening to port 3000!")
})