var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use( express.static( __dirname + '/public') );
app.set( 'view engine', 'jade' );

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var Schema = mongoose.Schema;
var todoSchema = new Schema({
  title : String,
  description : String,
  is_done : Boolean,
  created_at : Date
});

var Todo = mongoose.model( 'Todo', todoSchema );

// --- index ---
app.get('/', function (req, res) {
  Todo.find(function(err,todos){

  if (err) throw err;
  res.render('list', {todos : todos});

  });
});

// --- new_todo page---
app.get('/new_todo', function (req, res) {
  res.render('new_todo');
});

// --- editing todo ---
app.get('/todos/:id/edit', function (req, res) {
  var todoId = req.params.id;
  var query = Todo.where({ _id : todoId });
  // console.log(todoId);
  query.findOne(function( err, todos ){
    if (err) throw err;
    console.log(todoId);
    res.render('new_todo', { title: todos.title, description: todos.description });
  });
});

// --- creating a todo via new_todo
app.post('/todos', function(req, res) {
  var title = req.body.title;
  var description = req.body.description;

  var todo = new Todo({
    title : title,
    description : description
  });

  todo.save( function (err) {
    if (err) throw err;
    res.redirect( '/' );
  });
});

// --- checking completion of item ---
app.put('/todos/:id/complete', function(req, res) {
  res.redirect( '/' );
});

// --- unchecking completion of item ---
app.put('todos/:id/uncomplete', function(req, res) {
  res.redirect( '/' );
});

// --- updating todo page via edit ---
app.put('/todos/:id/edit', function(req, res) {
  res.redirect( '/' );
});

// --- deletion of todo item ---
app.delete('/todos/:id', function(req, res) {
  res.render('list');
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});