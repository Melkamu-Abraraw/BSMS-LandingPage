import Employees from "@/data/empdata/models/EmpModel";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

cloudinary.config({
  cloud_name: "dg5vvvpxd",
  api_key: "527162717384989",
  api_secret: "dH5wfMQl-_9cQm47hjbWYIoNl-E",
});

//get single
export async function getEmployee(req, res) {
  try {
    const { empId } = req.query;
    if (empId) {
      const getWorker = await Employees.findById(empId);
      res.status(200).json(getWorker);
    }
    res.status(404).json({ error: "user not selected" });
  } catch (error) {
    res.status(404).json({ error: "cannot get the user" });
  }
}

//get all
export async function getEmployees(req, res) {
  try {
    const getWorkers = await Employees.find({});
    if (!getWorkers) return res.status(404).json({ error: "Data not found" });
    res.status(200).json(getWorkers);
  } catch (error) {
    res.status(404).json({ error: "Error while Fetching data" });
  }
}

//add emp
// export async function createEmployee(req, res) {
//   try {
//     const formData = req.body;
//     if (!formData) {
//       return res.status(404).json({ error: "Form Data Not Provided" });
//     }

//     const worker = await Employees.create(formData);
//     return res.status(200).json(worker);
//   } catch (error) {
//     return res.status(404).json({ error: error.message });
//   }
// }

// export async function createEmployee(req, res) {
//   const {
//     // EmpAvator,
//     FullName,
//     Age,
//     Gender,
//     Phone,
//     Address,
//     JobType,
//     Experience,
//     // RelAvator,
//     RelativeName,
//     RelativePhone,
//     RelativeAddress,
//     Relationship,
//   } = req.body;

//   try {
//     const empIdStream = await cloudinary.uploader.upload(EmpAvator, {
//       resource_type: "auto",
//       folder: "IdImages",
//     });
//     const relativeIdStream = await cloudinary.uploader.upload(RelAvator, {
//       resource_type: "auto",
//       folder: "IdImages",
//     });
//     const creatWorker = await Employees.create({
//       // EmpAvator: empIdStream.secure_url,
//   FullName,
//   Age,
//   Gender,
//   Phone,
//   Address,
//   JobType,
//   Experience,
//   // RelAvator: relativeIdStream.secure_url,
//   RelativeName,
//   RelativePhone,
//   RelativeAddress,
//   Relationship,
// });

//     return res.status(200).json({ success: true, creatWorker });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// }
// export async function createEmployee(req, res) {
//   try {
//     const formData = req.body;
//     if (!formData) {
//       return res.status(400).json({ error: "Form Data Not Provided" });
//     }

//     const empIdStream = await cloudinary.uploader.upload(formData.EmpAvator, {
//       resource_type: "auto",
//       folder: "IdImages",
//     });
//     const relativeIdStream = await cloudinary.uploader.upload(
//       formData.RelAvator,
//       {
//         resource_type: "auto",
//         folder: "IdImages",
//       }
//     );

//     const { EmpAvator, RelAvator, ...prevEmployeeData } = formData;

//     const worker = await Employees.create({
//       ...prevEmployeeData,
//       EmpAvator: empIdStream.secure_url,
//       RelAvator: relativeIdStream.secure_url,
//     });

//     return res.status(200).json(worker);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// }

export async function createEmployee(req, res) {
console.log(req.body);
  try {
    const { EmpAvator, RelAvator } = req.body;

    // Check if file URLs are provided
    if (!EmpAvator || !RelAvator) {
      return res
        .status(400)
        .json({ success: false, error: "File URLs are missing." });
    }

    // Upload EmpAvator image to Cloudinary
    const empAvatorResult = await uploadToCloudinary(EmpAvator);
    const empAvatorUrl = empAvatorResult.secure_url;

    // Upload RelAvator image to Cloudinary
    const relAvatorResult = await uploadToCloudinary(RelAvator);
    const relAvatorUrl = relAvatorResult.secure_url;

    // Create a new employee with the provided data and uploaded image URLs
    const newEmployee = new Employees({
      EmpAvator: empAvatorUrl,
      FullName: req.body.FullName,
      Age: req.body.Age,
      Gender: req.body.Gender,
      Phone: req.body.Phone,
      Address: req.body.Address,
      JobType: req.body.JobType,
      Experience: req.body.Experience,
      RelAvator: relAvatorUrl,
      RelativeName: req.body.RelativeName,
      RelativePhone: req.body.RelativePhone,
      RelativeAddress: req.body.RelativeAddress,
      Relationship: req.body.Relationship,
    });

    // Save the new employee to the database
    const savedEmployee = await newEmployee.save();

    // Return success response
    res.json({
      success: true,
      message: "Employee information added successfully",
      data: {
        newEmployee: savedEmployee,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
// Function to upload image to Cloudinary
async function uploadToCloudinary(imageUrl, IdImages) {
  try {
    const result = await cloudinary.uploader.upload(imageUrl, {
      folder: IdImages,
    });
    return result;
  } catch (error) {
    throw error;
  }
}
//update emp
export async function updateEmployee(req, res) {
  try {
    const { empId } = req.query;
    const formData = req.body;

    if (empId && formData) {
      const worker = await Employees.findByIdAndUpdate(empId, formData);
      res.status(200).json(worker);
    }
    return res.status(404).json({ error: " user not selected !" });
  } catch (error) {
    return res.status(404).json({ error: " error while updating the data !" });
  }
}

// export async function updateEmployee(req, res) {
//   try {
//     const {
//       //EmpAvator,
//       FullName,
//       Age,
//       Gender,
//       Phone,
//       Address,
//       JobType,
//       Experience,
//       // RelAvator,
//       RelativeName,
//       RelativePhone,
//       RelativeAddress,
//       Relationship,
//     } = req.body;
//     const { empId } = req.query;
//     if (
//       empId &&
//       // EmpAvator &&
//       FullName &&
//       Age &&
//       Gender &&
//       Phone &&
//       Address &&
//       JobType &&
//       Experience &&
//       // RelAvator &&
//       RelativeName &&
//       RelativePhone &&
//       RelativeAddress &&
//       Relationship
//     ) {
//       const empIdStream = await cloudinary.uploader.upload(EmpAvator, {
//         resource_type: "auto",
//         folder: "IdImages",
//       });
//       const relativeIdStream = await cloudinary.uploader.upload(RelAvator, {
//         resource_type: "auto",
//         folder: "IdImages",
//       });

//       const updateEmpData = {
//         // EmpAvator: empIdStream.secure_url,
//         FullName,
//         Age,
//         Gender,
//         Phone,
//         Address,
//         JobType,
//         Experience,
//         // RelAvator: relativeIdStream.secure_url,
//         RelativeName,
//         RelativePhone,
//         RelativeAddress,
//         Relationship,
//       };

//       const updatedWorker = await Employees.findByIdAndUpdate(
//         empId,
//         updateEmpData,
//         {
//           new: true,
//         }
//       );
//       if (!updatedWorker) {
//         return res.status(404).json({ error: "Employee not Updated." });
//       }
//       return res.status(200).json(updatedWorker);
//     } else {
//       return res.status(400).json({ error: "All Fields are Required!" });
//     }
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// }

//  delete emp
export async function deleteEmployee(req, res) {
  try {
    const { empId } = req.query;

    if (empId) {
      const worker = await Employees.findByIdAndDelete(empId);
      return res.status(200).json(worker);
    }
    res.status(404).json({ error: "User Not Selected !" });
  } catch (error) {
    return res.status(404).json({ error: "failed to delete user" });
  }
}
