import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../helpers/usersAPI';
import role from '../utils/roleValidator';
import '../style/Login.css';

function LoginPage() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLoginError, setShowLoginError] = useState(false);

  const history = useHistory();

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user.role) {
        history.push(`/${user.role}/products`);
      }
    } catch (error) {
      console.log(error);
    }
  }, [history]);

  const handleChange = (event) => {
    const option = event.target.name;
    const inputs = {
      email: () => setEmail(event.target.value),
      password: () => setPassword(event.target.value),
    };
    inputs[option]();
  };

  const handleClick = (event) => {
    event.preventDefault();
    const option = event.target.name;
    const buttons = {
      register: () => history.push('/register'),
      login: async () => {
        const response = await login(JSON.stringify({ email, password }));
        if (response.message) return setShowLoginError(true);
        localStorage.setItem('user', JSON.stringify(response));
        history.push(role.roleValidator(response));
      },
    };
    buttons[option]();
  };

  useEffect(() => {
    const emailValidator = () => {
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      const isEmailValid = email.match(emailRegex);
      return isEmailValid;
    };
    const passwordValidation = () => {
      const MIN_PASSWORD_LENGTH = 6;
      const isPasswordValid = password.length >= MIN_PASSWORD_LENGTH;
      return isPasswordValid;
    };
    const loginButtonControl = () => {
      const isEmailValid = emailValidator();
      const isPasswordValid = passwordValidation();
      if (isEmailValid && isPasswordValid) return setIsButtonDisabled(false);
      return setIsButtonDisabled(true);
    };
    loginButtonControl();
  });

  return (
    <div className="login">
      <div>
        <img src="/logo.png" alt="logo" className="logo" />
        <h2 className="subtitle">Project Delivery</h2>
      </div>
      <form onSubmit={ handleClick }>
        <input
          type="text"
          placeholder="Login"
          data-testid="common_login__input-email"
          name="email"
          onChange={ handleChange }
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          data-testid="common_login__input-password"
          name="password"
          onChange={ handleChange }
        />
        <br />
        <div className="button-group">
          <button
            type="submit"
            data-testid="common_login__button-login"
            disabled={ isButtonDisabled }
            name="login"
            onClick={ handleClick }
            className="login-btn"
          >
            Login
          </button>
          <button
            type="submit"
            data-testid="common_login__button-register"
            name="register"
            className="register-btn"
            onClick={ handleClick }
          >
            Ainda nao tenho conta
          </button>
        </div>
        {showLoginError && (
          <div className="errorMessage" data-testid="common_login__element-invalid-email">
            <p> Senha ou email invalidos </p>
          </div>
        )}
      </form>

    </div>

  );
}

export default LoginPage;
