import {Link, useParams} from "react-router-dom";
import UserContext from "../UserContext";
import {useContext, useEffect, useState} from "react";
import GetAndSetUtil from "../../api/GetAndSetUtil";
import PictureList from "../pictures/PictureList";
import ApiCall from "../../api/ApiCall";
import not_found from "../../assets/other/404-image-not-found.jpg";
import star from "../../assets/icons/star.png";

const User = () => {

    const { id } = useParams();
    const {user, setUser} = useContext(UserContext);
    const [profileUser, setProfileUser] = useState('');
    const [recentMovies, setRecentMovies] = useState([]);
    const [recentTvs, setRecentTvs] = useState([]);

    useEffect(() => {
        GetAndSetUtil.getAndSetRecentPictures(id, setRecentMovies, setRecentTvs);
        ApiCall.getUsernameById(id)
            .then(res => {
                console.log(res.data)
                setProfileUser(res.data);
            }).catch(e => {
                console.log("User page, error: ", e.message);
        });
    }, [])


    return(
        <div className="user-container">
            <div className="header">{ profileUser && `Profil użytkownika ${profileUser}`}</div>
            <h1>Najwyżej ocenione filmy:</h1>
            <div className="recent-list">
                {recentMovies && recentMovies.map((movie, index) => (
                            <Link to={ `/movie/${movie.id}` } className="single-movie" key={ index }>
                                <div className="poster-container">
                                    <img
                                        src={ `https://image.tmdb.org/t/p/original/${movie.poster_path}` }
                                        onError={(event) => event.target.setAttribute("src", not_found)}
                                        className="poster"
                                        alt="movie"/>
                                </div>
                                <h2>{ movie.title }</h2>
                                <div className="score">
                                    <div className="star-container">
                                        <img src={ star } alt="movie"/>
                                    </div>
                                    <h3>{ movie.score }</h3>
                                </div>
                            </Link>
                        ))

                    }

            </div>
            <h1>Najwyżej ocenione seriale:</h1>
            <div className="recent-list">
                { recentTvs && (
                    recentTvs.map((movie, index) => (
                        <Link to={ `/tv/${movie.id}` } className="single-movie" key={ index }>
                            <div className="poster-container">
                                <img
                                    src={ `https://image.tmdb.org/t/p/original/${movie.poster_path}` }
                                    onError={(event) => event.target.setAttribute("src", not_found)}
                                    className="poster"
                                    alt="movie"/>
                            </div>
                            <h2>{ movie.title }</h2>
                            <div className="score">
                                <div className="star-container">
                                    <img src={ star } alt="movie"/>
                                </div>
                                { movie.score > 0 ? <h3>{movie.score}</h3> : <h4>Brak oceny</h4>}
                            </div>
                        </Link>
                    ))

                )}
            </div>
        </div>
    );
}

export default User;