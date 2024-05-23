import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../libs/firebase";
import { User, useUserStore } from "../libs/userStore";
import { useEffect, useState } from "react";
const StyledTextFieldAddUser = styled(TextField)({
  "& .MuiInputBase-root": {
    backgroundColor: "white !important",
    borderRadius: "10px",
    outline: "none",
    border: "none",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
});

type prop = {
  addMode: boolean;
  setMode: (mode: boolean) => void;
};

const AddUserAlert = ({ addMode, setMode }: prop) => {
  useEffect(() => {
    if (addMode) {
      setSearchUsers(null);
    }
  }, [addMode]);

  const [searchUsers, setSearchUsers] = useState<User | null>(null);

  const { currentUser } = useUserStore();

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const q = query(
      collection(db, "users"),
      where("username", "==", formData.get("username"))
    );
    const querySnapShot = await getDocs(q);
    if (!querySnapShot.empty) {
      setSearchUsers(querySnapShot.docs[0].data() as User);
    }
  };

  const handleAdd = async () => {
    try {
      const chatRef = collection(db, "chats");
      const userRef = collection(db, "userchats");
      const newChatRef = doc(chatRef);
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });
      await updateDoc(doc(userRef, currentUser?.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: searchUsers?.id,
          updateAt: Date.now(),
        }),
      });

      await updateDoc(doc(userRef, searchUsers?.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser?.id,
          updateAt: Date.now(),
        }),
      });
      setMode(false);
      setSearchUsers(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Modal
        open={addMode}
        onClose={() => setMode(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: { xs: "0 10%" },
        }}
      >
        <Stack
          sx={{
            backgroundColor: "rgba(17, 17, 17, 0.781)",
            borderRadius: "10px",
            padding: "35px",
          }}
        >
          <form action="" onSubmit={handleSearch}>
            <Stack direction={"row"} gap={2}>
              <StyledTextFieldAddUser
                variant="outlined"
                placeholder="Username"
                name="username"
              />
              <Button
                sx={{
                  backgroundColor: "#1a73e8",
                  "&:hover": { backgroundColor: "#1a73e8" },
                  borderRadius: "10px",
                  color: "white",
                  textTransform: "capitalize",
                }}
                type="submit"
              >
                Search
              </Button>
            </Stack>
          </form>
          {searchUsers && (
            <Card
              key={crypto.randomUUID()}
              sx={{
                marginTop: "20px",
                bgcolor: "transparent",
              }}
            >
              <CardHeader
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "5px 0px",
                }}
                avatar={
                  <Avatar
                    src={searchUsers.avatar || "/avatar.png"}
                    aria-label="recipe"
                  ></Avatar>
                }
                action={
                  <IconButton onClick={handleAdd}>
                    <Box
                      sx={{
                        backgroundColor: "#1a73e8",
                        "&:hover": { backgroundColor: "#1a73e8" },
                        padding: "10px",
                        borderRadius: "10px",
                        border: "none",
                        color: "white",
                        textTransform: "capitalize",
                        fontSize: "12px",
                      }}
                    >
                      Add User
                    </Box>
                  </IconButton>
                }
                title={
                  <Typography sx={{ color: "white" }}>
                    {searchUsers.username}
                  </Typography>
                }
              />
            </Card>
          )}
        </Stack>
      </Modal>
    </Box>
  );
};

export default AddUserAlert;
