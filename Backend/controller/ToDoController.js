const Model = require('../models/ToDoModel')

module.exports.getTodos = async(req, res) => {
    const data = await Model.find();
    res.send(data);
}

module.exports.createTodo = (req, res) => {
    const { todo } = req.body;
    Model.create({todo})
    .then((data) => {
        res.status(201).send("Task Added !" + data);
    }).catch((err) => {
        res.send({"error": err, "Message": "Error Adding Task !"})
    })
}

module.exports.deleteTodo = (req, res) => {
    const { id } = req.params;
    Model.findByIdAndDelete(id)
    .then(() => {
        res.send("Deletion Successful !")
    }).catch((err) => {
        res.send({"error": err, "Message": "Error in deleting !"})
    })
}

module.exports.updateTodo = (req, res) => {
    const { todo } = req.body;
    const { id } = req.params;
    Model.findByIdAndUpdate(id, { todo })
    .then(() => {
        res.send("Updation Successful !");
    }).catch((err) => {
        res.send({"error": err, "Message": "Error in Updating !"})
    })
}

