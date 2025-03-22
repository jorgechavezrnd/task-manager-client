import React, { useState } from 'react';
import { login } from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const LoginView = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { loginUser } = useAuth();

  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(formData.email, formData.password);

    if (response.status === 200) {
      loginUser(response.response.data);
      navigate('/home');
    } else {
      setErrors(response.response.errors.map((error) => error.msg));
    }
  };

  const handleRegister = () => {
    navigate('/register');
  }

  return (
    <div className={styles['main-container']}>
      <div className={styles['grid-container']}>
        <form className={styles['form-container']} onSubmit={handleSubmit}>
          <div className={styles['title-container']}>
            <span>Inicio de Sesión</span>
          </div>
          <div className={styles['email-container']}>
            <input
              className={styles['form-input']}
              type='email'
              name='email'
              placeholder='Correo'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles['password-container']}>
            <input
              className={styles['form-input']}
              type='password'
              name='password'
              placeholder='Contraseña'
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles['submit-container']}>
            <button className={styles['submit-button']} type='submit'>Iniciar sesión</button>
          </div>
          {
            errors.length > 0 ? (
              <div className={styles['errors-container']}>
                { errors.map((error, i) => {
                  return (
                    <label className={styles['error-message']} key={i}>- {error}</label>
                  );
                }) }
              </div>
            ) : (<></>)
          }
        </form>
        <div className={styles['register-container']}>
          <button className={styles['create-account-button']} onClick={handleRegister}>Crear Cuenta</button>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
