import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MovieData from './MovieData';
import AllMovie from './AllMovie';
import Favorites from './Favorites';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/movie-data" element={<MovieData />} />
      <Route path="/" element={<App />} />
      <Route path='/all-movie' element={<AllMovie />} />
      <Route path='/favorites' element={<Favorites />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);