import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { NavLink } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import { BsFilePost } from 'react-icons/bs';
import { BiTimeFive } from 'react-icons/bi';
import { AiFillStar } from 'react-icons/ai';
import './Home.scss';
import Card from './Card';
import { useWindowSize } from '../../utils';

const Home = () => {
  const [movies, setMovies] = useState([
    { bool: false },
    { ID: [] },
    { movies: [] },
  ]);

  /* FUNCTION permettant de récuperer les films */
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
      const idMovie = []
      res.data.results.forEach(movie => {
        idMovie.push(movie.id)
      });

      setMovies([
        { bool: true },
        { ID: idMovie },
        { movies: res.data.results }
      ]);
    })
    .catch(() => (
      AxiosError
    ));
  };

  useEffect(() => {
    getMovies();
  }, [movies[0].bool]);

  const { width } = useWindowSize();

  const movieIdSlice = movies[1].ID.slice(0, (width <= 768 ? 2 : 5));

  return (
    <div className="home">
      <p className="home-desc">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum autem vel aliquid consequuntur ratione odit minus magni, neque voluptatibus, a suscipit quae natus, nemo illo iusto perferendis? Enim, consequatur necessitatibus?</p>

      <div className="home-cards">
        <h1 className="home-cards-title">Films à l'Affiche</h1>
        <p className="home-cards-desc">Films actuellement diffusés au cinéma</p>
        <div className="home-card-container">
          {
            movieIdSlice.map((v) => {
              return (
                <Card key={v} id={v} />
              )
            })
          }
          <NavLink to="#" className="home-cards-link">Voir plus... <IoIosArrowForward /></NavLink>
        </div>
      </div>
    </div>
  );
}

export default Home;
