require('./config/config');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT;
const hbs = require('hbs');
let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');

// config
let app = express();
app.listen(port, () => console.log(`Started up at port ${port}`));
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../views')));
app.set('view engine', 'hbs');
let retrievedList;
let myTodo;

// routes
app.get('/', (req, res) => res.render('index.hbs'));

// post
app.post('/', (req, res) => {

  // create list
  if (req.body.new){
    let todo = new Todo({
      title: req.body.new
    }).save().then((doc) => {
      res.render('index.hbs', {
        title: req.body.new
      });  
    });

  // retrieve list    
  } else if (req.body.retrieve) {
    Todo.find({title: req.body.retrieve}).then((todos) => {
      if (todos && todos.length) {
        myTodo = {todos};
        retrievedList = myTodo.todos[0].title;
        res.render('index.hbs', {
          title: myTodo.todos[0].title,
          items: myTodo.todos[0].items
        });  
      } else {
        res.redirect('back');         
      }
    });

  // add 
  } else if (req.body.add){
    Todo.update({title: retrievedList}, { 
      $push: { items:  [req.body.add] } 
    }).then((todos) => {
      Todo.find({title: retrievedList}).then((todos) => {
        myTodo = {todos};
        res.render('index.hbs', {
          title: myTodo.todos[0].title,
          items: myTodo.todos[0].items
        });  
      });
    });

  // remove 
  } else if (req.body.remove){
    Todo.update({title: retrievedList}, { 
      $pull: { items:  [req.body.remove] } 
    }).then((todos) => {
      Todo.find({title: retrievedList}).then((todos) => {
        myTodo = {todos};
        res.render('index.hbs', {
          title: myTodo.todos[0].title,
          items: myTodo.todos[0].items
        });  
      });
    });
  }

});

module.exports = {app};