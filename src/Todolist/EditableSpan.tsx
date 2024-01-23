import style from "../App.module.css";
import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState("")

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const deactivateEditMode = () => {
        props.onChange(title)
        setEditMode(false)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return (
        editMode
            ? <TextField defaultValue={title}
                         variant="standard"
                         size="small"

                         onChange={onChangeTitleHandler}
                         onBlur={deactivateEditMode} autoFocus/>
            : <span onDoubleClick={activateEditMode}
            >{props.title}</span>
    )
}