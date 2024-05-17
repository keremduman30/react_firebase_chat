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
const StyledTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    height: "30px",
    borderRadius: "10px",
    padding: "10px",
    fontSize: "12px",
    backgroundColor: "rgba(17, 25, 40, 0.5)",
    outline: "none",
    border: "none",
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
  // Kaydırma tetikleyicisi
  /*   const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  }); */

  // Kaydırma çubuğu stilleri
  return (
    <Box
      sx={{
        display: "flex",
        padding: "0 20px",
        flexDirection: "column",
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
          //baslangıc scroll ayarları
          width: "5px",
          backgroundColor: "transparent",
        },
        " &::-webkit-scrollbar-track": {
          //arka renk
          backgroundColor: "transparent",
        },
        " &::-webkit-scrollbar-thumb": {
          //arkasındaki color

          backgroundColor: "rgba(17, 25, 40, 0.5)",
        },
      }}
    >
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
    </Box>
  );
};

export default ChatList;
