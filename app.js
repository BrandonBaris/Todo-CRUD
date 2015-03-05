var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var moment = require('moment');
// moment().format();
// app.use(require('connect-livereload')({port: 4002}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use( express.static( __dirname + '/public') );
app.set( 'view engine', 'jade' );

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var Schema = mongoose.Schema;
var todoSchema = new Schema({
  title : { type : String, required : true },
  description : String,
  is_done : { type : Boolean, default : false },
  created_at : { type : Date, default: Date.now() }
});
app.use(methodOverride('_method'));

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
app.get('/todos/:_id/edit', function (req, res) {
  var todoId = req.params._id;
  var query = Todo.where({ _id : todoId });
  // console.log(todoId);

  query.findOne(function( err, todo ){
    if (err) throw err;
    res.render('edit', { todo : todo });
  });
});

// --- creating a todo via new_todo
app.post('/todos', function(req, res) {
  // var title = req.body.title;
  // var description = req.body.description;
  // var dateCreate = Date.now();
  // console.log(dateCreate);

  var todo = new Todo({
    title : req.body.title || "",
    description : req.body.description || ""
  });

  todo.save( function ( err, todo ) {
    // if (err) throw err;
    res.redirect( "/" );
  });
});

// --- checking completion of item ---
app.put('/todos/:_id/complete', function(req, res) {
  var todoId = req.params._id;
  var query = Todo.find({ _id : todoId });
  query.update({ is_done: true }, function( err ){
    if (err) throw err;
    res.send( 'OK' );
  });
});

// --- unchecking completion of item ---
app.put('/todos/:_id/incomplete', function(req, res) {
  var todoId = req.params._id;
  var query = Todo.find({ _id : todoId });
  query.update({ is_done: false }, function( err ){
    if (err) throw err;
    res.send( 'OK' );
  });
});

// --- updating todo page via edit ---
app.put('/todos/:_id', function(req, res) {
  var todoId = req.params._id;
  var title = req.body.title;
  var description = req.body.description;
  var query = Todo.find({ _id : todoId });
  query.update({title: title, description: description }, function( err ){
    if (err) throw err;
    res.redirect( '/' );
  });
});

// --- deletion of todo item ---
app.delete('/todos/:_id', function(req, res) {
  var todoId = req.params._id;
  var query = Todo.find({ _id : todoId });
  query.remove(function( err ){
    if (err) throw err;
    res.redirect( '/' );
  });
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});