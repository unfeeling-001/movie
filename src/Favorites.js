import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Favorites.css';
import './Normalize.css';
import logo from './img/logo.svg';
import star from './img/star.svg';
import row from './img/arrow-right.svg';
import preloader from './img/logo.svg';

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const [isLoadingAllMovies, setIsLoadingAllMovies] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
        setIsLoadingAllMovies(false);
      } catch (error) {
        console.error(error);
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
    }
  };

  return (
    <div className="body">
      <div className="bg-color1">
        <div className="navbar1">
          <img className="logo" src={logo} alt="Logo" />
          <div className="nav1">
            <Link to="/all-movie">
              <p>Movies</p>
            </Link>
            <Link to="/">
              <p>Back</p>
            </Link>
            <img className="row" src={row} alt="Arrow" />
          </div>
        </div>
        <div className="background2">
          <div className="movies2">
            <h1>Favorites</h1>
          </div>
          <div className="section2">
            <div className="container4">
              <div className="all-movie all-movie4">
                {isLoadingAllMovies ? (
                  <div className="preloading4">
                    {[...Array(favorites.length)].map((_, index) => (
                      <div className={`all-movie_${index + 1}`} key={index}>
                        <img src={preloader} alt="Loading" />
                      </div>
                    ))}
                  </div>
                ) : (
                  favorites.map((movie, index) => (
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
                        - Remove from my list
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;