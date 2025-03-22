import { useNavigate } from 'react-router-dom';
import styles from './TaskCard.module.css';
import DeleteIcon from '../../assets/delete.svg';
import EditIcon from '../../assets/edit.svg';

const TaskCard = (props) => {
  const { task, handleDeleteTask } = props;

  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate(`/tasks/update/${task.id}`, { state: { task } });
  };

  const handleDelete = async () => {
    handleDeleteTask(task.id);
  };

  const getBackgroundColorByState = (state) => {
    if (state === 'en progreso') return 'lightyellow';
    if (state === 'completado') return 'lightgreen';
    return 'lightgray';
  };

  return (
    <div className={styles['main-container']} style={ {backgroundColor: getBackgroundColorByState(task.state) } }>
      <div className={styles['grid-container']}>
        <div className={styles['title-container']}>
          <span>{task.title}</span>
        </div>
        <div className={styles['actions-container']}>
          <button className={styles['edit-button']} onClick={handleUpdate} hidden={ task.state === 'completado' }>
            <img className={styles['action-button']} src={EditIcon} alt='' />
          </button>
          <button className={styles['delete-button']} onClick={handleDelete}>
            <img className={styles['action-button']} src={DeleteIcon} alt='' />
          </button>
        </div>
        <div className={styles['description-container']}>
          <span>{task.description}</span>
        </div>
        <div className={styles['state-container']}>
          <span>Estado: {task.state}</span>
        </div>
        <div className={styles['taskId-container']}>
          <span>{task.id}</span>
        </div>
        <div className={styles['deadline-container']}>
          <span>Fecha limite: { task.deadline ?? 'Sin Definir' }</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
