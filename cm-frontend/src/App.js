import { BrowserRouter as Router, Route, Routes, useInRouterContext } from 'react-router-dom'; 
import Navbar from './components/Navbar';
import Home from './components/Home';
import Top from './components/Top';
import Movies from './components/Movies';
import TvShows from './components/TvShows';
import Login from './components/Login';
import Search from './components/Search';
import UserContext from './components/UserContext';
import './styles/styles.css'
<<<<<<< HEAD
=======
import Register from './components/Register';
>>>>>>> c5d7cc2 (started adding jwt)
import { useState } from 'react';

const App = () => {

  const [user, setUser] = useState(null);

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/movies" element={<Movies />} />
          <Route exact path="/search" element={<Search/>} />
          <Route exact path="/tvshows" element={<TvShows />} />
          <Route exact path="/top" element={<Top />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
