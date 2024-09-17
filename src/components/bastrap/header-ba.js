import Link from "next/link";
import Loader from "../loader/Loader";
import styles from "./header-ba.module.css";
import React, { useContext } from "react";
import UserDataContext from "../../context/UserDataContext";
import { useRouter } from "next/router";

export default function HeaderBA() {
  const { isLoading, userData } = useContext(UserDataContext);

  const router = useRouter();

  return (
    <Loader isloading={isLoading}>
      <header id="header" className={styles.header}>
        <div className="container">
          <div className={styles.colflexHeader}>
            <Link href={userData?._id ? "/miperfil" : "/"}>
              <a className={styles.colflexHeaderLogo}>
                <img src="/images/logos/logo.png" alt="logo enlaces"/>
                <h2>Presupuestador</h2>
              </a>
            </Link>
            <div>
              <nav className="navbar navbar-default" role="navigation">
                <div className="back margin-auto">
                  {userData?._id && (
                    <>
                      <div className="navbar-header">
                        <button
                          type="button"
                          className="navbar-toggle"
                          data-toggle="collapse"
                          data-target="#main-nav"
                        >
                          <span className="sr-only">Cambiar navegación</span>
                          <span className="icon-bar"></span>
                          <span className="icon-bar"></span>
                          <span className="icon-bar"></span>
                          <span className="icon-bar"></span>
                        </button>
                      </div>

                      <div className="collapse navbar-collapse" id="main-nav">
                        <ul className="nav navbar-nav navbar-right">
                          <li
                            className={
                              "link-menu-header py-0" +
                              `${
                                router?.asPath === "/miperfil"
                                  ? " active-link-header"
                                  : ""
                              }`
                            }
                            data-toggle="collapse"
                            data-target="#main-nav"
                          >
                            <Link className="py-0" href="/miperfil">
                              Inicio
                            </Link>
                          </li>
                          <li
                            className={
                              "link-menu-header py-0" +
                              `${
                                router?.asPath === "/cliente"
                                  ? " active-link-header"
                                  : ""
                              }`
                            }
                            data-toggle="collapse"
                            data-target="#main-nav"
                          >
                            <Link className="py-0" href="/cliente">
                              Mis Clientes
                            </Link>
                          </li>
                          <li
                            className={
                              "link-menu-header py-0" +
                              `${
                                router?.asPath === "/remuneracion" ||
                                router?.asPath.includes("/costos") ||
                                router?.asPath.includes("/fichas") ||
                                router?.asPath === "/capacidad-productiva"
                                  ? " active-link-header"
                                  : ""
                              }`
                            }
                            data-toggle="collapse"
                            data-target="#main-nav"
                          >
                            <Link className="py-0" href="/remuneracion">
                              Mis Costos
                            </Link>
                          </li>
                          <li
                            className={
                              "link-menu-header py-0" +
                              `${
                                router?.asPath.includes("/presupuesto")
                                  ? " active-link-header"
                                  : ""
                              }`
                            }
                            data-toggle="collapse"
                            data-target="#main-nav"
                          >
                            <Link className="py-0" href="/presupuesto">
                              Mis Presupuestos
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </Loader>
  );
}
