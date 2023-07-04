import React, { Fragment } from "react";
import editImage from '../../assets/edit.png';
import tickImage from '../../assets/tick.png';
import trashImage from '../../assets/trash.png';
//import ModalBox from "../UI/ModalBox";
//import Modal from "../UI/Modal";

function TaskList(){
    return (
        <Fragment>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                S.No
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
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
                        <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Apple MacBook Pro 17"
                            </th>
                            <td className="px-6 py-4">
                                Silver
                            </td>
                            <td className="px-6 py-4">
                                Laptop
                            </td>
                            <td className="px-6 py-4">
                                $2999
                            </td>
                            <td className="px-6 py-4">
                                <a href="#" type="button" data-modal-show="editUserModal" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                <img className="" src={editImage} alt="editImage" />
                                </a>
                                <a href="#" type="button" data-modal-show="editUserModal" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                <img className="" src={tickImage} alt="tickImage" />
                                </a>
                                <a href="#" type="button" data-modal-show="editUserModal" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                <img className="" src={trashImage} alt="trashImage" />
                                </a>
                                
                            </td>
                        </tr>
                        <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Microsoft Surface Pro
                            </th>
                            <td className="px-6 py-4">
                                White
                            </td>
                            <td className="px-6 py-4">
                                Laptop PC
                            </td>
                            <td className="px-6 py-4">
                                $1999
                            </td>
                            <td className="px-6 py-4">
                            <a href="#" type="button" data-modal-show="editUserModal" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                <img className="" src={editImage} alt="editImage" />
                                </a>
                                <a href="#" type="button" data-modal-show="editUserModal" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                <img className="" src={tickImage} alt="tickImage" />
                                </a>
                                <a href="#" type="button" data-modal-show="editUserModal" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                <img className="" src={trashImage} alt="trashImage" />
                                </a>
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Magic Mouse 2
                            </th>
                            <td className="px-6 py-4">
                                Black
                            </td>
                            <td className="px-6 py-4">
                                Accessories
                            </td>
                            <td className="px-6 py-4">
                                $99
                            </td>
                            <td className="px-6 py-4">
                                <a href="#" type="button" data-modal-show="editUserModal" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                <img className="" src={editImage} alt="editImage" />
                                </a>
                                <a href="#" type="button" data-modal-show="editUserModal" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                <img className="" src={tickImage} alt="tickImage" />
                                </a>
                                <a href="#" type="button" data-modal-show="editUserModal" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                <img className="" src={trashImage} alt="trashImage" />
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Fragment>
    )
}

export default TaskList;