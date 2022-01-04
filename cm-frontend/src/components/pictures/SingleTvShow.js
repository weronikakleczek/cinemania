import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ApiCall from '../../api/ApiCall';
import star from '../../assets/icons/star.png';
import not_found from '../../assets/other/404-image-not-found.jpg';
import UserContext from '../UserContext';

const SingleTvShow = () => {
    
    const { id } = useParams();
    const {user, setUser} = useContext(UserContext);
    const [tv, setTv] = useState(null);


    useEffect(() => {
        ApiCall.getSinglePicture(id, 'tv')
        .then(res => {
            return res.data;
         })
        .then(data => {
            console.log("Tv show info: ", data);
            setTv(data);
        })
        .catch(e => {
            console.log("Error message: ", e)
            setTv(null);
        });

    }, [])

    const handleAddToWatched = () => {
        ApiCall.addTvShowToWatched(user, id);
        console.log(`Adding  ${tv} to user ${user}`)
    }

    return (
        <>
            {tv &&
            <div className="single-movie-page-container">
                <div className="poster-and-info-container">
                    <div className="top-movie-background">
                        <img 
                            src={ `https://image.tmdb.org/t/p/original/${tv.backdrop_path}` } 
                            onError={(event) => event.target.setAttribute("src", not_found)} 
                            className="background" 
                            alt="movie"/> 
                    </div>
                    { user && <button onClick={handleAddToWatched}>Dodaj do obejrzanych!</button> }
                    <div className="poster-container">
                        <img 
                        src={ `https://image.tmdb.org/t/p/original/${tv.poster_path}` } 
                        onError={(event) => event.target.setAttribute("src", not_found)} 
                        className="poster" 
                        alt="movie"/>
                    </div>
                    <div className="movie-info">
                        <h2>{ tv.title }</h2>
                        <div className="score">
                            <div className="star-container">
                                <img src={ star } alt="movie"/>
                            </div>
                            <h1>{ tv.vote_average}</h1>
                        </div>
                        <p>{ tv.overview }</p>
                    </div>
                </div>
            </div>
            }

        </>
    )
}

export default SingleTvShow
