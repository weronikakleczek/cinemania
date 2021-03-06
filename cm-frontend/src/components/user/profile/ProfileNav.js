import React from 'react'

const ProfileNav = ({setCurrentView, roles}) => {
    
    return (
        <div className="profile-nav">
            <button className="option" onClick={() => setCurrentView('movies')} >Obejrzane Filmy  </button>
            <button className="option" onClick={() => setCurrentView('tvShows')}>Obejrzane Seriale</button>
            <button className="option" onClick={() => setCurrentView('friends')}>Znajomi          </button>
            <button className="option" onClick={() => setCurrentView('info')}   >Dane             </button>
            <button className="option" onClick={() => setCurrentView('stats')}  >Statystyki       </button>
            {
                roles && roles.includes('ADMIN') &&
                <button className="option" onClick={() => setCurrentView('admin')}  >Panel Admina       </button>
            }

        </div>
    )
}

export default ProfileNav
