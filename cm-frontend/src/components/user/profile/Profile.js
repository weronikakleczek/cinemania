import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ApiCall from '../../../api/ApiCall';
import UserContext from '../../UserContext';
import Friends from './Friends';
import ProfileNav from './ProfileNav';
import Stats from './Stats';
import UserInfo from './UserInfo';
import WatchedMovies from './WatchedMovies';
import WatchedTvShows from './WatchedTvShows';

const Profile = () => {

    const {user, setUser} = useContext(UserContext);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [watchedMovies, setWatchedMovies] = useState([]);
    const [watchedTvShows, setWatchedTvShows] = useState([]);
    const [currentView, setCurrentView] = useState('movies');
    const navigate = useNavigate();

    useEffect(() => {
        ApiCall.getUserInfo(user)
        .then(res => {
            return res.data;
         })
        .then(data => {
            setFirstName(data.firstName);
            setLastName(data.lastName);
        })
        .catch(e => {
            console.log("[Profile] Error getting user info: ", e);
            setUser(null);
            navigate('/logout');
        });

        ApiCall.getWatchedMovies(user)
        .then(res => {
            return res.data;
         })
        .then(data => {
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
                { currentView === 'movies'  && <WatchedMovies watchedMovies={watchedMovies}/> }
                { currentView === 'tvShows' && <WatchedTvShows watchedTvShows={watchedTvShows}/> }
                { currentView === 'friends' && <Friends/> }
                { currentView === 'info'    && <UserInfo/> }
                { currentView === 'stats'    && <Stats/> }
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
