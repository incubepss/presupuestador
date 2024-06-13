import React from "react";
import PropTypes from "prop-types";
import styles from "../bastrap/atajos-ba.module.css";

function SelectorCircularWidget(props) {
  const {
    options,
    value,
    required,
    disabled,
    readonly,
    autofocus,
    onBlur,
    onFocus,
    onChange,
    id,
  } = props;

  // Generating a unique field name to identify this set of radio buttons
  const name = Math.random().toString();
  const { enumOptions, enumDisabled, inline, colors, initials } = options;
  // checked={checked} has been moved above name={name}, As mentioned in #349;
  // this is a temporary fix for radio button rendering bug in React, facebook/react#7630.

  return (
    /*<div className="field-radio-group" id={id}>-->*/
    <div className="justify-content-center shortcut-row colflex" id={id}>
      {enumOptions.map((option, i) => {
        const checked = option.value === value;
        const itemDisabled =
          enumDisabled && enumDisabled.indexOf(option.value) != -1;
        const disabledCls =
          disabled || itemDisabled || readonly ? "disabled" : "";
        const classCircle = colors[i] + " inicialesGrid";
        const inicial = initials[i];
        const radio = (
          <div className="col-md-2 col-sm-6 shortcut">
            <span className={classCircle}>
              <input
                className={styles.radioHidden}
                type="radio"
                checked={checked}
                name={name}
                required={required}
                value={option.value}
                disabled={disabled || itemDisabled || readonly}
                autoFocus={autofocus && i === 0}
                onChange={(_) => onChange(option.value)}
                onBlur={onBlur && ((event) => onBlur(id, event.target.value))}
                onFocus={
                  onFocus && ((event) => onFocus(id, event.target.value))
                }
              />
              <i></i>
              <h2 className={styles.iniciales}>{inicial}</h2>
            </span>
            <h3
              className={
                checked ? styles.titleSelected : styles.titleNoSelected
              }
            >
              {option.label}
            </h3>
          </div>
        );

        return <>{radio}</>;
      })}
    </div>
  );
}

SelectorCircularWidget.defaultProps = {
  autofocus: false,
};

if (process.env.NODE_ENV !== "production") {
  SelectorCircularWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    options: PropTypes.shape({
      enumOptions: PropTypes.array,
      inline: PropTypes.bool,
    }).isRequired,
    value: PropTypes.any,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
  };
}
export default SelectorCircularWidget;
