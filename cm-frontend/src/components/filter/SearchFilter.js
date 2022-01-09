import { useEffect } from "react";
import ScoreFilter from "./ScoreFilter";
import SortBy from "./SortBy";
import YearFilter from "./YearFilter";


const SearchFilter = ({genres, filters, setFilters, type, setType}) => {

    const addFilter = (type, value) => {
        let copiedMap = new Map(filters)

        if (copiedMap.has(type)) {
            if (copiedMap.get(type).includes(value.id)) {
                let updatedList = copiedMap.get(type).slice()
                updatedList = updatedList.filter(e => e !== value.id);
                if (updatedList.length > 0) {
                    copiedMap.set(type, updatedList);
                } else {
                    copiedMap.delete(type);
                }
            } else {
                let updatedList = copiedMap.get(type).slice()
                updatedList.push(value.id)
                copiedMap.set(type, updatedList)
            }
        } else {
            copiedMap.set(type, [value.id])
        }

        setFilters(copiedMap);
    }



    useEffect(() => {
        setFilters(filters)
    }, [filters, setFilters])

    return (
        <div className="search-filter">  
            <div className="filter genre">
                <h2>Gatunek</h2>
                {genres && (genres.map((val, idx) => (
                    <div key={idx} className={filters.has('with_genres') ? (filters.get('with_genres').includes(val.id) ? "single-filter enabled" : "single-filter") : "single-filter"}>
                        <button onClick={() => addFilter('with_genres', val)}>{val.name}</button>
                    </div>
                )))}
            </div>
            <YearFilter filters={filters} setFilters={setFilters} type={type}/>
            <ScoreFilter filters={filters} setFilters={setFilters} />
            <SortBy filters={filters} setFilters={setFilters} type={type} />
            <div className="filter">
                <h2>Rodzaj</h2>
                <div 
                className={type === "movie" ? "single-filter enabled" : "single-filter"}
                onClick={() => setType("movie")}>
                    Film
                </div>
                <div 
                className={type === "tv" ? "single-filter enabled" : "single-filter"}
                onClick={() => setType("tv")}>
                    Serial
                </div>
            </div>
        </div>
    )
}

export default SearchFilter
