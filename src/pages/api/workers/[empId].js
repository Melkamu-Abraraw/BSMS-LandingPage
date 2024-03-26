import mdconc from "@/data/empdata/empdb/mdconc";
import { getEmp, putEmp, deleteEmp } from "@/data/empdata/empdb/EmpController";

const handler = (req, res) => {
  mdconc().catch(() =>
    res.status(405).json({ error: "Error in the connection" })
  );

  const { method } = req;

  switch (method) {
    case "GET":
      getEmp(req, res);
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
