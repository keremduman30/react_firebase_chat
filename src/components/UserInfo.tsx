import {
  Avatar,
  Box,
  CardHeader,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { useUserStore } from "../libs/userStore";

const UserInfo = () => {
  const { currentUser } = useUserStore();
  return (
    <Box>
      <CardHeader
        avatar={
          <Avatar
            src={currentUser?.avatar || "/avatar.png"}
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
          />
        }
        action={
          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              padding: "5px",
            }}
          >
            <IconButton aria-label="settings">
              <img src="/more.png" width={20} height={20} />
            </IconButton>
            <IconButton aria-label="settings">
              <img src="/video.png" width={20} height={20} />
            </IconButton>
            <IconButton aria-label="settings">
              <img src="/edit.png" width={20} height={20} />
            </IconButton>
          </Stack>
        }
        title={<Typography variant="h5">{currentUser?.username}</Typography>}
      />
    </Box>
  );
};

export default UserInfo;
