import { Delete, Edit, NoFood } from '@mui/icons-material';
import { IconButton, ListItem, ListItemText } from '@mui/material';
import { MenuItemEntity } from 'domain';

interface Props {
  menu: MenuItemEntity;
}

const MenuItem = ({ menu }: Props) => {
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
      <ListItemText>{menu.name}</ListItemText>
    </ListItem>
  );
};

export default MenuItem;
