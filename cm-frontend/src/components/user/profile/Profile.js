import React, { useContext, useEffect, useState } from 'react'
import ApiCall from '../../../api/ApiCall';
import UserContext from '../../UserContext';
import ProfileNav from './ProfileNav';
import WatchedMovies from './WatchedMovies';
import WatchedTvShows from './WatchedTvShows';

const Profile = () => {

    const {user, setUser} = useContext(UserContext);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [watchedMovies, setWatchedMovies] = useState([]);
    const [watchedTvShows, setWatchedTvShows] = useState([]);
    const [currentView, setCurrentView] = useState('movies');

    useEffect(() => {
        ApiCall.getUserInfo(user)
        .then(res => {
            return res.data;
         })
        .then(data => {
            console.log("Recieved data: ", data)
            setFirstName(data.firstName);
            setLastName(data.lastName);
        })
        .catch(e => {
            console.log("Error: ", e);
        });

        ApiCall.getWatchedMovies(user)
        .then(res => {
            return res.data;
         })
        .then(data => {
            console.log("Watched: ", data);
            setWatchedMovies(data);
        })
        .catch(e => {
            console.log("Error: ", e);
        });

        ApiCall.getWatchedTvShows(user)
        .then(res => {
            return res.data;
         })
        .then(data => {
            console.log("Watched: ", data);
            setWatchedTvShows(data);
        })
        .catch(e => {
            console.log("Error: ", e);
        });
    }, [])

    const capitalize = s => s && s[0].toUpperCase() + s.slice(1)


    return (
        <>
        { user ?
        <div className="profile-container">
            { firstName && lastName && <h1>Witaj, {capitalize(firstName)} {capitalize(lastName)}!</h1>}
            <div className="nav-and-content">
                <ProfileNav setCurrentView={setCurrentView} />
                { currentView === 'movies' && <WatchedMovies watchedMovies={watchedMovies}/> }
                { currentView === 'tvShows' && <WatchedTvShows watchedTvShows={watchedTvShows}/> }
            </div>       
        </div>
        :
        <div className="profile-container">
            Zaloguj się, aby przeglądać profil.
        </div>
        }
        </>
    )
}

export default Profile