import {configureStore} from "@reduxjs/toolkit";
import todoListSlice from "./todoListSlice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import tasksSlice from "./tasksSlice";

export const store = configureStore({
    reducer: {
        todoList: todoListSlice,
        tasks: tasksSlice
    }
})

export type AppStateType = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;

// @ts-ignore
window.__store__ = store