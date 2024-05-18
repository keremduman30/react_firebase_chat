import { Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notifications = () => {
  return (
    <Box>
      <ToastContainer position="bottom-right" />
    </Box>
  );
};

export default Notifications;
