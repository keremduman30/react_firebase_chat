import {
  Avatar,
  Box,
  Button,
  CardHeader,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { red } from "@mui/material/colors";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";

const Container = styled(Box)({
  flex: "2",
  borderLeft: "1px solid grey",
  borderRight: "1px solid grey",
  height: "100%",
  display: "flex",
  flexDirection: "column",
});
const StyledTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    outline: "none",
    border: "none",
    backgroundColor: "rgba(17, 25, 40, 0.5)",
    borderRadius: "10px",
    fontSize: "16px",
    color: "white",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
});

const StyledImg = styled("img")({
  width: "20px",
  height: "20px",
  cursor: "pointer",
});

const CenterStack = styled(Stack)({
  flex: 1,
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    //baslangıc scroll ayarları
    width: "10px",
    backgroundColor: "rgba(17, 25, 40, 0.5)",
  },
  /*  " &::-webkit-scrollbar-track": {
    //arka renk
    backgroundColor: "transparent",
  }, */
  " &::-webkit-scrollbar-thumb": {
    //arkasındaki color

    backgroundColor: "grey",
  },
  gap: "20px",
});

const StyledMsgTypography = styled(Typography)({
  padding: "20px",
  borderRadius: "20px",
  color: "white",
});

const Chat = () => {""
  const [openEmoji, setOpenEmoji] = useState<boolean>(false);
  const [textMsg, setTextMsg] = useState<string>("");

  const endRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handlerEmoji = (e: EmojiClickData) => {
    setTextMsg(textMsg + e.emoji);
    setOpenEmoji(false);
  };

  return (
    <Container>
      <CardHeader
        avatar={
          <Avatar
            src="/avatar.png"
            sx={{
              bgcolor: red[500],
              width: "50px",
              height: "50px",
              objectFit: "cover",
            }}
            aria-label="recipe"
          />
        }
        action={
          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            <IconButton aria-label="settings">
              <img src="/phone.png" width={20} height={20} />
            </IconButton>
            <IconButton aria-label="settings">
              <img src="/video.png" width={20} height={20} />
            </IconButton>
            <IconButton aria-label="settings">
              <img src="/info.png" width={20} height={20} />
            </IconButton>
          </Stack>
        }
        title={
          <Typography variant="h6" fontSize={18}>
            John Doe
          </Typography>
        }
        subheader="September 14, 2016"
      />
      <Divider variant="fullWidth" sx={{ bgcolor: "grey" }} />
      <CenterStack>
        <CardHeader
          sx={{
            maxWidth: "70%",
            padding: "0",
            display: "flex",
            flexDirection: "row",
            alignItems: "start",
          }}
          avatar={
            <Avatar
              src="/avatar.png"
              sx={{
                bgcolor: red[500],
                width: "30px",
                height: "30px",
                objectFit: "cover",
              }}
              aria-label="recipe"
            />
          }
          title={
            <StyledMsgTypography
              sx={{
                backgroundColor: "rgba(17,25,40,0.3)",
                borderRadius: "10px",
                marginBottom: "5px",
              }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In nemo
              ducimus dolorum corrupti, perspiciatis exercitationem. Ducimus
              atque ipsa quae sint praesentium, mollitia qui delectus laboriosam
              unde laborum perspiciatis veritatis dolorem alias commodi quasi
              voluptatibus deleniti ad nihil similique aspernatur voluptas
              consequuntur ipsam beatae exercitationem. Neque ipsam illum
              dolores tempora hic.
            </StyledMsgTypography>
          }
          subheader={
            <Typography sx={{ fontSize: "13px" }}>1 min ago</Typography>
          }
        />
        <Box
          sx={{
            alignSelf: "flex-end",
            maxWidth: "70%",
          }}
        >
          <Stack
            sx={{
              flex: "1",
              gap: "5px",
            }}
          >
            <img
              src="https://cdn.pixabay.com/photo/2024/04/28/07/00/bird-8724916_1280.jpg"
              alt=""
              style={{
                width: "100%",
                height: "300px",
                borderRadius: "10px",
                objectFit: "cover",
              }}
            />
            <StyledMsgTypography
              sx={{ backgroundColor: "#3a63cb", borderRadius: "10px" }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Architecto nostrum ipsum illo optio. Cupiditate fugiat magnam quas
              laboriosam, hic iste nesciunt laudantium voluptates mollitia est
              minus optio nihil consectetur dolorum tempora officiis iusto
              aliquid modi expedita maxime consequuntur possimus. At quidem
              aspernatur molestiae sint corrupti eveniet accusantium ab placeat
              praesentium.
            </StyledMsgTypography>
            <Typography sx={{ fontSize: "13px" }}>1 min ago</Typography>
          </Stack>
        </Box>
        <Box ref={endRef}></Box>
      </CenterStack>
      <Stack
        sx={{
          flexDirection: "row",
          padding: "20px",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid grey",
          gap: "20px",
          marginTop: "auto",
        }}
      >
        <Stack direction={"row"} sx={{ gap: "20px" }}>
          <StyledImg src="/img.png" alt="" />
          <StyledImg src="/camera.png" alt="" />
          <StyledImg src="/mic.png" alt="" />
        </Stack>
        <StyledTextField
          fullWidth
          value={textMsg}
          placeholder="type a message"
          onChange={(e) => setTextMsg(e.target.value)}
        />

        <Box sx={{ position: "relative" }}>
          <StyledImg
            src="/emoji.png"
            alt=""
            onClick={() => setOpenEmoji(!openEmoji)}
          />
          <Box sx={{ position: "absolute", bottom: "50px", left: "0" }}>
            <EmojiPicker open={openEmoji} onEmojiClick={handlerEmoji} />
          </Box>
        </Box>
        <Button
          variant="outlined"
          sx={{
            backgroundColor: "#2c5ace",
            color: "white",
            border: "none",
            ":hover": { backgroundColor: "#2c5ace", border: "none" },
          }}
        >
          Send
        </Button>
      </Stack>
    </Container>
  );
};

export default Chat;
