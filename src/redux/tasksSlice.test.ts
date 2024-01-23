import tasksSlice, {add_task, change_task_status, change_task_title, remove_task, TasksStateType} from "./tasksSlice";
import {add_todo_list, remove_todo_list} from "./todoListSlice";


test('correct task should be deleted from correct array', () => {

    const startState: TasksStateType = {
        "todoListId1": [
            {id: "1", title: "CSS & HTML", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false},
            {id: "4", title: "Redux", isDone: false}
        ],
        "todoListId2": [
            {id: "1", title: "Milk", isDone: true},
            {id: "2", title: "Bread", isDone: false},
            {id: "3", title: "Beer", isDone: false},
            {id: "4", title: "Salt", isDone: true}
        ]
    }

    let endState = tasksSlice(startState, remove_task({todoListId: "todoListId2", taskId: "2"}))

    expect(endState["todoListId1"].length).toBe(4)
    expect(endState["todoListId2"].length).toBe(3)
    expect(endState["todoListId2"].every(task => task.id != "2")).toBeTruthy()
})

test('correct task should be added to correct array', () => {

    const startState: TasksStateType = {
        "todoListId1": [
            {id: "1", title: "CSS & HTML", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false},
            {id: "4", title: "Redux", isDone: false}
        ],
        "todoListId2": [
            {id: "1", title: "Milk", isDone: true},
            {id: "2", title: "Bread", isDone: false},
            {id: "3", title: "Beer", isDone: false},
            {id: "4", title: "Salt", isDone: true}
        ]
    }

    let endState = tasksSlice(startState, add_task({todoListId: "todoListId2", taskTitle: "apple"}))

    expect(endState["todoListId1"].length).toBe(4)
    expect(endState["todoListId2"].length).toBe(5)
    expect(endState["todoListId2"][0].id).toBeDefined()
    expect(endState["todoListId2"][0].title).toBe("apple")
    expect(endState["todoListId2"][0].isDone).toBe(false)
})

test('status of specified task should be changed', () => {

    const startState: TasksStateType = {
        "todoListId1": [
            {id: "1", title: "CSS & HTML", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false},
            {id: "4", title: "Redux", isDone: false}
        ],
        "todoListId2": [
            {id: "1", title: "Milk", isDone: false},
            {id: "2", title: "Bread", isDone: true},
            {id: "3", title: "Beer", isDone: false},
            {id: "4", title: "Salt", isDone: false}
        ]
    }

    let endState = tasksSlice(startState, change_task_status({todoListId: "todoListId2", taskId: "2"}))

    expect(endState["todoListId2"][1].isDone).toBeFalsy()
    expect(endState["todoListId1"][1].isDone).toBeTruthy()
})

test('title of specified task should be changed', () => {

    const startState: TasksStateType = {
        "todoListId1": [
            {id: "1", title: "CSS & HTML", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false},
            {id: "4", title: "Redux", isDone: false}
        ],
        "todoListId2": [
            {id: "1", title: "Milk", isDone: false},
            {id: "2", title: "Bread", isDone: true},
            {id: "3", title: "Beer", isDone: false},
            {id: "4", title: "Salt", isDone: false}
        ]
    }

    let endState = tasksSlice(startState, change_task_title({todoListId: "todoListId2", taskId: "3", taskTitle: "Marshmallow"}))

    expect(endState["todoListId2"][2].title).toBe("Marshmallow")
    expect(endState["todoListId1"][2].title).toBe("React")
})

test('new property with new array should be added when new todoList is added', () => {

    const startState: TasksStateType = {
        "todoListId1": [
            {id: "1", title: "CSS & HTML", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false},
            {id: "4", title: "Redux", isDone: false}
        ],
        "todoListId2": [
            {id: "1", title: "Milk", isDone: false},
            {id: "2", title: "Bread", isDone: true},
            {id: "3", title: "Beer", isDone: false},
            {id: "4", title: "Salt", isDone: false}
        ]
    }

    let endState = tasksSlice(startState, add_todo_list("new todoList"))

    const keys = Object.keys(endState)
    const newKey = keys.find(keys => keys != "todoListId1" && keys != "todoListId2")
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todoListId should be deleted', () => {

    const startState: TasksStateType = {
        "todoListId1": [
            {id: "1", title: "CSS & HTML", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false},
            {id: "4", title: "Redux", isDone: false}
        ],
        "todoListId2": [
            {id: "1", title: "Milk", isDone: false},
            {id: "2", title: "Bread", isDone: true},
            {id: "3", title: "Beer", isDone: false},
            {id: "4", title: "Salt", isDone: false}
        ]
    }

    let endState = tasksSlice(startState, remove_todo_list("todoListId2"))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState["todoListId2"]).not.toBeDefined()
})