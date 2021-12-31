import React from 'react'

const WatchedMovies = ({watchedMovies}) => {
    return (
        <div className="watched-movies">
        <h3>Twoje obejrzane filmy:</h3>
        { watchedMovies && (watchedMovies.map((val, idx) => (
            <div className="watched-movie" key={idx}>
                {val.title}
            </div>
        
        )))}
    </div>
    )
}

export default WatchedMovies
