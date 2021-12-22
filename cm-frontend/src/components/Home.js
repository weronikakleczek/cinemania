import { useContext } from 'react';
import Popular from './Popular';
import Genres from './Genres';
import More from './More';
import UserContext from './UserContext';

const Home = () => {

    return (
        <div>
            <Popular />
            <Genres />
            <More />
        </div>
    );
}

export default Home;