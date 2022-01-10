import {useState} from "react";
import ApiCall from "../../../api/ApiCall";

const AdminPage = () => {

    const [query, setQuery] = useState('');
    const [usersByQuery, setUsersByQuery] = useState([]);

    const handleUserSearchQuery = (query) => {
        setQuery(query);
        if (query === '') {
            setUsersByQuery([]);
        } else {
            ApiCall.findUserByQuery(query)
                .then(res => {
                    setUsersByQuery(res.data);
                })
        }
    }


    const handleRemoveUser = (id) => {
        ApiCall.deleteUser(id);
        let newUsersList = usersByQuery.slice().filter(x => x.userId !== id);
        setUsersByQuery(newUsersList);
    }

    return (
        <div className="single-option admin">
            <div className="remove-user">
                <h2>Usuń użytkownika:</h2>
                <form>
                    <label>Podaj jego nazwę:</label>
                    <input
                        type="text"
                        required
                        value={query}
                        onChange={e => handleUserSearchQuery(e.target.value)}
                    />
                </form>
                { usersByQuery && (
                    usersByQuery.map((val, idx) => (
                        <div className="queried-friend" key={idx}>
                            <div className="name">{val.username}</div>
                            <button className="remove-user-button" onClick={() => handleRemoveUser(val.userId)}>
                                Usuń
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default AdminPage