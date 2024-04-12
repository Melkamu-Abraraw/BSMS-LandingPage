// "use client";
// import "../../app/globals.css";
// import React, { useState } from "react";
// import { BiPlus, BiX } from "react-icons/bi";
// import TextField from "@mui/material/TextField";
// import { Grid } from "@mui/material";
// import { useMutation, useQueryClient } from "react-query";
// import { createEmployee, getEmployees } from "@/data/empdata/lib/EmpHelper";
// import { useDispatch } from "react-redux";
// import { loadProfile } from "@/redux/empRedux/reducer";
// import Bug from "./errorChecker";
// import Success from "./successMsg";

// const EmpAdd = ({ formData, setFormData }) => {
//   //quers
//   const queryClient = useQueryClient();
//   const empAddMutation = useMutation(createEmployee, {
//     onSuccess: () => {
//       console.log("Successfuly Inserted");
//       queryClient.prefetchQuery("workers", getEmployees);
//       window.location.reload();
//     },
//   });

//   //states
//   const dispatch = useDispatch();
//   const [empImage, setEmpImage] = useState(null);
//   const [relImage, setRelImage] = useState(null);
//   const [file, setFile] = useState(null);

//   //handel and upload employe image
//   const handleEmpImage = (e) => {
//     const file = e.target.files[0];
//     const imageUrl = URL.createObjectURL(file);
//     setEmpImage(imageUrl);
//     dispatch(loadProfile(imageUrl));
//     setFile(file);
//   };

//   //handel and upload Relative image
//   const handleRelImage = (e) => {
//     const file = e.target.files[0];
//     const imageUrl = URL.createObjectURL(file);
//     setRelImage(imageUrl);
//     dispatch(loadProfile(imageUrl));
//     setFile(file);
//   };

//   //submit form
//   const handleAddSubmit = async (e) => {
//     const formDataToSend = new FormData();
//     e.preventDefault();
//     if (Object.keys(formData).length == 0)
//       return console.log("You Don't Have any Data");
// let {
//   // empImage,
//   FullName,
//   Age,
//   Gender,
//   Phone,
//   Address,
//   JobType,
//   Experience,
//   // relImage,
//   RelativeName,
//   RelativePhone,
//   RelativeAddress,
//   Relationship,
// } = formData;

//     const empId = formDataToSend.append("empImage", file);
//     const relId = formDataToSend.append("relImage", file);
//     const addModel = {
//       // EmpAvator: `${empId}`,
//       FullName,
//       Age,
//       Gender,
//       Phone,
//       Address,
//       JobType,
//       Experience,
//       // RelAvator: `${relId}`,
//       RelativeName,
//       RelativePhone,
//       RelativeAddress,
//       Relationship,
//     };
//     empAddMutation.mutate(addModel);
//     console.log(addModel);
//   };

//   if (empAddMutation.isLoading) return <div>LOADING...</div>;
//   if (empAddMutation.isError)
//     return <Bug message={empAddMutation.error.message}></Bug>;
//   if (empAddMutation.isSuccess)
//     return (
//       <Success message={"Congratulation! Emp Added Successfuly"}></Success>
//     );

//   return (
//     <>
//       <form
//         className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white py-5 px-5 border border-gray-200 rounded-md"
//         onSubmit={handleAddSubmit}
//       >
//         <section>
//           <h1 className="text-xl  font-semibold mb-4 text-center">
//             Add Workers Information
//           </h1>
//           <label
//             htmlFor="emp-upload-input"
//             className="block mx-auto md:mx-0  md:mb-5"
//           >
//             <input
//               id="emp-upload-input"
//               type="file"
//               accept="empImage/*"
//               onChange={handleEmpImage}
//               className="sr-only"
//             />
//             <div className="w-24 h-24 rounded-full border-2 border-gray-300 flex items-center justify-center cursor-pointer mx-auto">
//               {empImage ? (
//                 <img
//                   src={empImage}
//                   alt="Uploaded"
//                   className="w-full h-full rounded-full"
//                 />
//               ) : (
//                 <p className="text-gray-500">Emp_ID</p>
//               )}
//             </div>
//           </label>

