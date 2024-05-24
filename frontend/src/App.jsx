import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Task from './components/Task';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [task, setTask] = useState("");
  const [editTask, setEditTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    getAllTodos();
  }, [updateUI])

  const getAllTodos = async () => {
    const res = await axios.get("http://localhost:5000/api/get").then((res) => {
      setTodos(res.data);
    }).catch((error) => {
      console.error("Error fetching todos:", error);
    })
  }
  
  const createTask = async () => {
    try {
      await axios.post("http://localhost:5000/api/create", { todo: task });
      setTask("");
      getAllTodos(); 
    } catch (error) {
      console.log("Error Occurred !");
    }
  }

  const editTaskHandler = async () => {
    try {
      await axios.put(`http://localhost:5000/api/update/${editTask._id}`, { todo: task });
      setTask("");
      setEditTask(null);
      setIsModalOpen(false);
      getAllTodos();
    } catch (error) {
      console.log("Error Occurred!");
    }
  }

  return (
    <div className='mt-10 py-10 border-x-2 border-y-2 border-green-500 text-green-500 flex flex-col justify-center items-center'>
      <div className="">
        <div className="heading text-4xl font-extrabold text-center underline">
          <p> TO-DO List </p>
        </div>
        <div className="add_section my-10 flex flex-row">
          <input name='todo' value={task} className=' border-2 mx-3 rounded px-4 py-2' onChange={(e) => setTask(e.target.value)} placeholder=' Add new task here !' />
          <button className=' border-2 px-4 py-2 rounded font-bold' onClick={editTask ? editTaskHandler : createTask}>
            {editTask ? 'Update' : 'Add'}
          </button>
        </div>
        <div className="task_heading text-3xl font-bold">
          <p> Tasks:</p>
        </div>
        <div className="list_of_task">
          {
            todos.map((data) => <Task key={data._id} title={data.todo} id={data._id} setUpdateUI={setUpdateUI} setEditTask={setEditTask} setTask={setTask} setIsModalOpen={setIsModalOpen} />)
          }
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-black p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
            <input 
              name='editTodo'
              value={task}
              className='border-2 mb-4 rounded px-4 py-2 w-full'
              onChange={(e) => setTask(e.target.value)}
              placeholder='Edit task here!'
            />
            <div className="flex justify-between">
              <button className='border-2 px-4 py-2 rounded font-bold mr-2' onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button className='border-2 px-4 py-2 rounded font-bold' onClick={editTaskHandler}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App;
