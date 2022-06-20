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
    const newSurvey = { firstName, lastName };
    setList((prevState) => [...prevState, newSurvey]);
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

          <select name="role" id="role">
            <option value="student">Student</option>
            <option value="intern">Stażysta</option>
            <option value="professional">Profesjonalista</option>
            <option value="other">Inne</option>
          </select>
        </div>

        <div className={styles.form_control}>
          <label>Czy poleciłbyś stronę Cinemania swoim znajomym?</label>

          <label for="recommed-1">
            <input type="radio" id="recommed-1" name="recommed" />
            Tak
          </label>
          <label for="recommed-2">
            <input type="radio" id="recommed-2" name="recommed" />
            Nie
          </label>
          <label for="recommed-3">
            <input type="radio" id="recommed-3" name="recommed" />
            Może
          </label>
        </div>

        <div className={styles.form_control}>
          <label>Czy wolisz filmy, czy seriale?</label>

          <label for="option-1">
            <input type="radio" id="option-1" name="recommed" />
            Filmy
          </label>
          <label for="option-2">
            <input type="radio" id="option-2" name="recommed" />
            Seriale
          </label>
          <label for="option-3">
            <input type="radio" id="option-3" name="recommed" />
            Ciężko powiedzieć
          </label>
        </div>

        <div className={styles.form_control}>
          <label for="hours" id="label-hours">
            Ile razy w zeszłym roku byłeś w kinie?
          </label>

          <input type="number" id="hours" placeholder="Podaj liczbę godzin" />
        </div>

        <div className={styles.form_control}>
          <label for="hours" id="label-hours">
            Ile subskrypcji na serwisach streamingowych posiadasz?
          </label>

          <input type="number" id="hours" placeholder="Podaj liczbę godzin" />
        </div>

        <div className={styles.form_control}>
          <label for="hours" id="label-hours">
            Ile godzin tygodniowo poświęcasz na oglądanie filmów i seriali?
          </label>

          <input type="number" id="hours" placeholder="Podaj liczbę godzin" />
        </div>

        <div className={styles.form_control}>
          <label>Czy kiedy jesteś w kinie, kupujesz popcorn?</label>

          <label for="option-1">
            <input type="radio" id="option-1" name="recommed" />
            Tak
          </label>
          <label for="option-2">
            <input type="radio" id="option-2" name="recommed" />
            Nie
          </label>
          <label for="option-3">
            <input type="radio" id="option-3" name="recommed" />
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
          />
        </div>

        <div className={styles.form_control}>
          <label for="comment">Co byś zmienił w nowoczesnym kinie?</label>

          <textarea
            name="comment"
            id="comment"
            placeholder="Wpisz propozycje tutaj"
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
