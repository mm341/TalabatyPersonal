import React, { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import MainLayout from "../../../src/components/layout/MainLayout";
import CampaignsDetails from "../../../src/components/campaigns-details";
import { useRouter } from "next/router";
import useGetBasicCampaignsDetails from "../../../src/api-manage/hooks/react-query/useGetBasicCampaignsDetails";
import SEO from "../../../src/components/seo";
import { getServerSideProps } from "../../index";
import CustomContainer from "../../../src/components/container";

const Index = ({ configData, landingPageData }) => {
  //  hooks
  const router = useRouter();
  const id = router.query.id;
  //   Get Campaigns Details from calling api
  const { data, refetch, isLoading, isRefetching } =
    useGetBasicCampaignsDetails({ id });
  useEffect(() => {
    refetch();
  }, [id]);

  return (
    <>
      <CssBaseline />
      <SEO
        title={data?.title}
        image={`${configData?.base_urls?.business_logo_url}/${configData?.fav_icon}`}
        businessName={configData?.business_name}
        configData={configData}
      />
      <MainLayout configData={configData} landingPageData={landingPageData}>
        <CustomContainer>
          <CampaignsDetails
            campaignsDetails={data}
            configData={configData}
            isLoading={isLoading}
            isRefetching={isRefetching}
          />
        </CustomContainer>
      </MainLayout>
    </>
  );
};

export default Index;
export { getServerSideProps };
