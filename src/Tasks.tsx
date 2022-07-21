import React, {ChangeEvent} from 'react';
import {TaskType} from "./Todolist";
import {Zalupa} from "./ZALUPA";

type TasksPropsType = {
    tasksForTodolist: TaskType[]
    todolistID: string
    removeTask: (todolistID: string, taskId: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void

}



export const Tasks = (props: TasksPropsType) => {

    const onClickHandler = (taskId: string) => {
        props.removeTask(props.todolistID, taskId)
    }
    const onChangeHandler = (taskId: string, isDone: boolean) => {
        props.changeTaskStatus(props.todolistID, taskId, isDone)
    }


    return (
        <div>
            <Zalupa title={'asd'} isDone={false} asd={[]}/>
            {
                props.tasksForTodolist.map(t => {
                    // const onClickHandler = () => props.removeTask(props.todolistID, t.id)
                    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    //     props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked);
                    // }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={(e)=>onChangeHandler(t.id, e.currentTarget.checked)}
                               checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={()=>onClickHandler(t.id)}>x</button>
                    </li>
                })
            }
        </div>
    );
};