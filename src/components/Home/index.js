import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { NavLink } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import './Home.scss';
import CardMovies from '../../utils/Cards/CardMovies';
import CardTvShows from '../../utils/Cards/CardTvShows';
import { useWindowSize } from '../../utils';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [upcomings, setUpcomings] = useState([]);
  const [tvShows, setTvShows] = useState([]);

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
      },
    })
    .then((res) => {
      const idMovie = []
      res.data.results.forEach(movie => {
        idMovie.push(movie.id)
      });

      setMovies(idMovie);
    })
    .catch(() => (
      AxiosError
    ));
  };

  /**
  * FUNCTION permettant de récuperer les id des films à venir
  * @returns  {array} idUpcoming
  */
  const getIdUpcomings = () => {
    axios.get('https://api.themoviedb.org/3/movie/upcoming', {
      params: {
        api_key: 'd21d6f9a11307550b8fe09b60f3ee8ef',
        language: 'fr-FR',
        iso_3166_1: 'FR',
        english_name: 'France',
      },
    })
    .then((res) => {
      const idUpcoming = []
      res.data.results.forEach(upcoming => {
        idUpcoming.push(upcoming.id)
      });

      setUpcomings(idUpcoming);
    })
    .catch(() => (
      AxiosError
    ));
  };

  /**
  * FUNCTION permettant de récuperer les id des séries populaires
  * @returns  {array} idTvShow
  */
  const getIdTvShows = () => {
    axios.get('https://api.themoviedb.org/3/tv/popular', {
      params: {
        api_key: 'd21d6f9a11307550b8fe09b60f3ee8ef',
        language: 'fr-FR',
        iso_3166_1: 'FR',
        english_name: 'France',
      },
    })
    .then((res) => {
      const idTvShow = []
      res.data.results.filter((c) => c.title !== '' && c.poster_path !== null)
      .forEach(tvShow => {
        idTvShow.push(tvShow.id)
      });

      setTvShows(idTvShow);
    })
    .catch(() => (
      AxiosError
    ));
  };

  useEffect(() => {
    getIdMovies();
    getIdUpcomings();
    getIdTvShows();
  }, []);

  const { width } = useWindowSize();
  const movieIdSlice = movies.slice(0, (width <= 768 ? 2 : 5));
  const upcomingIdSlice = upcomings.slice(0, (width <= 768 ? 2 : 5));
  const tvShowIdSlice = tvShows.slice(0, (width <= 768 ? 2 : 5));

  return (
    <div className="home">
      <p className="home-desc">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum autem vel aliquid consequuntur ratione odit minus magni, neque voluptatibus, a suscipit quae natus, nemo illo iusto perferendis? Enim, consequatur necessitatibus?</p>

      {/* Film à l'affiche */}
      <section className="home-cards">
        <h1 className="home-cards-title">Films à l'Affiche</h1>
        <p className="home-cards-desc">Films actuellement diffusés au cinéma</p>
        <div className="home-card-container">
          {
            movieIdSlice.map((v) => {
              return (
                <NavLink to={`movie/${v}`}>
                  <CardMovies key={v} id={v} />
                </NavLink>
              )
            })
          }
          <NavLink to="/movies/poster" className="home-cards-link">Voir plus... <IoIosArrowForward /></NavLink>
        </div>
      </section>

      {/* Film à venir */}
      <section className="home-cards">
        <h1 className="home-cards-title">Films à venir</h1>
        <p className="home-cards-desc">Films à venir au cinéma</p>
        <div className="home-card-container">
          {
            upcomingIdSlice.map((v) => {
              return (
                <NavLink to={`movie/${v}`}>
                  <CardMovies key={v} id={v} />
                </NavLink>
              )
            })
          }
          <NavLink to="/movies/upcoming" className="home-cards-link">Voir plus... <IoIosArrowForward /></NavLink>
        </div>
      </section>

      {/* Séries populaires */}
      <section className="home-cards">
        <h1 className="home-cards-title">Séries Populaires</h1>
        <p className="home-cards-desc">Séries les plus regardées en ce moment</p>
        <div className="home-card-container">
          {
            tvShowIdSlice.map((v, i) => {
              return (
                <NavLink to={`tvshow/${v}`}>
                  <CardTvShows key={v} id={v} />
                </NavLink>
              )
            })
          }
          <NavLink to="shows/popular" className="home-cards-link">Voir plus... <IoIosArrowForward /></NavLink>
        </div>
      </section>


    </div>
  );
}

export default Home;
