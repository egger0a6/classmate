import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import * as authService from './services/authService'
import * as profileService from "./services/profileService"

const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const navigate = useNavigate()
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const fetchProfileData = async () => {
      const profileData = await profileService.getProfileData()
      setTasks([...profileData.tasks])
    }
    fetchProfileData()
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

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
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
    </>
  )
}

export default App