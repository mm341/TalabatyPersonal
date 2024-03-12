import React, { useEffect, useRef, useState } from "react";
import {
  alpha,
  Avatar,
  IconButton,
  NoSsr,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import {
  CustomBoxFullWidth,
  CustomStackFullWidth,
} from "../../../styled-components/CustomStyles.style";
import LogoSide from "../../logo/LogoSide";
import NavLinks from "./NavLinks";
import { t } from "i18next";
import CustomSignInButton from "./CustomSignInButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useRouter } from "next/router";
import NavBarIcon from "./NavBarIcon";
import { useDispatch, useSelector } from "react-redux";
import AccountPopover from "./account-popover";
import CardView from "../../added-cart-view";
import CustomContainer from "../../container";
import { getCartListModuleWise } from "../../../helper-functions/getCartListModuleWise";
import ModuleWiseNav from "./ModuleWiseNav";
import WishListCardView from "../../wishlist";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import useGetAllCartList from "../../../api-manage/hooks/react-query/add-cart/useGetAllCartList";
import { setCartDetailsPrice, setCartList } from "../../../redux/slices/cart";
import { clearOfflinePaymentInfo } from "../../../redux/slices/offlinePaymentData";
import { getGuestId } from "../../../helper-functions/getToken";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import useGetGuest from "../../../api-manage/hooks/react-query/guest/useGetGuest";

//  cart module
const Cart = ({ isLoading }) => {
  //  hooks
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

  //  selectors
  const { cartList } = useSelector((state) => state.cart);

  const handleIconClick = () => {
    setSideDrawerOpen(true);
  };

  return (
    <>
      <NavBarIcon
        icon={<ShoppingCartOutlinedIcon sx={{ fontSize: "22px" }} />}
        label={t("Cart")}
        user="false"
        handleClick={handleIconClick}
        badgeCount={getCartListModuleWise(cartList)?.length}
      />
      {!!sideDrawerOpen && (
        <CardView
          isLoading={isLoading}
          sideDrawerOpen={sideDrawerOpen}
          setSideDrawerOpen={setSideDrawerOpen}
          cartList={cartList}
        />
      )}
    </>
  );
};

//  wishilist module
const WishListSideBar = ({ totalWishList }) => {
  const [wishListSideDrawerOpen, setWishListSideDrawerOpen] = useState(false);
  const handleIconClick = () => {
    setWishListSideDrawerOpen(true);
  };
  return (
    <>
      <NavBarIcon
        icon={<FavoriteBorderIcon sx={{ fontSize: "22px" }} />}
        label={t("WishList")}
        user="false"
        handleClick={handleIconClick}
        badgeCount={totalWishList}
      />

      {!!wishListSideDrawerOpen && (
        <WishListCardView
          sideDrawerOpen={wishListSideDrawerOpen}
          setSideDrawerOpen={setWishListSideDrawerOpen}
        />
      )}
    </>
  );
};

const SecondNavBar = ({ configData }) => {

  //  hooks
  const theme = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();

  const isSmall = useMediaQuery("(max-width:1180px)");
  const anchorRef = useRef(null);
  const [openPopover, setOpenPopover] = useState(false);

  const [moduleType, SetModuleType] = useState("");
  const { wishLists } = useSelector((state) => state.wishList);
  const [toggled, setToggled] = useState(false);



// selectors
const { profileInfo } = useSelector((state) => state.profileInfo);
const { selectedModule } = useSelector((state) => state.utilsData);
const { offlineInfoStep } = useSelector((state) => state.offlinePayment);


  const totalWishList = wishLists?.item?.length + wishLists?.store?.length;
  

  //  get data from localstorage
  let token = undefined;
  let location = undefined;
  let zoneId;
  const guestId = getGuestId();
  if (typeof window !== "undefined") {
    location = localStorage.getItem("location");
    token = localStorage.getItem("token");
    zoneId = JSON.parse(localStorage.getItem("zoneid"));
  }
 


  //  get guest id from calling api
  const { data: guestData, refetch: guestRefetch } = useGetGuest();
  useEffect(() => {
    if (
      (!token || token === undefined) &&
      (guestId === "undefined" || guestId === null)
    ) {
      guestRefetch();
    }
  }, [guestId, token]);

  useEffect(() => {
    if (
      (!token || token === undefined) &&
      (guestId === "undefined" || guestId === null) &&
      guestData
    ) {
      localStorage.setItem("guest_id", guestData?.guest_id);
    }
  }, [guestId, token, guestData]);


  //  get cart data from calling api
  const {
    data,
    refetch: cartListRefetch,
    isLoading,
  } = useGetAllCartList(guestId);
 //  recalling api with dependencies
  useEffect(() => {
    cartListRefetch();
  }, [moduleType, guestId]);

  useEffect(() => {
    dispatch(setCartList(data?.carts));
    dispatch(setCartDetailsPrice(data));
  }, [data]);

  useEffect(() => {
    if (offlineInfoStep !== 0) {
      if (router.pathname !== "/checkout") {
        dispatch(clearOfflinePaymentInfo());
      }
    }
  }, []);

  useEffect(() => {
    SetModuleType(selectedModule?.module_type);
  }, [selectedModule]);

 

  const handleOpenPopover = () => {
    setOpenPopover(true);
  };
  const handleWishlistClick = (pathName) => {
    router.push({
      pathname: "/profile",
      query: {
        page: pathName,
      },
    });
  };

  const handleTrackOrder = () => {
    router.push({
      pathname: "/track-order",
    });
  };


  //  small screens component
  const getMobileScreenComponents = () => (
    <ModuleWiseNav
      router={router}
      configData={configData}
      token={token}
      setToggled={setToggled}
      location={location}
    />
  );

 //  Desktop screens component
  
  const getDesktopScreenComponents = () => (
    <CustomStackFullWidth
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    
      sx={{
       
        marginLeft: "0 !important",
      }}
    >
      <Stack direction="row" alignItems="center" width="100%">
        {!isSmall && (
          <LogoSide
            width="110px"
            height="50px"
            configData={configData}
            objectFit="contain"
          />
        )}
        {!isSmall && location && (
          <NavLinks t={t} zoneid="zoneid" moduleType={moduleType} />
        )}
      </Stack>

      {!isSmall && (
        <CustomStackFullWidth
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          spacing={2.5}
        >
          {!token && moduleType !== "parcel" && location && (
            <IconButton onClick={handleTrackOrder}>
              <LocalShippingOutlinedIcon fontSize="22px" />
            </IconButton>
          )}
          {token && moduleType !== "parcel" && (
            <NavBarIcon
              icon={<ChatBubbleOutlineIcon sx={{ fontSize: "22px" }} />}
              label={t("Chat")}
              user="false"
              handleClick={() => handleWishlistClick("inbox")}
            />
          )}
          {token && zoneId && moduleType !== "parcel" && (
            <WishListSideBar totalWishList={totalWishList} />
          )}

          {moduleType !== "parcel" && location &&router.pathname!=="/checkout" && (
            <Cart isLoading={isLoading}  />
          )}

          {token ? (
            <IconButton
              ref={anchorRef}
              onClick={() => handleOpenPopover()}
              sx={{
                padding: "5px",
                gap: "10px",
              }}
            >
              {profileInfo?.image ? (
                <Avatar
                  alt={profileInfo?.last_name}
                  sx={{ width: 34, height: 34 }}
                  src={`${configData?.base_urls?.customer_image_url}/${profileInfo?.image}`}
                />
              ) : (
                <AccountCircleIcon
                  color="primary"
                  sx={{
                    fontSize: "30px",
                    borderRadius: "50%",
                    backgroundColor: (theme) =>
                      alpha(theme.palette.primary.main, 0.1),
                  }}
                />
              )}

              <Typography
                color={theme.palette.neutral[1000]}
                textTransform="capitalize"
              >
                {profileInfo?.f_name}
              </Typography>
            </IconButton>
          ) : (
            <CustomSignInButton from={router.pathname.replace("/", "")} />
          )}
        </CustomStackFullWidth>
      )}
    </CustomStackFullWidth>
  );

  return (
    <CustomBoxFullWidth
      sx={{
        backgroundColor: theme.palette.neutral[100],
        boxShadow: (theme) =>
          `0px 5px 20px -3px ${alpha(theme.palette.primary.main, 0.1)}`,
        zIndex: 1251,
      }}
    >
      <NoSsr>
        <CustomContainer>
          <Toolbar disableGutters={true}>
            {isSmall
              ? getMobileScreenComponents()
              : getDesktopScreenComponents()}
            <AccountPopover
              anchorEl={anchorRef.current}
              onClose={() => setOpenPopover(false)}
              open={openPopover}
              cartListRefetch={cartListRefetch}
            />
          </Toolbar>
        </CustomContainer>
      </NoSsr>
    </CustomBoxFullWidth>
  );
};

export default SecondNavBar;