//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 variant="outlined"
//                 type="text"
//                 name="FullName"
//                 onChange={setFormData}
//                 label="Employee FullName"
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 variant="outlined"
//                 type="number"
//                 name="Age"
//                 onChange={setFormData}
//                 label="Employee Age"
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 variant="outlined"
//                 type="text"
//                 name="Gender"
//                 onChange={setFormData}
//                 label="Employee Gender"
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 variant="outlined"
//                 type="text"
//                 name="Phone"
//                 onChange={setFormData}
//                 label="Employee Phone"
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 variant="outlined"
//                 type="text"
//                 name="Address"
//                 onChange={setFormData}
//                 label="Employee Address"
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 variant="outlined"
//                 type="text"
//                 name="JobType"
//                 onChange={setFormData}
//                 label="Employee JobType"
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 variant="outlined"
//                 type="text"
//                 name="Experience"
//                 onChange={setFormData}
//                 label="Employee Experience"
//               />
//             </Grid>
//           </Grid>
//         </section>
//         <section>
//           <h1 className="text-xl font-semibold mb-4 md:text-center">
//             Add Relatives Information
//           </h1>
//           <label
//             htmlFor="rel-upload-input"
//             className="block mx-auto md:mx-0  md:mb-5"
//           >
//             <input
//               id="rel-upload-input"
//               type="file"
//               accept="relImage/*"
//               onChange={handleRelImage}
//               className="sr-only"
//             />
//             <div className="w-24 h-24 rounded-full border-2 border-gray-300 flex items-center justify-center cursor-pointer mx-auto">
//               {relImage ? (
//                 <img
//                   src={relImage}
//                   alt="Uploaded"
//                   className="w-full h-full rounded-full"
//                 />
//               ) : (
//                 <p className="text-gray-500">Rel_ID</p>
//               )}
//             </div>
//           </label>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 variant="outlined"
//                 type="text"
//                 name="RelativeName"
//                 onChange={setFormData}
//                 label="Relative FullName"
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 variant="outlined"
//                 type="text"
//                 name="RelativePhone"
//                 onChange={setFormData}
//                 label="Relative PhoneNumber"
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 variant="outlined"
//                 type="text"
//                 name="RelativeAddress"
//                 onChange={setFormData}
//                 label="Relative Address"
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 variant="outlined"
//                 type="text"
//                 name="Relationship"
//                 onChange={setFormData}
//                 label="There Relationship "
//               />
//             </Grid>
//           </Grid>
//           <div className="flex gap-5 justify-end mt-20">
//             <button
//               type="submit"
//               className="flex justify-center  text-md h-30 w-20
//                          bg-red-300 font-bold text-black px-12 py-2 border
//                          rounded-md hover:bg-gray-600 hover:border-green-500 hover:text-white"
//             >
//               Create{" "}
//               <span className="px-1">
//                 <BiPlus size={24} />
//               </span>
//             </button>
//           </div>
//         </section>
//       </form>
//     </>
//   );
// };

// export default EmpAdd;

"use client";
import "../../app/globals.css";
import React, { useState } from "react";
import { BiPlus, BiX } from "react-icons/bi";
import TextField from "@mui/material/TextField";
import { useQueryClient } from "react-query";
import { Grid } from "@mui/material";
import { getEmployees } from "@/data/empdata/lib/EmpHelper";
const EmpAdd = ({ formData, setFormData }) => {
  // Define BASE_URL
  const BASE_URL = "http://localhost:3000/";

  const queryClient = useQueryClient();

  const [empImageFile, setEmpImageFile] = useState(null);
  const [relImageFile, setRelImageFile] = useState(null);

  const handleEmpImage = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file); // Get the URL of the uploaded image
    setEmpImageFile(imageUrl);
    console.log(imageUrl)
  };

  const handleRelImage = (e) => {
    const file = e.target.files[0];
    setRelImageFile(file);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    try {
      let {
        empImageFile,
        FullName,
        Age,
        Gender,
        Phone,
        Address,
        JobType,
        Experience,
        relImageFile,
        RelativeName,
        RelativePhone,
        RelativeAddress,
        Relationship,
      } = formData;
      const model = {
        EmpAvator:empImageFile,
        FullName,
        Age,
        Gender,
        Phone,
        Address,
        JobType,
        Experience,
        RelAvator:relImageFile,
        RelativeName,
        RelativePhone,
        RelativeAddress,
        Relationship,
     
      };
     console.log(relImageFile)
     
      const response = await fetch(`${BASE_URL}/api/workers/createEmployee`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataToSend),
      });
      if (!response.ok) {
        throw new Error("Failed to create employee");
      }
      if (response) {
        console.log(response);
        queryClient.prefetchQuery("workers", getEmployees);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
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
              onChange={handleEmpImage}
              className="sr-only"
            />
            <div className="w-24 h-24 rounded-full border-2 border-gray-300 flex items-center justify-center cursor-pointer mx-auto">
              {empImageFile ? (
                <img
                  src={empImageFile}
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
              onChange={handleRelImage}
              className="sr-only"
            />
            <div className="w-24 h-24 rounded-full border-2 border-gray-300 flex items-center justify-center cursor-pointer mx-auto">
              {relImageFile ? (
                <img
                  src={URL.createObjectURL(relImageFile)}
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
    </>
  );
};

export default EmpAdd;
