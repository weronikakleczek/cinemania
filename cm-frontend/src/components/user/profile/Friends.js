import { useEffect, useState } from "react";
import ApiCall from "../../../api/ApiCall";

const Friends = () => {

    const [friends, setFriends] = useState([]);
    const [query, setQuery] = useState('');
    const [friendsByQuery, setFriendsByQuery] = useState([]);

    useEffect(() => {
        ApiCall.getAllFriends()
        .then(res => {
            console.log('Res: ', res);
            return res.data;
        })
        .then(data => {
            console.log('Data: ', data);
            setFriends(data);
        })
        .catch(err => {
            console.log('Error: ', err);
        })
    }, [])

    const handleAdd = async (username) => {
        await ApiCall.addNewFriend(username)
        .then(res => {
            console.log("Adding new friend, res: ", res);
            return res.data;
        })
        .then(data => {
            console.log("Adding new friend, data: ", data);
        })
        .catch(err => {
            console.log("Adding new friend, error: ", err.message);
        })
        await ApiCall.getAllFriends()
        .then(res => {
            console.log('Res: ', res);
            return res.data;
        })
        .then(data => {
            console.log('Data: ', data);
            setFriends(data);
        })
        .catch(err => {
            console.log('Error: ', err);
        })
    }

    const handleFriendsSearchQuery = (query) => {
        setQuery(query);
        if (query === '') {
            setFriendsByQuery([]);
        } else {
            ApiCall.findFriendsByQuery(query)
            .then(res => {
                console.log("Query: ", query);
                console.log("[Q] Res: ", res);
                return res.data;
            })
            .then(data => {
                console.log("[Q] Data: ", data);
                setFriendsByQuery(data);
            })
        }
    }


    return (
        <div className="single-option friends">
            <div className="friends-list">
                <h2>Twoi znajomi:</h2>
                { friends && (
                    friends.map((val, idx) => (
                        <div key={idx}>{ val.username }</div>
                    ))
                )}
            </div>
            <div className="add-friend">
                Dodaj znajomego:
                <form>
                    <label>Podaj jego nazwę:</label>
                    <input 
                        type="text"
                        required
                        value={query}
                        onChange={e => handleFriendsSearchQuery(e.target.value)}
                    />
                </form>
                { friendsByQuery && (
                    friendsByQuery.map((val, idx) => (
                        <button class="friend-to-add-button" onClick={() => handleAdd(val.username)} key={idx}>
                            {val.username}
                        </button>
                    ))
                )}
            </div>
        </div>
    )
}

export default Friends