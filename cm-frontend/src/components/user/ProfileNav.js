import React from 'react'

const ProfileNav = ({firstName, lastName}) => {
    
    const capitalize = s => s && s[0].toUpperCase() + s.slice(1)

    return (
        <div className="profile-nav">
            { firstName && lastName && <h1>Witaj, {capitalize(firstName)} {capitalize(lastName)}!</h1>}
        </div>
    )
}

export default ProfileNav
