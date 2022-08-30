import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import TaskList from './TaskList';
import ITask from './Interfaces';
import AddTaskForm from './AddTaskForm';
import axios from "axios";


const defaultTasks: Array<ITask> = [
  { "title": "Feed the cats", "completed": false, "id": 1 },
  { "title": "Test the software", "completed": false, "id": 2 },

];

function App() {

  const baseURL = "http://localhost:3000/tasks";

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setTasks(response.data);
    });
  }, []);

  
  const [tasks, setTasks] = useState(defaultTasks);
  function addTask(task : ITask){
    let highestId = 0;
    for(let i = 0;i<tasks.length;i++){
      let currentId = tasks[i].id;
      if(currentId !== null && currentId > highestId){
        highestId = currentId;
      }
    }
    task.id = highestId+1;
    setTasks([...tasks, task]);
  }

  function deleteTask(taskToDelete: ITask){
    let tasksWithoutDeleted = tasks.filter(currentTask => taskToDelete.id !== currentTask.id)
    setTasks(tasksWithoutDeleted);
  }

  return (
    <div className="App">
      <TaskList tasks={tasks} deleteTask ={deleteTask}></TaskList>
      <AddTaskForm add={addTask}></AddTaskForm>
    </div>
  );
}

export default App;