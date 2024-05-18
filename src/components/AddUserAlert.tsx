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
        }}
      >
        <form action="">
          <Stack
            sx={{
              backgroundColor: "rgba(17, 17, 17, 0.781)",
              borderRadius: "10px",
              padding: "35px",
            }}
          >
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
              >
                Search
              </Button>
            </Stack>

            <Card
              sx={{
                marginTop: "40px",
                bgcolor: "transparent",
              }}
            >
              <CardHeader
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "10px 0px",
                }}
                avatar={
                  <Avatar
                    // src="/avatar.png"
                    // sx={{ bgcolor: red[500] }}
                    aria-label="recipe"
                  ></Avatar>
                }
                action={
                  <IconButton>
                    <Button
                      sx={{
                        backgroundColor: "#1a73e8",
                        "&:hover": { backgroundColor: "#1a73e8" },
                        borderRadius: "10px",
                        color: "white",
                        textTransform: "capitalize",
                      }}
                    >
                      Add User
                    </Button>
                  </IconButton>
                }
                title={
                  <Typography sx={{ color: "white" }}>John doe</Typography>
                }
              />
            </Card>
          </Stack>
        </form>
      </Modal>
    </Box>
  );
};

export default AddUserAlert;
