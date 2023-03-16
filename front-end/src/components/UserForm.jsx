import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../style/UserForm.css';

export default function UserForm(props) {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [errorMsg, setErrorMsg] = useState(false);

  const SIX = 6;
  const TWELVE = 12;

  useEffect(() => {
    const validateForm = () => {
      const { name, email, password, role } = userInfo;
      const isNameValid = name.length >= TWELVE;
      const isEmailValid = /\S+@\S+\.\S+/.test(email);
      const isPasswordValid = password.length >= SIX;
      const isRoleValid = role !== '';
      setIsButtonDisabled(
        !(isNameValid && isEmailValid && isPasswordValid && isRoleValid),
      );
    };
    validateForm();
  }, [userInfo]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { handleUserCreate } = props;
      await handleUserCreate(userInfo);
      setUserInfo({
        name: '',
        email: '',
        password: '',
        role: 'customer',
      });
      setErrorMsg(false);
    } catch (e) {
      setErrorMsg(true);
    }
  };

  return (
    <div className="user-form">
      <span
        className="form-header"
      >
        Cadastrar novo usuário
      </span>
      <form
        className="form-container"
        onSubmit={ handleSubmit }
      >
        <div className="input-box">
          <label htmlFor="name-input">
            Name
            <br />
            <input
              data-testid="admin_manage__input-name"
              type="text"
              value={ userInfo.name }
              onChange={ handleChange }
              name="name"
            />
          </label>
        </div>
        <div className="input-box">
          <label htmlFor="email-input">
            Email
            <br />
            <input
              data-testid="admin_manage__input-email"
              type="email"
              value={ userInfo.email }
              onChange={ handleChange }
              name="email"
            />
          </label>
        </div>
        <div className="input-box">
          <label htmlFor="password-input">
            Password
            <br />
            <input
              data-testid="admin_manage__input-password"
              type="password"
              value={ userInfo.password }
              onChange={ handleChange }
              name="password"
            />
          </label>
        </div>
        <label htmlFor="role-input">
          <select
            data-testid="admin_manage__select-role"
            value={ userInfo.role }
            onChange={ handleChange }
            name="role"
          >
            <option value="customer">Customer</option>
            <option value="seller">Seller</option>
            <option value="administrator">Administrator</option>
          </select>
        </label>
        <button
          disabled={ isButtonDisabled }
          data-testid="admin_manage__button-register"
          type="submit"
          className="submitBtn"
        >
          Cadastrar
        </button>
        {errorMsg && (
          <span
            data-testid="admin_manage__element-invalid-register"
          >
            Usuário já cadastrado
          </span>)}
      </form>
    </div>
  );
}

UserForm.propTypes = {
  handleUserCreate: PropTypes.func.isRequired,
};
