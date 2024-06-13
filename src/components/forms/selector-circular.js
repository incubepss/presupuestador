import { useState } from "react";
import styles from "../bastrap/atajos-ba.module.css";

export default function SelectorCircular({ children, radio, value }) {
  const [itemSel, setItemSel] = useState(value || "");
  const handleClickRadio = (e) => {
    setItemSel(e.currentTarget.value);
    //ValorSeleccionado = itemSel;
    value = itemSel;
  };
  const name = Math.random().toString();

  return (
    <>
      <div id={radio} className="justify-content-center shortcut-row colflex">
        {children.map((child, index) => {
          var resolveValue =
            child.props["value"] ||
            child.props["inicial"] ||
            child.props["titulo"];
          return (
            <ItemSelectorCircular
              titulo={child.props["titulo"]}
              color={child.props["color"]}
              inicial={child.props["inicial"]}
              index={index}
              selected={resolveValue == itemSel}
              value={resolveValue}
              name={name}
              handleClick={handleClickRadio}
            />
          );
        })}
      </div>
      <h4>El elemento seleccionado es: {itemSel}</h4>
    </>
  );
}

export function ItemSelectorCircular({
  name,
  titulo,
  inicial,
  color,
  index,
  selected,
  value,
  handleClick,
}) {
  var classCirculo = color + " inicialesGrid";
  var id = name + "_" + index;
  return (
    <>
      <div className="col-md-2 col-sm-6 shortcut">
        <span className={classCirculo}>
          <input
            className={styles.radioHidden}
            type="radio"
            name={name}
            id={id}
            defaultChecked={selected}
            value={value}
            onClick={handleClick}
          />

          <i></i>
          <h2 className={styles.iniciales}>{inicial}</h2>
        </span>
        <h3>{titulo}</h3>
      </div>
    </>
  );
}

const ValorSeleccionado = "Sin seleccionar";

export function ValorSelectorCircular() {
  return ValorSeleccionado;
}
