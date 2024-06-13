import { Breadcrumb, BreadcrumbItem as Item } from "react-bootstrap";
import styles from "./breadcrumb-ba.module.css";

export default function BreadcrumbBA({ children, paginaActual }) {
  return (
    <>
      <div className={styles.breadcrumbBA}>
        <div className="container">
          <Breadcrumb>
            <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
            {children}
            <Breadcrumb.Item active>{paginaActual}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
    </>
  );
}
