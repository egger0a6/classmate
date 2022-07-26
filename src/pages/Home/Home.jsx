import styles from './Home.module.css'
import { useState } from 'react'
import { validateFormCollection } from "../../services/profileService"

// Components
import AddTaskForm from '../../components/AddTaskForm/AddTaskForm'
import TaskList from '../../components/TaskList/TaskList'
import DeleteAllDialog from "../../components/Home/DeleteAllDialog"

const Home = ({ 
  user, 
  tasks, 
  handleAddTask, 
  handleDeleteTask,
  handleEditTask,
  handleDeleteAll
}) => {

  const [edit, setEdit] = useState(false)
  const [editId, setEditId] = useState("")
  const { validateFields, checkValidForm } = validateFormCollection()
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

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const isValid = Object.values(errors).every((val) => val === "") &&
      checkValidForm(formData, errors)
    if (isValid) {
      if (edit) {
        handleEditTask(formData, editId)
        setEdit(false)
        setFormData({name: "", content: "", priority: ""})
        evt.target.reset()
      }
      else {
        handleAddTask(formData)
        setFormData({name: "", content: "", priority: ""})
        evt.target.reset()
      }
    }
  }

  const handleEditTaskButton = (taskId) => {
    setEditId(taskId)
    setEdit(true)
    let tempTasks = tasks.filter(task => task._id === taskId)
    let tempTask = tempTasks[0]
    setFormData({
      name: tempTask.name,
      content: tempTask.content,
      priority: tempTask.priority
    })
  }

  const handleClearForm = () => {
    setFormData({name: "", content: "", priority: ""})
  }

  return (
    <main className={styles.container}>
      <h1>Welcome, {user ? user.name : 'friend'}</h1>
      <AddTaskForm 
        formData={formData}
        errors={errors}
        edit={edit}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        checkValidForm={checkValidForm}
        handleClearForm={handleClearForm}
      />
      <TaskList 
        tasks={tasks} 
        handleDeleteTask={handleDeleteTask}
        handleEditTaskButton={handleEditTaskButton}
      />
      <DeleteAllDialog handleDeleteAll={handleDeleteAll}/>
    </main>
  )
}

export default Home