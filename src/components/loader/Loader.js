import React from "react";
import styles from "./Loader.module.css";

function Loader({ isloading, children }) {
  return isloading ? <Loading /> : <>{children}</>;
}

function Loading() {
  return (
    <div className={styles.containerLoader}>
      <h2 className="my-0">Cargando...</h2>
      <div className={styles.loader} />
    </div>
  );
}

export default Loader;
