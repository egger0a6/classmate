// MUI Components
import { Box } from "@mui/system";
import { Paper } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const AddTaskForm = ({
  formData, 
  handleChange, 
  errors, 
  edit, 
  handleSubmit, 
  checkValidForm, 
  handleClearForm
}) => {
  const priorities = ["1", "2", "3", "4", "5"]

  return (
      <Box 
        component="form" 
        onSubmit={handleSubmit}
      >
        <h4>Add Task</h4>
        <Paper sx={{p: 1.5}}>
          <FormControl>
            <TextField
              type="text"
              name="name"
              label="Name"
              autoComplete="off"
              value={formData.name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <TextField
              type="text"
              name="content"
              label="Notes"
              autoComplete="off"
              value={formData.content}
              onChange={handleChange}
            />
          </FormControl>
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
          {edit ? 
            <Button 
              type="submit"
              disabled={!checkValidForm(formData, errors)}
            > 
              Edit 
            </Button>
            :
            <Button 
              type="submit"
              variant="outlined"
              disabled={!checkValidForm(formData, errors)}
            > 
              Add Task 
            </Button>
          }
          <Button
            onClick={handleClearForm}
            disabled={!(formData.name || formData.priority || formData.content)}
          >
            Clear
          </Button>
        </Paper>
      </Box>
  );
}

export default AddTaskForm;