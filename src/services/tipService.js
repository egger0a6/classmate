import * as tokenService from '../services/tokenService'

const BASE_URL = `${process.env.REACT_APP_BACK_END_SERVER_URL}/api/tips`

async function addTip(tipData) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(tipData)
  })
  return res.json()
}

async function getAll() {
  const res = await fetch(BASE_URL)
  return res.json()
}

async function deleteTip(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    }
  })
  return res.json()
} 

// collection of functions to handle tip form validation
function validateFormCollection() {
  function validateFields(formData, errors, setErrors) {
    const tempErrors = {...errors}
    if ("notes" in formData) {
      tempErrors.notes = formData.notes ? "" : "Required"
    }
    if ("category" in formData) {
      tempErrors.category = formData.category ? "" : "Required"
    }

    setErrors({...tempErrors})
  }

  function checkValidForm(formData, errors) {
    const isValid = formData.notes &&
      formData.category &&
      Object.values(errors).every((val) => val === "")
    return isValid
  }

  return {
    validateFields,
    checkValidForm
  }
}

export {
  addTip,
  getAll,
  deleteTip,
  validateFormCollection
}