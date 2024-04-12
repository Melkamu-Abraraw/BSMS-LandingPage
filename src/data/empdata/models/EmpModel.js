import { Schema, models, model } from "mongoose";

const empSchema = new Schema(
  {
    EmpAvator: { type: String },
    FullName: { type: String, required: [true, "FullName is required"] },
    Age: { type: String, required: [true, "Age is required"] },
    Gender: { type: String, required: [true, "Gender is required"] },
    Phone: { type: String, required: [true, "Phone is required"] },
    Address: { type: String, required: [true, "Address is required"] },
    JobType: { type: String, required: [true, "JobType is required"] },
    Experience: { type: String, required: [true, "Experience is required"] },
    RelAvator: { type: String },
    RelativeName: {
      type: String,
      required: [true, "RelativeName is required"],
    },
    RelativePhone: {
      type: String,
      required: [true, "RelativePhone is required"],
    },
    RelativeAddress: {
      type: String,
      required: [true, "RelativeAddress is required"],
    },
    Relationship: {
      type: String,
      required: [true, "Relationship is required"],
    },
  },
  { timestamps: true }
);

const Employees = models.employee || model("employee", empSchema);
export default Employees;
