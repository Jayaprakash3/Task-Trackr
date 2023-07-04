import React from "react";
import classes from '../UI/Card.module.css';
import myImage from '../../assets/checklist-task.gif';

function Card(){
    return (
        <div className={classes.cardWrapper}>
            <a href="#" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={myImage} alt="cardImage" />
                <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">A tool that makes people management simple!</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Empower your workplace with the power of effective task management and generate maximum productivity. An easy-to-use free of cost solution that offers effective team management.
                            The tool helps in the division of tasks into the measurable matrix. Thus, allowing an accountable, efficient and productive work environment to thrive. </p>
                </div>
            </a>
        </div>
    )
}

export default Card;