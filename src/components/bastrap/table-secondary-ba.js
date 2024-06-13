import styles from "./table-secondary-ba.module.css";
import { Badge } from "react-bootstrap";

export default function TableBorderlessBA() {
  return (
    <>
      <table
        className="table table-borderless"
        className={styles.tableSecondary}
      >
        <tbody>
          <tr className={styles.trSecondary}>
            <th scope="row">
              <Badge bg="info" text="white">
                Enviado
              </Badge>
            </th>
            <td>
              <ul>
                <li className={styles.textBold}>Presupuesto Nro. 23</li>
                <li className={styles.text}>Cliente: Proyecto Wow</li>
              </ul>
            </td>
            <td className={styles.tdCifra}>$23.000,54</td>
            <td className={styles.iTableSecondary}>
              <span className="glyphicon glyphicon-eye-open"></span>
            </td>
            <td className={styles.iTableSecondary}>
              <span className=" glyphicon glyphicon-duplicate"></span>
            </td>
          </tr>
          <tr className={styles.trSecondary}>
            <th scope="row">
              <Badge bg="info" text="white">
                Enviado
              </Badge>
            </th>
            <td>
              <ul>
                <li className={styles.textBold}>Presupuesto Nro. 24</li>
                <li className={styles.text}>Cliente: Proyecto Wow</li>
              </ul>
            </td>
            <td className={styles.tdCifra}>$23.000,54</td>
            <td className={styles.iTableSecondary}>
              <span className="glyphicon glyphicon-eye-open"></span>
            </td>
            <td className={styles.iTableSecondary}>
              <span className=" glyphicon glyphicon-duplicate"></span>
            </td>
          </tr>
          <tr className={styles.trSecondary}>
            <th scope="row">
              <Badge bg="info" text="white">
                Enviado
              </Badge>
            </th>
            <td>
              <ul>
                <li className={styles.textBold}>Presupuesto Nro. 25</li>
                <li className={styles.text}>Cliente: Proyecto Wow</li>
              </ul>
            </td>
            <td className={styles.tdCifra}>$23.000,54</td>
            <td className={styles.iTableSecondary}>
              <span className="glyphicon glyphicon-eye-open"></span>
            </td>
            <td className={styles.iTableSecondary}>
              <span className=" glyphicon glyphicon-duplicate"></span>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
