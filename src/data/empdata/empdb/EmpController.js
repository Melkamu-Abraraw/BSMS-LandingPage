import Employees from "@/data/empdata/models/EmpModel";
import cloudinary from "cloudinary";
import streamifier from "streamifier";

cloudinary.config({
  cloud_name: "zedaswdeveloper",
  api_key: "972651194788359",
  api_secret: "j7XithMLapGX6eU8-zNdZlyB5bM",
});

//emp controller
// get : http://localhost:3000/api/workers/id
export async function getEmp(req, res) {
  try {
    const { empId } = req.query;
    if (empId) {
      const worker = await Employees.findById(empId);
      res.status(200).json(worker);
    }
    res.status(404).json({ error: "user not selected" });
  } catch (error) {
    res.status(404).json({ error: "cannot get the user" });
  }
}
// get : http://localhost:3000/api/workers
export async function getEmps(req, res) {
  try {
    const workers = await Employees.find({});
    if (!workers) return res.status(404).json({ error: "Data not found" });
    res.status(200).json(workers);
  } catch (error) {
    res.status(404).json({ error: "Error while Fetching data" });
  }
}

// post : http://localhost:3000/api/workers

// export async function postEmp(req, res) {
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

// export async function postEmp(req, res) {
//   try {
//     const formData = req.body;
//     const empImage = req.files.empImage;
//     const relImage = req.files.relImage;

//     if (!formData || !empImage || !relImage) {
//       return res
//         .status(400)
//         .json({ error: "Form Data or Images Not Provided" });
//     }

//     // Upload EmpId image to Cloudinary
//     const empResult = await cloudinary.uploader.upload(empImage.path);
//     formData.empImage = empResult.secure_url;

//     // Upload RelativeId image to Cloudinary
//     const relResult = await cloudinary.uploader.upload(relImage.path);
//     formData.relImage = relResult.secure_url;

//     // Create employee record with form data and image URLs
//     const worker = await Employees.create(formData);
//     return res.status(200).json(worker);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// }

// put : http://localhost:3000/api/workers/id

export async function postEmp(req, res) {
  try {
    const formData = req.body;

    if (!formData) {
      return res.status(400).json({ error: "Form Data Not Provided" });
    }

    if (req.files && req.files.length > 0) {
      if (req.files.length > 2) {
        return res
          .status(400)
          .json({ success: false, error: "Maximum of 2 files allowed." });
      }

      const uploadPromises = req.files.map((file) => {
        return new Promise((resolve, reject) => {
          if (file.size > 90485760) {
            reject({
              success: false,
              error: `File ${file.originalname} is too large. Maximum size is 10 MB.`,
            });
          }

          const folder = "ProfilePictures";

          const stream = cloudinary.uploader.upload_stream(
            { resource_type: "auto", folder: folder },
            (error, result) => {
              if (error) {
                console.error("Error uploading to Cloudinary:", error);
                reject({
                  success: false,
                  error: "Error uploading to Cloudinary",
                });
              }
              formData.EmpId.push(result.secure_url);
              formData.RelativeId.push(result.secure_url);
              resolve();
            }
          );

          streamifier.createReadStream(file.buffer).pipe(stream);
        });
      });

      await Promise.all(uploadPromises);
    }

    const worker = await Employees.create(formData);
    return res.status(200).json(worker);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// put : http://localhost:3000/api/workers/id
export async function putEmp(req, res) {
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

// delete : http://localhost:3000/api/workers/id
export async function deleteEmp(req, res) {
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
