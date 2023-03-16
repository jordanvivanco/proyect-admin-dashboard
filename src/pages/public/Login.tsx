import { Box } from "@mui/material";
import { SignIn } from "../../components/Sign/SignIn";

export const Login = () => {
  return (
    <Box sx={{left: "50%", top: "50%", width: "80%", position: "absolute", transform: "translateX(-50%) translateY(-50%)"}}>
      <SignIn exist={true} />
    </Box>  
  )
}
