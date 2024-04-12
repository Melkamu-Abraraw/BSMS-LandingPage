import mdconc from "@/data/empdata/empdb/mdconc";
import {
  getEmployee,
  updateEmployee,
  deleteEmployee,
} from "@/data/empdata/controllers/EmpController";

export default async function handler(req, res) {
  await mdconc().catch(() =>
    res.status(405).json({ error: "Error in the connection" })
  );

  const { method } = req;

  switch (method) {
    case "GET":
      getEmployee(req, res);
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
