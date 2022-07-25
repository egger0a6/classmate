import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function TaskList({tasks, handleDeleteTask}) {
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
          <Button
            onClick={() => handleDeleteTask(task._id)}
          >
            <HighlightOffIcon/>
          </Button>
        </ListItem>
      )}
    </List>
  );
}
