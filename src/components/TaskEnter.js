import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import './Task.css';
import MyNavigation from './UI/Navigation';
import ReactPaginate from 'react-paginate';

const TaskEnter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef();
  const [userId, setUserId] = useState('');
  const [date, setDate] = useState(new Date());
  const [emailId, setEmailId] = useState('');
  const [taskName, setTask] = useState('');
  const [status, setStatus] = useState("InProgress");
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [editedTask, setEditedTask] = useState('');
  const [editedTaskIndex, setEditedTaskIndex] = useState(null);
  const [userTaskData, setUserTaskData] = useState([]);
  const [loading, setLoading] = useState(true);
  const userInfo = location.state ? location.state.userInfo : null;
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  if (localStorage.getItem("authenticated") === "false") {
    localStorage.setItem("email", '');
    localStorage.setItem("name", '');
    navigate("/");
  }

  const DataFetching = async () => {
    const jsonData = {
      emailId: userInfo ? userInfo.email : localStorage.getItem("email"),
      name: userInfo ? userInfo.name : localStorage.getItem("name")
    }
    // const jsonData = {
    //     emailId: "selvaraj.sivasankari@gmail.com",
    //     name: "sankari"
    // }

    const dbData = JSON.stringify(jsonData);
    // console.log(jsonData);

    try {
      const response = await fetch(`http://localhost:3000/tasks/createNewUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: dbData,
      });

      const data = await response.json();

      if (data.tasks !== 'No-Task') {
        setUserTaskData(data);
        if (data.length > 0) {
          setUserId(data[0].userId);
        }
        console.log("Data saved successfully", data);
      } else {
        setUserId(data.userId);
      }
    } catch (error) {
      console.error("Error saving data:", error);
    } finally {
      setLoading(false);
    }
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
    const taskIndex = itemOffset + index;
    setEditedTask(task);
    setEditedTaskIndex(taskIndex);
    setPopupOpen(true);
  };

  const closePopup = () => {
    setEditedTask('');
    setEditedTaskIndex(null);
    setPopupOpen(false);
  };
//   const handleUpdateTask = () => {
//     if (editedTaskIndex !== null) {
//       const updatedData = [...userTaskData];
//       updatedData[editedTaskIndex].taskName = editedTask;
//       setUserTaskData(updatedData);
//       closePopup();
//       const Data = {
//         "taskName": editedTask,
//         "index": editedTaskIndex,
//         "userId": userId
//       };
//       const dbData = JSON.stringify(Data);
//       UpdateTaskToDb(dbData);
//     }
//     inputRef.current.focus();
//   };
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
    inputRef.current.focus();
  };

  const AddTask = (e) => {
    setTask(e.target.value);
  };

  const UpdateTask = (e) => {
    setEditedTask(e.target.value)
  }

  const DeleteTask = (index) => {
    console.log(index);
    const taskIndex = itemOffset + index;
    console.log(taskIndex);
    const newDatas = userTaskData.filter((e, i) => i !== taskIndex);
    setUserTaskData(newDatas);
    const Data = {
      "index": taskIndex,
      "userId": userId
    }
    const dbData = JSON.stringify(Data)
    inputRef.current.focus();
    DeleteToDb(dbData);
  };

  const UpdateStatus = (index) => {
    const taskIndex = itemOffset + index;
    const updatedData = [...userTaskData];
    if (updatedData[taskIndex].status === 'InProgress') {
      updatedData[taskIndex].status = 'Completed';
    } else {
      updatedData[taskIndex].status = 'InProgress';
    }
    setUserTaskData(updatedData);
    const Data = {
      "status": updatedData[taskIndex].status,
      "index": taskIndex,
      "userId": userId
    }
    const dbData = JSON.stringify(Data)
    UpdateStatusToDb(dbData);
    inputRef.current.focus();
  };

  const AddUserTask = () => {
    if (taskName) {
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
      SaveToDb(dbData);
      setEmailId('');
      setTask("")
      inputRef.current.value = '';
      inputRef.current.focus();
    }
    else {
      setTask("")
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };

  const SetSearchValue = (e) => {
    setQuery(e.target.value);
  };

  const filteredData = query ? userTaskData.filter((e) => e.taskName.toLowerCase().includes(query.toLowerCase())) : userTaskData;
  const itemsPerPage = 5;
  const itemOffset = currentPage * itemsPerPage;
  const currentItems = filteredData.length > 0 ? filteredData.slice(itemOffset, itemOffset + itemsPerPage) : filteredData;
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    setCurrentPage(selectedPage);
  };

  return (
    <>
      <MyNavigation />

      <div style={{ margin: '100px' }}>
        <div style={{ margin: '30px' }}>
          <label htmlFor="task">Task:</label>
          <br></br>
          <input
            type="text"
            autoFocus
            required
            name="taskName"
            id="taskName"
            placeholder="Enter the task"
            onChange={AddTask}
            ref={inputRef}
            style={{ border: '1px solid black', borderRadius: '10px' }}
          />

          <button className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={AddUserTask}>Add</button>

          <form className="max-w-sm px-4">
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" placeholder="Search" className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600" value={query} onChange={SetSearchValue} />
            </div>
          </form>
          <br></br>
        </div>

        <table className="TaskTable">
          <thead>
            <tr>
              <th style={{ textAlign: 'center' }}>Task</th>
              <th style={{ textAlign: 'center' }}>Status</th>
              <th style={{ textAlign: 'center' }}>Edit</th>
              <th style={{ textAlign: 'center' }}>Complete</th>
              <th style={{ textAlign: 'center' }}>Delete</th>
            </tr>
          </thead>

          <tbody>
            {(() => {
              if (loading) {
                return (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center' }}>Loading</td>
                  </tr>
                );
              } else {
                return (
                  <>
                    {currentItems.length > 0 ? (
                      currentItems.map((data, index) => {
                        const taskIndex = itemOffset + index;
                        return (
                          <tr key={taskIndex}>
                            <td style={{ textAlign: 'center' }}>{data.taskName}</td>
                            <td style={{ textAlign: 'center' }}>{data.status}</td>
                            <td style={{ textAlign: 'center' }}>
                              <button
                                type="button"
                                className="text-white bg-white-700 hover:bg-white-800 focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-white-600 dark:hover:bg-white-700 dark:focus:ring-white-800"
                                onClick={() => openPopup(data.taskName, index)}
                              >
                                <svg
                                  className="w-6 h-6 text-gray-800 dark:text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 20 18"
                                >
                                  <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                                  <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
                                </svg>
                              </button>
                              {isPopupOpen && editedTaskIndex === taskIndex && (
                                <div className="popup">
                                  <div className="popup-content">
                                    <h2 style={{ textAlign: 'left' }}>Edit Task</h2>
                                    <input
                                      type="text"
                                      value={editedTask}
                                      onChange={UpdateTask}
                                      style={{ border: '1px solid black', borderRadius: '20px' }}
                                      autoFocus
                                    />
                                    <button className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900" onClick={handleUpdateTask}>Update</button>
                                    <button className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900" onClick={closePopup}>Cancel</button>
                                  </div>
                                </div>
                              )}
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <button
                                type="button"
                                className="text-white bg-white-700 hover:bg-white-800 focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-white-600 dark:hover:bg-white-700 dark:focus:ring-white-800"
                                onClick={() => UpdateStatus(index)}
                              >
                                <svg
                                  className="w-6 h-6 text-gray-800 dark:text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 16 12"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 5.917 5.724 10.5 15 1.5"
                                  />
                                </svg>
                              </button>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <button
                                type="button"
                                className="text-white bg-white-700 hover:bg-white-800 focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-white-600 dark:hover:bg-white-700 dark:focus:ring-white-800"
                                onClick={() => DeleteTask(index)}
                              >
                                <svg
                                  className="w-6 h-6 text-gray-800 dark:text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 18 20"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
                                  />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="5" style={{ textAlign: 'center' }}>No task found</td>
                      </tr>
                    )}
                  </>
                );
              }
            })()}
          </tbody>
        </table>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">>"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageClassName="page-item"
          pageCount={pageCount}
          previousLabel="<<"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
};

export default TaskEnter;