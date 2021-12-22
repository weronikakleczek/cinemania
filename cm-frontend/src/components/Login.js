import { useState } from "react";

const Login = () => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

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
                    placeholder="Haslo"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
                <button>Login</button>
            </form>
        </div>
    );
}

export default Login;