import React from 'react';
import axios from 'axios';
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";

const Task = ({ title, id, setUpdateUI, setEditTask, setTask, setIsModalOpen }) => {
    const deleteTask = () => {
        axios.delete(`http://localhost:5000/api/delete/${id}`)
            .then(() => {
                setUpdateUI((prevState) => !prevState);
            }).catch((err) => console.log("Error : " + err));
    }

    const openEditModal = () => {
        setEditTask({ title, _id: id });
        setTask(title);
        setIsModalOpen(true);
    }

    return (
        <div className='flex flex-col my-5 justify-between'>
            <div className='flex items-baseline'>
                <p className='text-xl mr-16 ml-0'>{title}</p>
                <div className='flex text-xl ml-16 mr-0 gap-3'>
                    <MdDeleteOutline className=' cursor-pointer' onClick={deleteTask} />
                    <MdOutlineModeEdit className=' cursor-pointer' onClick={openEditModal} />
                </div>
            </div>
        </div>
    )
}

export default Task
