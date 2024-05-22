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
import { SubmitHandler, useForm } from "react-hook-form";

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
  alignItems: "start",
  justifyContent: "center",
});
const StyledTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    borderRadius: "10px",
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
  textTransform: "capitalize",
  backgroundColor: "#1f8ef1",
  "&:hover": {
    backgroundColor: "#1f8ef1",
    boxShadow: "none",
  },
});
const StyledErrorText = styled(Typography)({
  margin: 0,
  padding: "0px 0",
  color: "#C70039",
  fontWeight: "bold",
});

export type AvatarObjectURl = {
  file: File | null;
  url: string;
};
type LoginFormField = {
  email: string;
  password: string;
};
type RegisterFormField = {
  username: string;
  email: string;
  password: string;
};

const Login = () => {
  const [avatar, setAvatarImg] = useState<AvatarObjectURl>({
    file: null,
    url: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormField>();
  const {
    register: registerForm,
    handleSubmit: handlerRegisterSubmit,
    formState: { errors: registerError, isSubmitting: registerIsSubmitting },
  } = useForm<RegisterFormField>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAvatarImg({
        file: e.target.files![0],
        url: URL.createObjectURL(e.target.files![0]),
      });
    }
  };
  const onSubmitRegister: SubmitHandler<RegisterFormField> = async (data) => {
    const { username, email, password } = data;

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

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
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };
  const onSubmitLogin: SubmitHandler<LoginFormField> = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <StyledContainer>
      <StyledItem>
        <Typography variant="h5">Welcome Back !</Typography>
        <StyledForm
          onSubmit={handleSubmit(onSubmitLogin)}
          sx={{ gap: `${errors.email || errors.password ? "10px" : "20px"}` }}
        >
          <StyledTextField
            {...register("email", {
              required: "Email is required",
              validate: (value) => {
                if (!value.includes("@")) {
                  return "Email must include @";
                }
                return true;
              },
            })}
            variant="outlined"
            placeholder="email"
            name="email"
          />
          {errors.email && (
            <StyledErrorText>{errors.email.message}</StyledErrorText>
          )}
          <StyledTextField
            {...register("password", { required: "password is required" })}
            variant="outlined"
            placeholder="password"
            type="password"
            name="password"
          />
          {errors.password && (
            <StyledErrorText>password required</StyledErrorText>
          )}

          <StyledLoginButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "loading..." : "Sign In"}
          </StyledLoginButton>
        </StyledForm>
      </StyledItem>
      <Divider orientation="vertical" sx={{ bgcolor: "grey", height: "80%" }} />
      <StyledItem>
        <Typography variant="h5">Create An Account</Typography>
        <StyledForm
          onSubmit={handlerRegisterSubmit(onSubmitRegister)}
          sx={{
            gap: `${
              registerError.email || registerError.password ? "10px" : "20px"
            }`,
          }}
        >
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
            {...registerForm("username", {
              required: "username is required",
              minLength: { value: 3, message: "at least 3 characters" },
            })}
            variant="outlined"
            placeholder="user name"
            name="username"
          />
          {registerError.username && (
            <StyledErrorText>{registerError.username.message}</StyledErrorText>
          )}
          <StyledTextField
            {...registerForm("email", {
              required: "Email is required",
              validate: (value) => {
                if (!value.includes("@")) {
                  return "Email must include @";
                }
                return true;
              },
            })}
            variant="outlined"
            placeholder="email"
            name="email"
          />
          {registerError.email && (
            <StyledErrorText>{registerError.email.message}</StyledErrorText>
          )}
          <StyledTextField
            {...registerForm("password", { required: "password is required" })}
            variant="outlined"
            placeholder="password"
            type="password"
            name="password"
          />
          {registerError.password && (
            <StyledErrorText>password required</StyledErrorText>
          )}
          <StyledLoginButton
            variant="contained"
            type="submit"
            disabled={registerIsSubmitting}
          >
            {registerIsSubmitting ? "loading..." : "Sign Up"}
          </StyledLoginButton>
        </StyledForm>
      </StyledItem>
    </StyledContainer>
  );
};

export default Login;
