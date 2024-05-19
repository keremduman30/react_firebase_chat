import { Stack, styled } from "@mui/material";
import "./App.css";
import Chat from "./components/Chat";
import Detail from "./components/Detail";
import List from "./components/List";
import Login from "./components/Login";
import Notifications from "./components/Notifications";

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
  const user = false;
  return (
    <Container>
      {user ? (
        <>
          <List />
          <Chat />
          <Detail />
        </>
      ) : (
        <Login />
      )}
      <Notifications />
    </Container>
  );
}

export default App;
