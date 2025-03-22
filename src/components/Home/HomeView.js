import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import TaskList from './TaskList';
import styles from './Home.module.css';
import AddIcon from '../../assets/add.svg';
import LogoutIcon from '../../assets/logout.svg';

const HomeView = () => {
  const { logoutUser, user } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
  };

  const handleCreateTask = () => {
    navigate('/tasks/create');
  };

  return (
    <div className={styles['main-container']}>
      <div className={styles['grid-container']}>
        <div className={styles['add-button-container']}>
          <button className={styles['add-button']} onClick={handleCreateTask}>
            <img className={styles['button-image']} src={AddIcon} alt='' />
          </button>
          <div className={styles['button-description']}>
            <span>Agregar Tarea</span>
          </div>
        </div>
        <div className={styles['task-list-container']}>
          <TaskList />
        </div>
        <div className={styles['user-info-container']}>
          <button className={styles['logout-button']} onClick={handleLogout}>
            <img className={styles['button-image']} src={LogoutIcon} alt='' />
          </button>
          <div className={styles['button-description']}>
            <span>Bienvenido {user.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
