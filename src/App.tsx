import React from 'react';
import './App.module.css';
import {TodoList} from "./Todolist/Todolist";
import {AddItemForm} from "./Todolist/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "./redux/store";
import {add_todo_list} from "./redux/todoListSlice";

function App() {

    const todoLists = useAppSelector(state => state.todoList)
    const dispatch = useAppDispatch()

    return (
        <div className="App">
            <AppBar position="static" style={{ background: '#2E3B55' }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}>
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        To Do List
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <div>
                        <span>Add new todolist</span>
                        <AddItemForm addItem={(todoListTitle) => dispatch(add_todo_list(todoListTitle))}/>
                    </div>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map(todoList =>
                        <Grid item>
                            <Paper style={{padding: "10px"}} elevation={5} >
                            <TodoList key={todoList.id}
                                      todoListId={todoList.id}
                                      title={todoList.title}
                                      filter={todoList.filter}/>
                            </Paper>
                        </Grid>
                    )}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
