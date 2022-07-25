import { useState } from "react";

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
  const [formData, setFormData] = useState({
    name: "",
    content: "",
    priority: ""
  })

  const handleChange = (evt) => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleAddTask(formData)
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
            >
              {priorities.map((priority, idx) => 
                <MenuItem value={priority} key={idx} dense>
                  {priority}
                </MenuItem>
              )}
            </Select>
            </FormControl>
            <Button type="submit"> Add Task </Button>
          </form>
        </Paper>
      </Box>
    </div>
  );
}

export default AddTaskForm;