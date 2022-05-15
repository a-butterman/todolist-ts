import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';



type PropsType = {
    title: string
    tasks: TaskType []
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTasks: (title: string) => void
}

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState('')

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onClickNewTaskHandler()
        }
    }

    const onClickNewTaskHandler = () => {
        props.addTasks(title)
        setTitle('')
    }

    const removeTaskHandler = (TaskId: string) => {
        props.removeTask(TaskId)
    }

    const changeFilterHandler = (filterValue: FilterValuesType) => {
        props.changeFilter(filterValue)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input onKeyDown={onKeyPressHandler} onChange={onChangeInputHandler} value={title}/>
            <button onClick={onClickNewTaskHandler}>+</button>
        </div>

        <ul>
            {
                props.tasks.map(t => (
                    <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={ () => { removeTaskHandler(t.id)
                            console.log(`deleted task = ${t.title}`)} }>x</button>
                    </li>
                ))}
        </ul>
        <div>
            <button onClick={ () => { changeFilterHandler("all") } }>All</button>
            <button onClick={ () => { changeFilterHandler("active") } }>Active</button>
            <button onClick={ () => { changeFilterHandler("completed") } }>Completed</button>
        </div>
    </div>
}
