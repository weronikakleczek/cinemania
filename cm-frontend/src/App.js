import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/home/Home";
import Top from "./components/Top";
import Login from "./components/user/Login";
import Search from "./components/search/Search";
import UserContext from "./components/UserContext";
import "./styles/styles.css";
import Register from "./components/user/Register";
import Filter from "./components/filter/Filter";
import SingleMovie from "./components/pictures/SingleMovie";
import SingleTvShow from "./components/pictures/SingleTvShow";
import Profile from "./components/user/profile/Profile";
import useLocalStorage from "./hooks/useLocalStorage";
import Logout from "./components/user/Logout";
import User from "./components/user/User";
import Ankieta from "./components/Ankieta";
import { useState } from "react/cjs/react.development";

const App = () => {
  const [user, setUser] = useLocalStorage("user", null);
  const [list, setList] = useState([]);

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/filter" element={<Filter />} />
          <Route exact path="/top" element={<Top />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/user/:id" element={<User />} />
          <Route exact path="/movie/:id" element={<SingleMovie />} />
          <Route exact path="/tv/:id" element={<SingleTvShow />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route
            exact
            path="/ankieta"
            element={<Ankieta list={list} setList={setList} />}
          />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
