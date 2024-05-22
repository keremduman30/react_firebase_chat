import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Chats, useChatStore } from "../libs/chatStore";
import { useUserStore } from "../libs/userStore";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../libs/firebase";

type prop = {
  chatItem: Chats;
  chats: Chats[];
};
const ChatListItem = ({ chatItem, chats }: prop) => {
  const { changeChat } = useChatStore();
  const { currentUser } = useUserStore();
  const handlerClick = async () => {
    if (chatItem.chatId && currentUser) {
      const userChats = chats.map((item) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { user, ...rest } = item;
        return rest;
      });
      const chatIndex = userChats.findIndex(
        (c) => c.chatId === chatItem.chatId
      );
      userChats[chatIndex].isSeen = true;
      const userChatRef = doc(db, "userchats", currentUser?.id);
      try {
        await updateDoc(userChatRef, {
          chats: userChats,
        });
        changeChat(chatItem.chatId, chatItem.user);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <ListItem
        sx={{
          padding: "10px 0px",
          cursor: "pointer",
          backgroundColor: `${chatItem.isSeen ? "trasparent" : "#5183fe"}`,
        }}
        onClick={handlerClick}
      >
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
          secondary={
            <Typography sx={{ fontSize: "12px", fontWeight: "200px" }}>
              {chatItem.lastMessage}
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
