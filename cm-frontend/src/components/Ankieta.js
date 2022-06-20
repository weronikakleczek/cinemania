import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import star from "../assets/icons/star.png";
import Navbar from "./Navbar";
import styles from "./Ankieta.module.css";

const Quiz = ({ list, setList }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [status, setStatus] = useState("");
  const [recommend, setRecommend] = useState("");
  const [tvMoviesPreference, setTvMoviesPreference] = useState("");
  const [cinemaTime, setCinemaTime] = useState("");
  const [subscriptions, setSubscriptions] = useState("");
  const [hoursWeekly, setHoursWeekly] = useState("");
  const [popcorn, setPopcorn] = useState("");
  const [genres, setGenres] = useState([]);
  const [favMovie, setFavMovie] = useState("");
  const [favTv, setFavTv] = useState("");
  const [changes, setChanges] = useState("");

  const handleSumbit = (e) => {
    e.preventDefault();
    const newSurvey = { firstName, lastName, age, status, recommend, tvMoviesPreference, cinemaTime, subscriptions, hoursWeekly, popcorn, genres, favMovie, favTv,changes };
    setList((prevState) => [...prevState, newSurvey]);

    
    
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('age', age);
    localStorage.setItem('status', status);
    localStorage.setItem('recommend', recommend);
    localStorage.setItem('tvMoviesPreference', tvMoviesPreference);
    localStorage.setItem('cinemaTime', cinemaTime);
    localStorage.setItem('subscriptions', subscriptions);
    localStorage.setItem('hoursWeekly', hoursWeekly);
    localStorage.setItem('popcorn', popcorn);
    localStorage.setItem('genres', genres);
    localStorage.setItem('favMovie', favMovie);
    localStorage.setItem('favTv', favTv);
    localStorage.setItem('changes', changes);

    
    
    console.log(localStorage.getItem('firstName'))
    console.log(localStorage.getItem('lastName'))
    console.log(localStorage.getItem('age'))
    console.log(localStorage.getItem('status'))
    console.log(localStorage.getItem('recommend'))
    console.log(localStorage.getItem('tvMoviesPreference'))
    console.log(localStorage.getItem('cinemaTime'))
    console.log(localStorage.getItem('subscriptions'))
    console.log(localStorage.getItem('hoursWeekly'))
    console.log(localStorage.getItem('popcorn'))
    console.log(localStorage.getItem('genres'))
    console.log(localStorage.getItem('favMovie'))
    console.log(localStorage.getItem('favTv'))
    console.log(localStorage.getItem('changes'))

    console.log(newSurvey);
  };

  return (
    <div>
      {list.map((element) => (
        <div>{element.firstName}</div>
      ))}
      <form id="form">
        <div className={styles.form_control}>
          <label for="first-name" id="label-name">
            Imię
          </label>

          <input
            type="text"
            id="first-name"
            value={firstName}
            placeholder="Podaj swoje imię"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className={styles.form_control}>
          <label for="last-name" id="label-name">
            Nazwisko
          </label>

          <input
            type="text"
            id="last-name"
            placeholder="Podaj swoje nazwisko"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className={styles.form_control}>
          <label for="age" id="label-age">
            Wiek
          </label>

          <input
            type="number"
            id="age"
            placeholder="Podaj swój wiek"
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <div className={styles.form_control}>
          <label for="role" id="label-role">
            Która opcja najlepiej Cię opisuje?
          </label>

          <select name="role" id="role" onChange={(e) => setStatus(e.target.value)}>
            <option value="student">Student</option>
            <option value="stażysta">Stażysta</option>
            <option value="Profesjonalista">Profesjonalista</option>
            <option value="inne">Inne</option>
          </select>
        </div>

        <div className={styles.form_control}>
          <label>Czy poleciłbyś stronę Cinemania swoim znajomym?</label>

          <label for="recommed-1">
            { <input type="radio" id="recommed-1" name="recommed" onChange={() => setRecommend("tak")}/> }
            Tak
          </label>
          <label for="recommed-2">
            <input type="radio" id="recommed-2" name="recommed" onChange={() => setRecommend("nie")} />
            Nie
          </label>
          <label for="recommed-3">
            <input type="radio" id="recommed-3" name="recommed" onChange={() => setRecommend("może")} />
            Może
          </label>
        </div>

        <div className={styles.form_control}>
          <label>Czy wolisz filmy, czy seriale?</label>

          <label for="option-1">
            <input type="radio" id="option-1" name="recommed1" onChange={() => setTvMoviesPreference("Filmy")} />
            Filmy
          </label>
          <label for="option-2">
            <input type="radio" id="option-2" name="recommed1" onChange={() => setTvMoviesPreference("Seriale")} />
            Seriale
          </label>
          <label for="option-3">
            <input type="radio" id="option-3" name="recommed1" onChange={() => setTvMoviesPreference("Ciężko powiedzieć")} />
            Ciężko powiedzieć
          </label>
        </div>

        <div className={styles.form_control}>
          <label for="hours" id="label-hours">
            Ile razy w zeszłym roku byłeś w kinie?
          </label>

          <input type="number" id="hours" placeholder="Podaj liczbę godzin"  onChange={(e) => setCinemaTime(e.target.value)}/>
        </div>

        <div className={styles.form_control}>
          <label for="hours" id="label-hours">
            Ile subskrypcji na serwisach streamingowych posiadasz?
          </label>

          <input type="number" id="hours" placeholder="Podaj liczbę godzin" onChange={(e) => setSubscriptions(e.target.value)} />
        </div>

        <div className={styles.form_control}>
          <label for="hours" id="label-hours">
            Ile godzin tygodniowo poświęcasz na oglądanie filmów i seriali?
          </label>

          <input type="number" id="hours" placeholder="Podaj liczbę godzin" onChange={(e) => setHoursWeekly(e.target.value)} />
        </div>

        <div className={styles.form_control}>
          <label>Czy kiedy jesteś w kinie, kupujesz popcorn?</label>

          <label for="option-1">
            <input type="radio" id="option-1" name="recommed2" onChange={() => setPopcorn("Tak")} />
            Tak
          </label>
          <label for="option-2">
            <input type="radio" id="option-2" name="recommed2" onChange={() => setPopcorn("Nie")} />
            Nie
          </label>
          <label for="option-3">
            <input type="radio" id="option-3" name="recommed2" onChange={() => setPopcorn("Różnie")} />
            Różnie
          </label>
        </div>

        <div className={styles.form_control}>
          <label>Wybierz wszystkie gatunki, które lubisz</label>

          <label for="inp-1">
            <input type="checkbox" name="inp" />
            Akcja
          </label>
          <label for="inp-2">
            <input type="checkbox" name="inp" />
            Romans
          </label>
          <label for="inp-3">
            <input type="checkbox" name="inp" />
            Thriller
          </label>
          <label for="inp-4">
            <input type="checkbox" name="inp" />
            Fantastyka
          </label>
          <label for="inp-5">
            <input type="checkbox" name="inp" />
            Komedia
          </label>
          <label for="inp-6">
            <input type="checkbox" name="inp" />
            Horror
          </label>
        </div>

        <div className={styles.form_control}>
          <label for="fav-movie" id="label-fav-movie">
            Ulubiony film
          </label>

          <input
            type="text"
            id="fav-movie"
            placeholder="Podaj swój ulubiony film"
            onChange={(e) => setFavMovie(e.target.value)}
          />
        </div>

        <div className={styles.form_control}>
          <label for="fav-tv" id="label-fav-tv">
            Ulubiony serial
          </label>

          <input
            type="text"
            id="fav-tv"
            placeholder="Podaj swój ulubiony serial"
            onChange={(e) => setFavTv(e.target.value)}
          />
        </div>

        <div className={styles.form_control}>
          <label for="comment">Co byś zmienił w nowoczesnym kinie?</label>

          <textarea
            name="comment"
            id="comment"
            placeholder="Wpisz propozycje tutaj"
            onChange={(e) => setChanges(e.target.value)}
          ></textarea>
        </div>

        <button type="submit" value="submit" onClick={handleSumbit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Quiz;
