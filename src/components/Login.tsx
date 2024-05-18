import {
  Avatar,
  Box,
  Button,
  CardHeader,
  Divider,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";

const StyledContainer = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  gap: "100px",
});

const VisuallyHiddenInput = styled("input")({
  display: "none",
});

const StyledItem = styled(Stack)({
  flex: "1",

  display: "flex",
  flexDirection: "column",
  gap: "20px",
  alignItems: "center",
});
const StyledForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "20px",
});
const StyledTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    // height: "30px",
    borderRadius: "10px",
    // padding: "20px",
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

const StyledLoginButton = styled(Button)({
  width: "100%",
  padding: "20px",
  height: "0px",
  boxShadow: "none",
  color: "white",
  backgroundColor: "#1f8ef1",
  "&:hover": {
    backgroundColor: "#1f8ef1",
    boxShadow: "none",
  },
});

type AvatarObjectURl = {
  file: File | null;
  url: string;
};

const Login = () => {
  const [avatar, setAvatarImg] = useState<AvatarObjectURl>({
    file: null,
    url: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAvatarImg({
        file: e.target.files![0],
        url: URL.createObjectURL(e.target.files![0]),
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("kerem");

    toast.warn("hello");
  };
  return (
    <StyledContainer>
      <StyledItem>
        <Typography variant="h5">Welcome Back !</Typography>
        <StyledForm onSubmit={handleSubmit}>
          <StyledTextField
            variant="outlined"
            placeholder="email"
            name="email"
          />
          <StyledTextField
            variant="outlined"
            placeholder="password"
            name="password"
          />
          <StyledLoginButton type="submit">Sign In</StyledLoginButton>
        </StyledForm>
      </StyledItem>
      <Divider orientation="vertical" sx={{ bgcolor: "grey", height: "80%" }} />
      <StyledItem>
        <Typography variant="h5">Create An Account</Typography>
        <StyledForm onSubmit={handleSubmit}>
          <CardHeader
            sx={{ padding: "0px", margin: "0px" }}
            avatar={
              <Avatar
                src={avatar.url || "/avatar.png"}
                sx={{
                  bgcolor: red[500],
                  borderRadius: "10px",
                  opacity: "0.6",
                  objectFit: "cover",
                }}
                aria-label="recipe"
              />
            }
            title={
              <Typography
                htmlFor="file"
                component={"label"}
                sx={{
                  color: "white",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                <VisuallyHiddenInput
                  type="file"
                  id="file"
                  onChange={handleChange}
                />
                Upload an image
              </Typography>
            }
          />
          <StyledTextField
            variant="outlined"
            placeholder="user name"
            name="userName"
          />
          <StyledTextField
            variant="outlined"
            placeholder="email"
            name="email"
          />
          <StyledTextField
            variant="outlined"
            placeholder="password"
            name="password"
          />
          <StyledLoginButton variant="contained" type="submit">
            Sign Up
          </StyledLoginButton>
        </StyledForm>
      </StyledItem>
    </StyledContainer>
  );
};

export default Login;
