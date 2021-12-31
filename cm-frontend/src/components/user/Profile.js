import React, { useContext, useEffect, useState } from 'react'
import { Route, Router, Routes } from 'react-router-dom';
import ApiCall from '../../api/ApiCall';
import UserContext from '../UserContext';
import ProfileNav from './ProfileNav';
import WatchedMovies from './WatchedMovies';

const Profile = () => {

    const {user, setUser} = useContext(UserContext);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [watchedMovies, setWatchedMovies] = useState([]);

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
    }, [])

    return (
        <div className="profile-container">
            <ProfileNav firstName={firstName} lastName={lastName} />
            <WatchedMovies watchedMovies={watchedMovies}/>        
        </div>
    )
}

export default Profile
