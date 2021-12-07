import search from '../assets/icons/search-icon.png';

const More = () => {
    return (
            <div className="more-container">
                <h1>
                    Znajdź więcej
                </h1>
                <div>
                    <img src={ search } alt="search" /> 
                </div>
            </div>
    );
}

export default More;