import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import TaskList from "./TaskList";
import ITask from "./Interfaces";
import AddTaskForm from "./AddTaskForm";
import axios from "axios";
import { setTokenSourceMapRange } from "typescript";
import Login from "./LoginForm";
import { Link, Navigate} from 'react-router-dom';
import Main from './components/Main';

const defaultTasks: Array<ITask> = [
  { title: "Feed the cats", completed: false, id: 1 },
  { title: "Test the software", completed: false, id: 2 },
];

function App() {
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
    <div className="App">
  
     <div>
        <ul>
          <li><Link to='/Create'>Create Task</Link></li>
          <li><Link to='/Login'>Login</Link></li>
        </ul>
        <hr />
        <Main />       
      </div>   
    </div>
  );
}

export default App;
