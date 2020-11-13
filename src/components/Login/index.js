import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Login.scss';

const Login = () => {
  const [error, setError] = useState("");
  const [state, setState] = useState({
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
    <div className="login">
      <h1 className="login-title">Se connecter</h1>
      <div className="login-container">
        <form action="" className="login-form" onSubmit={handleSubmit}>

          {error.length > 0 && <div className="login-error">{error}</div>}

          <div className="login-form-container">
            <input
              className="login-form-input"
              type="text"
              name="email"
              value={state.email}
              onChange={handleChange}
              placeholder=" "
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              autoComplete="off"
              required
            />
            <label className="login-form-label" htmlFor="email">Email</label>
          </div>

          <div className="login-form-container">
            <input
              className="login-form-input"
              type="password"
              name="password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
              value={state.password}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label className="login-form-label" htmlFor="password">Mot de passe</label>
          </div>
          <p className="login-desc">Tu n'as pas encore de compte ? - <NavLink to="/create" className="login-desc-link">Créer un compte</NavLink></p>
          <button type="submit" className="login-button">Connexion</button>

        </form>
      </div>
    </div>
  );
}

export default Login;
