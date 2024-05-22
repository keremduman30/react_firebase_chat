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
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { db } from "../libs/firebase";
import { Chats, Message, useChatStore } from "../libs/chatStore";
import { useUserStore } from "../libs/userStore";
import { AvatarObjectURl } from "./Login";
import upload from "../libs/upload";
import { TDate, format } from "timeago.js";

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
    color: "white !important",
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
    width: "10px",
    backgroundColor: "rgba(17, 25, 40, 0.5)",
  },

  " &::-webkit-scrollbar-thumb": {

    backgroundColor: "grey",
  },
  gap: "20px",
});

const StyledMsgTypography = styled(Typography)({
  padding: "20px",
  borderRadius: "20px",
  color: "white",
});
const VisuallyHiddenInput = styled("input")({
  display: "none",
});

const Chat = () => {
  const [openEmoji, setOpenEmoji] = useState<boolean>(false);
  const [textMsg, setTextMsg] = useState<string>("");
  const [chats, setChats] = useState<Message | null>(null);
  const [avatar, setAvatarImg] = useState<AvatarObjectURl>({
    file: null,
    url: "",
  });

  const endRef = useRef<null | HTMLDivElement>(null);
  const { chatId, user, isReceiverBlocked, isCurrentUserBlocked } =
    useChatStore();
  const { currentUser } = useUserStore();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats?.messages]);

  useEffect(() => {
    if (chatId) {
      const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
        if (res.data()) {
          const messages = res.data() as Message;
          setChats(messages);
        }
      });
      return () => {
        unSub();
      };
    }
  }, [chatId]);

  const handlerEmoji = (e: EmojiClickData) => {
    setTextMsg(textMsg + e.emoji);
    setOpenEmoji(false);
  };

  const handleSend = async () => {
    if (textMsg === "") return;
    let imgUrl: File | null = null;
    try {
      if (avatar.file) {
        imgUrl = (await upload(avatar.file)) as File;
      }

      if (chatId) {
        await updateDoc(doc(db, "chats", chatId), {
          messages: arrayUnion({
            senderId: currentUser?.id,
            text: textMsg,
            createdAt: new Date(),
            ...(imgUrl && { img: imgUrl }),
          }),
        });
      }

      const userIDs = [currentUser?.id, user?.id];

      userIDs.forEach(async (id) => {
        if (id) {
          const userChatsRef = doc(db, "userchats", id);
          const userChatsSnapshot = await getDoc(userChatsRef);
          if (userChatsSnapshot.exists()) {
            const userChatsData = userChatsSnapshot.data();
            const userChats: Chats[] = userChatsData.chats;

            const chatIndex = userChats.findIndex((c) => c.chatId === chatId);
            userChatsData.chats[chatIndex].lastMessage = textMsg;
            userChatsData.chats[chatIndex].isSeen =
              id === currentUser?.id ? true : false;
            userChatsData.chats[chatIndex].updatedAt = Date.now();
            await updateDoc(userChatsRef, {
              chats: userChatsData.chats,
            });
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
    setAvatarImg({ url: "", file: null });
    setTextMsg("");
  };

  const handleImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAvatarImg({
        file: e.target.files![0],
        url: URL.createObjectURL(e.target.files![0]),
      });
    }
  };

  return (
    <Container>
      <CardHeader
        avatar={
          <Avatar
            src={user?.avatar || "/avatar.png"}
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
            {user?.username}
          </Typography>
        }
        subheader={format(chats?.createdAt as TDate)}
      />
      <Divider variant="fullWidth" sx={{ bgcolor: "grey" }} />
      <CenterStack>
        {chats &&
          chats.messages.map((message) => {
            const currentMsg = message.senderId === currentUser?.id;
            return (
              <>
                <CardHeader
                  key={crypto.randomUUID()}
                  sx={{
                    alignSelf: currentMsg ? "flex-end" : "flex-start",
                    maxWidth: "70%",
                    padding: "0",
                    alignItems: "start",
                  }}
                  avatar={
                    currentMsg && (
                      <Avatar
                        src={(!currentMsg && user?.avatar) || "avatar.png"}
                        aria-label="recipe"
                        sx={{
                          bgcolor: red[500],
                          width: "30px",
                          height: "30px",
                          objectFit: "cover",
                          display: currentMsg && "none",
                        }}
                      />
                    )
                  }
                  title={
                    <StyledMsgTypography
                      sx={{
                        backgroundColor: currentMsg
                          ? "#3a63cb"
                          : "rgba(17,25,40,0.3)",
                        borderRadius: "10px",
                      }}
                    >
                      {message.text}
                    </StyledMsgTypography>
                  }
                  subheader={
                    <Typography
                      sx={{ fontSize: "13px", mt: "5px", padding: "0 15px" }}
                    >
                      {format(message.createdAt as TDate)}
                    </Typography>
                  }
                />
                {message.img && (
                  <Box
                    sx={{
                      maxWidth: "70%",
                      display: "flex",
                      alignSelf: currentMsg ? "flex-end" : "flex-start",
                    }}
                  >
                    <img
                      src={message.img}
                      alt=""
                      style={{
                        width: "100%",
                        height: "300px",
                        borderRadius: "10px",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                )}
              </>
            );
          })}
        {avatar.url && (
          <Box
            sx={{
              maxWidth: "70%",
              display: "flex",
              alignSelf: "flex-end",
            }}
          >
            <img
              src={avatar.url}
              alt=""
              style={{
                width: "100%",
                height: "300px",
                borderRadius: "10px",
                objectFit: "cover",
              }}
            />
          </Box>
        )}

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
          <Typography htmlFor="file" component={"label"}>
            <StyledImg src="/img.png" alt="" />
          </Typography>
          <VisuallyHiddenInput type="file" id="file" onChange={handleImg} />
          <StyledImg src="/camera.png" alt="" />
          <StyledImg src="/mic.png" alt="" />
        </Stack>
        <StyledTextField
          fullWidth
          value={textMsg}
          placeholder={
            isReceiverBlocked || isCurrentUserBlocked
              ? "blocked user"
              : "type a message"
          }
          sx={{ color: "white !important" }}
          disabled={isReceiverBlocked || isCurrentUserBlocked}
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
          disabled={isReceiverBlocked || isCurrentUserBlocked}
          onClick={handleSend}
        >
          Send
        </Button>
      </Stack>
    </Container>
  );
};

export default Chat;
