import { ChangeEvent, FormEvent, useState } from "react";

export interface IProps {
    login:(email:string, password:string) => void;
}

function Login(props: IProps){
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

function onChangeEmail (e:ChangeEvent<HTMLInputElement>){
    setEmail(e.target.value);
}

    function onChangePassword (e:ChangeEvent<HTMLInputElement>){
        setPassword(e.target.value);
    }

    function onFormSubmit(e:FormEvent<HTMLFormElement>){
        e.preventDefault();
        props.login(email, password);
    }

    return(
        <form onSubmit={onFormSubmit}> 
        <label>Email</label>
        <input type="email" onChange={onChangeEmail}></input>

        <label>Password</label>
        <input  type="password" onChange={onChangePassword}></input>
        <input type="submit" value="absenden"></input>
        </form>

    );
    
}

export default Login;