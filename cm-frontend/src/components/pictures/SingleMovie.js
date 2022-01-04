import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ApiCall from '../../api/ApiCall';
import GetAndSetUtil from '../../api/GetAndSetUtil';
import star from '../../assets/icons/star.png';
import runtime from '../../assets/icons/runtime.png';
import date from '../../assets/icons/date.png';
import type from '../../assets/icons/type.png';
import not_found from '../../assets/other/404-image-not-found.jpg';
import UserContext from '../UserContext';
import * as Scroll from 'react-scroll';


const SingleMovie = () => {

    const { id } = useParams();
    const {user, setUser} = useContext(UserContext);
    const [reviews, setReviews] = useState([]);
    const [movie, setMovie] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [buttonText, setButtonText] = useState('Dodaj do obejrzanych!');
    const [showForm, setShowForm] = useState(false);
    const [score, setScore] = useState(null);
    const [review, setReview] = useState(null);
    const [addedReview, setAddedReview] = useState(0);
    const scroll = Scroll.animateScroll;

    
    const wait = async () => {
        await new Promise(r => setTimeout(r, 100));
    }


    useEffect(() => {

        GetAndSetUtil.getAndSetSinglePicture(id, setMovie);
        GetAndSetUtil.getAndSetMovieReviews(id, setReviews);

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

    useEffect(() => {
        GetAndSetUtil.getAndSetMovieReviews(id, setReviews);
    }, [addedReview])

    const handleAddToWatchedButton = (e) => {
        e.preventDefault();
        if (showForm) {
            setButtonText('Dodaj do obejrzanych!')
            setShowForm(false);
        } else {
            scroll.scrollTo(300);
            setButtonText('Schowaj formularz.')
            setShowForm(true);
        }
    }

    const handleAddToWatched = async (e) => {
        e.preventDefault();
        let watchedMovieReview = {
            'username': user,
            'movieId': id
        }

        if (score !== '') {
            watchedMovieReview['score'] = score;
        }

        if (review !== '') {
            watchedMovieReview['review'] = review;
        }

        await ApiCall.addMovieToWatched(watchedMovieReview);
        setAddedReview(addedReview + 1);
    }

    

    return (
        <>
            {movie &&
                <div className="single-movie-page-container">
                    <div className="poster-and-info-container">
                        <div className="top-movie-background">
                            <img 
                                src={ `https://image.tmdb.org/t/p/original/${movie.backdrop_path}` } 
                                onError={(event) => event.target.setAttribute("src", not_found)} 
                                className="background" 
                                alt="movie"/> 
                        </div>
                        
                        <div className="poster-container">
                            <img 
                            src={ `https://image.tmdb.org/t/p/original/${movie.poster_path}` } 
                            onError={(event) => event.target.setAttribute("src", not_found)} 
                            className="poster" 
                            alt="movie"/>
                        </div>
                        <div className="movie-info">
                            <div className="movie-title">{ movie.title }</div>
                                <div className="movie-stats">
                                    <div className="stat">
                                            <img src={ star } alt="movie"/>
                                        <div className="value">{ movie.vote_average}</div>
                                    </div>
                                    <div className="stat">
                                        <img src={ runtime } alt="movie"/>
                                        <div className="value">{ movie.runtime} min</div>
                                    </div>
                                    <div className="stat">
                                        <img src={ date } alt="movie"/>
                                        <div className="value">{ movie.release_date.substring(0, 4)}</div>
                                    </div>
                                    <div className="stat">
                                        <img src={ type } alt="movie"/>
                                        <div className="value">{ movie.genres[0].name}</div>
                                    </div>
                                </div>
                                <div className="overview">{ movie.overview }</div>
                                { user && <button className="add-to-watched" onClick={handleAddToWatchedButton}>{buttonText}</button> }
                                
                        </div>
                    </div>
                    {showForm && 
                        <div className="add-form">
                            <form>
                                <label>Twoja ocena:</label>
                                <input 
                                    className="score-input"
                                    type="number"
                                    min="1"
                                    max="10"
                                    value={score}
                                    onChange={e => setScore(e.target.value)}
                                />
                                <label>Recenzja:</label>
                                <textarea 
                                    className="review-input"
                                    value={review}
                                    onChange={e => setReview(e.target.value)}
                                />
                                <button onClick={handleAddToWatched}> Dodaj </button>
                            </form>
                        
                        </div>
                    }
                    <div className="reviews">
                        <h2>Recenzje użytkowników</h2>
                        { reviews && (
                            reviews.map((val, idx) => (
                                <div className="review" key={idx}>
                                    <div className="review-part">[{val.user.username}] </div>
                                    <div className="review-part">{val.review} </div>
                                    <div className="review-part">{val.score ? val.score : '?'} / 10</div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            }

        </>
    )
}

export default SingleMovie
