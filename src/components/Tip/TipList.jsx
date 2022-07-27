// MUI Components
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import "./TipList.css"

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard({tips, handleDeleteTip}) {
  return (
    <Box 
      style={{maxHeight: "15vh", overflow: "auto"}}
      className="cardContainer"
    >
      {tips.map(tip => 
        <Card sx={{m:0.5}}>
          <CardContent className="cardItems">
            <Typography sx={{fontSize: "1.1rem"}}>
              {bull}{tip.notes}
            </Typography>
            <Button onClick={handleDeleteTip(tip._id)}>
              <HighlightOffIcon sx={{color: "rgba(211, 47, 47, 0.7)"}}/>
            </Button>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
