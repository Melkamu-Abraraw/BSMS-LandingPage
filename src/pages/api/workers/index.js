import mdconc from "@/data/empdata/empdb/mdconc";
import {
  deleteEmp,
  getEmps,
  postEmp,
  putEmp,
} from "@/data/empdata/empdb/EmpController";

const handler = (req, res) => {
  mdconc().catch(() =>
    res.status(405).json({ error: "Error in the connection" })
  );

  // Type of request
  const { method } = req;

  switch (method) {
    case "GET":
      getEmps(req, res);
      break;
    case "POST":
      postEmp(req, res);
      break;
    case "PUT":
      putEmp(req, res);
      break;
    case "DELETE":
      deleteEmp(req, res);
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
export default handler;
