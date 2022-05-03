import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

function App() {

    let [tasks, setTasks] = useState([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false }
    ]);

    const removeTasks = (id: number) => {
        setTasks(tasks.filter((el) => el.id !== id))
    }



// id    const [filterForColander, setFilterForColander] = useState('all');
//
//
//     const clickFilter = (name: string) => {
//         setFilterForColander(name)
//         console.log(name)
//     }
//
//
//     let colander = tasks
//     if (filterForColander === 'active') {
//         colander = tasks.filter((checkboxFilter) => checkboxFilter.isDone === false)
//     }
//     if (filterForColander === 'completed') {
//         colander = tasks.filter((checkboxFilter) => checkboxFilter.isDone === true)
//     }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks = {tasks}
                      removeTasks = {removeTasks}
//                      clickFilter = {clickFilter}
            />
        </div>
    );
}

export default App;
