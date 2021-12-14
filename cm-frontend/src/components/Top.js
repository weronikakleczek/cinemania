import { useState, useEffect } from "react";
import movie from '../assets/movies/movie-1.png';
import star from '../assets/icons/star.png';


const Top = () => {

    const [movieList, setMovieList] = useState(null);
    const [error, setError] = useState(null);
    const imageUrl = 'https://image.tmdb.org/t/p'


    useEffect(() => {

        const abortController = new AbortController();

        fetch(`http://localhost:8080/movie/top`, {
            signal: abortController.signal,
            method: 'GET'
        })
        .then(res => {
                return res.json();
         })
        .then(data => {
            setMovieList(data);
            console.log(data);
        })
        .catch(e => {
            setError(e.message);
        });
    }, [])


    return (
        <div className="top-container">
            <h1>Top 100 Movies</h1>
            <div className="top-list">
                { movieList && (
                        movieList.map((movie, index) => (


                            <div className="single-movie" key={ movie.id }>
                            <h1>{ index + 1 })</h1>
                            <div className="poster-container">
                                <img src={ `https://image.tmdb.org/t/p/original/${movie.poster_path}` } className="poster" alt="movie"/>
                            </div>
                            <div className="title-description">
                                <h2>{ movie.title}</h2>
                                <p>{ movie.overview }</p>
                            </div>
                            <div className="score">
                                <div className="star-container">
                                    <img src={ star } alt="movie"/>
                                </div>
                                <h3>{ movie.vote_average}</h3>
                            </div>
                        </div>
                        ))
                    
                )}

            </div>
        </div>
    );
}

export default Top;