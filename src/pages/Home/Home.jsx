import styles from './Home.module.css'
import { useState } from 'react'
import { validateFormCollection } from "../../services/profileService"

// MUI Components
import Quote from '../../components/Quote/Quote'
import Login from '../../pages/Login/Login'
import Grid from "@mui/material/Grid"
import { Typography } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import Box from "@mui/material/Box";
import { Paper } from "@mui/material";

// Components
import AddTaskForm from '../../components/AddTaskForm/AddTaskForm'
import TaskList from '../../components/TaskList/TaskList'
import DeleteAllDialog from "../../components/Home/DeleteAllDialog"
import ReactYouTube from '../../components/ReactYouTube/ReactYouTube'
import AddTipForm from '../../components/Tip/AddTipForm'
import TipAccordion from "../../components/Tip/TipAccordion"

const Home = ({ 
  user, 
  tasks,
  tips,
  handleAddTask, 
  handleDeleteTask,
  handleEditTask,
  handleDeleteAll,
  handleSignupOrLogin,
  handleLogout,
  handleAddTip,
  handleDeleteTip
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
    setEdit(false)
  }

  return (
    <Box sx={{mr: 4, ml: 4}}>
      {user ? 
        <Grid container spacing={4} sx={{
          mt: 5,
        }}>
          <Grid item md={11} sx={{mb: 4}}>
            <Box className={styles.header}>
              <Typography 
                variant='h1' 
                sx={{color: "white", fontStyle: "italic", fontWeight: 700, justifyContent: 'between'}}
              >
                Welcome, {user ? user.name : 'friend'}
              </Typography>
        <Grid item sm={1} alignSelf='end' sx={{m: -15, mb: .5}}><img src="./images/logo.png" alt="classmate logo"/></Grid>
              <Tooltip title="Logout">
                <Button onClick={handleLogout}>
                  <LogoutIcon sx={{color: "white"}}/>
                </Button>
              </Tooltip>
            </Box>
          </Grid>
          <Grid item container md={3}>
            <Grid item md={12} >
              <AddTaskForm 
                formData={formData}
                errors={errors}
                edit={edit}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                checkValidForm={checkValidForm}
                handleClearForm={handleClearForm}
              />
            </Grid>
            <Grid item md={12} >
              <AddTipForm 
                handleAddTip={handleAddTip}
              />
            </Grid>
          </Grid>
          <Grid item md={6}>
            <Paper sx={{p: 1.5}}>
              <DeleteAllDialog handleDeleteAll={handleDeleteAll}/>
              <TaskList 
                tasks={tasks} 
                handleDeleteTask={handleDeleteTask}
                handleEditTaskButton={handleEditTaskButton}
              />
            </Paper>
          </Grid>
          <Grid item container md={3}>
            <Grid item md={12} sx={{height:"33vh"}}>
              <ReactYouTube videoId={"jfKfPfyJRdk"}/>
            </Grid>
            <Grid item md={12} sx={{height: "10vh"}}>
              <Quote/>
            </Grid>
            <Grid item md={12} sx={{height: "25vh"}}>
              <TipAccordion 
                user={user}
                tips={tips} 
                handleDeleteTip={handleDeleteTip}
              />
            </Grid>
          </Grid>
        </Grid>
        :
        <main>
          <Login handleSignupOrLogin={handleSignupOrLogin}/>
        </main>
      }
    </Box>
  )
}

export default Home