import React from 'react'
import PictureList from '../../pictures/PictureList'

const WatchedTvShows = ({watchedTvShows}) => {
    return (
        <div className="single-option watched-tv-shows">
        <h3>Twoje obejrzane seriale:</h3>
        <PictureList pictureList={watchedTvShows} type='tv' />
    </div>
    )
}

export default WatchedTvShows
