import {
  Box,
  InputAdornment,
  List,
  Stack,
  TextField,
  styled,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import ChatListItem from "./ChatListItem";
import AddUserAlert from "./AddUserAlert";

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
      <List sx={{ height: "100%" }}>
        <ChatListItem />
        <ChatListItem />
      </List>
      <AddUserAlert addMode={addMode} setMode={setMode} />
    </StyledContainer>
  );
};

export default ChatList;
