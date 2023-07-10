import React, { useEffect, useState, useRef, Fragment } from 'react';
import { Label, TextInput, Button } from "flowbite-react";
import editImage from '../assets/edit.png';
import tickImage from '../assets/tick.png';
import trashImage from '../assets/trash.png';
import classes from './UI/Card.module.css';
import { AiFillFilter } from "react-icons/ai";
import './Task.css';
const TaskEnter = () => {
    const inputRef = useRef();
    const [userId, setuserId] = useState('');
    const [date, setDate] = useState(new Date());
    const [emailId, setEmailId] = useState('');
    const [taskName, setTask] = useState('');
    const [status, setStatus] = useState("InProgress");
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [editedTask, setEditedTask] = useState('');
    const [editedTaskIndex, setEditedTaskIndex] = useState(null);
    const [userTaskData, setUserTaskData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const DataFetching = async () => {

        const jsonData = {
            emailId: "selvaraj.sivasankari@gmail.com",
            name: "sankari"
        }

        const dbData = JSON.stringify(jsonData)
        console.log(jsonData);

        await fetch(`http://localhost:3000/tasks/createNewUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: dbData,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.tasks !== 'No-Task') {
                    setUserTaskData(data);
                    if (data.length > 0) {
                        setuserId(data[0].userId);
                    }
                    console.log("Data saved successfully111111111:", data);
                    console.log("Dsimnplly:", userTaskData);
                }
                else {
                    setuserId(data.userId);
                    console.log("hiiii")
                }

            })
            .catch((error) => {
                console.error("Error saving data:", error);
            })
            
    };

    const SaveToDb = async (jsonData) => {
        await fetch(`http://localhost:3000/tasks/new`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: jsonData,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Data saved successfully:", data);
            })
            .catch((error) => {
                console.error("Error saving data:", error);
            });
    };

    const UpdateTaskToDb = async (jsonData) => {
        await fetch(`http://localhost:3000/tasks/updateTaskName`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: jsonData,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Data updated successfully:", data);
            })
            .catch((error) => {
                console.error("Error updating data:", error);
            });
    };

    const UpdateStatusToDb = async (jsonData) => {
        await fetch(`http://localhost:3000/tasks/updateStatus`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: jsonData,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Data updated successfully:", data);
            })
            .catch((error) => {
                console.error("Error updating data:", error);
            });
    };

    const DeleteToDb = async (jsonData) => {
        await fetch(`http://localhost:3000/tasks/deleteTask`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: jsonData,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Data deleted successfully:", data);
            })
            .catch((error) => {
                console.error("Error deleting data:", error);
            });
    };

    useEffect(() => {
        setTimeout(() => {
            DataFetching();
            setLoading(false)
        }, 500);
    }, []);

    const openPopup = (task, index) => {

        console.log(task + "1234567")
        setEditedTask(task);
        setEditedTaskIndex(index);
        setPopupOpen(true);
    };

    const closePopup = () => {
        setEditedTask('');
        setEditedTaskIndex(null);
        setPopupOpen(false);
    };

    const handleUpdateTask = () => {
        if (editedTaskIndex !== null) {
            const updatedData = [...userTaskData];
            updatedData[editedTaskIndex].taskName = editedTask;
            setUserTaskData(updatedData);
            closePopup();
            const Data = {
                "taskName": editedTask,
                "index": editedTaskIndex,
                "userId": userId
            }
            const dbData = JSON.stringify(Data)
            UpdateTaskToDb(dbData);

        }
    };



    const AddTask = (e) => {
        setTask(e.target.value);
    };

    const UpdateTask = (e) => {
        setEditedTask(e.target.value);
    };

    const DeleteTask = (index) => {
        const newDatas = userTaskData.filter((e, i) => i !== index);
        setUserTaskData(newDatas);
        const Data = {
            "index": index,
            "userId": userId
        }
        const dbData = JSON.stringify(Data)


        DeleteToDb(dbData);

    };

    const UpdateStatus = (index) => {
        const updatedData = [...userTaskData];
        if (updatedData[index].status === 'InProgress') {
            updatedData[index].status = 'Completed';
        } else {
            updatedData[index].status = 'InProgress';
        }
        setUserTaskData(updatedData);
        const Data = {
            "status": updatedData[index].status,
            "index": index,
            "userId": userId
        }
        const dbData = JSON.stringify(Data)

        UpdateStatusToDb(dbData);
    };

    const AddUserTask = () => {
        setDate(new Date());
        console.log(date.toString())
        const newData = { taskName, status, date, userId };
        console.log(newData)
        setUserTaskData([...userTaskData, newData]);


        const Data = {
            "taskName": taskName,
            "userId": userId,
            "status": status,
            "date": new Date()
        }
        const dbData = JSON.stringify(Data)
        console.log("saving")
        // console.log(dbData)

        SaveToDb(dbData);
        setEmailId('');
        inputRef.current.value = '';
        inputRef.current.focus();
    };

    if (isLoading) {
        return <div>Loading...</div>;
      }


    return (
        <>
            <div className='mt-10'>                
                <label htmlFor="task">Task : </label>
                <input
                    type="text"
                    autoFocus
                    required
                    name="taskName"
                    id="taskName"
                    placeholder="Enter the task"
                    onChange={AddTask}
                    ref={inputRef}
                    className='rounded-xl w-semifull'
                />
                <button onClick={AddUserTask} className="bg-orange-500 text-white flow  hover:bg-orange-700 rounded-lg">Add</button>
                <br></br>
            </div>

            <div>
                <table  className="TaskTable">
                    <thead>
                        <tr>
                            <th className='w-90' >Task</th>
                            <th  className='w-2'>Status</th>
                            <th  className='w-2'>Edit</th>
                            <th  className='w-3'>Complete</th>
                            <th  className='w-3'>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userTaskData.length > 0 ? (
                            userTaskData.map((data, index) => (
                                <tr key={index}>
                                    <td>{data.taskName}</td>
                                    <td>{data.status}</td>
                                    <td className='async'>
                                        <button className="bg-indigo-500 text-white flow  hover:bg-red-700 rounded-lg" onClick={() => openPopup(data.taskName, index)}>Edit</button>
                                        {isPopupOpen && editedTaskIndex === index && (
                                            <div className="popup">
                                                <div className="popup-content">
                                                    <h3>Edit Task</h3>
                                                    <input
                                                        type="text" 
                                                        value={editedTask}
                                                        onChange={UpdateTask}
                                                    />
                                                    <button onClick={handleUpdateTask}>Update</button>
                                                    <button onClick={closePopup}>Cancel</button>
                                                </div>
                                            </div>
                                        )}
                                    </td>
                                    <td>
                                        <button className="bg-indigo-500 text-white hover:bg-red-700 rounded-lg" onClick={() => UpdateStatus(index)}>Complete</button>
                                    </td>
                                    <td>
                                        <button className="bg-indigo-500 text-white  hover:bg-red-700 rounded-lg" onClick={() => DeleteTask(index)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No task found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default TaskEnter;






