import tv from '../assets/other/tv.png';

const Main = () => {
    return (
            <div className="genres-container">
                <div className="genres-header">
                    <h2>
                        Co chcesz dziś obejrzeć?
                    </h2>
                </div>
                <div className="tv">
                    <img src={ tv } alt="" />
                </div>
                <div className="genres">
                    <div className="genre action"><h1>Akcja</h1></div>
                    <div className="genre romance"><h1>Romans</h1></div>
                    <div className="genre thriller"><h1>Thriller</h1></div>
                    <div className="genre fantasy"><h1>Fantastyka</h1></div>
                    <div className="genre comedy"><h1>Komedia</h1></div>
                    <div className="genre horror"><h1>Horror</h1></div>
                </div>
            </div>
    );
}

export default Main;