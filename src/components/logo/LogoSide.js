import CustomLogo from "./CustomLogo";
import { Stack } from "@mui/system";

const LogoSide = ({ configData, width, height, objectFit }) => {
  const businessLogo = configData?.base_urls?.business_logo_url;

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
        //height="1.5rem"
        width={width}
        height={height}
        objectFit={objectFit}
      />
    </Stack>
  );
};

LogoSide.propTypes = {};

export default LogoSide;
