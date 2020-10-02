import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { formatDate, timeConvert, truncStr } from '../';
import './Movies.scss';

const CardTvShows = ({ id, test }) => {
  const [tvShow, setTvShow] = useState([]);

  /**
  * Récupération de tous les détails d'un film
  * @param  {String} u
  * @returns  {array} show
  */
  const getDetailsTvShow = (u) => {
    axios.get(`https://api.themoviedb.org/3/tv/${u}`, {
      params: {
        api_key: 'd21d6f9a11307550b8fe09b60f3ee8ef',
      },
    })
    .then((res) => {
      setTvShow(res.data)
    })
    .catch(() => (
      AxiosError
    ));
  }


  useEffect(() => {
    getDetailsTvShow(id);
  }, [])

  const { poster_path, name, number_of_episodes, number_of_seasons } = tvShow;

  return (
    <div className="home-card">
      <img className="home-card-img" src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={name}/>
      <h2 className="home-card-title">{truncStr(String(name), 15)}</h2>
      <div className="home-card-info--tv">
        <p className="home-card-info"><span>{number_of_seasons}<br />Saisons</span></p>
        <p className="home-card-info"><span>{number_of_episodes}<br />Episodes</span></p>
      </div>
    </div>
  )
}

export default CardTvShows;