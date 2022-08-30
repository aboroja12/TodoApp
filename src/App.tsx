import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import TaskList from './TaskList';
import ITask from './Interfaces';
import AddTaskForm from './AddTaskForm';

const defaultTasks: Array<ITask> = [
  { "taskDescription": "Feed the cats", "completed": false, "taskId": 1 },
  { "taskDescription": "Test the software", "completed": false, "taskId": 2 },

];

function App() {
  const [tasks, setTasks] = useState(defaultTasks);

  function addTask(task : ITask){
    let highestId = 0;
    for(let i = 0;i<tasks.length;i++){
      let currentId = tasks[i].taskId;
      if(currentId !== null && currentId > highestId){
        highestId = currentId;
      }
    }
    task.taskId = highestId+1;
    setTasks([...tasks, task]);
  }

  function deleteTask(taskToDelete: ITask){
    let tasksWithoutDeleted = tasks.filter(currentTask => taskToDelete.taskId !== currentTask.taskId)
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