import Task from './Task'


const Tasks = ({tasks, onDelete, onToggle}) => {
  return (
    <>
      {/* Each child in a list should have a unique "key" prop. */}
      {tasks.map(task => <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} />)}
    </>
  )
}

export default Tasks