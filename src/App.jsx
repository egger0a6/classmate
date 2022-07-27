import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import * as authService from './services/authService'
import * as profileService from "./services/profileService"
import * as tipService from "./services/tipService"
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    text: {
      primary: "#ffffff",
      secondary: "#ffffff"
    },
    background: {
      paper: "rgba(27,40,56, .7)"
    },
    action: {
      // disabledBackground: "rgba(211, 47, 47, 0.2)",
      // disabled: 'rgba(211, 47, 47, 0.5)'
    }
  },
  typography: {
    fontFamily: [
      'Merriweather',
      'sans-serif',
    ].join(','),
  },
});

const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const navigate = useNavigate()
  const [tasks, setTasks] = useState([])
  const [tips, setTips] = useState([])

  useEffect(() => {
    if (user) {
      const fetchProfileData = async () => {
        const profileData = await profileService.getProfileData()
        setTasks([...profileData.tasks])
      }
      fetchProfileData()
    }
  }, [])

  useEffect(() => {
    const fetchAllTips = async () => {
      const tipData = await tipService.getAll()
      setTips(tipData)
    }
    fetchAllTips()
  }, [])

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }

  const handleAddTask = async (newTaskData) => {
    const updatedProfile = await profileService.addTask(newTaskData)
    setTasks([...updatedProfile.tasks])
  }

  const handleDeleteTask = async (taskId) => {
    const updatedProfile = await profileService.deleteTask(taskId)
    setTasks(updatedProfile.tasks)
  }

  const handleEditTask = async (taskData, taskId) => {
    const updatedProfile = await profileService.editTask(taskData, taskId)
    setTasks([...updatedProfile.tasks])
  }

  const handleDeleteAll = async () => {
    const updatedProfile = await profileService.deleteAllTasks()
    setTasks([])
  }

  const handleAddTip = async (newTipData) => {
    const newTip = await tipService.addTip(newTipData)
    setTips([...tips, newTip])
  }

  return (
    <>
  <ThemeProvider theme={darkTheme}>
      
      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              user={user}
              tasks={tasks}
              handleAddTask={handleAddTask}
              handleDeleteTask={handleDeleteTask}
              handleEditTask={handleEditTask}
              handleDeleteAll={handleDeleteAll}
              handleSignupOrLogin={handleSignupOrLogin}
              handleLogout={handleLogout}
              handleAddTip={handleAddTip}
            />
          } 
        />
        <Route
          path="/signup"
          element={<Signup handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/login"
          element={<Login handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/changePassword"
          element={
            user ? (
              <ChangePassword handleSignupOrLogin={handleSignupOrLogin} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
      </ThemeProvider>
    </>
  )
}

export default App