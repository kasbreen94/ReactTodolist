import React from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "../redux/store";
import {add_task, change_task_status, change_task_title, remove_task} from "../redux/tasksSlice";
import {change_todo_list_filter, change_todo_list_title, FilterType, remove_todo_list} from "../redux/todoListSlice";

type PropsType = {
    todoListId: string
    title: string
    filter: FilterType
}

export function TodoList({todoListId, title, filter}: PropsType) {

    const tasks = useAppSelector(state => state.tasks[todoListId])
    const dispatch = useAppDispatch()

    let tasksForTodolist = tasks;

    if (filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
    } if (filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={title} onChange={(todoListTitle) =>
                    dispatch(change_todo_list_title({todoListId, todoListTitle}))}/>
                <IconButton onClick={() => dispatch(remove_todo_list(todoListId))}>
                    <Delete fontSize="inherit"/>
                </IconButton>
            </h3>
            <AddItemForm addItem={(taskTitle) => dispatch(add_task({todoListId, taskTitle}))}/>
            <div>
                {tasksForTodolist.map(task => {
                    return <div key={task.id}>
                        <Checkbox
                            size="small"
                            defaultChecked={task.isDone}
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
            <ButtonGroup size="small">
                <Button variant={filter === "all" ? "contained" : "outlined"}
                        onClick={() =>
                            dispatch(change_todo_list_filter({todoListId, filterValue: "all"}))}>
                    All
                </Button>
                <Button variant={filter === "active" ? "contained" : "outlined"}
                        onClick={() =>
                            dispatch(change_todo_list_filter({todoListId, filterValue: "active"}))}>
                    Active
                </Button>
                <Button variant={filter === "completed" ? "contained" : "outlined"}
                        onClick={() =>
                            dispatch(change_todo_list_filter({todoListId, filterValue: "completed"}))}>
                    Completed
                </Button>
            </ButtonGroup>
        </div>
    )
}
