import { useState } from "react";
import { validateFormCollection } from "../../services/profileService"

// MUI
import { Box } from "@mui/system";
import { Paper } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const AddTaskForm = ({handleAddTask}) => {
  const priorities = ["1", "2", "3", "4", "5"]
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
    if (isValid) handleAddTask(formData)
  }

  return (
    <div>
      <Box>
        <Paper>
          <form onSubmit={handleSubmit}>
            <TextField
              type="text"
              name="name"
              label="Name"
              autoComplete="off"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleChange} 
              error={!!errors["name"]}
              {...(errors["name"] && {
                error: true,
                helperText: errors["name"]
              })}
            />
            <TextField
              type="text"
              name="content"
              label="Content"
              value={formData.content}
              onChange={handleChange}
            />
            <FormControl>
            <InputLabel id="priority-select">Priority</InputLabel>
            <Select
              sx={{width: "200px"}}
              labelId="priority-select"
              id="priority-select"
              value={formData.priority}
              label="Priority"
              onChange={handleChange}
              name="priority"
              onBlur={handleChange} 
              error={!!errors["priority"]}
              {...(errors["priority"] && {
                error: true,
                helperText: errors["priority"]
              })}
            >
              {priorities.map((priority, idx) => 
                <MenuItem value={priority} key={idx} dense>
                  {priority}
                </MenuItem>
              )}
            </Select>
            </FormControl>
            <Button 
              type="submit"
              disabled={!checkValidForm(formData, errors)}
            > 
              Add Task 
            </Button>
          </form>
        </Paper>
      </Box>
    </div>
  );
}

export default AddTaskForm;