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
        return res.data;
     })
    .then(data => {
        setPictureList(data);
    })
    .catch(e => {
        setPictureList(null);
    });
}




const SeachUtil = {
    getAndSetGenres,
    getAndSetFilteredListWithNewPage,
    getAndSetFilteredListWithNewFilterOrType,
    getAndSetQueriedListWithNewPage,
    getAndSetQueriedListWithNewQuery
};

export default SeachUtil;