import React from "react";
import PropTypes from "prop-types";

function HtmlWidget(props) {
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

  var htmlString = "";

  if (options.html) {
    htmlString =
      typeof htmlString !== "string"
        ? options.html
        : options.html.replace("<%=value%>", value == null ? "" : value);
  }

  if (formContext.HtmlWidgets === undefined) formContext.HtmlWidget = [id];
  else formContext.HtmlWidget.push(id);

  // If options.inputType is set use that as the input type
  if (options.inputType) {
    inputProps.type = options.inputType;
  } else if (!inputProps.type) {
    // If the schema is of type number or integer, set the input type to number
    if (schema.type === "number") {
      inputProps.type = "number";
      // Setting step to 'any' fixes a bug in Safari where decimals are not
      // allowed in number inputs
      inputProps.step = "any";
    } else if (schema.type === "integer") {
      inputProps.type = "number";
      // Since this is integer, you always want to step up or down in multiples
      // of 1
      inputProps.step = "1";
    } else {
      inputProps.type = "text";
    }
  }

  const _onChange = ({ target: { value } }) => {
    return props.onChange(value === "" ? options.emptyValue : value);
  };

  return (
    <div
      id={id}
      className={className}
      onChange={_onChange}
      onBlur={onBlur && ((event) => onBlur(inputProps.id, event.target.value))}
      dangerouslySetInnerHTML={{ __html: htmlString }}
    ></div>
  );
}

HtmlWidget.defaultProps = {
  required: false,
  disabled: false,
  readonly: true,
  autofocus: false,
};

if (process.env.NODE_ENV !== "production") {
  HtmlWidget.propTypes = {
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

export default HtmlWidget;
