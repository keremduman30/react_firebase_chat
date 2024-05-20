import {
  Box,
  InputAdornment,
  List,
  Stack,
  TextField,
  styled,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import ChatListItem from "./ChatListItem";
import AddUserAlert from "./AddUserAlert";
import { User, useUserStore } from "../libs/userStore";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../libs/firebase";
import { Chats, ChatDoc } from "../libs/chatStore";

const StyledContainer = styled(Box)({
  display: "flex",
  padding: "0 20px",
  flexDirection: "column",
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    width: "5px",
    backgroundColor: "transparent",
  },
  " &::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
  " &::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(17, 25, 40, 0.5)",
  },
});

const StyledTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    height: "30px",
    borderRadius: "10px",
    padding: "10px",
    fontSize: "12px",
    backgroundColor: "rgba(17, 25, 40, 0.5)",
    outline: "none",
    border: "none",
    color: "white",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
});

const StyledBox = styled(Box)({
  width: "30px",
  height: "30px",
  padding: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "10px",
  backgroundColor: "rgba(17, 25, 40, 0.5)",
  cursor: "pointer",
});

const ChatList = () => {
  const [addMode, setMode] = useState<boolean>(false);
  const [chats, setChats] = useState<Chats[]>([]);
  const { currentUser } = useUserStore();
  const [search, setSearch] = useState("");
  /* 

const unsub = onSnapshot(doc(db, "cities", "SF"), (doc) => {
    console.log("Current data: ", doc.data());
});

*/
  useEffect(() => {
    if (currentUser) {
      const unSub = onSnapshot(
        doc(db, "userchats", currentUser?.id),
        async (res) => {
          const items = res.data(); //burada tum userchatsi alacaz ama orada receivedId var direk user bilgils yok
          //user bilgisi oraya kaydetmedik cunku kullanıcı profil ve isim degistirirse direk yansımıyacak o yuzden biz id ile
          //bu userları hepsini alıp setChatse ekliyecez

          if (items) {
            const chats = items.chats as ChatDoc[];
            const promisess = chats.map(async (item: ChatDoc) => {
              const userDocRef = doc(db, "users", item.receiverId);
              const userDocSnap = await getDoc(userDocRef);
              const user = userDocSnap.data() as User;
              return {
                ...item,
                user,
              };
            });
            const chatData = await Promise.all(promisess);
            setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
          }
        }
      );

      return () => {
        unSub();
      };
    }
  }, [currentUser]);

  const filterChats = chats.filter((c) =>
    c.user.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <StyledContainer>
      <Stack
        direction={"row"}
        sx={{
          gap: "20px",
          alignItems: "center",
        }}
      >
        <StyledTextField
          id="input-with-icon-textfield"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  sx={{ width: "20px", height: "20px", color: "white" }}
                />
              </InputAdornment>
            ),
          }}
          onChange={(e) => setSearch(e.target.value)}
          variant="outlined"
          placeholder="Search"
        />
        <StyledBox onClick={() => setMode(!addMode)}>
          <img
            src={addMode ? "/minus.png" : "/plus.png"}
            alt=""
            style={{ width: "15px", height: "15px" }}
          />
        </StyledBox>
      </Stack>
      {filterChats.length > 0 && (
        <List sx={{ height: "100%" }}>
          {filterChats.map((e: Chats) => (
            <ChatListItem
              key={crypto.randomUUID()}
              chatItem={e}
              chats={chats}
            />
          ))}
        </List>
      )}

      <AddUserAlert addMode={addMode} setMode={setMode} />
    </StyledContainer>
  );
};

export default ChatList;
