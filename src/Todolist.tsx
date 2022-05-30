import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import s from './Todolist.module.css'
import {Checkbox} from "./components/Checkbox";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    key: string,
    todoListID: string,
    tasks: TaskType[],
    filter: FilterValuesType,
    title: string,

    removeTask: (id: string, todoListID: string) => void,
    addTask: (title: string, todoListID: string) => void,
    changeTodoListFilter: (filter: FilterValuesType, todoListID: string) => void,
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void,
    removeTodoList: (todoListID: string) => void,
}

export function Todolist(props: TodoListPropsType) {

    let [error, setError] = useState<string | null>(null)
    let [title, setTitle] = useState("")

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim(), props.todoListID);
            setTitle("");
        } else {
            setError('Title is required')
        }

    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }
// callback button
    const onAllClickHandler = () => props.changeTodoListFilter("all", props.todoListID);
    const onActiveClickHandler = () => props.changeTodoListFilter("active", props.todoListID);
    const onCompletedClickHandler = () => props.changeTodoListFilter("completed", props.todoListID);

    const changeIsDoneHandler = (tId: string, isDone: boolean) => {
        props.changeTaskStatus(tId, isDone, props.todoListID)
    }

    return (
        <div>
        <h3>
            {props.title}
            <button onClick={() => props.removeTodoList(props.todoListID)}>x</button>
        </h3>
        <div>
            <input value={title} className={error ? s.error : '' }
                   onChange={ onChangeHandler }
                   onKeyPress={ onKeyPressHandler }
            />
            <button onClick={addTask}>+</button>
            { error && <div className={s.errorMessage}>{error}</div> }
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id, props.todoListID)

                    return <li key={t.id} className={ t.isDone ? s.isDone: '' }>
                        <Checkbox callBack={(bool) => changeIsDoneHandler(t.id, bool)} isDone={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={ onClickHandler }>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === "all" ? s.activeFilter: ''} onClick={ onAllClickHandler }>All</button>
            <button className={props.filter === "active" ? s.activeFilter: ''} onClick={ onActiveClickHandler }>Active</button>
            <button className={props.filter === "completed" ? s.activeFilter: ''} onClick={ onCompletedClickHandler }>Completed</button>
        </div>
    </div>
    )}
