const { Router } = require("express");
const { getTodos, createTodo, deleteTodo, updateTodo} = require('../controller/ToDoController')

const router = Router();

router.get("/get", getTodos);
router.post("/create", createTodo);
router.delete('/delete/:id', deleteTodo);
router.put("/update/:id", updateTodo);

module.exports = router;