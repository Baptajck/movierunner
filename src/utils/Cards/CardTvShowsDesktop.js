import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { formatDate, timeConvert, truncStr } from '../';
import './Movies.scss';

const CardTvShowsDesktop = ({ id }) => {
  const [movie, setMovie] = useState([]);
  const [actors, setActors] = useState([]);

  /**
  * Récupération de tous les détails d'un film
  * @param  {String} u
  * @returns  {array} movie
  */
  const getDetailsMovie = (u) => {
    axios.get(`https://api.themoviedb.org/3/tv/${u}`, {
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
      setActors(res.data.cast)
    })
    .catch(() => (
      AxiosError
    ));
  }


  useEffect(() => {
    getDetailsMovie(id);
    getDirectorMovie(id);
  }, [])

  const { poster_path, name, number_of_episodes, number_of_seasons, overview } = movie;
  console.log(actors);

  return (
    <div className="moviesPoster-card-desktop">
      <img className="moviesPoster-card-desktop-img" src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={name}/>
      <div className="moviesPoster-card-desktop-cont">
        <h2 className="moviesPoster-card-desktop-title">{name}</h2>
        <div className="moviesPoster-card-desktop-actors-cont">
        <p className="moviesPoster-card-desktop-actors--pre">Avec</p>
        {
          actors.slice(0, 3)
          .map(({ name }) => (
              <p className="moviesPoster-card-desktop-actors">{name} </p>
          ))
        }
        </div>
        <div className="home-card-desktop-info--tv">
          <p className="home-card-desktop-info"><span>{number_of_seasons}<br />Saisons</span></p>
          <p className="home-card-desktop-info"><span>{number_of_episodes}<br />Episodes</span></p>
        </div>
        <p className="moviesPoster-card-desktop-desc">{truncStr(String(overview), 550)}</p>
      </div>
    </div>
  )
}

export default CardTvShowsDesktop;