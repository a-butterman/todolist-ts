import React, {useState} from 'react';



type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTasks: (id: number) => void
//    clickFilter: (name: string) => void
}

type TaskType = {
    id: number
    title: string
    isDone: boolean
}







export function Todolist(props: PropsType) {


    const [filterForColander, setFilterForColander] = useState('all');


    const clickFilter = (name: string) => {
        setFilterForColander(name)
        console.log(name)
    }


    let colander = props.tasks
    if (filterForColander === 'active') {
        colander = props.tasks.filter((checkboxFilter) => checkboxFilter.isDone === false)
    }
    if (filterForColander === 'completed') {
        colander = props.tasks.filter((checkboxFilter) => checkboxFilter.isDone === true)
    }


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {colander.map((el, index) => {
                return (
                    <li key={el.id}>
                        <button onClick={() => props.removeTasks(el.id)}>x</button>
                        <input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span>
                    </li>
                )
            })}
        </ul>
        <div>
            <button onClick={() => clickFilter('all')}>All</button>
            <button onClick={() => clickFilter('active')}>Active</button>
            <button onClick={() => clickFilter('completed')}>Completed</button>
        </div>
    </div>
}
