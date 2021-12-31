import React from 'react'
import { Link } from 'react-router-dom';
import star from '../../assets/icons/star.png';
import not_found from '../../assets/other/404-image-not-found.jpg';


const PictureList = ({pictureList, type}) => {
    return (
        <div className="movie-list">
        { pictureList && (
                    pictureList.map((movie, index) => (
                        <Link to={type === "movie" ? `/movie/${movie.id}` : `/tv/${movie.id}`} className="single-movie" key={ movie.id }>
                                <div className="poster-container">
                                    <img 
                                    src={ `https://image.tmdb.org/t/p/original/${movie.poster_path}` } 
                                    onError={(event) => event.target.setAttribute("src", not_found)} 
                                    className="poster" 
                                    alt="movie"/>
                                </div>
                                <h2>{ type === "movie" ? movie.title : movie.original_name }</h2>
                                <div className="score">
                                    <div className="star-container">
                                        <img src={ star } alt="movie"/>
                                    </div>
                                    <h3>{ movie.vote_average}</h3>
                                </div>
                        </Link>
                    ))
                
            )}
        </div>
    )
}

export default PictureList
