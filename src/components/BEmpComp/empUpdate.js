"use client";
import React, { useState, useReducer } from "react";
import { BiEditAlt, BiX } from "react-icons/bi";
import { useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import { loadProfile } from "@/redux/features/auth-slice";
import EmpTable from "./empTable";
import { useQuery } from "react-query";
import { getEmp } from "@/data/empdata/lib/EmpDbHelper";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

const EmpUpdate = () => {
  const [formData, setFormData, formId] = useReducer(formReducer, {});
  const [Visible, setVisible] = React.useState(true);
  const dispatch = useDispatch();
  const [empImage, setEmpImage] = useState(null);
  const [relImage, setRelImage] = useState(null);

  const { isLoading, isError, data, error } = useQuery(
    ["workers", formId],
    () => getEmp(formId)
  );

  if (isLoading) return <div>Loading !</div>;
  if (isError) return <div>Error ! </div>;

  const {
    EmpId,
    FullName,
    Age,
    Gender,
    Phone,
    Address,
    JobType,
    Experience,
    RelativeId,
    RelativeName,
    RelativePhone,
    RelativeAddress,
    Relationship,
  } = data;

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(formData).length == 0) return console.log("Empty!");
    window.location.reload();
  };

  const handleEmpImageUpdate = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);

    setEmpImage(imageUrl);
    dispatch(loadProfile(imageUrl));
  };

  const handleRelImageupdate = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);

    setRelImage(imageUrl);
    dispatch(loadProfile(imageUrl));
  };

  const onCancel = () => {
    setVisible(false);
  };
  return (
    <>
      {Visible ? (
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white py-5 px-5 border border-gray-200 rounded-md"
          onSubmit={handleUpdateSubmit}
        >
          <section>
            <h1 className="text-xl  font-semibold mb-4 text-center">
              Update Workers Information
            </h1>
            <label
              htmlFor="emp-upload-input"
              className="block mx-auto md:mx-0  md:mb-5"
            >
              <input
                id="emp-upload-input"
                type="file"
                accept="image/*"
                onChange={handleEmpImageUpdate}
                defaultValue={EmpId}
                className="sr-only"
              />
              <div className="w-24 h-24 rounded-full border-2 border-gray-300 flex items-center justify-center cursor-pointer mx-auto">
                {empImage ? (
                  <img
                    src={empImage}
                    alt="Uploaded"
                    className="w-full h-full rounded-full"
                  />
                ) : (
                  <p className="text-gray-500">Emp_ID</p>
                )}
              </div>
            </label>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  name="FullName"
                  onChange={setFormData}
                  defaultValue={FullName}
                  label="Employee FullName"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="number"
                  name="Age"
                  onChange={setFormData}
                  defaultValue={Age}
                  label="Employee Age"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  name="Gender"
                  onChange={setFormData}
                  defaultValue={Gender}
                  label="Employee Gender"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  name="Phone"
                  onChange={setFormData}
                  defaultValue={Phone}
                  label="Employee Phone"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  name="Address"
                  onChange={setFormData}
                  defaultValue={Address}
                  label="Employee Address"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  name="JobType"
                  onChange={setFormData}
                  defaultValue={JobType}
                  label="Employee JobType"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  name="Experience"
                  onChange={setFormData}
                  defaultValue={Experience}
                  label="Employee Experience"
                />
              </Grid>
            </Grid>
          </section>
          <section>
            <h1 className="text-xl font-semibold mb-4 md:text-center">
              Update Relatives Information
            </h1>
            <label
              htmlFor="rel-upload-input"
              className="block mx-auto md:mx-0  md:mb-5"
            >
              <input
                id="rel-upload-input"
                type="file"
                accept="image/*"
                onChange={handleRelImageupdate}
                defaultValue={RelativeId}
                className="sr-only"
              />
              <div className="w-24 h-24 rounded-full border-2 border-gray-300 flex items-center justify-center cursor-pointer mx-auto">
                {relImage ? (
                  <img
                    src={relImage}
                    alt="Uploaded"
                    className="w-full h-full rounded-full"
                  />
                ) : (
                  <p className="text-gray-500">Rel_ID</p>
                )}
              </div>
            </label>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  name="RelativeName"
                  onChange={setFormData}
                  defaultValue={RelativeName}
                  label="Relative FullName"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  name="RelativePhone"
                  onChange={setFormData}
                  defaultValue={RelativePhone}
                  label="Relative PhoneNumber"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  name="RelativeAddress"
                  onChange={setFormData}
                  defaultValue={RelativeAddress}
                  label="Relative Address"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  name="Relationship"
                  onChange={setFormData}
                  defaultValue={Relationship}
                  label="There Relationship "
                />
              </Grid>
            </Grid>

            <div className="flex gap-5 justify-end mt-20">
              <button
                type="button"
                onClick={onCancel}
                className="flex justify-center items-center text-md h-30 w-20
                       bg-red-300 text-black font-bold px-12 py-2 border rounded-md hover:bg-gray-200
                       hover:border-gray-500 hover:text-blue"
              >
                Cancel{" "}
                <span className="px-1">
                  <BiX size={24} />
                </span>
              </button>
              <button
                type="submit"
                className="flex justify-center items-center text-md h-30 w-20
                       bg-yellow-300 text-black font-bold px-12 py-2 border rounded-md hover:bg-gray-200
                       hover:border-gray-500 hover:text-blue"
              >
                Edit{" "}
                <span className="px-1">
                  <BiEditAlt size={24} />
                </span>
              </button>
            </div>
          </section>
        </form>
      ) : (
        <EmpTable />
      )}
    </>
  );
};

export default EmpUpdate;
