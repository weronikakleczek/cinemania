import axios from "axios";
import { useState, useEffect } from "react";
import authHeader from "../auth/AuthHeader";

const Admin = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8081/pictures/user/admin`, {
        headers: authHeader(),
      })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        setMessage(data);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  return (
    <div className="admin">
      <h1>{message}</h1>
    </div>
  );
};

export default Admin;
