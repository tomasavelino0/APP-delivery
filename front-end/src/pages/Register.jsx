import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createUser } from '../helpers/usersAPI';
import '../style/register.css';

function Register() {
  const [register, setRegister] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [disabledBtn, setDisabledBtn] = useState(true);
  const [registerError, setRegisterError] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRegister((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    const { name, email, password } = register;
    const regexEmail = /^\S+@\S+\.\S+$/;
    const emailValid = regexEmail.test(email);
    const QTD_CHARACTER_NAME = 11;
    const QTD_CHARACTER_PASSWORD = 5;

    const validatedData = emailValid
      && name.length > QTD_CHARACTER_NAME
      && password.length > QTD_CHARACTER_PASSWORD;

    if (!validatedData) {
      setDisabledBtn(true);
    } else {
      setDisabledBtn(false);
    }
  }, [register]);

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const createdRegister = await createUser(JSON.stringify({
        ...register, role: 'customer',
      }));
      localStorage.setItem('user', JSON.stringify(createdRegister));
      history.push('/customer/products');
    } catch (error) {
      console.log(error);
      setRegisterError(true);
    }
  };

  return (
    <body className="container-register">

      <form onSubmit={ handleSubmit } className="forms-container">
        <h1>Cadastro</h1>

        <label htmlFor="input-name" className="input-name">
          Nome
          <input
            type="text"
            id="input-name"
            name="name"
            value={ register.name }
            data-testid="common_register__input-name"
            placeholder="Seu nome"
            onChange={ handleChange }
          />
        </label>

        <label htmlFor="input-email" className="input-email">
          Email
          <input
            type="email"
            id="input-email"
            name="email"
            value={ register.email }
            data-testid="common_register__input-email"
            placeholder="seu-email@site.com.br"
            onChange={ handleChange }
          />
        </label>

        <label htmlFor="input-password" className="input-password">
          Password
          <input
            type="password"
            id="input-password"
            name="password"
            value={ register.password }
            data-testid="common_register__input-password"
            placeholder="**********"
            onChange={ handleChange }
          />
        </label>

        <button
          type="submit"
          data-testid="common_register__button-register"
          disabled={ disabledBtn }
          className="btn-submit"
        >
          CADASTRAR
        </button>

        {
          registerError === true && (
            <p
              data-testid="common_register__element-invalid_register"
              className="error-msg"
            >
              Usuário já cadastrado.
            </p>
          )
        }
      </form>
    </body>
  );
}

export default Register;
