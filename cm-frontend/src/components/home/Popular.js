import React, { useEffect, useState } from 'react'
import ApiCall from '../../api/ApiCall'
import {FaArrowAltCircleLeft, FaArrowAltCircleRight} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Popular = () => {

    const [trendingPictures, setTrendingPictures] = useState([])
    const [pictureListSize, setPictureListSize] = useState(0)
    const [indexes, setIndexes] = useState([0, 1, 2, 3])
    const [currentBall, setCurrentBall] = useState(0)


    useEffect(() => {
        ApiCall.getTrending()
        .then(res => {
                return res.data;
         })
        .then(data => {
            setTrendingPictures(data);
            setPictureListSize(data.length);
            console.log(data);
        })
        .catch(e => {
            console.log(e.message);
        });
    }, [])

    const handleLeftArrow = () => {
        let currentMinVal = indexes[0]
        console.log(currentMinVal)
        if (currentMinVal <= 0) {
            currentMinVal = 20
        }
        let newIndexes = []
        for (let i = 4; i > 0; i--) {
            newIndexes.push(currentMinVal - i)
        }
        console.log(newIndexes)
        setIndexes(newIndexes)
        setCurrentBall(currentBall === 0 ? 4 : currentBall - 1)
    }

    
    const handleRightArrow = () => {
        let currentMaxVal = indexes[3]
        if (currentMaxVal >= pictureListSize - 1) {
            currentMaxVal = -1
        }
        let newIndexes = []
        for (let i = 0; i < 4; i++) {
            newIndexes.push(++currentMaxVal)
        }

        setIndexes(newIndexes)
        setCurrentBall(currentBall === 4 ? 0 : currentBall + 1)
    }

    return (
            <div className="popular-container">
                <h1>Najpopularniejsze</h1>
                <div className="popular-movies">
                    <div className="trending-pictures">
                        <FaArrowAltCircleLeft className="arrow left" onClick={handleLeftArrow}/>
                            {trendingPictures && trendingPictures.map((picture, index) => {
                                return (
                                    <Link to={`/${picture.media_type}/${picture.id}`} className="single-movie" key={ picture.id }>
                                        <div className={indexes.includes(index) ? "picture-container active" : "picture-container"} key={index}>
                                            {indexes.includes(index) && <img src={ `https://image.tmdb.org/t/p/original/${picture.poster_path}` } className="picture" alt="popular"/>}
                                        </div>
                                    </Link>
                                )
                            })}
                        <FaArrowAltCircleRight className="arrow right" onClick={handleRightArrow}/>
                    </div>
                </div>
                <div className="balls">
                    { Array.apply(0, Array(5)).map((val, ind) => {
                        return <div className={ind === currentBall ? "ball active" : "ball"}></div>;
                    })}
                    </div>
            </div>
    );
}

export default Popular;