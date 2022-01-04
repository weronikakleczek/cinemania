import { useContext, useEffect, useState } from "react"
import ApiCall from "../../../api/ApiCall";
import UserContext from "../../UserContext";

const UserInfo = () => {

    const {user, setUser} = useContext(UserContext);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [creationDate, setCreationDate] = useState('');

    
    useEffect(() => {
        ApiCall.getUserInfo(user)
        .then(res => {
            return res.data;
         })
        .then(data => {
            console.log("Recieved data: ", data)
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setEmail(data.email);
            setCreationDate(data.creationDate);
        })
        .catch(e => {
            console.log("Error: ", e);
        });
    }, [])

    return (
        <div className="single-option">
            <div className="info-list">
                <div className="single-info"><div>Imię:</div> <div>{firstName}</div> </div>
                <div className="single-info"><div>Nazwisko:</div> <div>{lastName}</div> </div>
                <div className="single-info"><div>Email:</div> <div>{email}</div> </div>
                <div className="single-info"><div>Data utworzenia:</div> <div>{creationDate}</div> </div>
            </div>
        </div>
    )
}

export default UserInfo