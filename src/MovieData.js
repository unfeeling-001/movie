import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MovieData.css';
import './Normalize.css';
import './MovieDataMedia.css'
import row from './img/arrow-right.svg';
import star from './img/star.svg';
import logo from './img/logo.svg';
import bg_img from './img/bg-img1.jpeg';
import search1 from './img/search-normal.svg'
import { Link } from 'react-router-dom';
import preloader from './img/logo.svg';

function MovieData() {
  const location = useLocation();
  const [movieName, setMovieName] = useState('');
  const [rating, setRating] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [genres, setGenres] = useState([]);
  const [img, setImg] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (location.state && location.state.movieName) {
      setMovieName(location.state.movieName);
      setRating(location.state.rating);
      setType(location.state.type);
      setDate(location.state.year);
      setTime(location.state.time);
      setGenres(location.state.genres);
      setImg(location.state.img);
      setIsLoading(false);
    }
  }, [location]);

  const handleAddComment = () => {
    if (comment.trim() !== '') {
      setComments(prevComments => [...prevComments, comment]);
      setComment('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddComment();
    }
  };

  return (
    <div className="body">
      <div className="bg-color1">
        <div className="navbar1">
          <img className="logo" src={logo} alt="Logo" />
          <div className="nav1">
            <Link to="/all-movie"><p>Movies</p></Link>
            <Link to="/favorites"><p>Favorites</p></Link>
            <Link to="/"><p>Back</p></Link>
            <img className="row" src={row} alt="Arrow" />
          </div>
        </div>
        <div className="background1">
          <img className="bg-img1" src={bg_img} alt="Background" />
          <div className="section1">
            <p className="movie_name1">{movieName}</p>
          </div>
        </div>
        <div className="section">
          {isLoading ? (
            <img className="movie_img1" src={preloader} alt="Loading" />
          ) : (
            <img className="movie_img1" src={img} alt="Movie" />
          )}
          <div className="movie_info">
            <div className="opisanie">
              <p>Описание фильма</p>
              <div className="raiting1">
                <img src={star} className="star1" alt="Star" />
                <p>{rating}</p>
              </div>
            </div>
            <div className="movie_type">
              <p className="movie-t">Type</p>
              <p className="type">Movie</p>
            </div>
            <div className="date_relise">
              <p className="relise">Release Date</p>
              <p className="date">{date}</p>
            </div>
            <div className="movie_time">
              <p className="movie-t">Run Time</p>
              <p className="time">{time} h</p>
            </div>
            <div className="genres">
              <p className="genres1">Genres</p>
              <p className="genres-t">
                {genres.map((genre, index) => (
                  <span key={genre.genre}>
                    {genre.genre}
                    {index !== genres.length - 1 && ", "}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
        <footer className="footer1">
          <div className="comment">
            <div>
              <input
                className="add_com"
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your comment"
              />
              <img className="search1" src={search1} alt="Search" />
            </div>
            <button className="add_com1" onClick={handleAddComment}>
              Add
            </button>
          </div>
          <div className="comments">
            {comments.map((comment, index) => (
              <div key={index} className="comment-block">
                <p>{comment}</p>
              </div>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}

export default MovieData;