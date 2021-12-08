import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Navbar from './components/Navbar';
import Home from './components/Home';
import Top from './components/Top';
import Movies from './components/Movies';
import TvShows from './components/TvShows';
import Login from './components/Login';
import './styles/styles.css'

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/movies" element={<Movies />} />
        <Route exact path="/tvshows" element={<TvShows />} />
        <Route exact path="/top" element={<Top />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
