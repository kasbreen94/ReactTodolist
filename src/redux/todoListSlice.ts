import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v1} from "uuid";

export type FilterType = "all" | "completed" | "active"

export type TodoListType = {
    id: string
    title: string
    filter: FilterType
}

// export let todoListId1 = v1()
// export let todoListId2 = v1()

const todoListSlice = createSlice({
    name: 'todolist',
    initialState: [
        // {id: todoListId1, title: "What to learn", filter: "all"},
        // {id: todoListId2, title: "What to bay", filter: "all"}
    ] as TodoListType[],
    reducers:{
        add_todo_list: {
            reducer: (state, action: PayloadAction<{todoListTitle: string, todoListId: string }>) => {
                const {todoListTitle, todoListId} = action.payload
                state.push({id: todoListId, title: todoListTitle, filter: "all"})
            },
            prepare: (todoListTitle: string) => ({payload: {todoListTitle, todoListId: v1()}})
        },
        remove_todo_list(state, action: PayloadAction<string>) {
           return state.filter(todoList => todoList.id !== action.payload)
        },
        change_todo_list_title(state, action: PayloadAction<{todoListId: string, todoListTitle: string}>) {
            const {todoListId, todoListTitle} = action.payload
            const todoList = state.find(todoList => todoList.id === todoListId)
                if (todoList) todoList.title = todoListTitle
        },
        change_todo_list_filter(state, action: PayloadAction<{todoListId: string, filterValue: FilterType}>) {
            const {todoListId, filterValue} = action.payload
            const todoList = state.find(todoList => todoList.id === todoListId)
                if (todoList) todoList.filter = filterValue
        }
    }
})

export const {add_todo_list, remove_todo_list, change_todo_list_title, change_todo_list_filter} = todoListSlice.actions
export default todoListSlice.reducer