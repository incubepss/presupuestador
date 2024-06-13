import "../public/bastrap.css";
import "../styles/app.css";
import "../styles/colors.css";
import "../styles/buttons.css";
import "../styles/table.css";
import "../styles/spaces.css";
import "../styles/responsive.css";
import "../styles/perfil.css";
import "../styles/dashboard.css";

import React, { useState, useEffect } from "react";
import { UserDataProvider } from "../context/UserDataContext";
import { PresupuestosProvider } from "../context/PresupuestosContext";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import PouchDB from "pouchdb";
import { Provider } from "use-pouchdb";
import PouchDBFind from "pouchdb-find";
PouchDB.plugin(PouchDBFind);

function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  const session = pageProps.session;
  const localDB = new PouchDB("dbPresupuestos");

  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      window.gtag("config", "G-5BTHJ0M08V", {
        page_path: url,
      });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <SessionProvider session={session}>
        <Provider pouchdb={localDB}>
          <UserDataProvider>
            <PresupuestosProvider>
              {getLayout(<Component {...pageProps} />)}
            </PresupuestosProvider>
          </UserDataProvider>
        </Provider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
