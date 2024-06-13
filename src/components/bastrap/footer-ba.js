import Link from "next/link";
import styles from "./footer-ba.module.css";

export default function FooterBA() {
  return (
    <>
      <footer id="ba-footer" className={styles.bafooter}>
        <div className="container">
          {/* <div className={styles.footerrow + " row"}>
            <div className="col col-md-2 col-sm-4 col-xs-6">
              <div className={styles.containerba}>
                <a href="http://www.buenosaires.gob.ar/" target="_blank">
                  <img
                    src="/images/logos/ba_vamos_blanco.png"
                    className={`${styles.logofooter} img-responsive`}
                  />
                </a>
              </div>
            </div>
            <div
              className={styles.containerbaborder + " col col-md-4 col-sm-6"}
            >
              <Link href="/">
                <h3>Presupuestador</h3>
              </Link>
            </div>
          </div>
          
          <div className={"row " + styles.coltelefonos}>
            <div className="col col-md-2" smhidden="true"></div>
            <div className="col col-md-2">
              <h4 className="mt-0">Teléfonos útiles</h4>
              <h5 className="font-500">Ver todos los teléfonos</h5>
            </div>
            <ul className={styles.listatelefonos}>
              <li className={styles.elementotelefonos}>
                <a className={styles.telefonosutiles} href="tel:102">
                  102
                </a>
                <p>Niñez y Adolescencia</p>
              </li>
              <li className={styles.elementotelefonos}>
                <a className={styles.telefonosutiles} href="tel:103">
                  103
                </a>
                <p>Emergencias</p>
              </li>
              <li className={styles.elementotelefonos}>
                <a className={styles.telefonosutiles} href="tel:107">
                  107
                </a>
                <p>SAME</p>
              </li>
              <li className={styles.elementotelefonos}>
                <a className={styles.telefonosutiles} href="tel:911">
                  911
                </a>
                <p>Policía</p>
              </li>
              <li className={styles.elementotelefonos}>
                <a className={styles.telefonosutiles} href="tel:147">
                  147
                </a>
                <p>Atención ciudadana</p>
              </li>
              <li className={styles.elementotelefonos}>
                <a className={styles.telefonosutiles} href="tel:144">
                  144
                </a>
                <p>Violencia de género</p>
              </li>
            </ul>
          </div>
          
          <div className="row my-40 mt-sm-0">
            <div className="col col-md-2"></div>
            <div className="col col-md-2">
              <h4 className="font-500">Redes de la ciudad</h4>
            </div>
            <div className={styles.containerredes + " col col-md-8"}>
              <ul className={styles.minisocial}>
                <li>
                  <a
                    className={styles.socialvp}
                    href="https://valorpopular.buenosaires.gob.ar/"
                    target="_blank"
                  >
                    Valor Popular
                  </a>
                </li>
                <li>
                  <a
                    className={styles.socialfb}
                    href="http://www.facebook.com/gcba"
                    target="_blank"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    className={styles.socialtw}
                    href="http://www.twitter.com/gcba"
                    target="_blank"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    className={styles.socialyt}
                    href="http://www.youtube.com/user/GCBA"
                    target="_blank"
                  >
                    Youtube
                  </a>
                </li>
                <li>
                  <a
                    className={styles.socialin}
                    href="https://www.instagram.com/valorba/"
                    target="_blank"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    className={styles.socialrss}
                    href="https://plus.google.com/+GobiernodelaCiudaddeBuenosAires/"
                    target="_blank"
                  >
                    RSS
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className={"row " + styles.containerciudad}>
            <div className="col col-md-4">
              <a href="http://www.buenosaires.gob.ar/" target="_blank">
                <img
                  src="/images/logos/ba_blanco.png"
                  className={styles.logofooterciudad}
                  alt="Logo de la Ciudad de Buenos Aires"
                />
              </a>
              <p className={styles.legales}>
                Los contenidos de buenosaires.gob.ar están licenciados bajo
                Creative Commons Reconocimiento 2.5 Argentina License.
              </p>
            </div>
            <div className="col col-md-8">
              <ul className={styles.listatelefonos}>
                <li>
                  <a
                    href="https://boletinoficial.buenosaires.gob.ar"
                    target="_blank"
                  >
                    Boletín oficial
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.buenosaires.gob.ar/innovacion/ciudadinteligente/terminos-y-condiciones"
                    target="_blank"
                  >
                    Términos y condiciones
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.buenosaires.gob.ar/privacidad"
                    target="_blank"
                  >
                    Política de privacidad
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.buenosaires.gob.ar/oficiosjudiciales"
                    target="_blank"
                  >
                    Oficios judiciales
                  </a>
                </li>
              </ul>
            </div>
          </div> */}
        </div>
      </footer>
    </>
  );
}
