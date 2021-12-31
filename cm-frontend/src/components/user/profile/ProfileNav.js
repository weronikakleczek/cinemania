import React from 'react'

const ProfileNav = ({setCurrentView}) => {
    
    return (
        <div className="profile-nav">
            <button className="option" onClick={() => setCurrentView('movies')}>Obejrzane Filmy</button>
            <button className="option" onClick={() => setCurrentView('tvShows')}>Obejrzane Seriale</button>
            <button className="option">Znajomi</button>
            <button className="option">Dane</button>
            <button className="option">Statystyki</button>
        </div>
    )
}

export default ProfileNav
