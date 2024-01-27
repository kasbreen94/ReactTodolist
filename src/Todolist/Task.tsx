import React, {useCallback} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "../redux/store";
import {add_task, change_task_status, change_task_title, remove_task} from "../redux/tasksSlice";
import {FilterType} from "../redux/todoListSlice";

type PropsType = {
    todoListId: string
    filter: FilterType
}

export const Tasks = React.memo(({todoListId, filter}: PropsType) => {

    console.log("Tasks");

    const tasks = useAppSelector(state => state.tasks[todoListId]);
    const dispatch = useAppDispatch();

    const addTask = useCallback((taskTitle: string) => {
        dispatch(add_task({taskTitle, todoListId}));
    }, [dispatch]);

    let tasksForTodolist = tasks;

    if (filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(task => task.isDone);
    } if (filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(task => !task.isDone);
    }

    return (
        <div>
            <AddItemForm addItem={addTask}/>
            <div>
                {tasksForTodolist.map(task => {
                    return <div key={task.id}>
                        <Checkbox
                            size="small"
                            checked={task.isDone}
                            onChange={() =>
                                dispatch(change_task_status({todoListId, taskId: task.id}))}/>
                        <EditableSpan
                            title={task.title}
                            onChange={(taskTitle) =>
                                dispatch(change_task_title({todoListId, taskId: task.id, taskTitle}))}/>
                        <IconButton
                            onClick={() =>
                                dispatch(remove_task({todoListId, taskId: task.id}))}
                            size="small">
                            <Delete fontSize="inherit"/>
                        </IconButton>
                    </div>
                })}
            </div>
        </div>
    )
});
