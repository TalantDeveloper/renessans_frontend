import React, { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { get } from "lodash";
import { useTranslation } from "react-i18next";
// import LoadingMain from "../../shared/utils/LoadingMain";
// import AudioDiktor from "../../shared/utils/AudioDiktor";
import { ChakraProvider } from "@chakra-ui/react";
import "../../shared/configs/i18nConfig";
const LoadingMain = lazy(() => import("../../shared/utils/LoadingMain"));
const AudioDiktor = lazy(() => import("../../shared/utils/AudioDiktor"));

const WebProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const { loading, footer } = useSelector((s) => s);
  useEffect(() => {
    getMenu();
    // if (!footer?.links?.length) getFooter();
    getFooter();
  }, [i18n.language]);
  const getMenu = () => {
    dispatch({ type: "SET_MENU_LOADING", payload: true });
    axios()
      .get(`api/v1/menu/list`)
      .then((r) => {
        dispatch({ type: "SET_MENU", payload: get(r, "data.data", []) });
      })
      .catch((e) => {})
      .finally(() => {
        dispatch({ type: "SET_MENU_LOADING", payload: false });
      });
  };
  const getFooter = () => {
    // dispatch({ type: "SET_MENU_LOADING", payload: true });
    axios()
      .get(`api/v1/footer`)
      .then((r) => {
        dispatch({ type: "SET_FOOTER", payload: get(r, "data.data", {}) });
      })
      .catch((e) => {})
      .finally(() => {
        // dispatch({ type: "SET_MENU_LOADING", payload: false });
      });
  };
  return (
    <>
      <ChakraProvider>
        {children}
        <Suspense>
          {loading && <LoadingMain />}
          <AudioDiktor />
        </Suspense>
      </ChakraProvider>
    </>
  );
};
export default WebProvider;
