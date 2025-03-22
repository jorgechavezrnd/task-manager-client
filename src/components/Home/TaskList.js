import { useEffect, useState } from 'react';
import TaskCard from './TaskCard';
import { useAuth } from '../../contexts/AuthContext';
import { deleteTask, getTasksByUser } from '../../services/taskService';
import styles from './TaskList.module.css';
import { useNavigate } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const { token, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    search: '',
    deadline: '',
    state: '',
  });

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    const response = await getTasksByUser(token, searchData.search, searchData.deadline, searchData.state);

    if (response.status === 200) {
      setTasks(response.response.data.tasks.sort((t1, t2) => t1.id - t2.id));
    } else if (response.status === 401) {
      logoutUser();
      navigate('/login');
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const response = await getTasksByUser(token);

      if (response.status === 200) {
        setTasks(response.response.data.tasks.sort((t1, t2) => t1.id - t2.id));
      } else if (response.status === 401) {
        logoutUser();
        navigate('/login');
      }
    };

    loadData();
  }, [token]);

  const handleDeleteTask = async (id) => {
    const response = await deleteTask(id, token);

    if (response.status === 200) {
      const filteredTasks = tasks.filter((task) => task.id !== id);
      setTasks(filteredTasks);
    } else if (response.status === 401) {
      logoutUser();
      navigate('/login');
    }
  };

  return (
    <div className={styles['main-container']}>
      <div className={styles['grid-container']}>
        <form className={styles['search-form-container']} onSubmit={handleSearch}>
          <div className={styles['title-container']}>
            <span>Filtros</span>
          </div>
          <div className={styles['search-container']}>
            <input
              className={styles['form-input']}
              type='text'
              name='search'
              placeholder='Palabra Clave'
              value={searchData.search}
              onChange={handleSearchChange}
            />
          </div>
          <div className={styles['deadline-container']}>
            <input
              className={styles['form-input']}
              type='date'
              name='deadline'
              placeholder='Fecha Límite'
              value={searchData.deadline}
              onChange={handleSearchChange}
            />
          </div>
          <div className={styles['state-container']}>
            <select
              name='state'
              className={styles['form-input']}
              value={searchData.state}
              onChange={handleSearchChange}
            >
              <option value=''>Seleciona una estado</option>
              <option value='pendiente'>Pendiente</option>
              <option value='en progreso'>En progreso</option>
              <option value='completado'>Completado</option>
            </select>
          </div>
          <div className={styles['submit-button-container']}>
            <button className={styles['submit-button']} type='submit'>Filtrar</button>
          </div>
        </form>
        <div className={styles['count-container']}>
          <span>{tasks.length} tareas encontradas</span>
        </div>
        <div className={styles['tasks-container']}>
          { tasks.map((task) => {
            return (
              <div key={task.id} className={styles['task-card']}>
                <TaskCard task={task} handleDeleteTask={handleDeleteTask} />
              </div>
            );
          }) }
        </div>
      </div>
    </div>
  );
};

export default TaskList;
