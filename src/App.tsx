import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import { v1 } from 'uuid';
import {TaskType} from "./Todolist";

export type FilterValuesType = "all" | "active" | "completed";
type TodoListPropsType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType = {
    [todoListID: string]: TaskType[]
}

function App() {

    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoList, setTodoList] = useState<TodoListPropsType[]>([
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to byu', filter: 'all'},
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListID_1] : [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false },
        ],
        [todoListID_2] : [
            { id: v1(), title: "Meat", isDone: true },
            { id: v1(), title: "Fish", isDone: true },
            { id: v1(), title: "Beer", isDone: false },
        ],
    })

    function removeTask(id: string, todoListID: string) {
        // const currentTodoListTasks = tasks[todoListID]
        // const updatedTasks = currentTodoListTasks.filter(t => t.id !== id)
        // tasks[todoListID] = updatedTasks
        // setTasks({...tasks})
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(t => t.id !== id)})
    }
    function addTask(title: string, todoListID: string) {
        const newTask: TaskType = {
            id: v1(), title: title, isDone: false
        }
        // const currentTodoListTasks = tasks[todoListID]
        // const updateTasks = [newTask, ...currentTodoListTasks]
        // setTasks({...tasks, [todoListID]: updateTasks})
        setTasks({...tasks, [todoListID]:[newTask, ...tasks[todoListID]]})
    }
    const changeTodoListFilter = (filter: FilterValuesType, todoListID: string) => {
        setTodoList(todoList.map(tl => tl.id === todoListID ? {...tl, filter: filter} : tl))
    }


    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        // const currentTodoListTasks: TaskType[] = tasks[todoListID]
        // const updateTasks: TaskType[] = currentTodoListTasks.map(t => t.id === taskID ? {...t, isDone} : t)
        // tasks[todoListID] = updateTasks
        // setTasks({...tasks})

        setTasks({...tasks, [todoListID] : tasks[todoListID].map(t => t.id === taskID ? {...t, isDone} : t)})
    }
    const removeTodoList = (todoListID: string) => {
        setTodoList(todoList.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }

    const todoListsComponents = todoList.length
        ? todoList.map(tl => {

            let tasksForTodolist = tasks[tl.id]
            if (tl.filter === 'active') { tasksForTodolist = tasksForTodolist.filter( t => !t.isDone) }
            if (tl.filter === 'completed') { tasksForTodolist = tasksForTodolist.filter( t => t.isDone) }

        return (
            <Todolist
                      key={tl.id}
                      todoListID={tl.id}
                      tasks={tasksForTodolist}
                      filter={tl.filter}
                      title={tl.title}

                      removeTask={removeTask}
                      addTask={addTask}
                      changeTodoListFilter={changeTodoListFilter}
                      changeTaskStatus={changeTaskStatus}
                      removeTodoList={removeTodoList}
            />
        )
        })
        : <span>Create your first TodoList!</span>


    return (
        <div className="App">
            {todoListsComponents}
        </div>
    );
}

export default App;
