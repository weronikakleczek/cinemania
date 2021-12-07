import TopShape from './components/TopShape';
import Navbar from './components/Navbar';
import Popular from './components/Popular';
import Genres from './components/Genres';
import More from './components/More';
import './styles/styles.css'

const App = () => {
  return (
    <div>
      <TopShape />
      <Navbar />
      <Popular />
      <Genres />
      <More />
    </div>
  );
}

export default App;
