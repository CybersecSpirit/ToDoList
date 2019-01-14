var express = require('express');
var session = require('cookie-session');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });


var app = express();

app.use(session({secret: 'todolist'}));

app.use(function(req, res, next){
  if(typeof(req.session.todolist) == "undefined"){
    req.session.todolist = [];
  }
  next();
})

.get('/todo', function(req, res){
  res.render('app.ejs', {taches: req.session.todolist});
})

.get('/todo/supprimer/:delList', function(req, res){
  if (req.params.delList != " "){
    req.session.todolist.splice(req.params.delList, 1);
  }
  res.redirect('/todo');
})

.get('/todo/modifier/:id', function(req, res){
  res.render('modifier.ejs', {modif:req.session.todolist[req.params.id], idex:req.params.id });
})

.post('/todo/modificateur/:id', urlencodedParser, function (req, res) {
  if (req.body.tache != " "){
    req.session.todolist.splice(req.params.id, 1, req.body.tache);
  }
  res.redirect('/todo');
})

.post('/todo/post', urlencodedParser, function(req, res){
  if (req.body.tache != " "){
    req.session.todolist.push(req.body.tache);
  }
  res.redirect('/todo');
})

.use(function(req, res, next){
  res.redirect('/todo');
});

app.listen(80);
