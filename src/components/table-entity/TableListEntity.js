import { deleteInDatabase } from "../../hooks/useRepository";
import TableLabels from "../forms/TableLabels";
import { usePouch } from "use-pouchdb";

const modeloData = [
  { nombre: "id", width: "20", label: "ID" },
  {
    nombre: "key",
    width: "20",
    label: "KEY",
  },
  {
    nombre: "doc",
    width: "50",
    label: "DESCRIPCIÓN",
  },
];

const convertToString = (obj) => {
  const arr = Object.keys(obj).map((key) => [key, obj[key]]);
  const str = arr.map((e) => {
    return (
      <>
        {e[0] + ": " + e[1]}
        <br />
      </>
    );
  });

  return str;
};

export default function TableEntityList({ data, setLoading, setSent }) {
  const db = usePouch();

  return (
    <>
      <div className="d-flex">
        <TableLabels modelo={modeloData} />
      </div>
      {data?.length > 0 ? (
        data?.map((e, i) => {
          return (
            <div key={i} className="my-0">
              <div className="d-flex">
                {modeloData?.map((m, index) => {
                  return (
                    <div key={index} className={`table-${m.width}-db`}>
                      <div className="input-table-db label-table input-table-required">
                        {m.nombre === "doc"
                          ? convertToString(e?.doc)
                          : e?.[m?.nombre]}
                      </div>
                    </div>
                  );
                })}
                <div className="table-10 d-flex">
                  <img
                    src="/icons/delete-table.png"
                    className="my-12 mx-auto cursor-pointer"
                    alt="Eliminar"
                    onClick={() =>
                      deleteInDatabase(db, e?.doc?._id, setLoading, setSent)
                    }
                  />
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="my-20">No hay datos</div>
      )}
    </>
  );
}
