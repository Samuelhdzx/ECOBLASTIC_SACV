import { Box } from "@mui/material";
import { styled } from "@mui/system";

const FlexBetween = styled(Box)({
    display: "flex" ,
    flexDirection: "row" ,
    justifyContent: "space-between" , 
    alignItems: "center" 
});

export default FlexBetween;