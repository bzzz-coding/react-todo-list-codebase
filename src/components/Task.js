import {Link} from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'

const Task = ({task, onDelete, onToggle}) => {
  return (
    // Use template literal for classes (if reminder is true, add reminder class, or )
    <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task.id)}>
      {/* state gets passed down, event gets passed up */}
      <h3>{task.text} <FaTimes style={{color: 'Salmon', curser: 'pointer'}} onClick={() => onDelete(task.id)} /></h3>
      <p>{task.day}</p>
      <p><Link to={`/task/${task.id}`}>View Details</Link></p>
    </div>
  )
}

export default Task