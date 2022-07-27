import { Box } from '@mui/material';
import { Paper } from "@mui/material";
import React from 'react';
import YouTube from 'react-youtube';

import "./ReactYouTube.css"

export default function ReactYouTube({videoId}) 
{
  const onReady = (evt) => {
    // access to player in all event handlers via event.target
    evt.target.pauseVideo();
  }

  const opts = {
    height: '276',
    width: '453',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  }

  return (
    <Box sx={{height: "100vh"}}>
      <Paper className='container' sx={{p: 2}}>
        <YouTube 
          videoId={videoId} 
          opts={opts} 
          onReady={onReady} 
        />
      </Paper>
    </Box>
  );
}