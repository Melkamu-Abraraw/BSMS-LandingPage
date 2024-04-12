import mdconc from "@/data/empdata/empdb/mdconc";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "@/data/empdata/controllers/EmpController";

export default async function handler(req, res) {
  await mdconc().catch(() =>
    res.status(405).json({ error: "Error in the connection" })
  );

  // Type of request
  const { method } = req;
  switch (method) {
    case "GET":
      getEmployees(req, res);
      break;
    case "POST":
      createEmployee(req, res);
      break;
    case "PUT":
      updateEmployee(req, res);
      break;
    case "DELETE":
      deleteEmployee(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
