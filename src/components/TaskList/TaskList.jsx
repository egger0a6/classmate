import * as React from 'react';
import "./TaskList.css"

// MUI Components
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from "@mui/material/Divider";
import AssignmentIcon from '@mui/icons-material/Assignment';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import Timer from '../Timer/Timer';

// Components
import DeleteDialog from './DeleteDialog';

export default function TaskList({
  tasks, 
  handleDeleteTask, 
  handleEditTaskButton}) 
{
  const prioColors = [
    "", 
    "#f94144", 
    "#f8961e", 
    "#f9c74f", 
    "#43aa8b", 
    "#118ab2"
  ]

  const avatarColors = [
    "", 
    "rgba(249, 65, 68, 0.3)", 
    "rgba(248, 150, 30, 0.3)", 
    "rgba(249, 199, 79, 0.3)", 
    "rgba(67, 170, 139, 0.3)", 
    "rgba(17, 138, 178, 0.3)"
  ]
  return (
    <>
      {tasks.length ?
        <List 
          sx={{ width: '100%', maxWidth: "100vw", minWidth: "600px"}}
          style={{maxHeight: "70vh", overflow: "auto"}}
          className="listContainer"
        >
          {tasks.map(task => 
            <ListItem key={task._id} alignItems="center"  divider>
              <Tooltip title={`created on ${task.createdAt.slice(0,10)} at ${task.createdAt.slice(12, 16)} utc`}>
                  <ListItemAvatar>
                  <Avatar sx={{background:`${avatarColors[task.priority]}`}}>
                    <AssignmentIcon sx={{fill:`${prioColors[task.priority]}`}}/>
                  </Avatar>
                </ListItemAvatar>
              </Tooltip>
              <ListItemText 
                primaryTypographyProps={{fontSize: '1.2rem', fontWeight: "bold"}}
                primary={task.name} 
                secondary={task.content}
              />
              <ListItemText
                primaryTypographyProps={{fontSize: '1.3rem', color: "#06bdff"}}
                primary={task.priority}
                align='right'
                sx={{paddingRight: '1rem'}}
              />
              <Divider sx={{mr: 2, bgcolor: "grey.100" }} orientation="vertical" flexItem/>
              <Timer sx={{}}/>
              <DeleteDialog 
                task={task} 
                handleDeleteTask={handleDeleteTask}
              />
              <Tooltip title="Edit">
                <Button
                  onClick={() => handleEditTaskButton(task._id)}
                >
                  <EditIcon/>
                </Button>
              </Tooltip>
            </ListItem>
          )}
        </List>
        :
        <h2>Loading...</h2>
      }
    </>
  );
}
