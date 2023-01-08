//importing express
const express = require('express');
const cors = require('cors');

const app = express();
//convert data to JSON format
app.use(express.json());

//Cross-Origin Resource Sharing
app.use(cors());

//importing database
const mongoose = require('./database/mongoose')
//importing List model
const List = require('./database/model/list');
//importing Task model
const Task = require('./database/model/task');
const { request } = require('express');


/*
    Http Request to Perform on Schema

    List: Create, ReadOne, Update, Delete, ReadAll
    Task: Create, ReadOne, Update, Delete, ReadAll

*/



//List URL : http://localhost:3000/lists/:listId
//Get All List
app.get('/lists', (req, res) => {
    List.find({})
    .then(lists => res.send(lists))
    .catch((error) => console.log(error))
});

//Add new to List
app.post('/lists', (req, res) => {
    if(!req.body.title){
        (new List({'title' : "New List"})).save()
        .then(list => res.send(list))
        .catch((error) => console.log(error))
    }
        else{
    (new List({'title' : req.body.title}))
    .save()
    .then(list => res.send(list))
    .catch((error) => console.log(error))
        }
});

//Get List by Id
app.get('/lists/:listId', (req, res) => {
    List.find({_id:req.params.listId})
    .then(list => res.send(list))
    .catch((error) => console.log(error))
})

//Patch the List using patch(update only a specified key)
app.patch('/lists/:listId', (req, res) => {
    List.findOneAndUpdate({_id:req.params.listId}, {$set : req.body})
    .then(list => res.send(list))
    .catch((error) => console.log(error))
})

//Delete the List
app.delete('/lists/:listId', (req, res) => {
    List.findOneAndDelete({_id:req.params.listId})
    .then(list => res.send(list))
    .catch((error) => console.log(error))
})


//Task URL

//Get the Task from List(ListId)
app.get('/lists/:listId/tasks', (req, res) => {
    Task.find({_listId:req.params.listId})
    .then(task => res.send(task))
    .catch((error) => console.log(error))
})

//Add new Task to List(ListId)
app.post('/lists/:listId/tasks', (req, res) => {
    if(!req.body.title)
    (new Task({title:"New Task", _listId:req.params.listId}))
    .save()
    .then(task => res.send(task))
    .catch((error) => console.log(error))
    
    else
    (new Task({title:req.body.title, _listId:req.params.listId}))
    .save()
    .then(task => res.send(task))
    .catch((error) => console.log(error))
})

//Patch update completed boolean, change title
app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndUpdate({_id:req.params.taskId, _listId:req.params.listId}, {$set : req.body})
    .then(task => res.send(task))
    .catch((error) => console.log(error))
})

//Get a Task by TaskId
app.get('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.find({_id:req.params.taskId, _listId:req.params.listId} )
    .then(task => res.send(task))
    .catch((error) => console.log(error))
})

//Delete a Task
app.delete('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndDelete({_id:req.params.taskId, _listId:req.params.listId})
    .then(task => res.send(task))
    .catch((error) => console.log(error))
})

//Delete all Task from List(ListId)
app.delete('/lists/:listId/tasks', (req, res) => {
    Task.deleteMany({_listId:req.params.listId})
    .then(task => res.send(task))
    .catch((error) => console.log(error))
})

//starting server port at 3000
app.listen(3000, () => console.log("Maal aa gya, Maal aa gya => 3000"));