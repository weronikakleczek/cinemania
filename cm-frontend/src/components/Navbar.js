import { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/other/cinemania-logo.png'
import TopShape from './TopShape';
import UserContext from './UserContext';

const Navbar = () => {

    const {user, setUser} = useContext(UserContext);


    return (
        <div className="navbar">
            <TopShape />
            <nav>
                <div id="logo-container">
                    <Link to="/"><img src={logo} alt="logo" /></Link>
                </div>
                <ul>
                    <Link to="/search"><li className="white">Wyszukaj</li></Link>
                    <Link to="/top"><li className="white">Top 100</li></Link>
                    <Link to="/register"><li className="yellow">Zarejestruj</li></Link>
<<<<<<< HEAD
                    <Link to="/login"><li className="beige">{ user ? user : 'Zaloguj'}</li></Link>
=======
                    <Link to="/login"><li className="beige">Zaloguj</li></Link>
>>>>>>> 3ce22fa (fix search ui)
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;