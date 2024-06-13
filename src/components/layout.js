import Head from "next/head";

import FooterBA from "./bastrap/footer-ba";
import HeaderBA from "./bastrap/header-ba";

export default function Layout({ children, jumbo, breadcrumb, headPage }) {
  return (
    <>
      <Head>
        <title>Presupuestador</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta
          name="description"
          content="Esta herramienta permite identificar si el precio que proponen es suficiente para cubrir los costos del trabajo formal y promover buenas prácticas en los acuerdos entre oferta y demanda a partir del establecimiento de precios justos."
        />
        <meta name="theme-color" content="#000" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
      </Head>
      <HeaderBA></HeaderBA>
      <main>
        {breadcrumb}
        {jumbo}
        {headPage}
        <div className="container">{children}</div>
      </main>
      <FooterBA>bla</FooterBA>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
      <script
        src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
        integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
        crossOrigin="anonymous"
      ></script>
      <script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-element-bundle.min.js"></script>
    </>
  );
}
