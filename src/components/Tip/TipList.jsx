// MUI Components
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import "./TipList.css"

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard({tips}) {
  return (
    <Box 
      style={{maxHeight: "15vh", overflow: "auto"}}
      className="cardContainer"
    >
      {tips.map(tip => 
        <Card sx={{m:0.5}}>
          <CardContent>
            <Typography sx={{fontSize: "1.1rem"}}>
              {bull}{tip.notes}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
