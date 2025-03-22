import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { createTask } from '../../services/taskService';
import styles from './TaskForm.module.css';

const TaskForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
  });

  const { token, logoutUser } = useAuth();

  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createTask(formData, token);

    if (response.status === 200) {
      navigate('/home');
    } else if (response.status === 401) {
      logoutUser();
      navigate('/login');
    } else {
      setErrors(response.response.errors.map((error) => error.msg));
    }
  };

  const handleHome = () => {
    navigate('/home');
  }

  return (
    <div className={styles['main-container']}>
      <div className={styles['grid-container']}>
        <form className={styles['form-container']} onSubmit={handleSubmit}>
          <div className={styles['title-container']}>
            <span>Nueva Tarea</span>
          </div>
          <div className={styles['task-title-container']}>
            <input
              className={styles['form-input']}
              type='text'
              maxLength='255'
              name='title'
              placeholder='Título'
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles['description-container']}>
            <input
              className={styles['form-input']}
              type='text'
              name='description'
              placeholder='Descripción'
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className={styles['deadline-container']}>
            <input
              className={styles['form-input']}
              type='date'
              name='deadline'
              placeholder='Fecha Límite'
              value={formData.deadline}
              onChange={handleChange}
            />
          </div>
          <div className={styles['submit-container']}>
            <button className={styles['submit-button']} type='submit'>Crear</button>
          </div>
          <div className={styles['cancel-container']}>
            <button className={styles['cancel-button']} onClick={handleHome}>Cancelar</button>
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
      </div>
    </div>
  );
};

export default TaskForm;
