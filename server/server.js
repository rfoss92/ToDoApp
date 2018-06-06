// set up
require('./config/config');
const path = require('path');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT;
const hbs = require('hbs');

// mongo
const {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

// config
var app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../views')));
app.set('view engine', 'hbs');
var retrievedList;
var myTodo;

// routes
app.get('/', (req, res) => {
  res.render('index.hbs');
});


// post
app.post('/', (req, res) => {

  // create new
  if (req.body.retrieve === undefined && req.body.add === undefined && req.body.remove === undefined ){
    var todo = new Todo({
      title: req.body.new
    });
    todo.save().then((doc) => {


      res.render('index.hbs', {
        title: req.body.new
      });  
      retrievedList = req.body.new;


    }, (e) => {
      res.status(400).send(e);
    });

  // retrieve list    
  } else if (req.body.new === undefined && req.body.add === undefined && req.body.remove === undefined ) {
    Todo.find({title: req.body.retrieve}).then((todos) => {
      myTodo = {todos};
      retrievedList = myTodo.todos[0].title;
      res.render('index.hbs', {
        title: myTodo.todos[0].title,
        items: myTodo.todos[0].items
      });  
    }, (e) => {
      res.status(400).send(e);
    });

  // add item
  } else if (req.body.new === undefined && req.body.retrieve === undefined && req.body.remove === undefined ){
    Todo.update({title: retrievedList}, { $push: { items:  [req.body.add] } }).then((todos) => {
      Todo.find({title: retrievedList}).then((todos) => {
        myTodo = {todos};
        res.render('index.hbs', {
          title: myTodo.todos[0].title,
          items: myTodo.todos[0].items
        });  
      }, (e) => {
        res.status(400).send(e);
      });
    });

  // remove item
  } else if (req.body.new === undefined && req.body.retrieve === undefined && req.body.add === undefined ){
    Todo.update({title: retrievedList}, { $pull: { items:  [req.body.remove] } }).then((todos) => {
      Todo.find({title: retrievedList}).then((todos) => {
        myTodo = {todos};
        res.render('index.hbs', {
          title: myTodo.todos[0].title,
          items: myTodo.todos[0].items
        });  
      }, (e) => {
        res.status(400).send(e);
      });
    });
  }

});


// // find
// app.get('/', (req, res) => {

//   Todo.find({title: "Ryan"}).then((todos) => {
//     console.log({todos});
//   }, (e) => {
//     res.status(400).send(e);
//   });

// });


// find by Id
app.get('/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});

  }).catch((e) => {
    res.status(400).send();
  });
});


// delete
app.delete('/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});


// patch
app.patch('/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});


// listener
app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
