import {v1} from "uuid";
import todoListSlice, {
    add_todo_list,
    remove_todo_list,
    change_todo_list_title,
    change_todo_list_filter,
    TodoListType, FilterType
} from "./todoListSlice";


test('correct todolist should be removed', () => {
    let todoListId1 = v1()
    let todoListId2 = v1()

    let startState: TodoListType[] = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to bay", filter: "all"}
    ]

    let endState = todoListSlice(startState, remove_todo_list(todoListId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListId2)
})

test('correct todolist should be add', () => {
    let todoListId1 = v1()
    let todoListId2 = v1()

    let newTitle: string = "New title"

    let startState: TodoListType[] = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to bay", filter: "all"}
    ]

    let endState = todoListSlice(startState, add_todo_list(newTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTitle)
    expect(endState[2].filter).toBe("all")
})

test('correct todolist should change its name', () => {
    let todoListId1 = v1()
    let todoListId2 = v1()

    let newTitle: string = "New title"

    let startState: TodoListType[] = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to bay", filter: "all"}
    ]

    let endState = todoListSlice(startState, change_todo_list_title({
        todoListId: todoListId2, todoListTitle: newTitle
    }))

    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(newTitle)
})

test('correct filter of todolist should be changed', () => {
    let todoListId1 = v1()
    let todoListId2 = v1()

    let newFilter: FilterType = "completed"

    let startState: TodoListType[] = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to bay", filter: "all"}
    ]

    let endState = todoListSlice(startState, change_todo_list_filter({todoListId: todoListId2, filterValue: newFilter }))

    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe(newFilter)
})