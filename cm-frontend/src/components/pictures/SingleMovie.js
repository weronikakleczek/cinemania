import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ApiCall from '../../api/ApiCall';
import star from '../../assets/icons/star.png';
import not_found from '../../assets/other/404-image-not-found.jpg';
import UserContext from '../UserContext';


const SingleMovie = () => {

    const { id } = useParams();
    const {user, setUser} = useContext(UserContext);
    const [movie, setMovie] = useState(null);
    const [userInfo, setUserInfo] = useState(null);


    useEffect(() => {
        ApiCall.getSinglePicture(id, 'movie')
        .then(res => {
            return res.data;
         })
        .then(data => {
            console.log("Movie info: ", data);
            setMovie(data);
        })
        .catch(e => {
            console.log("Error message: ", e)
            setMovie(null);
        });

        if (id) {
            ApiCall.getUserInfo(user)
            .then(res => {
                return res.data;
             })
            .then(data => {
                console.log("User info: ", data);
                setUserInfo(data);
            })
            .catch(e => {
                console.log("Error message: ", e)
                setUserInfo(null);
            });
        }

        console.log("After if: ", userInfo);

    }, [])

    const handleAddToWatched = () => {
        ApiCall.addMovieToWatched(user, id);
        console.log(`Adding  ${movie} to user ${user}`)
    }

    return (
        <>
            {movie &&
                <div className="single-movie-page-container">
                    <div className="top-movie-background">
                        <img 
                            src={ `https://image.tmdb.org/t/p/original/${movie.backdrop_path}` } 
                            onError={(event) => event.target.setAttribute("src", not_found)} 
                            className="background" 
                            alt="movie"/> 
                    </div>
                    { user && <button onClick={handleAddToWatched}>Dodaj do obejrzanych!</button> }
                    <div className="poster-container">
                        <img 
                        src={ `https://image.tmdb.org/t/p/original/${movie.poster_path}` } 
                        onError={(event) => event.target.setAttribute("src", not_found)} 
                        className="poster" 
                        alt="movie"/>
                    </div>
                    <div className="movie-info">
                        <h2>{ movie.title }</h2>
                        <div className="score">
                            <div className="star-container">
                                <img src={ star } alt="movie"/>
                            </div>
                            <h1>{ movie.vote_average}</h1>
                        </div>
                        <p>{ movie.overview }</p>
                    </div>
                </div>
            }

        </>
    )
}

export default SingleMovie
