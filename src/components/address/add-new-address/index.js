import React, { useEffect, useReducer, useState } from "react";
import { Box, Stack } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CustomModal from "../../modal";
import CloseIcon from "@mui/icons-material/Close";
import {
  AddressTypeStack,
  CustomIconButton,
  CustomStackFullWidth,
} from "../../../styled-components/CustomStyles.style";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

import { ACTIONS, initialState, reducer } from "../states";
import { handleClick, handleCloseModal } from "../HelperFunctions";
import { useGeolocated } from "react-geolocated";
import useGetAutocompletePlace from "../../../api-manage/hooks/react-query/google-api/usePlaceAutoComplete";
import useGetGeoCode from "../../../api-manage/hooks/react-query/google-api/useGetGeoCode";
import useGetZoneId from "../../../api-manage/hooks/react-query/google-api/useGetZone";
import useGetPlaceDetails from "../../../api-manage/hooks/react-query/google-api/useGetPlaceDetails";
import GoogleMapComponent from "../../Map/GoogleMapComponent";
import AddressForm from "./AddressForm";
import useGetAddressList from "../../../api-manage/hooks/react-query/address/useGetAddressList";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CustomImageContainer from "../../CustomImageContainer";
import home from "../../checkout/assets/image 1256.png";
import office from "../assets/office.png";
import plusIcon from "../assets/plus.png";
import { CustomButtonPrimary } from "../../../styled-components/CustomButtons.style";
import { useDispatch, useSelector } from "react-redux";
import { setOpenAddressModal } from "../../../redux/slices/addAddress";
import { setGuestUserInfo } from "../../../redux/slices/guestUserInfo";

