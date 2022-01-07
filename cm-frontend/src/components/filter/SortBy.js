import React from 'react'

const SortBy = ({filters, setFilters, type}) => {

    const vote_average_desc = `vote_average.desc`;
    const vote_average_asc = `vote_average.asc`;
    const popularity_desc = `popularity.desc`;
    const popularity_asc = `popularity.asc`;
    const release_desc = type === "movie" ? `release_date.desc` : `first_air_date.desc`;
    const release_asc = type === "movie" ? `release_date.asc` : `first_air_date.asc`;
    
    const sort_param = `sort_by`;

    const addScoreFilter = (value) => {
        let copiedMap = new Map(filters);
        if (copiedMap.has(sort_param) && copiedMap.get(sort_param).includes(value)) {
            copiedMap.delete(sort_param);
        } else {
            copiedMap.set(sort_param, Array.of(value))
        }
        setFilters(copiedMap);
    }


    return (
        <div className="filter sort">
                <h2>Sortuj według</h2>
                <div className={filters.has(sort_param) ? (filters.get(sort_param).includes(vote_average_desc) ? "single-filter enabled" : "single-filter") : "single-filter"}>
                        <button onClick={() => addScoreFilter(vote_average_desc)}>Ocena malejąco</button>
                </div>
                <div className={filters.has(sort_param) ? (filters.get(sort_param).includes(vote_average_asc) ? "single-filter enabled" : "single-filter") : "single-filter"}>
                        <button onClick={() => addScoreFilter(vote_average_asc)}>Ocena rosnąco</button>
                </div>
                <div className={filters.has(sort_param) ? (filters.get(sort_param).includes(popularity_desc) ? "single-filter enabled" : "single-filter") : "single-filter"}>
                        <button onClick={() => addScoreFilter(popularity_desc)}>Popularność malejąco</button>
                </div>
                <div className={filters.has(sort_param) ? (filters.get(sort_param).includes(popularity_asc) ? "single-filter enabled" : "single-filter") : "single-filter"}>
                        <button onClick={() => addScoreFilter(popularity_asc)}>Popularność rosnąco</button>
                </div>
                <div className={filters.has(sort_param) ? (filters.get(sort_param).includes(release_desc) ? "single-filter enabled" : "single-filter") : "single-filter"}>
                        <button onClick={() => addScoreFilter(release_desc)}>Data malejąco</button>
                </div>
                <div className={filters.has(sort_param) ? (filters.get(sort_param).includes(release_asc) ? "single-filter enabled" : "single-filter") : "single-filter"}>
                        <button onClick={() => addScoreFilter(release_asc)}>Data rosnąco</button>
                </div>




            </div>
    )
}

export default SortBy
