import React from "react";
import { Label,TextInput } from "flowbite-react";
import classes from '../UI/Card.module.css';
import { Button } from 'flowbite-react';

function TaskForm(){
   return (
      <div className={classes.cardWrapper}>
        <form className="flex max-w-md flex-col gap-4">
            <div>
                <div className="mb-2 block">
                <Label htmlFor="taskName" value="Enter Your Task : "/>
                </div>
                <TextInput id="taskName" required type="text" />
            </div>
            <Button type="submit">Add Task</Button>
        </form>
      </div>
   )
}
export default TaskForm;