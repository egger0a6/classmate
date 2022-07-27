import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Paper } from "@mui/material";

export default function CommentAccordion({ tips }) {
  return (
    <Paper>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Tips, Tricks, and Help</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* <CommentList comments={comments} /> */}
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
}