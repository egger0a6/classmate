// MUI Components
import { Box } from "@mui/system";
import { Paper } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import "./AddTipForm.css"
import { useState } from "react";
import { validateFormCollection } from "../../services/tipService";

const AddTipForm = ({handleAddTip}) => {
  const categories = [
    "Unit 1",
    "Unit 2",
    "Unit 3",
    "Unit 4",
    "Health/Mind",
    "Coding General",
    "Miscellaneous"
  ]

  const { validateFields, checkValidForm } = validateFormCollection()
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    notes: "",
    category: ""
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
    if (isValid) handleAddTip(formData)
    setFormData({notes: "", category: ""})
    evt.target.reset()
  }

  const handleClearForm = () => {
    setFormData({notes: "", category: ""})
  }

  return (
      <Box 
        component="form" 
        onSubmit={handleSubmit}
      >
        <Paper sx={{p: 1.5}} className="input-container">
          <h4>{"Add <GA-SEI> Tip"}</h4>
          <FormControl fullWidth sx={{m: 1}}>
            <TextField
              type="text"
              name="notes"
              label="Notes"
              multiline
              rows={3}
              autoComplete="off"
              value={formData.notes}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl fullWidth sx={{m: 1}}>
            <InputLabel id="category-select">Category</InputLabel>
            <Select
              labelId="category-select"
              id="category-select"
              value={formData.category}
              label="Category"
              onChange={handleChange}
              name="category"
            >
              {categories.map((category, idx) => 
                <MenuItem value={category} key={idx} dense>
                  {category}
                </MenuItem>
              )}
            </Select>
          </FormControl>
          <Button 
            sx={{m: 1}}
            fullWidth
            type="submit"
            variant="contained"
            disabled={!checkValidForm(formData, errors)}
          > 
            Add Tip 
          </Button>
          <Button
            sx={{m: 1, width: "33%"}}
            variant="outlined"
            onClick={handleClearForm}
            disabled={!(formData.notes || formData.category)}
          >
            Clear
          </Button>
        </Paper>
      </Box>
  );
}

export default AddTipForm;