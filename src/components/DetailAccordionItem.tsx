import { AccordionDetails } from "@mui/material";
import { ReactNode } from "react";
type prop = {
  child: ReactNode;
};
const DetailAccordionItem = ({ child }: prop) => {
  return ( 
    <AccordionDetails sx={{ padding:"0" }}>{child}</AccordionDetails>
  );
};

export default DetailAccordionItem;
