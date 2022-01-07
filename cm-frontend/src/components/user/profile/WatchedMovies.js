import React from 'react'
import PictureList from '../../pictures/PictureList'

const WatchedMovies = ({watchedMovies}) => {
    return (
        <div className="single-option watched-movies">
        <h3>Twoje obejrzane filmy:</h3>
        <PictureList pictureList={watchedMovies} type='movie' />
    </div>
    )
}

export default WatchedMovies
