import * as tokenService from '../services/tokenService'

const BASE_URL = `${process.env.REACT_APP_BACK_END_SERVER_URL}/api/profiles`

async function addPhoto(photoData, profileId) {
  const res = await fetch(`${BASE_URL}/${profileId}/add-photo`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    },
    body: photoData
  })
  return await res.json()
}

async function addTask(taskData) {
  const res = await fetch(BASE_URL, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(taskData)
  })
  return res.json()
}

async function getProfileData() {
  const res = await fetch(BASE_URL, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`,
      'Content-Type': 'application/json'
    },
  })
  return res.json()
}

async function deleteTask(taskId) {
  const res = await fetch(`${BASE_URL}/${taskId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    }
  })
  return res.json()
}

async function editTask(taskData, taskId) {
  const res = await fetch(`${BASE_URL}/${taskId}/edit`, {
    method: "PATCH",
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(taskData)
  })
  return res.json()
}

async function deleteAllTasks() {
  const res = await fetch(BASE_URL, {
    method: "DELETE",
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`,
      'Content-Type': 'application/json'
    },
  })
  return res.json()
}

// collection of functions to handle form task validation
function validateFormCollection() {
  function validateFields(formData, errors, setErrors) {
    const tempErrors = {...errors}
    if ("name" in formData) {
      tempErrors.name = formData.name ? "" : "Required"
    }
    if ("priority" in formData) {
      tempErrors.priority = formData.priority ? "" : "Required"
    }

    setErrors({...tempErrors})
  }

  function checkValidForm(formData, errors) {
    const isValid = formData.name &&
      formData.priority &&
      Object.values(errors).every((val) => val === "")
    return isValid
  }

  return {
    validateFields,
    checkValidForm
  }
}

export { 
  addPhoto,
  addTask,
  getProfileData,
  deleteTask,
  editTask,
  deleteAllTasks,
  validateFormCollection
}
