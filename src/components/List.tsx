import { Stack } from "@mui/material";
import UserInfo from "./UserInfo";
import ChatList from "./ChatList";
import { useChatStore } from "../libs/chatStore";

const List = () => {
  const { chatId } = useChatStore();

  return (
    <Stack sx={{ display: { xs: chatId && "none", lg: "block" }, flex: "1" }}>
      <UserInfo />
      <ChatList />
    </Stack>
  );
};

export default List;
