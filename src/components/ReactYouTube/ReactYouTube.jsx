import React from 'react';
import YouTube from 'react-youtube';
import { useState, useEffect } from 'react';
import "./ReactYouTube.css"

// MUI Components
import { Box } from '@mui/material';
import { Paper } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid"

export default function ReactYouTube({videoId}) 
{
  const videoSelections = [
    {
      title: "lofi hip hop radio (lofi girl)", 
      id: "jfKfPfyJRdk"
    },
    {
      title: "Smooth 'Future Bass' Collection", 
      id: "SoBAQgl0zbo"
    },
    {
      title: "Zelda & Chill + Zelda & Chill 2", 
      id: "-z3RRwk2rdU"
    },
    {
      title: "Minecraft Full Soundtrack", 
      id: "Dg0IjOzopYU"
    },
    {
      title: "Rain & Thunder Sounds", 
      id: "XtDwPLk8EgI"
    },
    {
      title: "Blade Runner Music Radio", 
      id: "0YiNACjWW-4"
    },
    {
      title: "Classical Music for Reading", 
      id: "mIYzp5rcTvU"
    },
    {
      title: "WOBBLE TIME", 
      id: "os_yEOfSGJM"
    } 
  ]

  const [selectData, setSelectData] = useState({videoId: ""})

  const handleChange = (evt) => {
    setSelectData({[evt.target.name]: evt.target.value})
  }

  const onReady = (evt) => {
    // access to player in all event handlers via event.target
    evt.target.pauseVideo();
  }

  const opts = {
    height: '276',
    width: '453',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  }

  return (
    <Box sx={{}}>
      <Paper className='container' sx={{p: 2}}>
        <Grid container>
          <YouTube 
            videoId={selectData.videoId ? selectData.videoId : videoId} 
            opts={opts} 
          />
          <FormControl fullWidth sx={{m: 2}}>
            <InputLabel id="video-select">Current Music Selection</InputLabel>
            <Select
              labelId="video-select"
              id="video-select"
              value={selectData.videoId}
              label="Priority"
              onChange={handleChange}
              name="videoId"
            >
              {videoSelections.map((video, idx) => 
                <MenuItem value={video.id} key={idx}>
                  {video.title}
                </MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>
      </Paper>
    </Box>
  );
}