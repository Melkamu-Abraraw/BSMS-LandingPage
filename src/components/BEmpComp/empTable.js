import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { BiEdit, BiTrashAlt } from "react-icons/bi";
import { getEmps } from "@/data/empdata/lib/EmpDbHelper";
import { useQuery } from "react-query";
import EmpUpdate from "./empUpdate";

const EmpTable = () => {
  const [selectedEmp, setSelectedEmp] = React.useState(null);

  const empUpdate = (emp) => {
    setSelectedEmp(emp);
  };
  const empDelete = () => {
    console.log("clicked");
  };

  const empActionButton = (params) => (
    <div className="flex justify-around gap-5">
      <button className="cursor" onClick={() => empUpdate(params.row)}>
        <BiEdit size={25} color={"rgb(34,197,94)"} />
      </button>
      <button className="cursor" onClick={empDelete}>
        <BiTrashAlt size={25} color={"rgb(244,63,94)"} />
      </button>
    </div>
  );

  const columns = [
    { field: "EmpId", headerName: "E_ID", width: 20, renderCell: ImageField },
    { field: "FullName", headerName: "FullName", width: 90 },
    { field: "Age", headerName: "Age", width: 10 },
    { field: "Gender", headerName: "Gender", width: 50 },
    { field: "Phone", headerName: "Phone", width: 90 },
    { field: "Address", headerName: "Address", width: 80 },
    { field: "JobType", headerName: "JobType", width: 70 },
    { field: "Experience", headerName: "Experience", width: 70 },
    {
      field: "RelativeId",
      headerName: "R_ID",
      width: 20,
      renderCell: ImageField,
    },
    { field: "RelativeName", headerName: "RelativeName", width: 90 },
    { field: "RelativePhone", headerName: "RelativePhone", width: 90 },
    { field: "RelativeAddress", headerName: "RelativeAddress", width: 80 },
    { field: "Relationship", headerName: "Relationship", width: 70 },
    {
      field: "actions",
      headerName: "Actions",
      width: 90,
      renderCell: empActionButton,
    },
  ];

  const { isLoading, isError, data, error } = useQuery("workers", getEmps);

  if (isLoading) return <div>Please wait...</div>;
  if (isError) return <div>Error{error}</div>;
  const rows = data.map((emp, i) => ({ ...emp, id: i }));

  return (
    <div style={{ width: "99%", height: "auto" }}>
      {selectedEmp ? (
        <EmpUpdate emp={selectedEmp} />
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
        />
      )}
    </div>
  );
};

export default EmpTable;

function ImageField(params) {
  return (
    <img
      src={params.value}
      alt="empImage"
      className="h-10 w-12 flex  items-center justify-center"
    />
  );
}
