import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/other/cinemania-logo.png'
import Auth from '../auth/Auth';
import TopShape from './TopShape';
import UserContext from './UserContext';

const Navbar = () => {

    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        setUser(null);
        Auth.logout();
        navigate('/logout');
    }


    return (
        <div className="navbar">
            <TopShape />
            <nav>
                <div id="logo-container">
                    <Link to="/"><img src={logo} alt="logo" /></Link>
                </div>
                <ul>
                    <Link to="/search"><li className="white">Wyszukaj</li></Link>
                    <Link to="/filter"><li className="white">Filtruj</li></Link>
                    <Link to="/top"><li className="white">Top 100</li></Link>
                    {
                        user ?
                        <>
                        <Link to="/profile"><li className="yellow">{user}</li></Link>
                        <Link to="/logout" onClick={handleLogout}><li className="beige">Wyloguj</li></Link>
                        </> 
                        :
                        <>
                        <Link to="/register"><li className="yellow">Zarejestruj</li></Link>
                        <Link to="/login"><li className="beige">Zaloguj</li></Link>
                        </>
                    }
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;