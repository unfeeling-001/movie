import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AllMovie.css';
import './AllMovieMedia.css'
import row from './img/arrow-right.svg';
import star from './img/star.svg';
import logo from './img/logo.svg';
import { Link } from 'react-router-dom';
import preloader from './img/logo.svg';

function AllMovie() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState('');
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
        setIsLoadingAllMovies(false);
        setMovies(response.data.films.slice(0, 15));
      } catch (error) {
        console.error(error);
        setIsLoadingAllMovies(false); 
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
        img: movie.posterUrl
      }
    });
  };

  return (
    <div className="body">
      <div className="bg-color1">
        <div className="navbar1">
          <img className="logo" src={logo} alt="Logo" />
          <div className="nav1">
          <Link to="/favorites"><p>Favorites</p></Link>
            <Link to="/"><p>Back</p></Link>
            <img className="row" src={row} alt="Arrow" />
          </div>
        </div>
        <div className="background2">
          <div className='movies2'>
            <h1>All Movie</h1>
          </div>
          <div className="section2">
            <div className="container">
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
              movies.slice(10, 15).map((movie, index) => (
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllMovie;