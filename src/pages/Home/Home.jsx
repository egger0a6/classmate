import styles from './Home.module.css'
import { useState } from 'react'

// Components
import AddTaskForm from '../../components/AddTaskForm/AddTaskForm'
import TaskList from '../../components/TaskList/TaskList'
import { validateFormCollection } from "../../services/profileService"

const Landing = ({ 
  user, 
  tasks, 
  handleAddTask, 
  handleDeleteTask
}) => {

  const { validateFields } = validateFormCollection()
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    name: "",
    content: "",
    priority: ""
  })

  const handleChange = (evt) => {
    const { name, value } = evt.target
    setFormData({...formData, [evt.target.name]: evt.target.value})
    validateFields({ [name]: value }, errors, setErrors)
  }

  const handleEditTask = (taskId) => {
    let tempTasks = tasks.filter(task => task._id === taskId)
    let tempTask = tempTasks[0]
    console.log(tempTask)
    setFormData({
      name: tempTask.name,
      content: tempTask.content,
      priority: tempTask.priority
    })
  }

  return (
    <main className={styles.container}>
      <h1>Welcome, {user ? user.name : 'friend'}</h1>
      <AddTaskForm 
        formData={formData}
        errors={errors}
        handleChange={handleChange}
        handleAddTask={handleAddTask}
      />
      <TaskList 
        tasks={tasks} 
        handleDeleteTask={handleDeleteTask}
        handleEditTask={handleEditTask}
      />
    </main>

  )
}

export default Landing