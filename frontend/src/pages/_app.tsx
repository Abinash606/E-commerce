import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { CssBaseline } from "@mui/material";
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-multi-carousel/lib/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

export default function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Electronic Commerce</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRouterCacheProvider>
            <CssBaseline />
            <Component {...pageProps} />
            <ToastContainer />
          </AppRouterCacheProvider>
        </PersistGate>
      </Provider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
