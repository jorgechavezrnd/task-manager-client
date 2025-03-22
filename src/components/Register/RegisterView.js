import React, { useState } from 'react';
import { register } from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

const RegisterView = () => {
  const [formData, setFormData] = useState({
    name: '',
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
    const response = await register(formData.name, formData.email, formData.password);

    if (response.status === 200) {
      loginUser(response.response.data);
      navigate('/home');
    } else {
      setErrors(response.response.errors.map((error) => error.msg));
    }
  };

  const handleLogin = () => {
    navigate('/login');
  }

  return (
    <div className={styles['main-container']}>
      <div className={styles['grid-container']}>
        <form className={styles['form-container']} onSubmit={handleSubmit}>
          <div className={styles['title-container']}>
            <span>Nuevo Usuario</span>
          </div>
          <div className={styles['name-container']}>
            <input
              className={styles['form-input']}
              type='text'
              name='name'
              placeholder='Nombre'
              value={formData.name}
              onChange={handleChange}
              required
            />
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
            <button className={styles['submit-button']} type='submit'>Registrar</button>
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
        <div className={styles['login-container']}>
          <button className={styles['login-button']} onClick={handleLogin}>Usar mi Cuenta</button>
        </div>
      </div>
    </div>
  );
};

export default RegisterView;
