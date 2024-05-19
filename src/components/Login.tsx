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
import { auth, db } from "../libs/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import upload from "../libs/upload";

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

  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAvatarImg({
        file: e.target.files![0],
        url: URL.createObjectURL(e.target.files![0]),
      });
    }
  };
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const { username, email, password } = Object.fromEntries(formData);

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        email as string,
        password as string
      );

      const imgUrl = await upload(avatar.file);

      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        id: res.user.uid,
        avatar: imgUrl || null,
        blocked: [],
      });
      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });
      toast.success("Account created! u can login");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const { email, password } = Object.fromEntries(formData);
      await signInWithEmailAndPassword(
        auth,
        email as string,
        password as string
      );
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }

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
          <StyledLoginButton type="submit" disabled={loading}>
            {loading ? "loading..." : "Sign In"}
          </StyledLoginButton>
        </StyledForm>
      </StyledItem>
      <Divider orientation="vertical" sx={{ bgcolor: "grey", height: "80%" }} />
      <StyledItem>
        <Typography variant="h5">Create An Account</Typography>
        <StyledForm onSubmit={handleRegister}>
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
            name="username"
          />
          <StyledTextField
            variant="outlined"
            placeholder="email"
            name="email"
          />
          <StyledTextField
            variant="outlined"
            placeholder="password"
            type="password"
            name="password"
          />
          <StyledLoginButton
            variant="contained"
            type="submit"
            disabled={loading}
          >
            {loading ? "loading..." : "Sign Up"}
          </StyledLoginButton>
        </StyledForm>
      </StyledItem>
    </StyledContainer>
  );
};

export default Login;
