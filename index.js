const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const { log, timeLog } = require('console');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  fs.readdir(`./Files`, function(err, files){
    res.render("index", {files: files});
  })
});

app.get('/Files/:filename', function(req, res){
  fs.readFile(`./Files/${req.params.filename}`, "utf-8", function(err, filedata){
    res.render('show', {filename: req.params.filename, filedata: filedata})
  })
})
  
app.get('/edit/:filename', function(req, res){
  res.render('edit', {filename: req.params.filename})
})

app.post('/create', function(req, res){
  fs.writeFile(`./Files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function(err){
    res.redirect("/")
  });
});

app.post('/edit', function(req, res){
  fs.rename(`./Files/${req.body.previous}`, `./Files/${req.body.new}`, function(errr){
    res.redirect("/");
  });
});



app.listen(3000, () => {
  console.log("server running on port 3000.");
});

