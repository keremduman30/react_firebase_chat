import { Stack } from "@mui/material";
import UserInfo from "./UserInfo";
import ChatList from "./ChatList";

const List = () => {
  return (
    <Stack sx={{ flex: "1" }}>
      <UserInfo />
      <ChatList />
    </Stack>
  );
};

export default List;
