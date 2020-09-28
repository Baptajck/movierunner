import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { formatDate, timeConvert } from '../../utils';

const Card = ({ id }) => {
  const [movie, setMovie] = useState([]);
  const [director, setDirector] = useState([]);

  /**
  * Récupération de tous les détails d'un film
  * @param  {String} u
  * @returns  {array} movie
  */
  const getDetailsMovie = (u) => {
    axios.get(`https://api.themoviedb.org/3/movie/${u}`, {
      params: {
        api_key: 'd21d6f9a11307550b8fe09b60f3ee8ef',
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

  const { poster_path, title, release_date, runtime } = movie;
  const { name } = director;

  const theme = localStorage.getItem("theme");

  return (
    <div className="home-card">
      <img className="home-card-img" src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt=""/>
      <h2 className="home-card-title">{title}</h2>
      <p className="home-card-info">{formatDate(release_date)} | {timeConvert(runtime)}</p>
      <p className="home-card-info">De {name}</p>
    </div>
  )
}

export default Card;