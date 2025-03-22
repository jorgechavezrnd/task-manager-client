import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getTaskById, updateTask } from '../../services/taskService';
import { useAuth } from '../../contexts/AuthContext';
import styles from './TaskUpdateForm.module.css';

const TaskUpdateForm = () => {
  const { state } = useLocation();
  const [task, setTask] = useState(state?.task);
  const { id } = useParams();
  const { token, logoutUser } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    state: '',
    deadline: '',
  });

  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      if (task) {
        return;
      }

      const response = await getTaskById(id, token);

      if (response.status === 200) {
        setTask(response.response.data.task);
      } else if (response.status === 401) {
        logoutUser();
        navigate('/login');
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    setFormData({
      title: task?.title,
      description: task?.description,
      state: task?.state,
      deadline: task?.deadline ?? '',
    })
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await updateTask(id, formData, token);

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

  if (!task) {
    return (
      <>
        Tarea no encontrada!
      </>
    );
  }

  return (
    <div className={styles['main-container']}>
      <div className={styles['grid-container']}>
        <form className={styles['form-container']} onSubmit={handleSubmit}>
          <div className={styles['title-container']}>
            <span>Actualizar Tarea</span>
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
          <div className={styles['state-container']}>
            <select
              name='state'
              className={styles['form-input']}
              value={formData.state}
              onChange={handleChange}
            >
              <option value='pendiente'>Pendiente</option>
              <option value='en progreso'>En progreso</option>
              <option value='completado'>Completado</option>
            </select>
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
            <button className={styles['submit-button']} type='submit'>Actualizar</button>
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
}

export default TaskUpdateForm;
