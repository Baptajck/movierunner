import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import './MoviesUpcoming.scss';

import { truncStr } from '../../utils';

const MoviesUpcoming = () => {
  const [director, setDirector] = useState([]);
  const [movies, setMovies] = useState([
    { bool: false },
    { movies: [] },
    { poster: {} },
  ]);

  const getMovies = () => {
    axios.get('https://api.themoviedb.org/3/movie/upcoming', {
      params: {
        api_key: 'd21d6f9a11307550b8fe09b60f3ee8ef',
        language: 'fr-FR',
        iso_3166_1: 'FR',
        english_name: 'France',
        page: 1,
      },
    })
    .then((res) => {
      setMovies([
        { bool: true },
        { movies: res.data.results },
        { poster: res.data.results[0] },
      ]);
    })
    .catch(() => (
      AxiosError
    ));
  };

  const getDirectorPoster = () => {
    const { id } = movies[2].poster;
    axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
      params: {
        api_key: 'd21d6f9a11307550b8fe09b60f3ee8ef',
      },
    })
    .then((res) => {
      const data = res.data.crew.filter((c) => c.job === 'Director')
      setDirector(data[0])
    })
    .catch(() => (
      AxiosError
    ));
  };

  useEffect(() => {
    getMovies();
    getDirectorPoster();
  }, [movies[0].bool]);

  const { poster_path, title, overview } = movies[2].poster;
  const { name } = director;

  return (
    <div className="moviesUpcoming">
      <h1 className="moviesUpcoming-title-movies">Films à venir</h1>
      <div className="moviesUpcoming-poster-container">
        <img className="moviesUpcoming-poster-img" src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt=""/>
        <div className="moviesUpcoming-poster-info">
          <h2 className="moviesUpcoming-poster-title">{title}</h2>
          <p className="moviesUpcoming-poster-director">De {name}</p>
          <p className="moviesUpcoming-poster-overview">{truncStr(String(overview), 250)}</p>
        </div>
      </div>
      <div className="moviesUpcoming-movies">
        {
          movies[1].movies.filter((c) => c.title !== '' && c.poster_path !== null)
          .slice(1, 11)
          .map(({ poster_path, title }, id) => (
            <div key={id} className="moviesUpcoming-container-movie">
              <img className="moviesUpcoming-poster" src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title}/>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default MoviesUpcoming;
