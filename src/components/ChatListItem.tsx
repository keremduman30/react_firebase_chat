import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Chat } from "./ChatList";

type prop = {
  chatItem: Chat;
};
const ChatListItem = ({ chatItem }: prop) => {
  return (
    <>
      <ListItem sx={{ padding: "10px 0px" }}>
        <ListItemAvatar>
          <Avatar
            alt="Remy Sharp"
            src={chatItem.user.avatar || "/avatar.png"}
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography sx={{ fontSize: "12px", fontWeight: "200px" }}>
              {chatItem.user.username}
            </Typography>
          }
        />
      </ListItem>
      <Divider
        variant="fullWidth"
        component="li"
        sx={{ backgroundColor: "GrayText" }}
      />
    </>
  );
};

export default ChatListItem;
