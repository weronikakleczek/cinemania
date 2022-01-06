import { useState, useEffect } from "react";
import PictureList from "../pictures/PictureList";
import SearchBar from "./SearchBar";
import SearchUtil from '../../api/GetAndSetUtil';

const Search = () => {

    const [pictureList, setPictureList] = useState([]);
    const [query, setQuery] = useState('a');
    const [page, setPage] = useState(1);


    useEffect(() => {
        SearchUtil.getAndSetQueriedListWithNewQuery(query, setPictureList);
        console.log(pictureList)
    }, [query])

    useEffect(() => {
        SearchUtil.getAndSetQueriedListWithNewPage(query, pictureList, setPictureList, page);
    }, [page])



    return (
        <div className="movies-container">
            <div className="search-container">
                <SearchBar setQuery={setQuery}/>
            </div>
            <PictureList pictureList={pictureList} type="movie"/>
            <button className="more-button" onClick={() => setPage(page + 1)}>Więcej</button>
        </div>
    );
}

export default Search;