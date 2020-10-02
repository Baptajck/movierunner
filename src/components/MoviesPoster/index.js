import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import './MoviesPoster.scss';
import { NavLink } from 'react-router-dom';
import CardMovies from '../../utils/Cards/CardMovies';
import CardMoviesDesktop from '../../utils/Cards/CardMoviesDesktop';
import { useWindowSize, truncStr } from '../../utils';


const MoviesPoster = () => {
  const [moviePoster, setMoviePoster] = useState([]);
  const [movies, setMovies] = useState([]);
  const [movies2, setMovies2] = useState([]);

  /**
  * FUNCTION permettant de récuperer les id des films à l'affiche
  * @returns  {array} idMovie
  */
  const getIdMovies = () => {
    axios.get('https://api.themoviedb.org/3/movie/now_playing', {
      params: {
        api_key: 'd21d6f9a11307550b8fe09b60f3ee8ef',
        language: 'fr-FR',
        iso_3166_1: 'FR',
        english_name: 'France',
        page: 1,
      },
    })
    .then((res) => {
      setMovies(res.data.results)
    })
    .catch(() => (
      AxiosError
    ));
  };

  /**
  * FUNCTION permettant de récuperer les id des films à l'affiche
  * @returns  {array} idMovie
  */
  const getIdMovies2 = () => {
    axios.get('https://api.themoviedb.org/3/movie/now_playing', {
      params: {
        api_key: 'd21d6f9a11307550b8fe09b60f3ee8ef',
        language: 'fr-FR',
        iso_3166_1: 'FR',
        english_name: 'France',
        page: 2,
      },
    })
    .then((res) => {
      setMovies2(res.data.results)
    })
    .catch(() => (
      AxiosError
    ));
  };

  useEffect(() => {
    getIdMovies();
    getIdMovies2();
  }, []);

  const { width } = useWindowSize();
  const idMovie = [];
  const idMovie2 = [];

  movies.filter((c) => c.overview !== '')
  .forEach(movie => {
    idMovie.push(movie.id)
  });

  movies2.filter((c) => c.overview !== '')
  .forEach(movie => {
    idMovie2.push(movie.id)
  });

  return (
    <div className="moviesPoster">
      <h1 className="moviesPoster-title-movies">Films à l'affiche</h1>
      <p className="moviesPoster-subtitle-movies">Films actuellement diffusés au cinéma</p>
      <hr className="moviesPoster-hr"/>
      {/*
        <div className="moviesPoster-poster-container" title={title}>
          <img className="moviesPoster-poster-img" src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title}/>
          <div className="moviesPoster-poster-info">
            <h2 className="moviesPoster-poster-title">{title}</h2>
            <p className="moviesPoster-poster-director">De {name}</p>
            <p className="moviesPoster-poster-overview">{truncStr(String(overview), 250)}</p>
          </div>
        </div>
      */}
      <div className="moviesPoster-container-page">
        <div className="moviesPoster-movies">
          {
            idMovie.map((v, i) => (
              width <= 768 ? (
                <NavLink key={v} to={`movie/${v}`}>
                  <CardMovies id={v} />
                </NavLink>
              ) : (
                <NavLink key={v} to={`movie/${v}`} className="moviesPoster-card-desktop-link">
                  <CardMoviesDesktop id={v} />
                </NavLink>
              )
            ))
          }
        </div>
        <div className="moviesPoster-container-page--2">
        {
          idMovie2.map((v, i) => (
            width >= 768 ? (
              <NavLink key={v} to={`movie/${v}`}>
                <CardMovies id={v} />
              </NavLink>
            ) : ''
          ))
        }
        </div>
      </div>
    </div>
  );
}

export default MoviesPoster;
