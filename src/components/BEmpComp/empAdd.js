"use client";
import "../../app/globals.css";
import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { loadProfile } from "@/redux/features/auth-slice";

const EmpAdd = ({ formData, setFormData }) => {
  const handleAddSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const dispatch = useDispatch();
  const [empImage, setEmpImage] = useState(null);
  const [relImage, setRelImage] = useState(null);

  const handleEmpImageChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);

    setEmpImage(imageUrl);
    dispatch(loadProfile(imageUrl));
  };

  const handleRelImageChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);

    setRelImage(imageUrl);
    dispatch(loadProfile(imageUrl));
  };

  return (
    <form
      className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white py-5 px-5 border border-gray-200 rounded-md"
      onSubmit={handleAddSubmit}
    >
      <section>
        <h1 className="text-xl  font-semibold mb-4 text-center">
          Add Workers Information
        </h1>
        <label
          htmlFor="emp-upload-input"
          className="block mx-auto md:mx-0  md:mb-5"
        >
          <input
            id="emp-upload-input"
            type="file"
            accept="image/*"
            onChange={handleEmpImageChange}
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
              label="Employee FullName"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              name="Gender"
              onChange={setFormData}
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
              label="Employee Experience"
            />
          </Grid>
        </Grid>
      </section>
      <section>
        <h1 className="text-xl font-semibold mb-4 md:text-center">
          Add Relatives Information
        </h1>
        <label
          htmlFor="rel-upload-input"
          className="block mx-auto md:mx-0  md:mb-5"
        >
          <input
            id="rel-upload-input"
            type="file"
            accept="image/*"
            onChange={handleRelImageChange}
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
              label="There Relationship "
            />
          </Grid>
        </Grid>
        <div className="flex justify-center mt-10">
          <button
            type="submit"
            className="flex justify-center  text-md h-30 w-20
                         bg-red-300 font-bold text-black px-12 py-2 border 
                         rounded-md hover:bg-gray-600 hover:border-green-500 hover:text-white"
          >
            Create{" "}
            <span className="px-1">
              <BiPlus size={24} />
            </span>
          </button>
        </div>
      </section>
    </form>
  );
};

export default EmpAdd;
