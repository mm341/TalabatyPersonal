import React, { useState } from "react";
import { CustomStackFullWidth } from "../../../../styled-components/CustomStyles.style";
import { ButtonContainer } from "../../NavBar.style";
import { Button, Typography } from "@mui/material";
import { t } from "i18next";
import LockIcon from "@mui/icons-material/Lock";
import CustomDialogConfirm from "../../../custom-dialog/confirm/CustomDialogConfirm";

const ButtonsContainer = ({
  
  token,
  handleLogout,
  openModal,
  isLogoutLoading,
  setOpenModal,
}) => {
  return (
    <CustomStackFullWidth>
      {token && (
        <ButtonContainer sx={{width:"100%",display:"flex",justifyContent:"center"}}>
          <Button
            variant="contained"
            
            sx={{ mt: 3, mb: 1,width:"200px" }}
            onClick={() => setOpenModal(true)}
          >
            {t("Logout")}
          </Button>
        </ButtonContainer>
      )}
      <CustomDialogConfirm
        isLoading={isLogoutLoading}
        dialogTexts="Are you sure you want to  logout?"
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={handleLogout}
      />
    </CustomStackFullWidth>
  );
};

export default ButtonsContainer;
