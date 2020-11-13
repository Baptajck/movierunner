import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Create.scss';

const Create = () => {
  const [error, setError] = useState("");
  const [state, setState] = useState({
    pseudo: "",
    email: "",
    password: ""
  });

  const validateEmail = (email) => {
    const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regEmail.test(email)) {
      return setError("L'email est incorrect");
    } else if (regEmail.test(email)) {
      return true;
    }
  };

  const validatePassword = (password) => {
    const regPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;
    if (!regPassword.test(password)) {
      return setError("Le mot de passe est incorrect");
    } else if (regPassword.test(password)) {
      return true;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = state;

    if (validateEmail(email) && validatePassword(password)) {
      alert("Connected !");
    }
  };

  return (
    <div className="create">
      <h1 className="create-title">Créer un compte</h1>
      <div className="create-container">
        <form action="" className="create-form" onSubmit={handleSubmit}>

          {error.length > 0 && <div className="create-error">{error}</div>}
          
          <div className="create-form-container">
            <input
              className="create-form-input"
              type="text"
              name="pseudo"
              value={state.pseudo}
              onChange={handleChange}
              placeholder=" "
              minLength="4"
              autoComplete="off"
              required
            />
            <label className="create-form-label" htmlFor="pseudo">Pseudo</label>
          </div>

          <div className="create-form-container">
            <input
              className="create-form-input"
              type="text"
              name="email"
              value={state.email}
              onChange={handleChange}
              placeholder=" "
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              autoComplete="off"
              required
            />
            <label className="create-form-label" htmlFor="email">Email</label>
          </div>

          <div className="create-form-container">
            <input
              className="create-form-input"
              type="password"
              name="password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
              value={state.password}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label className="create-form-label" htmlFor="password">Mot de passe</label>
          </div>
          <p className="create-desc">Tu as déjà un compte ? - <NavLink to="/login" className="create-desc-link">se connecter</NavLink></p>
          <button type="submit" className="create-button">Créer un compte</button>

        </form>
      </div>
    </div>
  );
}

export default Create;
