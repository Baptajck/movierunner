import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { formatDate, timeConvert, truncStr } from '../../utils';
import './MoviesPoster.scss';

const CardMoviesDesktop = ({ id }) => {
  const [movie, setMovie] = useState([]);
  const [director, setDirector] = useState([]);
  const [actors, setActors] = useState([]);

  /**
  * Récupération de tous les détails d'un film
  * @param  {String} u
  * @returns  {array} movie
  */
  const getDetailsMovie = (u) => {
    axios.get(`https://api.themoviedb.org/3/movie/${u}`, {
      params: {
        api_key: 'd21d6f9a11307550b8fe09b60f3ee8ef',
        language: 'fr-FR',
        iso_3166_1: 'FR',
      },
    })
    .then((res) => {
      setMovie(res.data)
    })
    .catch(() => (
      AxiosError
    ));
  }

  /**
  * Récupération du directeur
  * @param  {String} u
  * @returns  {array} director
  */
  const getDirectorMovie = (u) => {
    axios.get(`https://api.themoviedb.org/3/movie/${u}/credits`, {
      params: {
        api_key: 'd21d6f9a11307550b8fe09b60f3ee8ef',
      },
    })
    .then((res) => {
      const data = res.data.crew.filter((c) => c.job === 'Director')
      setActors(res.data.cast)
      setDirector(data[0])
    })
    .catch(() => (
      AxiosError
    ));
  }


  useEffect(() => {
    getDetailsMovie(id);
    getDirectorMovie(id);
  }, [])

  const { poster_path, title, release_date, runtime, overview } = movie;
  const { name } = director;

  return (
    <div className="moviesPoster-card-desktop">
      <img className="moviesPoster-card-desktop-img" src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt=""/>
      <div className="moviesPoster-card-desktop-cont">
        <h2 className="moviesPoster-card-desktop-title">{title}</h2>
        <p className="moviesPoster-card-desktop-info">{formatDate(release_date)} {runtime === 0 ? '' : `| ${timeConvert(runtime)}`} | De {truncStr(String(name), 20)}</p>
        {/* <p className="moviesPoster-card-desktop-info">De {truncStr(String(name), 20)}</p>*/}
        <div className="moviesPoster-card-desktop-actors-cont">
        <p className="moviesPoster-card-desktop-actors--pre">Avec</p>
        {
          actors.slice(0, 3)
          .map(({ name }) => (
              <p className="moviesPoster-card-desktop-actors">{name}</p>
          ))
        }
        </div>
        <p className="moviesPoster-card-desktop-desc">{overview}</p>
      </div>
    </div>
  )
}

export default CardMoviesDesktop;