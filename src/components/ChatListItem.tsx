import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

const ChatListItem = () => {
  return (
    <>
      <ListItem sx={{ padding: "10px 0px" }}>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Brunch this weekend?"
          secondary={
            <Typography sx={{ fontSize: "12px", fontWeight: "200px" }}>
              Ali Connors
            </Typography>
          }
        />
      </ListItem>
      <Divider variant="fullWidth" component="li" />
    </>
  );
};

export default ChatListItem;
