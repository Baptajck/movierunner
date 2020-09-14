import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import './ShowsPopular.scss';

const ShowsPopular = () => {
  const [movies, setMovies] = useState([
    { bool: false },
    { movies: [] },
    { poster: {} },
  ]);

  const getMovies = () => {
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

  useEffect(() => {
    getMovies();
  }, [movies[0].bool]);

  const { poster_path, name, overview } = movies[2].poster;

  return (
    <div className="showsPopular">
      <h1 className="showsPopular-title-movies">Séries populaires</h1>
      <div className="showsPopular-poster-container">
        <img className="showsPopular-poster-img" src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt=""/>
        <div className="showsPopular-poster-info">
          <h2 className="showsPopular-poster-title">{name}</h2>
          <p className="showsPopular-poster-overview">{overview}</p>
        </div>
      </div>
      <div className="showsPopular-movies">
        {
          movies[1].movies.filter((c) => c.title !== '' && c.poster_path !== null)
          .slice(1, 11)
          .map(({ poster_path, title }, id) => (
            <div key={id} className="showsPopular-container-movie">
              <img className="showsPopular-poster" src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title}/>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default ShowsPopular;
