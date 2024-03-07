import CustomLogo from "./CustomLogo";
import { Stack } from "@mui/system";

const LogoSide = ({ configData, width, height, objectFit }) => {
 

  return (
    <Stack
      direction="row"
      alignItems="center"
      width="150px"
      justifyContent="flex-start"
    >
      <CustomLogo
        atlText="logo"
        logoImg={
          "https://talabateedashboard.talabatee.net/storage/app/public/business/2024-01-16-65a63c2f298ad.png"
        }
       
        width={width}
        height={height}
        objectFit={objectFit}
      />
    </Stack>
  );
};

LogoSide.propTypes = {};

export default LogoSide;
