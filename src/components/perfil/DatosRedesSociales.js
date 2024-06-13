import React from "react";

import { WithContext as ReactTags } from "react-tag-input";

const DatosRedesSociales = ({ perfil, funct }) => {
  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  const handleDelete = (i) => {
    funct({
      ...perfil,
      redes: perfil.redes.filter((tag, index) => index !== i),
    });
  };

  const handleAddition = (tag) => {
    let temp = perfil?.redes
      ? { ...perfil, redes: [...perfil?.redes, tag] }
      : { ...perfil, redes: [tag] };

    funct(temp);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = perfil?.redes.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    funct({ ...perfil, redes: newTags });
  };

  return (
    <div>
      <h2 className="titulo-secundario mt-30">Redes sociales</h2>
      <div className="row mt-20">
        <div className="col col-sm-12">
          <div className="form-group">
            <label className="control-label" type="text" for="inputSuccess2">
              Podés incluir los enlaces a tus redes sociales en el campo de
              abajo.
            </label>
            <ReactTags
              classNames={{
                tags: "ReactTags__tags",
                tagInputField: "ReactTags__tagInputField form-control",
                selected: "ReactTags__selected",
                tag: "ReactTags__tag",
                remove: "ReactTags__remove",
              }}
              tags={perfil?.redes}
              delimiters={delimiters}
              handleDelete={handleDelete}
              handleAddition={handleAddition}
              handleDrag={handleDrag}
              inputFieldPosition="top"
              placeholder="Ingresar links de sus redes."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatosRedesSociales;
