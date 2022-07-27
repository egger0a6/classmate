import { useState } from "react";

// MUI Components
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Paper } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

// Components
import TipList from "./TipList"

export default function CommentAccordion({ tips }) {
  const categories = [
    "Unit 1",
    "Unit 2",
    "Unit 3",
    "Unit 4",
    "Health/Mind",
    "Coding General",
    "Miscellaneous"
  ]
  const [category, setCategory] = useState(categories[1])

  const handleCategoryChange = (evt) => {
    setCategory(evt.target.value)
  }

  return (
    <Paper sx={{p: 1}}>
      <FormControl fullWidth>
        <InputLabel id="category-select">Category</InputLabel>
        <Select
          labelId="category-select"
          id="category-select"
          label="Category"
          onChange={handleCategoryChange}
          name="category"
        >
          {categories.map((category, idx) => 
            <MenuItem value={category} key={idx} dense>
              {category}
            </MenuItem>
          )}
        </Select>
      </FormControl>
      <Accordion sx={{m: 1}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>GAE-SEI: Tips, Tricks, and Helpful Notes</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {<TipList tips={tips.filter(tip => tip.category === category)} />}
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
}