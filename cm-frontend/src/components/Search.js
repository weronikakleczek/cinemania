import movie from '../assets/movies/movie-1.png';
import star from '../assets/icons/star.png';

const Search = () => {
    return (
        <div className="movies-container">
            <div className="search-container">
                <div className="search-bar"> 
                    <form>
                    <input
                        type="text"
                        placeholder="Wprowadź tytuł, rezysera lub słowo kluczowe..."
                    /> 
                    </form>
                </div>
                <div className="search-filter"> <h2>Gatunek Rok produkcji Rezyser Oceny Sortuj wedlug</h2></div>
            </div>
            <div className="movie-list">
                <div className="single-movie">
                    <div className="poster-container">
                        <img src={ movie } className="poster" alt="movie"/>
                    </div>
                    <h2>Example movie</h2>
                    <div className="score">
                        <div className="star-container">
                            <img src={ star } alt="movie"/>
                        </div>
                        <h3>8.9</h3>
                    </div>
                </div>
                <div className="single-movie">
                    <div className="poster-container">
                        <img src={ movie } className="poster" alt="movie"/>
                    </div>
                    <h2>Example movie</h2>
                    <div className="score">
                        <div className="star-container">
                            <img src={ star } alt="movie"/>
                        </div>
                        <h3>8.9</h3>
                    </div>
                </div>
                <div className="single-movie">
                    <div className="poster-container">
                        <img src={ movie } className="poster" alt="movie"/>
                    </div>
                    <h2>Example movie</h2>
                    <div className="score">
                        <div className="star-container">
                            <img src={ star } alt="movie"/>
                        </div>
                        <h3>8.9</h3>
                    </div>
                </div>
                <div className="single-movie">
                    <div className="poster-container">
                        <img src={ movie } className="poster" alt="movie"/>
                    </div>
                    <h2>Example movie</h2>
                    <div className="score">
                        <div className="star-container">
                            <img src={ star } alt="movie"/>
                        </div>
                        <h3>8.9</h3>
                    </div>
                </div>
                                <div className="single-movie">
                    <div className="poster-container">
                        <img src={ movie } className="poster" alt="movie"/>
                    </div>
                    <h2>Example movie</h2>
                    <div className="score">
                        <div className="star-container">
                            <img src={ star } alt="movie"/>
                        </div>
                        <h3>8.9</h3>
                    </div>
                </div>
                <div className="single-movie">
                    <div className="poster-container">
                        <img src={ movie } className="poster" alt="movie"/>
                    </div>
                    <h2>Example movie</h2>
                    <div className="score">
                        <div className="star-container">
                            <img src={ star } alt="movie"/>
                        </div>
                        <h3>8.9</h3>
                    </div>
                </div>
                <div className="single-movie">
                    <div className="poster-container">
                        <img src={ movie } className="poster" alt="movie"/>
                    </div>
                    <h2>Example movie</h2>
                    <div className="score">
                        <div className="star-container">
                            <img src={ star } alt="movie"/>
                        </div>
                        <h3>8.9</h3>
                    </div>
                </div>
                <div className="single-movie">
                    <div className="poster-container">
                        <img src={ movie } className="poster" alt="movie"/>
                    </div>
                    <h2>Example movie</h2>
                    <div className="score">
                        <div className="star-container">
                            <img src={ star } alt="movie"/>
                        </div>
                        <h3>8.9</h3>
                    </div>
                </div>
                <div className="single-movie">
                    <div className="poster-container">
                        <img src={ movie } className="poster" alt="movie"/>
                    </div>
                    <h2>Example movie</h2>
                    <div className="score">
                        <div className="star-container">
                            <img src={ star } alt="movie"/>
                        </div>
                        <h3>8.9</h3>
                    </div>
                </div>
                <div className="single-movie">
                    <div className="poster-container">
                        <img src={ movie } className="poster" alt="movie"/>
                    </div>
                    <h2>Example movie</h2>
                    <div className="score">
                        <div className="star-container">
                            <img src={ star } alt="movie"/>
                        </div>
                        <h3>8.9</h3>
                    </div>
                </div>
                <div className="single-movie">
                    <div className="poster-container">
                        <img src={ movie } className="poster" alt="movie"/>
                    </div>
                    <h2>Example movie</h2>
                    <div className="score">
                        <div className="star-container">
                            <img src={ star } alt="movie"/>
                        </div>
                        <h3>8.9</h3>
                    </div>
                </div>
                <div className="single-movie">
                    <div className="poster-container">
                        <img src={ movie } className="poster" alt="movie"/>
                    </div>
                    <h2>Example movie</h2>
                    <div className="score">
                        <div className="star-container">
                            <img src={ star } alt="movie"/>
                        </div>
                        <h3>8.9</h3>
                    </div>
                </div>
                

            </div>
        </div>
    );
}

export default Search;