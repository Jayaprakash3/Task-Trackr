import React, { useEffect, useState, useRef, Fragment } from 'react';
import { Label, TextInput, Button } from "flowbite-react";
import editImage from '../assets/edit.png';
import tickImage from '../assets/tick.png';
import trashImage from '../assets/trash.png';
import classes from './UI/Card.module.css';

const TaskEnter = () => {
    const inputRef = useRef();
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
        const jsonData = {
            emailId: "selvaraj.sivasankari@gmail.com",
            name: "sankari"
        };

        const a = JSON.stringify(jsonData);

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
        }, 1000);
    }, []);

    const openPopup = (task, index) => {
        console.log(task + "1234567");
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
            };
            const a = JSON.stringify(Data);

            UpdateTaskToDb(a);
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
        };
        const a = JSON.stringify(Data);

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
        };
        const a = JSON.stringify(Data);

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
            "status": "InProgress",
            "date": new Date()
        };
        const a = JSON.stringify(Data);

        SaveToDb(a);
        inputRef.current.value = '';
        inputRef.current.focus();
    };

    return (
        <div className={classes.cardWrapper}>
            <form className="flex max-w-md flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                        <label htmlFor="task">Enter Your Task:</label>
                    </div>
                    <TextInput
                        type="text"
                        autoFocus
                        required
                        name="task"
                        id="task"
                        placeholder="Enter the task"
                        onChange={AddTask}
                        ref={inputRef}
                    />
                </div>
                <Button onClick={AddUserTask} className='bg-slate-500'>Add</Button>
            </form>

            <div>
                <ul>

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xstext-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        S.No
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Task
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {userTaskData.map((data, index) => (
                                    <li key={index}>
                                        <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {index}
                                            </th>
                                            <td className="px-6 py-4">{data.taskName}</td>
                                            <td className="px-6 py-4">{data.status}</td>
                                            <td className="px-6 py-4">
                                                <a onClick={() => openPopup(data.taskName, index)} type="button" data-modal-show="editUserModal" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                    <img className="" src={editImage} alt="editImage" />
                                                </a>
                                                <a onClick={handleUpdateTask} type="button" data-modal-show="editUserModal" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                    <img className="" src={tickImage} alt="tickImage" />
                                                </a>
                                                <a onClick={closePopup} type="button" data-modal-show="editUserModal" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                    <img className="" src={trashImage} alt="trashImage" />
                                                </a>
                                            </td>
                                        </tr>
                                    </li>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </ul>
            </div>
        </div>
    );
};

export default TaskEnter;

