import ApiCall from "./ApiCall";

const getAndSetGenres = (setGenres, type) => {
    return ApiCall.getGenres(type)
    .then(res => {
        return res.data;
    })
    .then(data => {
        setGenres(data);
        return data;
    })
    .catch(e => {
        console.log(e)
        setGenres(null);
    });
}

const getAndSetFilteredListWithNewPage = (filters, pictureList, setPictureList, page, type) => {
    ApiCall.getFilteredList(filters, page, type)
    .then(res => {
        return res.data;
    })
    .then(data => {
        if (Array.isArray(pictureList) && pictureList.length) {
            setPictureList(pictureList.concat(data));
        } else {
            setPictureList(data);
        }
    })
    .catch(e => {
        console.log(e);
        setPictureList(null);
    });
}

const getAndSetFilteredListWithNewFilterOrType = (filters, setPictureList, type) => {
    console.log('Filters:', filters);
    console.log('Type:', type);
    ApiCall.getFilteredList(filters, 1, type)
    .then(res => {
        return res.data;
    })
    .then(data => {
        setPictureList(data);
        console.log('Data: ', data);
    })
    .catch(e => {
        console.log(e);
        setPictureList(null);
    });
}

const getAndSetQueriedListWithNewPage = (query, pictureList, setPictureList, page) => {
    ApiCall.getQueriedList(query, page)
    .then(res => {
            return res.data;
     })
    .then(data => {
        if (Array.isArray(pictureList) && pictureList.length) {
            setPictureList(pictureList.concat(data));
        } else {
            setPictureList(data);
        }
    })
    .catch(e => {
        setPictureList(null);
    });
}

const getAndSetQueriedListWithNewQuery = async (query, setPictureList) => {
    ApiCall.getQueriedList(query, 1)
    .then(res => {
        console.log("Res from util: ", res)
        return res.data;
     })
    .then(data => {
        console.log("Data from util: ", data)
        setPictureList(data);
    })
    .catch(e => {
        setPictureList(null);
    });
}


const getAndSetSinglePicture =  (id, setMovie, type) => {
    ApiCall.getSinglePicture(id, type)
    .then(res => {
        return res.data;
     })
    .then(data => {
        setMovie(data);
    })
    .catch(e => {
        console.log('Error: ', e);
        setMovie(null);
    });
}

const getAndSetReviews = (id, set, type) => {
    ApiCall.getReviews(id, type)
    .then(res => {
        console.log("REEEEEEEEES: ", res.data);
        return res.data;
     })
    .then(data => {
        set(data);
    })
    .catch(e => {
        console.log('Error: ', e);
        set(null);
    });
}



const getAndSetTrending = (set, setSize) => {
    ApiCall.getTrending()
    .then(res => {
            return res.data;
     })
    .then(data => {
        set(data);
        setSize(data.length);
    })
    .catch(e => {
        console.log(e.message);
    });
}


const getAndSetRecommendations = (id, set, setSize) => {
    ApiCall.getRecommendedPictures(id)
    .then(res => {
        return res.data;
     })
    .then(data => {
        set(data);
        setSize(data.length);
    })
    .catch(e => {
        console.log('Error: ', e);
        set(null);
    });
}

const getAndSetWatched = (type, username, picture_id, set) => {
    return ApiCall.getIsWatched(type, username, picture_id)
        .then(res => {
            return res.data;
        })
        .then(data => {
            set(data);
            return data;
        })
        .catch(e => {
            console.log('Error: ', e);
            set(false);
        });
}

const getAndSetScoreAndReview = (type, user, id, setScore, setReview) => {
    ApiCall.getScore(type, user, id)
        .then(res => {
            return res.data;
        })
        .then(data => {
            setScore(data);
        })
        .catch(e => {
            console.log('Error: ', e);
            setScore(null);
        });

    ApiCall.getReview(type, user, id)
        .then(res => {
            return res.data;
        })
        .then(data => {
            setReview(data);
        })
        .catch(e => {
            console.log('Error: ', e);
            setReview(null);
        });
}




const SearchUtil = {
    getAndSetGenres,
    getAndSetFilteredListWithNewPage,
    getAndSetFilteredListWithNewFilterOrType,
    getAndSetQueriedListWithNewPage,
    getAndSetQueriedListWithNewQuery,
    getAndSetSinglePicture,
    getAndSetReviews,
    getAndSetTrending,
    getAndSetRecommendations,
    getAndSetWatched,
    getAndSetScoreAndReview
};

export default SearchUtil;