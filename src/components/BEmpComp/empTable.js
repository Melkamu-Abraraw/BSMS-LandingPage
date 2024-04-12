"use client";
import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { BiEdit, BiTrashAlt } from "react-icons/bi";
import { getEmployees } from "@/data/empdata/lib/EmpHelper";
import { useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleChangeAction,
  updateAction,
  deleteAction,
} from "@/redux/empRedux/reducer";

const EmpTable = () => {
  const { isLoading, isError, data, error } = useQuery("workers", getEmployees);
  const formVisible = useSelector((state) => state.app.client.toggleForm);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmployees);
  }, [dispatch]);

  if (isLoading) return <div>Loading Please wait...</div>;
  if (isError) return <div>Error{error}</div>;

  const empUpdate = (_id) => {
    dispatch(toggleChangeAction(_id));
    if (formVisible) {
      dispatch(updateAction(_id));
    }
  };
  const empDelete = (_id) => {
    if (!formVisible) {
      dispatch(deleteAction(_id));
    }
  };

  const empActionButton = (params) => (
    <div className="flex justify-around gap-5">
      <button className="cursor" onClick={() => empUpdate(params.row._id)}>
        <BiEdit size={25} color={"rgb(34,197,94)"} />
      </button>
      <button className="cursor" onClick={() => empDelete(params.row._id)}>
        <BiTrashAlt size={25} color={"rgb(244,63,94)"} />
      </button>
    </div>
  );

  const EmpHeader = [
    {
      field: "EmpAvator",
      headerName: "E_ID",
      width: 20,
      renderCell: ImageField,
    },
    { field: "FullName", headerName: "FullName", width: 90 },
    { field: "Age", headerName: "Age", width: 10 },
    { field: "Gender", headerName: "Gender", width: 50 },
    { field: "Phone", headerName: "Phone", width: 90 },
    { field: "Address", headerName: "Address", width: 80 },
    { field: "JobType", headerName: "JobType", width: 70 },
    { field: "Experience", headerName: "Experience", width: 70 },
    {
      field: "RelAvator",
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
  // const EmpList = data.map((empObj, index) => ({ ...empObj, id: index }));
  const EmpList = data.map((empObj) => ({ ...empObj, id: empObj._id }));

  return (
    <div style={{ width: "99%", height: "auto" }}>
      <DataGrid
        rows={EmpList}
        columns={EmpHeader}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
      />
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
