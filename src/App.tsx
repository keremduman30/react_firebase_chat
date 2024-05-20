import { Stack, Typography, styled } from "@mui/material";
import "./App.css";
import Detail from "./components/Detail";
import List from "./components/List";
import Login from "./components/Login";
import Notifications from "./components/Notifications";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./libs/firebase";
import { useUserStore } from "./libs/userStore";
import { useChatStore } from "./libs/chatStore";
import Chat from "./components/Chat";

const Container = styled(Stack)({
  display: "flex",
  flexDirection: "row",
  width: "80vw",
  height: "90vh",
  backgroundColor: "rgba(17, 25, 40, 0.75)",
  backdropFilter:
    "blur(19px) saturate(180%)" /*background  blur and saturate */,
  borderRadius: "12px",
  border: "1px solid rgba(255, 255, 255, 0.125)",
  overflowX: "hidden",
});

function App() {
  const { currentUser, isLoading, fethcUserInfo } = useUserStore();
  const { chatId } = useChatStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fethcUserInfo(user?.uid ?? "");
    });
    return () => {
      unSub();
    };
  }, [fethcUserInfo]);

  console.log(currentUser);

  if (isLoading)
    return (
      <Typography
        variant="h4"
        sx={{
          color: "white",
          padding: "20px",
          textAlign: "center",
          bgcolor: "rgba(20, 25, 34, 0.823)",
        }}
      >
        Loading....
      </Typography>
    );

  return (
    <Container>
      {currentUser ? (
        <>
          <List />

          {chatId && (
            <>
              <Chat />
              <Detail />
            </>
          )}
        </>
      ) : (
        <Login />
      )}
      <Notifications />
    </Container>
  );
}

export default App;
