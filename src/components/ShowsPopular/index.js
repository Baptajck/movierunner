import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import '../../utils/Cards/Movies.scss';
import { NavLink } from 'react-router-dom';
import CardTvShows from '../../utils/Cards/CardTvShows';
import CardTvShowsDesktop from '../../utils/Cards/CardTvShowsDesktop';
import { useWindowSize, truncStr } from '../../utils';

const ShowsPopular = () => {
  const [moviePoster, setMoviePoster] = useState([]);
  const [TvShows, setTvShows] = useState([]);
  const [TvShows2, setTvShows2] = useState([]);

  /**
  * FUNCTION permettant de récuperer les id des films à l'affiche
  * @returns  {array} idMovie
  */
  const getIdTvShows = () => {
    axios.get('https://api.themoviedb.org/3/tv/popular', {
      params: {
        api_key: 'd21d6f9a11307550b8fe09b60f3ee8ef',
        language: 'fr-FR',
        iso_3166_1: 'FR',
        english_name: 'France',
        page: 1,
      },
    })
    .then((res) => {
      setTvShows(res.data.results)
    })
    .catch(() => (
      AxiosError
    ));
  };

  /**
  * FUNCTION permettant de récuperer les id des films à l'affiche
  * @returns  {array} idMovie
  */
  const getIdTvShows2 = () => {
    axios.get('https://api.themoviedb.org/3/tv/popular', {
      params: {
        api_key: 'd21d6f9a11307550b8fe09b60f3ee8ef',
        language: 'fr-FR',
        iso_3166_1: 'FR',
        english_name: 'France',
        page: 2,
      },
    })
    .then((res) => {
      setTvShows2(res.data.results)
    })
    .catch(() => (
      AxiosError
    ));
  };

  useEffect(() => {
    getIdTvShows();
    getIdTvShows2();
  }, []);

  const { width } = useWindowSize();
  const idTvShows = [];
  const idTvShows2 = [];

  TvShows.filter((c) => c.overview !== '')
  .forEach(movie => {
    idTvShows.push(movie.id)
  });

  TvShows2.filter((c) => c.overview !== '')
  .forEach(movie => {
    idTvShows2.push(movie.id)
  });
  return (
    <div className="moviesPoster">
      <h1 className="moviesPoster-title-movies">Séries populaires</h1>
      <p className="moviesPoster-subtitle-movies">Séries les plus regardées en ce moment</p>
      <hr className="moviesPoster-hr"/>
      <div className="moviesPoster-container-page">
        <div className="moviesPoster-movies">
          {
            idTvShows.map((v, i) => (
              width <= 1100 ? (
                <NavLink key={v} to={`movie/${v}`}>
                  <CardTvShows id={v} />
                </NavLink>
              ) : (
                <NavLink key={v} to={`movie/${v}`} className="moviesPoster-card-desktop-link">
                  <CardTvShowsDesktop id={v} />
                </NavLink>
              )
            ))
          }
        </div>
        <div className="moviesPoster-container-page--2">
        {
          idTvShows2.map((v, i) => (
            width >= 1478 ? (
              <NavLink key={v} to={`movie/${v}`}>
                <CardTvShows id={v} />
              </NavLink>
            ) : ''
          ))
        }
        </div>
      </div>
    </div>
  );
}

export default ShowsPopular;
