import { Link } from 'react-router-dom';
import tv from '../../assets/other/tv.png';

const Main = () => {
    return (
            <div className="genres-container">
                <div className="genres-header">
                    <h2>
                        Co chcesz dziś obejrzeć?
                    </h2>
                </div>
                <div className="tv">
                    <img src={ tv } alt="" />
                </div>
                <div className="genres">
                    <Link to="/filter" state={{ genre: 'Akcja' }} className="genre action"><h1>Akcja</h1></Link>
                    <Link to="/filter" state={{ genre: 'Romans' }} className="genre romance"><h1>Romans</h1></Link>
                    <Link to="/filter" state={{ genre: 'Thriller' }} className="genre thriller"><h1>Thriller</h1></Link>
                    <Link to="/filter" state={{ genre: 'Fantasy' }} className="genre fantasy"><h1>Fantastyka</h1></Link>
                    <Link to="/filter" state={{ genre: 'Komedia' }} className="genre comedy"><h1>Komedia</h1></Link>
                    <Link to="/filter" state={{ genre: 'Horror' }} className="genre horror"><h1>Horror</h1></Link>
                </div>
            </div>
    );
}

export default Main;