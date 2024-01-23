import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v1} from "uuid";
// import {todoListId1, todoListId2} from "./todoListSlice";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

const tasksSlice = createSlice({
    name: 'todolist',
    initialState: {
        // [todoListId1]: [
        //     {id: "1", title: "CSS & HTML", isDone: false},
        //     {id: "2", title: "JS", isDone: true},
        //     {id: "3", title: "React", isDone: false},
        //     {id: "4", title: "Redux", isDone: false}
        // ],
        // [todoListId2]: [
        //     {id: "1", title: "Milk", isDone: false},
        //     {id: "2", title: "Bread", isDone: true},
        //     {id: "3", title: "Beer", isDone: false},
        //     {id: "4", title: "Salt", isDone: false}
        // ]
    } as TasksStateType,
    reducers:{
        remove_task(state, action: PayloadAction<{ todoListId: string, taskId: string }>) {
            const {todoListId, taskId} = action.payload
            state[todoListId] = state[todoListId].filter(task => task.id !== taskId)
        },
        add_task(state, action: PayloadAction<{ todoListId: string, taskTitle: string }>) {
            const {todoListId, taskTitle} = action.payload
            state[todoListId] = [{id: v1(), title: taskTitle, isDone: false}, ...state[todoListId]]
        },
        change_task_status(state, action: PayloadAction<{ todoListId: string, taskId: string }>) {
            const {todoListId, taskId} = action.payload
            const tasks = state[todoListId].find(task => task.id === taskId)
                if (tasks) tasks.isDone = !tasks.isDone

        },
        change_task_title(state, action: PayloadAction<{todoListId: string, taskId: string, taskTitle: string}>) {
            const {todoListId, taskId, taskTitle} = action.payload
            const tasks = state[todoListId].find(task => task.id === taskId)
                if (tasks) tasks.title = taskTitle
        },
        add_todo_list(state, action) {
            state[action.payload.todoListId] = []
        },
        remove_todo_list(state, action) {
            delete state[action.payload]
        }
    }
})

export const {remove_task, add_task, change_task_status, change_task_title} = tasksSlice.actions
export default tasksSlice.reducer