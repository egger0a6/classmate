import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from "@mui/material/Divider";
import AssignmentIcon from '@mui/icons-material/Assignment';
import EditIcon from '@mui/icons-material/Edit';

// Components
import DeleteDialog from './DeleteDialog';

export default function TaskList({
  tasks, 
  handleDeleteTask, 
  handleEditTaskButton}) 
{
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {tasks.map(task => 
        <ListItem key={task._id}>
          <ListItemAvatar>
            <Avatar>
              <AssignmentIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText 
            primary={task.name} 
            secondary={task.content}
          />
          <Divider sx={{ height: 28, m: 0.5, bgcolor: "grey.800" }} orientation="vertical" />
          <ListItemText 
            primary={task.priority} 
          />
          <DeleteDialog 
            task={task} 
            handleDeleteTask={handleDeleteTask}
          />
          <Button
            onClick={() => handleEditTaskButton(task._id)}
          >
            <EditIcon/>
          </Button>
        </ListItem>
      )}
    </List>
  );
}
