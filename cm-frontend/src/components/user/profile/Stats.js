import React, { useEffect, useState } from 'react'
import ApiCall from '../../../api/ApiCall';

const Stats = () => {

    const [userStats, setUserStats] = useState(null);

    
    useEffect(() => {
        ApiCall.getUserStats()
        .then(res => {
            return res.data;
         })
        .then(data => {
            console.log("Recieved data: ", data)
            setUserStats(data);
        })
        .catch(e => {
            console.log("Error: ", e);
        });
    }, [])

    return (
        <div className="single-option stats">
        User stats
        { userStats && 
        <div className="stats-list">
            <div className="single-stat"><div>Filmy:</div> <div>{ userStats.movies }</div></div>
            <div className="single-stat"><div>Seriale:</div> <div>{ userStats.tv }</div></div>
            </div>
        }
        </div>
    )
}

export default Stats
