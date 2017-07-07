const fs = require("fs");
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const Todo = require("./models/todo");
mongoose.Promise = require("bluebird");
const dbUrl = "mongodb://localhost:27017/todos";
const bodyParser = require("body-parser");
const app = express();

app.use("/static", express.static("static"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(dbUrl).then((err, db) => {
  if (err) {
    console.log("ERROR", err);
  }
  console.log("Connected to the DB");
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/static/index.html");
});

app.get("/todos", (req, res) => {
  Todo.find()
    .then(allTodos => {
      res.send(allTodos);
    })
    .then(err => {
      res.send(err);
    });
});

app.get("/todos/:id", (req, res) => {
  Todo.find({ _id: req.params.id })
    .then(thisTodo => {
      res.send(thisTodo);
    })
    .then(err => {
      res.send(err);
    });
});

app.delete("/todos/:id", (req, res) => {
  Todo.deleteOne({ _id: req.params.id })
    .then(deletedTodo => {
      res.send(deletedTodo);
    })
    .then(err => {
      res.send(err);
    });
});

app.put("/todos/:id", (req, res) => {
  Todo.updateOne({ _id: req.params.id }, req.body)
    .then(updatedTodo => {
      res.send(updatedTodo);
    })
    .then(err => {
      res.send(err);
    });
});

app.patch("/todos/:id", (req, res) => {
  Todo.updateOne({ _id: req.params.id }, req.body)
    .then(updatedTodo => {
      res.send(updatedTodo);
    })
    .then(err => {
      res.send(err);
    });
});

app.post("/todo", (req, res) => {
  var todoContent = req.body;
  console.log(todoContent);
  var newTodo = new Todo(todoContent);
  newTodo
    .save()
    .then(savedTodo => {
      res.send(savedTodo);
    })
    .then(err => {
      res.send(err);
    });
});

// put routes here

app.listen(3000, function() {
  console.log("Express running on http://localhost:3000/.");
});
