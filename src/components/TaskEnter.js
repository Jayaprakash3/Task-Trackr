import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import datas from './Datas.json';
import './Task.css';

const TaskEnter = () => {
    const inputRef = useRef();
    // const [name, setName] = useState('');
    const [userId, setuserId] = useState('');
    const [name, setName] = useState('');

    const [emailId, setEmailId] = useState('');
    const [task, setTask] = useState('');
    const [status, setStatus] = useState('');
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [editedTask, setEditedTask] = useState('');
    const [editedTaskIndex, setEditedTaskIndex] = useState(null);
    const [userTaskData, setUserTaskData] = useState([]);

    const DataFetching = async () => {
        
        const jsonData={
            emailId:"selvaraj.sivasankari@gmail.com",
            name:"sankari"
        } 

        const a=JSON.stringify(jsonData)
        console.log(jsonData); 

    await fetch(`http://localhost:3000/tasks/createNewUser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: a,
    })
        .then((response) => response.json())
        .then((data) => {
            setUserTaskData(data);
            setuserId(data[0].userId);
            console.log(data[0].userId);
            console.log("Data saved successfully:", data);
        })
        .catch((error) => {
            console.error("Error saving data:", error);
        });
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
        //await fetch(`http://localhost:3000/users/put-endpoint`, { 
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
        // await fetch(`http://localhost:3000/users/delete-endpoint`, {
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
        }, 1000);
    }, []);


    const openPopup = (task, index) => {

        console.log(task+"1234567")
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
                "task": editedTask,
                "index": editedTaskIndex,
                "userId": userId
            }
            const a=JSON.stringify(Data)

            UpdateTaskToDb(a);

        }
    };

    // useEffect(() => {
    //     setUserTaskData(datas);
    //     setuserId(123)
    // }, []);

    const AddTask = (e) => {
        setTask(e.target.value);
    };

    const UpdateTask = (e) => {
        setEditedTask(e.target.value)
    }

    const DeleteTask = (index) => {
        const newDatas = userTaskData.filter((e, i) => i !== index);
        setUserTaskData(newDatas);
        const Data = {
            "index": index,
            "userId": userId
        }
        const a=JSON.stringify(Data)

        
        DeleteToDb(a);

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
        const a=JSON.stringify(Data)

        UpdateStatusToDb(a);
    };

    const AddUserTask = () => {
        const newData = { emailId, task, status };
        setUserTaskData([...userTaskData, newData]);
        setEmailId('');
        setStatus('');
        setTask('');

        const Data = {
            "taskName": task,
            "userId": userId,
            "status":"InProgress",
            "date":new Date()
        }
        const a=JSON.stringify(Data)

        SaveToDb(a);
        inputRef.current.value = '';
        inputRef.current.focus();
    };

    return (
        <>
            <div>
                <label htmlFor="task">Task : </label>
                <br></br>
                <input
                    type="text"
                    autoFocus
                    required
                    name="task"
                    id="task"
                    placeholder="Enter the task"
                    onChange={AddTask}
                    ref={inputRef}
                />
                <br></br>
                <button onClick={AddUserTask}>Add</button>
                <br></br>
            </div>
            <div>
                <ul>
                    {userTaskData.map((data, index) => {
                        return (
                            <li key={index}>
                                Task: {data.taskName}----- Status: {data.status}
                                <button onClick={() => openPopup(data.taskName, index)}>Edit</button>
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
                                <button onClick={() => UpdateStatus(index)}>Completed</button>
                                <button onClick={() => DeleteTask(index)}>Delete</button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
};

export default TaskEnter;