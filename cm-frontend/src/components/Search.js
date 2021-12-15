import { useState, useEffect } from "react";
import movie from '../assets/movies/movie-1.png';
import star from '../assets/icons/star.png';

const Search = () => {


    
    const [pictureList, setPictureList] = useState(null);
    const [query, setQuery] = useState('a');

    const handleChange = () => {

    }

    useEffect(() => {

        const abortController = new AbortController();

        fetch(`http://localhost:8080/movie/query/${query}`, {
            signal: abortController.signal,
            method: 'GET'
        })
        .then(res => {
                return res.json();
         })
        .then(data => {
            console.log('got data!');
            setPictureList(data);
        })
        .catch(e => {
            setPictureList(null);
        });
    }, [query])




    return (
        <div className="movies-container">
            <div className="search-container">
                <div className="search-bar"> 
                    <form>
                    <input
                        type="text"
                        placeholder="Wprowadź tytuł, rezysera lub słowo kluczowe..."
                        onChange={ e => setQuery(e.target.value) }
                    /> 
                    </form>
                </div>
                <div className="search-filter"> 
                    <h2>Gatunek</h2>
                    <h2>Rok produkcji</h2>
                    <h2>Rezyser</h2>
                    <h2>Oceny</h2>
                    <h2>Sortuj wedlug</h2>
                </div>
            </div>
            <div className="movie-list">
            { pictureList && (
                        pictureList.map((movie, index) => (


                            <div className="single-movie" key={ movie.id }>
                            <div className="poster-container">
                                <img src={ `https://image.tmdb.org/t/p/original/${movie.poster_path}` } className="poster" alt="movie"/>
                            </div>
                            <h2>{ movie.title}</h2>
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

export default Search;