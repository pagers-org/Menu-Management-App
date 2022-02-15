import { Delete, Edit, NoFood } from '@mui/icons-material';
import { IconButton, ListItem, ListItemText } from '@mui/material';

const MenuItem = () => {
  return (
    <ListItem
      secondaryAction={
        <>
          <IconButton edge="start" aria-label="sold-out">
            <NoFood />
          </IconButton>
          <IconButton aria-label="edit">
            <Edit />
          </IconButton>
          <IconButton edge="end" aria-label="delete">
            <Delete />
          </IconButton>
        </>
      }
    >
      <ListItemText primary="Single-line item" />
    </ListItem>
  );
};

export default MenuItem;