const AddNewAddress = (props) => {
  //  props
  const {
    configData,
    refetch,
    t,
    parcel,
    align,
    fromModal,
    open,
    openAddressModal,
    editAddress,
    setEditAddress,
  } = props;
  //  hooks
  const theme = useTheme();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [location, setLocation] = useState({
    lat: configData?.default_location?.lat
      ? Number(configData?.default_location?.lat)
      : "30.00758635247977",
    lng: configData?.default_location?.lng
      ? Number(configData?.default_location?.lng)
      : "31.459522247314453",
  });
  const [zone, setZone] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [placeDetailsEnabled, setPlaceDetailsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [placeId, setPlaceId] = useState("");
  const [predictions, setPredictions] = useState([]);
  const reduxDispatch = useDispatch();
  const [enabled, setEnabled] = useState(false);
  //  selectors
  const { profileInfo } = useSelector((state) => state.profileInfo);
  const { guestUserInfo } = useSelector((state) => state.guestUserInfo);

  const [addressType, setAddressType] = useState(
    guestUserInfo ? guestUserInfo?.address_type : ""
  );
  const personName = `${profileInfo?.f_name} ${profileInfo?.l_name}`;

  //****getting current location/***/
  const { coords, isGeolocationAvailable, isGeolocationEnabled, getPosition } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
      isGeolocationEnabled: true,
    });

  //  get places
  const { data: places, isLoading } = useGetAutocompletePlace(
    searchKey,
    enabled
  );

  useEffect(() => {
    if (places) {
      setPredictions(places?.predictions);
    }
  }, [places]);

  const { data: geoCodeResults, isFetching: isFetchingGeoCode } =
    useGetGeoCode(location);

  //  get zone data form api
  const zoneIdEnabled = locationEnabled;
  const { data: zoneData } = useGetZoneId(location, zoneIdEnabled);

  useEffect(() => {
    if (zoneData) {
      setZone(true);
    } else {
      setZone(false);
    }
  }, [zoneData]);

  // //********************Pick Location */

  const { isLoading: isLoading2, data: placeDetails } = useGetPlaceDetails(
    placeId,
    placeDetailsEnabled
  );
  //
  useEffect(() => {
    if (placeDetails) {
      setLocation(placeDetails?.result?.geometry?.location);
      setLocationEnabled(true);
    }
  }, [placeDetails]);

  const handleClick = (name) => {
    setAddressType(name);
    if (editAddress) {
      setEditAddress({ ...editAddress, address_type: name });
    }
  };
  const closePopover = () => {
    reduxDispatch(setOpenAddressModal(false));
  };

  //  handel default location

  useEffect(() => {
    if (coords && !editAddress?.latitude && !editAddress?.longitude) {
      setLocation({
        lat: coords?.latitude,
        lng: coords?.longitude,
      });
    } else if (!coords?.latitude && !editAddress?.latitude) {
      setLocation({
        lat: configData?.default_location?.lat
          ? Number(configData?.default_location?.lat)
          : "30.00758635247977",
        lng: configData?.default_location?.lng
          ? Number(configData?.default_location?.lng)
          : "31.459522247314453",
      });
    }
  }, [coords, editAddress?.latitude, editAddress?.longitude, configData]);
  useEffect(() => {
    if (editAddress?.latitude && editAddress?.longitude) {
      setLocation({
        lat: Number(editAddress?.latitude),
        lng: Number(editAddress?.longitude),
      });
    }
  }, [editAddress?.latitude, editAddress?.longitude]);

  const handleChangeForSearchs = (event) => {
    if (event.target.value) {
      setSearchKey(event.target.value);
      setEnabled(true);
      setPlaceDetailsEnabled(true);
    }
  };
  const handleChangeS = (event, value) => {
    if (value) {
      setPlaceId(value?.place_id);
    }
    setPlaceDetailsEnabled(true);
  };

  useEffect(() => {
    if (!openAddressModal) {
      setLocation({
        lat: coords?.latitude
          ? coords?.latitude
          : configData?.default_location?.lat
          ? Number(configData?.default_location?.lat)
          : "30.00758635247977",
        lng: coords?.longitude
          ? coords?.longitude
          : configData?.default_location?.lng
          ? Number(configData?.default_location?.lng)
          : "31.459522247314453",
      });
    }
  }, [openAddressModal, configData, coords?.latitude, coords?.longitude]);

  return (
    <Box>
      {openAddressModal && (
        <CustomModal
          openModal={openAddressModal}
          handleClose={() => reduxDispatch(setOpenAddressModal(false))}
        >
          <Paper
            sx={{
              position: "relative",
              width: { xs: "300px", sm: "450px", md: "550px", lg: "730px" },
              p: "1.4rem",
            }}
          >
            <IconButton
              onClick={() => reduxDispatch(setOpenAddressModal(false))}
              sx={{ position: "absolute", top: 0, right: 0 }}
            >
              <CloseIcon sx={{ fontSize: "16px" }} />
            </IconButton>

            <CustomStackFullWidth
              alignItems="center"
              justifyContent="center"
              sx={{ marginBottom: "1rem" }}
            >
              {/*<SimpleBar style={{ maxHeight: "60vh" }}></SimpleBar>*/}
            </CustomStackFullWidth>
            <GoogleMapComponent
              addresse={editAddress}
              height="236px"
              setLocation={setLocation}
              location={location}
              setPlaceDetailsEnabled={setPlaceDetailsEnabled}
              placeDetailsEnabled={placeDetailsEnabled}
              setLocationEnabled={setLocationEnabled}
              locationEnabled={locationEnabled}
            />

            <CustomStackFullWidth pt="20px">
              <Typography>{t("Label As")}</Typography>
              <Stack direction="row" spacing={2.5} pt="10px">
                <AddressTypeStack
                  value="home"
                  addressType={
                    guestUserInfo
                      ? addressType
                      : editAddress?.address_type
                      ? editAddress?.address_type
                      : addressType
                  }
                  onClick={() => handleClick("home")}
                >
                  <CustomImageContainer
                    src={home.src}
                    width="24px"
                    height="24px"
                  />
                </AddressTypeStack>
                <AddressTypeStack
                  value="office"
                  addressType={
                    editAddress?.address_type
                      ? editAddress?.address_type
                      : addressType
                  }
                  onClick={() => handleClick("office")}
                >
                  <CustomImageContainer
                    src={office.src}
                    width="24px"
                    height="24px"
                  />
                </AddressTypeStack>
                <AddressTypeStack
                  value="other"
                  addressType={
                    editAddress?.address_type
                      ? editAddress?.address_type
                      : addressType
                  }
                  onClick={() => handleClick("other")}
                >
                  <CustomImageContainer
                    src={plusIcon.src}
                    width="24px"
                    height="24px"
                  />
                </AddressTypeStack>
              </Stack>
            </CustomStackFullWidth>
            <CustomStackFullWidth mt="1.3rem">
              <AddressForm
                zone={zone}
                atModal="true"
                setAddressType={setAddressType}
                addressType={
                  editAddress?.address_type
                    ? editAddress?.address_type
                    : addressType
                }
                configData={configData}
                deliveryAddress={geoCodeResults?.results[0]?.formatted_address}
                personName={
                  editAddress ? editAddress?.contact_person_name : personName
                }
                phone={
                  editAddress
                    ? editAddress?.contact_person_number
                    : profileInfo?.phone
                }
                lat={location?.lat ?? ""}
                lng={location?.lng ?? ""}
                popoverClose={closePopover}
                refetch={refetch}
                isRefetcing={isFetchingGeoCode}
                editAddress={editAddress}
              />
            </CustomStackFullWidth>
          </Paper>
        </CustomModal>
      )}
    </Box>
  );
};

AddNewAddress.propTypes = {};

export default AddNewAddress;
