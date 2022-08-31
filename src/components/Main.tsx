import { Routes, Route } from 'react-router-dom';
import TaskList from '../TaskList';
import { useState } from 'react';
import ITask from '../Interfaces';
import axios from 'axios';
import React from 'react';
import AddTaskForm from '../AddTaskForm';
import Login from '../LoginForm';

const Main = () => {  
    const defaultTasks: Array<ITask> = [
        { title: "Feed the cats", completed: false, id: 1 },
        { title: "Test the software", completed: false, id: 2 },
      ];

      const baseURL = "http://localhost:3000/tasks";

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setTasks(response.data);
    });
  }, []);
  
    const [tasks, setTasks] = useState(defaultTasks);



    const [token, setToken] = useState("");

  function login(email:string, password:string) {
      axios.post("http://localhost:3000/auth/jwt/sign", {"email":email, "password":password}).then((response) => {
        setToken(response.data.token);
        });
      }


  function addTask(task: ITask) {
    let highestId = 0;
    for (let i = 0; i < tasks.length; i++) {
      let currentId = tasks[i].id;
      if (currentId !== null && currentId > highestId) {
        highestId = currentId;
      }
    }
    task.id = highestId + 1;
  

    axios
      .post(baseURL, {
        id: task.id,
        title: task.title,
        completed: task.completed,
      })
      .then((response) => {
        setTasks([...tasks,response.data]);
      
      });
  }

  function deleteTask(taskToDelete: ITask) {
    let tasksWithoutDeleted = tasks.filter(
      (currentTask) => taskToDelete.id !== currentTask.id
    );
    setTasks(tasksWithoutDeleted);
    axios
    .delete("http://localhost:3000/task/"+taskToDelete.id)
    .then((response) => {
      
    });
  }



return (         
    <Routes>
    <Route path='/' element={<TaskList tasks={tasks} deleteTask = {deleteTask}  />} />
    <Route path= '/Create' element= {<AddTaskForm add={addTask}/>} ></Route>
    <Route path= '/Login' element= {<Login login={login}/>}  />

  </Routes>
);
}
export default Main;


