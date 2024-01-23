import todoListSlice, {add_todo_list, TodoListType} from "./todoListSlice";
import tasksSlice, {TasksStateType} from "./tasksSlice";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodoListState: TodoListType[] = [];

    const action = add_todo_list("new todoList");

    const endTasksState = tasksSlice(startTasksState, action);
    const endaTodoListsState = todoListSlice(startTodoListState, action);

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endaTodoListsState[0].id;

    expect(idFromTasks).toBe(action.payload.todoListId)
    expect(idFromTodoLists).toBe(action.payload.todoListId)
})