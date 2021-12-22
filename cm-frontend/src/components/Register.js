import { useState } from "react";

const Register = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');



    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Registered as:', username);
    }

    return (
        <div className="register">
            <h1>Zarejestruj</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nazwa uzytkownika"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type="password"
                    placeholder="Haslo"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
                <input
                    type="text"
                    placeholder="Imie"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Nazwisko"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <button>Zarejestruj</button>
            </form>
        </div>
    );
}

export default Register;