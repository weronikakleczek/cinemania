import React, { useContext, useEffect, useState } from 'react'
import GetAndSetUtil from '../../api/GetAndSetUtil'
import {FaArrowAltCircleLeft, FaArrowAltCircleRight} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';
import ApiCall from '../../api/ApiCall';
import not_found from '../../assets/other/404-image-not-found.jpg';

const Popular = () => {

    const [trendingPictures, setTrendingPictures] = useState([]);
    const [pictureListSize, setPictureListSize] = useState(0);
    const [indexes, setIndexes] = useState([0, 1, 2, 3]);
    const [currentBall, setCurrentBall] = useState(0);
    const {user, setUser} = useContext(UserContext);



    useEffect(() => {

        const setMoviesAsync = async () => {
            if (user !== null) {
                const watchedMovies = await ApiCall.getWatchedMovies(user)
                    .then(res => {
                        console.log('Res data:', res.data);
                        return res.data;
                    });
    
                console.log("!: ", watchedMovies);
                if (watchedMovies !== null && watchedMovies.length > 0) {
                    let array = [];
                    const fillArray = async (arr) => {
                        for (let i = 0; i < watchedMovies.length; i++) {
                            await ApiCall.getRecommendedPictures(watchedMovies[i].id)
                            .then(res => {
                                console.log('Arrray before', arr)
                                arr = arr.concat(res.data);
                                console.log('Arrray after', arr)
                            })
                        }
                        return arr;
                    }
                    array = await fillArray(array);
                    console.log('Arrrrrray', array)

                    const shuffledArray = array.sort((a, b) => 0.5 - Math.random());
                    const croppedArray = shuffledArray.slice(0, 20);
                    console.log('Cropped array', croppedArray)
                    setTrendingPictures(croppedArray);
                    setPictureListSize(croppedArray.length);

                    // GetAndSetUtil.getAndSetRecommendations(watchedMovies[0].id, setTrendingPictures, setPictureListSize);
                } else {
                    GetAndSetUtil.getAndSetTrending(setTrendingPictures, setPictureListSize);
                }
                    
            } else {
                GetAndSetUtil.getAndSetTrending(setTrendingPictures, setPictureListSize);
            }
        }

        setMoviesAsync();
        
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
                <h1>{user ? 'Polecane dla Ciebie' : 'Najpopularniejsze' }</h1>
                <div className="popular-movies">
                    <div className="trending-pictures">
                        <FaArrowAltCircleLeft className="arrow left" onClick={handleLeftArrow}/>
                            {trendingPictures && trendingPictures.map((picture, index) => {
                                return (
                                    <Link to={`/${picture.media_type}/${picture.id}`} className="single-movie" key={ index }>
                                        <div className={indexes.includes(index) ? "picture-container active" : "picture-container"} key={index}>
                                            {indexes.includes(index) && 
                                                <img 
                                                    src={ `https://image.tmdb.org/t/p/original/${picture.poster_path}` } 
                                                    onError={(event) => event.target.setAttribute("src", not_found)} 
                                                    className="picture" 
                                                    alt="popular"/>}
                                        </div>
                                    </Link>
                                )
                            })}
                        <FaArrowAltCircleRight className="arrow right" onClick={handleRightArrow}/>
                    </div>
                </div>
                <div className="balls">
                    { Array.apply(0, Array(5)).map((val, ind) => {
                        return <div key={ind} className={ind === currentBall ? "ball active" : "ball"}></div>;
                    })}
                    </div>
            </div>
    );
}

export default Popular;