import { useContext, useState } from "react";
import UserContext from "./UserContext";

const Login = () => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const {user, setUser} = useContext(UserContext);


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Logged as:', login);
    }

    return (
        <div className="login">
            <h1>Zaloguj</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Email"
                    required
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
                <input 
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
                <button onClick={() => setUser('John Doe')}>Login</button>
            </form>
        </div>
    );
}

export default Login;