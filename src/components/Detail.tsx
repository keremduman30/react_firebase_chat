import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  CardHeader,
  Divider,
  IconButton,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { auth, db } from "../libs/firebase";
import { useChatStore } from "../libs/chatStore";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

const StyledBox = styled(Box)({
  flex: "1",
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    //baslangıc scroll ayarları
    width: "10px",
    backgroundColor: "transparent",
  },
  /*  " &::-webkit-scrollbar-track": {
    //arka renk
    backgroundColor: "transparent",
  }, */
  " &::-webkit-scrollbar-thumb": {
    //arkasındaki color

    backgroundColor: "grey",
  },
});

const Detail = () => {
  const { isCurrentUserBlocked, user, isReceiverBlocked, changeBlocked } =
    useChatStore();
  const handlerLogout = async () => {
    await auth.signOut();
  };

  const handleBlock = async () => {
    if (!user) return;
    const userDocRef = doc(db, "users", user.id);
    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlocked();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledBox>
      <Stack>
        <CardHeader
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            justifyContent: "space-between",
          }}
          avatar={
            <Avatar
              src={user?.avatar || "/avatar.png"}
              sx={{
                bgcolor: red[500],
                width: "80px",
                height: "80px",
                objectFit: "cover",
              }}
              aria-label="recipe"
            />
          }
          title={
            <Typography variant="h5" textAlign={"center"} mb={1}>
              {user?.username}
            </Typography>
          }
          subheader={
            <Typography variant="h6" fontSize={13}>
              Lorem ipsum dolor sit amet.
            </Typography>
          }
        />
        <Divider variant="fullWidth" sx={{ bgcolor: "grey", mb: "10px" }} />
        <Stack sx={{ gap: "0px" }}>
          {Array.from({ length: 3 }, (_, b) => (
            <Accordion
              key={crypto.randomUUID()}
              sx={{
                backgroundColor: "transparent",
                color: "white",
                boxShadow: "0",
              }}
              disableGutters
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      width: "30px",
                      height: "30px",
                      backgroundColor: "rgba(17, 25, 40, 0.5)",
                      borderRadius: "50%",
                      color: "white",
                      padding: "5px",
                    }}
                  />
                }
                aria-controls="panel1-content"
                id="panel1-header"
              >
                Accordion {`${b + 1}`}
              </AccordionSummary>
              {/* <DetailAccordionItem child={<span>{i}</span>} /> */}
            </Accordion>
          ))}
        </Stack>

        <Accordion
          sx={{
            backgroundColor: "transparent",
            color: "white",
            // padding: "0px",
            boxShadow: "0",
          }}
          disableGutters
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                sx={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: "rgba(17, 25, 40, 0.5)",
                  borderRadius: "50%",
                  color: "white",
                  padding: "5px",
                }}
              />
            }
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Accordion 4
          </AccordionSummary>
          <AccordionDetails sx={{ padding: "0 10px" }}>
            {Array.from({ length: 2 }, () => (
              <CardHeader
                key={crypto.randomUUID()}
                sx={{
                  width: "100%",
                  padding: "10px 5px",
                }}
                avatar={
                  <Avatar
                    sx={{
                      bgcolor: red[500],
                      width: "40px",
                      height: "40px",
                      objectFit: "cover",
                      borderRadius: "5px",
                    }}
                    aria-label="recipe"
                  >
                    {user?.username[0].toUpperCase()}
                  </Avatar>
                }
                action={
                  <IconButton>
                    <ExpandMoreIcon
                      sx={{
                        width: "30px",
                        height: "30px",
                        backgroundColor: "rgba(17, 25, 40, 0.5)",
                        borderRadius: "50%",
                        color: "white",
                        padding: "5px",
                      }}
                    />
                  </IconButton>
                }
                title={
                  <Typography variant="h6" fontSize={14}>
                    {user?.username}
                  </Typography>
                }
              />
            ))}
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{
            backgroundColor: "transparent",
            color: "white",
            // padding: "0px",
            boxShadow: "0",
          }}
          disableGutters
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                sx={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: "rgba(17, 25, 40, 0.5)",
                  borderRadius: "50%",
                  color: "white",
                  padding: "5px",
                }}
              />
            }
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Shared files
          </AccordionSummary>
          {/* <DetailAccordionItem child={<span>{i}</span>} /> */}
        </Accordion>
        <Stack sx={{ gap: "15px", margin: "10px" }}>
          <Button
            variant="contained"
            sx={{
              boxShadow: "0",
              textTransform: "capitalize",

              bgcolor: "rgba(230,74,105,0.553)",
              "&:hover": { bgcolor: "rgba(220,20,60,0.7)", boxShadow: "0" },
            }}
            onClick={handleBlock}
          >
            {isCurrentUserBlocked
              ? "You are blocked"
              : isReceiverBlocked
              ? "user blocked"
              : "block user"}
          </Button>
          <Button
            variant="contained"
            sx={{
              boxShadow: "0",
              textTransform: "capitalize",
              bgcolor: "#3a63cb",
              "&:hover": { bgcolor: "#3a63cb", boxShadow: "0" },
            }}
            onClick={handlerLogout}
          >
            Logout
          </Button>
        </Stack>
      </Stack>
    </StyledBox>
  );
};

export default Detail;
