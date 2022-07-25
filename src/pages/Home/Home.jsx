import styles from './Home.module.css'
import { useState } from 'react'

// Components
import AddTaskForm from '../../components/AddTaskForm/AddTaskForm'
import TaskList from '../../components/TaskList/TaskList'

const Landing = ({ user, tasks, handleAddTask }) => {
  return (
    <main className={styles.container}>
      <h1>Welcome, {user ? user.name : 'friend'}</h1>
      <AddTaskForm handleAddTask={handleAddTask}/>
      <TaskList tasks={tasks}/>
    </main>

  )
}

export default Landing