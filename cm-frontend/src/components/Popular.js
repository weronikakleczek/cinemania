import movie_one from '../assets/movies/movie-1.png';
import movie_two from '../assets/movies/movie-2.png';
import movie_three from '../assets/movies/movie-3.png';
import movie_four from '../assets/movies/movie-4.png';
import left_arrow from '../assets/icons/arrow-left.png'
import right_arrow from '../assets/icons/arrow-right.png'

const Popular = () => {
    return (
            <div className="popular-container">
                <h1>Najpopularniejsze</h1>
                <div className="popular-movies">
                    <div className="arrow left"><img src={ left_arrow } alt="" /></div>
                    <div className="popular"><img src={movie_one} className="book" alt="book" /></div>
                    <div className="popular"><img src={movie_two} className="book" alt="book" /></div>
                    <div className="popular"><img src={movie_three} className="book" alt="book" /></div>
                    <div className="popular"><img src={movie_four} className="book" alt="book" /></div>
                    <div className="arrow left"><img src={ right_arrow } alt="" /></div>
                </div>
                <div className="balls">
                        <div className="ball"></div>
                        <div className="ball"></div>
                        <div className="ball active"></div>
                        <div className="ball"></div>
                        <div className="ball"></div>
                    </div>
            </div>
    );
}

export default Popular;