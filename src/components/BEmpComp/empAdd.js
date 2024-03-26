// import React, { useReducer, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loadProfile } from "@/redux/features/auth-slice";
// import { useMutation } from "react-query";
// import { addEmp } from "@/data/empdata/lib/EmpDbHelper";
// import Bug from "./errorChecker";
// import Success from "./successMsg";
// import { Grid } from "@mui/material";
// import TextField from "@mui/material/TextField";
// import { BiPlus } from "react-icons/bi";

// const formReducer = (state, event) => {
//   return {
//     ...state,
//     [event.target.name]: event.target.value,
//   };
// };
// const EmpAdd = () => {
//   const [formData, setFormData] = useReducer(formReducer, {});
//   const dispatch = useDispatch();
//   const [empImage, setEmpImage] = useState(null);
//   const [relImage, setRelImage] = useState(null);

//   const handleEmpImageChange = (e) => {
//     const file = e.target.files[0];
//     const imageUrl = URL.createObjectURL(file);

//     setEmpImage(imageUrl);
//     dispatch(loadProfile(imageUrl));
//   };

//   const handleRelImageChange = (e) => {
//     const file = e.target.files[0];
//     const imageUrl = URL.createObjectURL(file);

//     setRelImage(imageUrl);
//     dispatch(loadProfile(imageUrl));
//   };

//   const empAddMutation = useMutation(addEmp, {
//     onSuccess: () => {
//       console.log("Emp Data Inserted Successfully!");
//     },
//   });

//   const handleAddSubmit = (e) => {
//     e.preventDefault();
//     if (Object.keys(formData).length === 0) {
//       console.log("You Don't Have any Data");
//       return;
//     }

//     let {
//       EmpId,
//       FullName,
//       Age,
//       Gender,
//       Phone,
//       Address,
//       JobType,
//       Experience,
//       RelativeId,
//       RelativeName,
//       RelativePhone,
//       RelativeAddress,
//       Relationship,
//     } = formData;

//     const addModel = {
//       EmpId,
//       FullName,
//       Age,
//       Gender,
//       Phone,
//       Address,
//       JobType,
//       Experience,
//       RelativeId,
//       RelativeName,
//       RelativePhone,
//       RelativeAddress,
//       Relationship,
//     };

//     // Append images with file as key-value pairs
//     const formDataToSend = new FormData();
//     for (const key in addModel) {
//       formDataToSend.append(key, addModel[key]);
//     }
//     formDataToSend.append("empImage", empImage);
//     formDataToSend.append("relImage", relImage);

//     empAddMutation.mutate(formDataToSend);
//   };

"use client";
import "../../app/globals.css";
import React, { useReducer, useState } from "react";
import { BiPlus, BiX } from "react-icons/bi";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { loadProfile } from "@/redux/features/auth-slice";
import { useMutation, useQueryClient } from "react-query";
import { addEmp, getEmps } from "@/data/empdata/lib/EmpDbHelper";
import Bug from "./errorChecker";
import Success from "./successMsg";
import EmpTable from "./empTable";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

const EmpAdd = () => {
  const [Visible, setVisible] = React.useState(true);

  const [formData, setFormData] = useReducer(formReducer, {});
  const dispatch = useDispatch();
  const [empImage, setEmpImage] = useState(null);
  const [relImage, setRelImage] = useState(null);

  const queryClient = useQueryClient();

  const empAddMutation = useMutation(addEmp, {
    onSuccess: () => {
      queryClient.prefetchQuery("workers", getEmps);
    },
  });

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

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(formData).length == 0)
      return console.log("You Don't Have any Data");
    let {
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
    } = formData;

    const addModel = {
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
    };
    empAddMutation.mutate(addModel);
    window.location.reload();
  };

  if (empAddMutation.isLoading) return <div>Pending...</div>;
  if (empAddMutation.isError)
    return <Bug message={empAddMutation.error.message}></Bug>;
  if (empAddMutation.isSuccess)
    return (
      <Success message={"Congratulation! Emp Added Successfuly"}></Success>
    );

  const onCancel = () => {
    setVisible(false);
  };

  return (
    <>
      {Visible ? (
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
                  type="number"
                  name="Age"
                  onChange={setFormData}
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
      ) : (
        <EmpTable />
      )}
    </>
  );
};

export default EmpAdd;
