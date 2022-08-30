import axios from "axios";
import { updateLanguageServiceSourceFile } from 'typescript';
import ITask from './Interfaces'
export interface IProps {
    tasks: ITask[];
    deleteTask : (task:ITask) => void;
}
function TaskList(props: IProps) {    
    function remove(task:ITask){
        props.deleteTask(task);
    }
    return (
        <div className="list">
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Titel</td>
                        <td>Completed</td>
                    </tr>
                </thead>
                <tbody>
                    {props.tasks.map(task => {
                        return (
                            <tr key={task.taskId}>
                                <td>{task.taskId}</td>
                                <td>{task.taskDescription}</td>
                                <td>{task.completed}</td>  
                                <td>
                                    <button onClick={()=>remove(task)}>Löschen</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default TaskList;