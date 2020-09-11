import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import './Home.scss';

const Home = () => {
  const [director, setDirector] = useState([]);
  const [movies, setMovies] = useState([
    { bool: false },
    { movies: [] },
    { poster: {} },
  ]);

  const getMovies = () => {
    axios.get('https://api.themoviedb.org/3/movie/now_playing', {
      params: {
        api_key: 'd21d6f9a11307550b8fe09b60f3ee8ef',
        language: 'fr-FR',
        iso_3166_1: 'FR',
        english_name: 'France',
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
    <div className="home">
      <h1 className="home-title-movies">Films à l'affiche</h1>
      <div className="home-poster-container">
        <img className="home-poster-img" src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt=""/>
        <div className="home-poster-info">
          <h2 className="home-poster-title">{title}</h2>
          <p className="home-poster-director">De {name}</p>
          <p className="home-poster-overview">{overview}</p>
        </div>
      </div>
      <div className="home-movies">
        {
          movies[1].movies.filter((c) => c.title !== '' && c.poster_path !== null)
          .slice(1, 11)
          .map(({ poster_path, title }, id) => (
            <div key={id} className="home-container-movie">
              <img className="home-poster" src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title}/>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Home;
