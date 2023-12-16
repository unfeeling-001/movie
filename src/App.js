import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './App.css';
import './AppMedia.css';
import './Normalize.css';
import logo from './img/ApnaTV.svg';
import preloader from './img/logo.svg';
import search from './img/search.svg';
import notif from './img/vector.svg';
import bg_img from './img/bg-img.png';
import raiting from './img/Group 2.svg';
import play from './img/play.svg';
import star from './img/star.svg';

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState('');
  const [isNotificationVisible, setNotificationVisible] = useState(false);
  const [isSignUpVisible, setSignUpVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingAllMovies, setIsLoadingAllMovies] = useState(true);

  console.log(movies);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1',
          {
            headers: {
              'X-API-KEY': '508676c4-c164-40d2-8955-80f235b246ce',
              'Content-Type': 'application/json',
            },
          }
        );
        setMovies(response.data.films.slice(0, 10));
        setIsLoading(false);
        setIsLoadingAllMovies(false); // Добавьте эту строку
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        setIsLoadingAllMovies(false); // Добавьте эту строку
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleMovieClick = (movie) => {
    if (movie && movie.nameRu) {
      const isFavorite = favorites.some((fav) => fav.filmId === movie.filmId);
      if (isFavorite) {
        setFavorites(favorites.filter((fav) => fav.filmId !== movie.filmId));
      } else {
        setFavorites([...favorites, movie]);
      }
      setSelectedMovie(movie.nameRu);
    }
  };

  const handleMovieCardClick = (movie) => {
    setSelectedMovie(movie.nameRu);
    navigate('/movie-data', {
      state: {
        movieName: movie.nameRu,
        rating: movie.rating,
        type: movie.type,
        year: movie.year,
        time: movie.filmLength,
        genres: movie.genres,
        img: movie.posterUrl,
      },
    });
  };

  const handleMovieCardClick1 = (movie) => {
    if (movie && movie.nameRu) {
      setSelectedMovie(movie.nameRu);
      setSelectedImage(movie.posterUrl);
    }
  };

  const handleNotificationClick = () => {
    setNotificationVisible(!isNotificationVisible);
  };

  const handleSignUpClick = () => {
    setSignUpVisible(!isSignUpVisible);
  };

  return (
    <div className="App">
      <div className={`sign ${isSignUpVisible ? 'sign_on' : ''}`}>
        <form>
          <div>
            <p onClick={handleSignUpClick}>x</p>
          </div>
          <input placeholder="Введите вашу почту" type="mail" />
          <input placeholder="Введите пароль" type="password" />
          <input placeholder="Повторите ваш пароль" type="password" />
          <button>Зарегистрироваться</button>
        </form>
      </div>
      <div className="header">
        <div className="container">
          <img className="bg-img" src={bg_img} alt="Background" />
          <div className="nav">
            <div className="nav_1">
              <Link to="/all-movie">
                <button href="#" className="mov">
                  Movies
                </button>
              </Link>
              <Link to="/favorites">
                <button href="#" className="fav">
                  Favorites
                </button>
              </Link>
            </div>
            <div className="nav_2">
              <img className="logo" src={logo} alt="Logo" />
            </div>
            <div className="nav_3">
              <div className={`notification ${isNotificationVisible ? 'notification_off' : ''}`}>
                <p>Вы добавили фильм в избранное</p>
                <p>Вы добавили фильм в избранное</p>
                <p>Вы удалили фильм из избранных</p>
              </div>
              <img className="search" src={search} alt="Search" />
              <img
                className="notif"
                src={notif}
                alt="Notification"
                onClick={handleNotificationClick}
              />
              <button onClick={handleSignUpClick}>Sign Up</button>
            </div>
          </div>
          <div className="header-move">
            <h1 className="movie-name">{selectedMovie}</h1>
            <img className="raiting" src={raiting} alt="Rating" />
            <div className="watch_movie">
              <button className="watch">
                <img src={play} alt="Play" />
                <Link to={{ pathname: '/', state: { movieName: selectedMovie } }}>Watch Now</Link>
              </button>
              <button className="watch-2">
                <a>Trailer</a>
              </button>
            </div>
            <div className='selectimg'>
            {selectedImage && <img src={selectedImage} alt="selectMovie" />}
            </div>
          </div>
          <div className="movie-list">
            <p>Popular Movies</p>
            <div className="movie-cards">
            <div className="header-list">
            {isLoading ? (
              <div className="preloading1">
                <img src={preloader} alt="Loading" />
                <img src={preloader} alt="Loading" />
                <img src={preloader} alt="Loading" />
                <img src={preloader} alt="Loading" />
                <img src={preloader} alt="Loading" />
                <img src={preloader} alt="Loading" />
              </div>
            ) : (
              movies.map((movie, index) => (
                <div
                  className={`list-item_${index + 1} ${index === currentIndex ? 'active' : ''}`}
                  key={movie.filmId}
                  onClick={() => handleMovieCardClick1(movie)}
                >
                  <div className="preloading">
                    {!movie.posterUrl ? (
                      <img src={preloader} alt="Loading" />
                    ) : (
                      <img src={movie.posterUrl} alt={movie.nameRu} />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <div className="container">
          <p className="container_p">Movies</p>
          <div className="all-movie all-movie-2">
          {isLoadingAllMovies ? (
            <div className="preloading3">
              {[...Array(5)].map((_, index) => (
                <div className={`all-movie_${index + 1}`} key={index}>
                  <img src={preloader} alt="Loading" />
                </div>
              ))}
            </div>
            ) : (
              movies.slice(0, 5).map((movie, index) => (
                <div className={`all-movie_${index + 1}`} key={movie.filmId}>
                  <container>
                    <img className="star" src={star} alt="Star" />
                    <p className="rating">{movie.rating}</p>
                  </container>
                  <img
                    src={movie.posterUrl}
                    alt={movie.nameRu}
                    onClick={() => handleMovieCardClick(movie)}
                  />
                  <p className="movie_name">{movie.nameRu}</p>
                  <p className="add-list" onClick={() => handleMovieClick(movie)}>
                    {favorites.some((fav) => fav.filmId === movie.filmId)
                      ? '- Remove from my list'
                      : '+ Add to my list'}
                  </p>
                </div>
              ))
            )}
          </div>
          <div className="all-movie all-movie-2">
          {isLoadingAllMovies ? (
            <div className="preloading3">
              {[...Array(5)].map((_, index) => (
                <div className={`all-movie_${index + 1}`} key={index}>
                  <img src={preloader} alt="Loading" />
                </div>
              ))}
            </div>
            ) : (
              movies.slice(5, 10).map((movie, index) => (
                <div className={`all-movie_${index + 1}`} key={movie.filmId}>
                  <container>
                    <img className="star" src={star} alt="Star" />
                    <p className="rating">{movie.rating}</p>
                  </container>
                  <img
                    src={movie.posterUrl}
                    alt={movie.nameRu}
                    onClick={() => handleMovieCardClick(movie)}
                  />
                  <p className="movie_name">{movie.nameRu}</p>
                  <p className="add-list" onClick={() => handleMovieClick(movie)}>
                    {favorites.some((fav) => fav.filmId === movie.filmId)
                      ? '- Remove from my list'
                      : '+ Add to my list'}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;