import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";

type PropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: PropsType) {
    const [newTitle, setNewTitle] = useState("")
    const [errorInput, setErrorInput] = useState<null | string>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const addItem = () => {
        if (newTitle.trim() === "") {
            setErrorInput("Enter name task")
        } else {
            props.addItem(newTitle.trim());
            setNewTitle("")
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setErrorInput(null)
        if (e.key === "Enter") {
            addItem()
        }
    }

    return (
        <div>
            <TextField size="small"
                       color="success"
                       variant="outlined"
                       label={errorInput ? "Invalid value" : "Enter the title"}
                       error={!!errorInput}

                       value={newTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyDown={onKeyPressHandler}/>
            <IconButton color="primary"

                        onClick={addItem}>
                <AddBox/>
            </IconButton>
        </div>
    )
}