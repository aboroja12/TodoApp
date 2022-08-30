import { useState } from 'react';
import ITask from './Interfaces'
export interface IProps {
    add: (newItem : ITask) => void;
    
}

const initTask = { "taskDescription": "", "taskId": 0, "completed": false};
function AddTaskForm(props: IProps){
    const [formValue, setFormValue] = useState(initTask);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
      };

    function onFormSubmit(e : React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        props.add(formValue);
    }

    return (
        <div className="addTask">
            <h2>Add</h2>
            <form className="formAdd" onSubmit={onFormSubmit}>
                <label>Task Description</label>
                <input
                    type="text"
                    placeholder="please input name"
                    name="taskDescription"
                    value={formValue.taskDescription}
                    onChange={onInputChange}
                />
                <button>Add new Task</button>
          </form>
        </div>
    );
}

export default AddTaskForm;