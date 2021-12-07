import logo from '../assets/other/cinemania-logo.png'

const Navbar = () => {
    return (
            <nav>
                <div id="logo-container">
                    <img src={logo} alt="logo" />
                </div>
                <ul>
                    <li className="white">Filmy</li>
                    <li className="white">Seriale</li>
                    <li className="white">Top 100</li>
                    <li className="beige">Zaloguj</li>
                </ul>
            </nav>
    );
}

export default Navbar;