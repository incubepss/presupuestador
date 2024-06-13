import React, { useRef, useState } from "react";
import * as ReactDOM from "react-dom";
import {
  IntlProvider,
  FormattedMessage,
  FormattedNumber,
  FormattedDate,
} from "react-intl";
import PropTypes from "prop-types";

//export { CalculateWidget, Calculate }

export function CalculateWidget(props) {
  // Note: since React 15.2.0 we can't forward unknown element attributes, so we
  // exclude the "options" and "schema" ones here.
  const {
    id,
    value,
    className,
    readonly,
    disabled,
    autofocus,
    onBlur,
    onFocus,
    options,
    schema,
    uiSchema,
    formContext,
    registry,
    rawErrors,
    ...inputProps
  } = props;

  const resultId = `${id}_result`;
  const resultRef = useRef();
  const { state, setState } = useState(0);

  const calcW = {
    [id]: {
      ref: resultRef,
      idResult: resultId,
      setState: setState,
      type: props.schema.type,
      format: props.schema.format,
    },
  };
  const { innerClass } = props.options;

  if (formContext.CalculateWidgets === undefined)
    formContext.CalculateWidgets = [calcW];
  else formContext.CalculateWidgets.push(calcW);

  return (
    <p className={innerClass}>
      <span id={resultId} ref={resultRef}>
        {getFormatJS(state, props.schema.type, props.schema.format)}
      </span>
    </p>
  );
}

CalculateWidget.defaultProps = {
  value: "0",
  required: false,
  disabled: false,
  readonly: true,
  autofocus: false,
};

if (process.env.NODE_ENV !== "production") {
  CalculateWidget.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.any,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
  };
}

export function Calculate(id, data, frmContext) {
  if (frmContext && frmContext.CalculateWidgets) {
    frmContext.CalculateWidgets.find((w, i) => {
      if (w[id]) {
        var widget = w[id];
        var obj = ReactDOM.render(
          getFormatJS(data, widget.type),
          w[id].ref.current
        );
        //w[ id ].ref.current.textContent = formatea(data);
      }
    });
  }
}

function getFormatJS(data, type, format) {
  switch (type) {
    case "number":
      return FormatNumber(data);

    case format === "date":
      return FormatDate(data);

    default:
      return data;
  }
}

function FormatNumber(data) {
  return (
    <IntlProvider messages={""} locale="es-AR" defaultLocale="es-AR">
      <FormattedNumber value={data} style="currency" currency="ARS" />
    </IntlProvider>
  );
}

function FormatDate(data) {
  return (
    <IntlProvider messages={""} locale="es-AR" defaultLocale="es-AR">
      <FormattedDate
        value={data}
        year="numeric"
        month="2-digit"
        day="2-digit"
      />
    </IntlProvider>
  );
}
